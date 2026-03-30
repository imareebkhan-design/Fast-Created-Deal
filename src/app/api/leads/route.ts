import type { NextRequest } from 'next/server'

// ── In-memory rate limiter (per IP, resets on cold start) ─────────────────
const rateMap = new Map<string, { count: number; windowStart: number }>()
const RATE_LIMIT = 10          // max requests
const RATE_WINDOW = 60 * 1000  // 1 minute in ms

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)

  if (!entry || now - entry.windowStart > RATE_WINDOW) {
    rateMap.set(ip, { count: 1, windowStart: now })
    return true
  }

  if (entry.count >= RATE_LIMIT) return false

  entry.count++
  return true
}

// ── Lead score (0–100) ────────────────────────────────────────────────────
function calcScore(emi: number, loanCount: number, salaryBracket: string): number {
  let score = 0

  // EMI burden (max 40)
  if (emi >= 60000)                  score += 40
  else if (emi >= 35000)             score += 25
  else                               score += 10

  // Loan count (max 30)
  if (loanCount >= 3)                score += 30
  else if (loanCount === 2)          score += 20
  else                               score += 5

  // Salary bracket (max 20)
  if (salaryBracket.includes('1,50,000') || salaryBracket.includes('1,00,000')) {
    score += 20
  } else if (salaryBracket.includes('75,000')) {
    score += 10
  } else {
    score += 5
  }

  return Math.min(score, 100)
}

// ── Airtable write ────────────────────────────────────────────────────────
async function writeToAirtable(fields: Record<string, unknown>): Promise<void> {
  const baseId  = process.env.AIRTABLE_BASE_ID
  const apiKey  = process.env.AIRTABLE_API_KEY

  if (!baseId || !apiKey) throw new Error('Airtable env vars not configured')

  const res = await fetch(`https://api.airtable.com/v0/${baseId}/Leads`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Airtable error ${res.status}: ${body}`)
  }
}

// ── WATI WhatsApp trigger ─────────────────────────────────────────────────
async function triggerWATI(
  whatsapp: string,
  name: string,
  savingLow: number,
  savingHigh: number,
): Promise<void> {
  const endpoint     = process.env.WATI_API_ENDPOINT
  const apiKey       = process.env.WATI_API_KEY
  const templateName = process.env.WATI_DAY1_TEMPLATE_NAME

  if (!endpoint || !apiKey || !templateName) {
    throw new Error('WATI env vars not configured')
  }

  // Normalise phone — strip leading zeros / country code, add +91
  const digits = whatsapp.replace(/\D/g, '').replace(/^91/, '')
  const phone  = `+91${digits}`

  const res = await fetch(`${endpoint}/api/v1/sendTemplateMessage`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      template_name:  templateName,
      broadcast_name: `fcd_day1_${Date.now()}`,
      receivers: [
        {
          whatsappNumber: phone,
          customParams: [
            { name: 'name',         value: name },
            { name: 'saving_low',   value: `₹${savingLow.toLocaleString('en-IN')}` },
            { name: 'saving_high',  value: `₹${savingHigh.toLocaleString('en-IN')}` },
          ],
        },
      ],
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`WATI error ${res.status}: ${body}`)
  }
}

// ── Resend hot-lead alert ─────────────────────────────────────────────────
async function sendHotLeadEmail(lead: {
  name: string
  whatsapp: string
  emi: number
  loanCount: number
  salaryBracket: string
  savingLow: number
  savingHigh: number
  score: number
  utmSource?: string
  utmCampaign?: string
  utmMedium?: string
}): Promise<void> {
  const apiKey  = process.env.RESEND_API_KEY
  const emailTo = process.env.ALERT_EMAIL_TO

  if (!apiKey || !emailTo) throw new Error('Resend env vars not configured')

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  const subject = `🔥 HOT LEAD — Score ${lead.score} — ${lead.name} — ${fmt(lead.emi)} EMI`

  const body = `
HOT LEAD ALERT
──────────────────────────────────────────

Name            : ${lead.name}
WhatsApp        : ${lead.whatsapp}
Score           : ${lead.score} / 100

EMI             : ${fmt(lead.emi)} / month
Loans           : ${lead.loanCount}
Salary bracket  : ${lead.salaryBracket}

Est. saving low : ${fmt(lead.savingLow)} / month
Est. saving high: ${fmt(lead.savingHigh)} / month

UTM Source      : ${lead.utmSource   ?? '—'}
UTM Campaign    : ${lead.utmCampaign ?? '—'}
UTM Medium      : ${lead.utmMedium   ?? '—'}

──────────────────────────────────────────
Fast Credit Deal · Lead Management System
`.trim()

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from:    'FCD Leads <leads@fastcreditdeal.com>',
      to:      [emailTo],
      subject,
      text:    body,
    }),
  })

  if (!res.ok) {
    const errBody = await res.text()
    throw new Error(`Resend error ${res.status}: ${errBody}`)
  }
}

// ── POST /api/leads ───────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // ── Rate limiting ─────────────────────────────────────────────────────
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: 'Too many requests. Please wait a minute.' },
      { status: 429 },
    )
  }

  // ── Parse body ────────────────────────────────────────────────────────
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!body || typeof body !== 'object') {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const {
    name,
    whatsapp,
    emi,
    loan_count,
    salary_bracket,
    saving_low,
    saving_high,
    utm_source,
    utm_campaign,
    utm_medium,
  } = body as Record<string, unknown>

  // ── Validation ────────────────────────────────────────────────────────
  const validationErrors: string[] = []

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    validationErrors.push('name is required')
  }
  if (!whatsapp || typeof whatsapp !== 'string' || !/^\d{10}$/.test(whatsapp.trim())) {
    validationErrors.push('whatsapp must be a 10-digit number')
  }
  if (typeof emi !== 'number' || emi <= 0) {
    validationErrors.push('emi must be a positive number')
  }
  if (typeof loan_count !== 'number' || loan_count < 1) {
    validationErrors.push('loan_count must be >= 1')
  }
  if (!salary_bracket || typeof salary_bracket !== 'string') {
    validationErrors.push('salary_bracket is required')
  }
  if (typeof saving_low !== 'number' || saving_low < 0) {
    validationErrors.push('saving_low must be a non-negative number')
  }
  if (typeof saving_high !== 'number' || saving_high < 0) {
    validationErrors.push('saving_high must be a non-negative number')
  }

  if (validationErrors.length > 0) {
    return Response.json({ error: 'Validation failed', details: validationErrors }, { status: 422 })
  }

  // ── Coerce validated types ────────────────────────────────────────────
  const leadName       = (name as string).trim()
  const leadWhatsapp   = (whatsapp as string).trim()
  const leadEmi        = emi as number
  const leadLoanCount  = loan_count as number
  const leadSalary     = (salary_bracket as string).trim()
  const leadSavingLow  = saving_low as number
  const leadSavingHigh = saving_high as number
  const leadUtmSource  = typeof utm_source   === 'string' ? utm_source   : undefined
  const leadUtmCampaign = typeof utm_campaign === 'string' ? utm_campaign : undefined
  const leadUtmMedium  = typeof utm_medium   === 'string' ? utm_medium   : undefined

  // ── STEP 1 — Score ────────────────────────────────────────────────────
  const score = calcScore(leadEmi, leadLoanCount, leadSalary)

  // ── STEP 2 — Airtable ─────────────────────────────────────────────────
  try {
    await writeToAirtable({
      name:           leadName,
      whatsapp:       leadWhatsapp,
      emi:            leadEmi,
      loan_count:     leadLoanCount,
      salary_bracket: leadSalary,
      saving_low:     leadSavingLow,
      saving_high:    leadSavingHigh,
      score,
      utm_source:     leadUtmSource  ?? '',
      utm_campaign:   leadUtmCampaign ?? '',
      utm_medium:     leadUtmMedium  ?? '',
      created_at:     new Date().toISOString(),
      status:         'New Lead',
    })
  } catch (err) {
    console.error('[leads] Airtable write failed:', err)
    // Non-fatal — continue so the user experience isn't blocked
  }

  // ── STEP 3 — WATI WhatsApp ────────────────────────────────────────────
  try {
    await triggerWATI(leadWhatsapp, leadName, leadSavingLow, leadSavingHigh)
  } catch (err) {
    console.error('[leads] WATI trigger failed:', err)
    // Non-fatal
  }

  // ── STEP 4 — Hot lead email (score >= 70) ─────────────────────────────
  if (score >= 70) {
    try {
      await sendHotLeadEmail({
        name:         leadName,
        whatsapp:     leadWhatsapp,
        emi:          leadEmi,
        loanCount:    leadLoanCount,
        salaryBracket: leadSalary,
        savingLow:    leadSavingLow,
        savingHigh:   leadSavingHigh,
        score,
        utmSource:    leadUtmSource,
        utmCampaign:  leadUtmCampaign,
        utmMedium:    leadUtmMedium,
      })
    } catch (err) {
      console.error('[leads] Hot-lead email failed:', err)
      // Non-fatal
    }
  }

  // ── STEP 5 — Response ─────────────────────────────────────────────────
  return Response.json(
    { success: true, score, saving_low: leadSavingLow, saving_high: leadSavingHigh },
    { status: 200 },
  )
}
