'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ff = 'var(--font-sans)'

// ─── Data ────────────────────────────────────────────────────────────
const SALARY_OPTS = [
  { value: '30-50',   label: '₹30,000 – ₹50,000' },
  { value: '50-75',   label: '₹50,000 – ₹75,000' },
  { value: '75-100',  label: '₹75,000 – ₹1,00,000' },
  { value: '100-150', label: '₹1,00,000 – ₹1,50,000' },
  { value: '150+',    label: '₹1,50,000+' },
]

const EMI_OPTS = [
  { value: '15-30',  label: '₹15,000 – ₹30,000' },
  { value: '30-50',  label: '₹30,000 – ₹50,000' },
  { value: '50-75',  label: '₹50,000 – ₹75,000' },
  { value: '75-100', label: '₹75,000 – ₹1,00,000' },
  { value: '100+',   label: '₹1,00,000+' },
]

const LOAN_OPTS = ['1', '2', '3', '4', '5 or more']

const SAVINGS_MAP: Record<string, [string, string]> = {
  '15-30':  ['₹4,000',  '₹10,000'],
  '30-50':  ['₹9,000',  '₹18,000'],
  '50-75':  ['₹14,000', '₹28,000'],
  '75-100': ['₹22,000', '₹38,000'],
  '100+':   ['₹28,000', '₹45,000'],
}

// ─── Sub-components ──────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg viewBox="0 0 11 9" fill="none" width="10" height="10">
      <path d="M1 4.5L4 7.5L10 1" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

// ─── Main Component ──────────────────────────────────────────────────
export default function LeadForm() {
  const [salary,  setSalary]  = useState('')
  const [emi,     setEmi]     = useState('')
  const [loans,   setLoans]   = useState('')
  const [city,    setCity]    = useState('')
  const [phone,   setPhone]   = useState('')
  const [consent, setConsent] = useState(false)

  // Shake state
  const [shakeSalary,  setShakeSalary]  = useState(false)
  const [shakeEmi,     setShakeEmi]     = useState(false)
  const [shakePhone,   setShakePhone]   = useState(false)
  const [consentRed,   setConsentRed]   = useState(false)

  const [submitting,   setSubmitting]   = useState(false)
  const [success,      setSuccess]      = useState(false)

  // Progress track: 4 steps → salary(s1), emi(s2), loans(s3), phone(s4)
  const filledSteps = [
    !!salary,
    !!emi,
    !!loans,
    /^[6-9]\d{9}$/.test(phone),
  ]
  const firstEmpty = filledSteps.findIndex(f => !f)

  function shake(setter: (v: boolean) => void) {
    setter(true)
    setTimeout(() => setter(false), 400)
  }

  async function handleSubmit() {
    if (!salary) { shake(setShakeSalary); return }
    if (!emi)    { shake(setShakeEmi);    return }
    if (!/^[6-9]\d{9}$/.test(phone)) { shake(setShakePhone); return }
    if (!consent) {
      setConsentRed(true)
      setTimeout(() => setConsentRed(false), 1200)
      return
    }
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1000))
    setSubmitting(false)
    setSuccess(true)
  }

  const savingsRange = SAVINGS_MAP[emi]
  const showPreview  = !!salary && !!emi && !!savingsRange

  return (
    <section
      id="form"
      style={{
        position: 'relative',
        padding: 'clamp(60px, 8vw, 80px) clamp(24px, 5vw, 80px) clamp(80px, 10vw, 100px)',
        backgroundColor: '#09090B',
        overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(79,70,229,0.045) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Glow blobs */}
      <div style={{
        position: 'absolute', width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,70,229,0.055) 0%, transparent 65%)',
        top: '-200px', right: '-100px', pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(5,150,105,0.04) 0%, transparent 65%)',
        bottom: '-100px', left: '-100px', pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
        gap: 'clamp(48px, 6vw, 72px)',
        alignItems: 'start',
      }}>

        {/* ── LEFT COLUMN ─────────────────────────────────────── */}
        <div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: ff, fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#e8960a', marginBottom: '16px', display: 'block',
            }}
          >
            Free Consultation
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: ff, fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 900, letterSpacing: '-0.03em',
              lineHeight: 1.06, color: '#FFFFFF', marginBottom: '12px',
            }}
          >
            Get your free<br />EMI analysis<br />today.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16, duration: 0.5 }}
            style={{
              fontFamily: ff, fontSize: '16px',
              color: 'rgba(255,255,255,0.35)', lineHeight: 1.65,
              marginBottom: '36px', maxWidth: '400px',
            }}
          >
            60 seconds to fill. Our expert sends you a clear savings breakdown on WhatsApp within 2 hours.
          </motion.p>

          {/* Trust list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px' }}>
            {[
              <><strong style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>Free profile analysis</strong> — no cost ever</>,
              <><strong style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>No paperwork</strong> required to start</>,
              <>WhatsApp response <strong style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>within 2 hours</strong></>,
              <><strong style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>Zero obligation</strong>, zero spam</>,
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 + i * 0.07, duration: 0.35 }}
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <div style={{
                  width: '20px', height: '20px', borderRadius: '5px', flexShrink: 0,
                  background: 'rgba(52,211,153,0.12)',
                  border: '1px solid rgba(52,211,153,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <CheckIcon />
                </div>
                <span style={{ fontFamily: ff, fontSize: '14px', color: 'rgba(255,255,255,0.35)' }}>
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

          {/* WhatsApp preview card */}
          <motion.div
            animate={{ y: [0, -7, 0], rotate: [-0.4, 0, -0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px', padding: '18px 20px', marginBottom: '10px',
            }}
          >
            {/* WA header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg,#25D366,#128C7E)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <WaIcon />
              </div>
              <div>
                <div style={{ fontFamily: ff, fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>
                  Fast Credit Deal
                </div>
                <div style={{ fontFamily: ff, fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '1px' }}>
                  Areeb · DSA Partner
                </div>
              </div>
              <div style={{ fontFamily: ff, fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginLeft: 'auto' }}>
                Now
              </div>
            </div>
            {/* Bubble */}
            <div style={{
              background: 'rgba(37,211,102,0.08)',
              border: '1px solid rgba(37,211,102,0.15)',
              borderRadius: '10px 10px 10px 3px',
              padding: '11px 13px',
            }}>
              <div style={{ fontFamily: ff, fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>
                Hi Rahul 👋 Your analysis is ready.<br />
                Current EMI: ₹97,000/mo<br />
                After consolidation: <span style={{ color: '#34D399', fontWeight: 700 }}>₹64,000/mo</span><br />
                You save: <span style={{ color: '#34D399', fontWeight: 700 }}>₹33,000 every month</span><br />
                Ready to proceed? Reply YES
              </div>
              <div style={{ textAlign: 'right', fontFamily: ff, fontSize: '10px', color: '#34D399', opacity: 0.6, marginTop: '5px' }}>
                ✓✓ Delivered
              </div>
            </div>
          </motion.div>

          {/* Response time card */}
          <motion.div
            animate={{ y: [0, -5, 0], rotate: [0.3, 0, 0.3] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px', padding: '13px 16px',
            }}
          >
            <div style={{
              width: '34px', height: '34px', borderRadius: '9px', flexShrink: 0,
              background: 'rgba(79,70,229,0.18)',
              border: '1px solid rgba(79,70,229,0.28)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
                <circle cx="8" cy="8" r="6" stroke="#818CF8" strokeWidth="1.3" />
                <path d="M8 5v3.5l2 1.5" stroke="#818CF8" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div style={{
                fontFamily: ff, fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.07em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)', marginBottom: '2px',
              }}>
                Average response time
              </div>
              <div style={{ fontFamily: ff, fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.88)' }}>
                Under 2 hours
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN — FORM CARD ─────────────────────────── */}
        <div style={{ position: 'relative' }}>

          {/* Floating element: avg saving */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [3, 2, 3] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '-20px', right: '-24px',
              background: 'white', border: '1px solid #E4E4E7',
              borderRadius: '14px', padding: '14px 18px', width: '188px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)',
              zIndex: 2,
            }}
            className="hidden-lt-lg"
          >
            <div style={{ fontFamily: ff, fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A1A1AA', marginBottom: '5px' }}>
              Avg. monthly saving
            </div>
            <div style={{ fontFamily: ff, fontSize: '26px', fontWeight: 900, color: '#059669', letterSpacing: '-0.03em', lineHeight: 1 }}>
              ₹33,000
            </div>
            <div style={{ fontFamily: ff, fontSize: '10px', color: '#A1A1AA', marginTop: '3px' }}>
              per client · Delhi NCR
            </div>
          </motion.div>

          {/* Floating element: banks pill */}
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [-1.5, -0.5, -1.5] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            style={{
              position: 'absolute', bottom: '60px', left: '-20px',
              background: 'white', border: '1px solid #E4E4E7',
              borderRadius: '99px', padding: '8px 16px',
              display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              zIndex: 2,
            }}
            className="hidden-lt-lg"
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4F46E5', flexShrink: 0 }} />
            <div style={{ fontFamily: ff, fontSize: '11px', fontWeight: 700, color: '#09090B', whiteSpace: 'nowrap' }}>
              40+ banks &amp; NBFCs
            </div>
          </motion.div>

          {/* Floating element: speed */}
          <motion.div
            animate={{ y: [0, -7, 0], rotate: [2, 1, 2] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            style={{
              position: 'absolute', bottom: '150px', right: '-28px',
              background: 'white', border: '1px solid #E4E4E7',
              borderRadius: '12px', padding: '12px 16px', width: '156px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              zIndex: 2,
            }}
            className="hidden-lt-lg"
          >
            <div style={{ fontFamily: ff, fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A1A1AA', marginBottom: '5px' }}>
              Disbursal speed
            </div>
            <div style={{ fontFamily: ff, fontSize: '18px', fontWeight: 900, color: '#09090B', marginBottom: '6px' }}>
              21 days avg
            </div>
            <div style={{ height: '3px', background: '#E4E4E7', borderRadius: '99px', overflow: 'hidden' }}>
              <div className="consult-speed-bar" style={{
                height: '100%', borderRadius: '99px',
                background: 'linear-gradient(90deg,#4F46E5,#818CF8)',
              }} />
            </div>
          </motion.div>

          {/* ── FORM CARD ────────────────────────────────────── */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E4E4E7',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0,0,0,0.03), 0 16px 40px rgba(0,0,0,0.07), 0 40px 80px rgba(0,0,0,0.05)',
            position: 'relative',
          }}>

            {/* Topbar — identical to EMI calculator */}
            <div style={{
              background: '#09090B',
              padding: '16px 32px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34D399' }} />
              <span style={{
                fontFamily: ff, fontSize: '13px', fontWeight: 600,
                color: 'rgba(255,255,255,0.6)', marginLeft: '6px', letterSpacing: '0.02em',
              }}>
                EMI Analysis Request
              </span>
              <span style={{
                marginLeft: 'auto',
                fontFamily: ff, fontSize: '11px', fontWeight: 700,
                background: 'rgba(52,211,153,0.15)', color: '#34D399',
                border: '1px solid rgba(52,211,153,0.28)',
                padding: '4px 12px', borderRadius: '99px', letterSpacing: '0.04em',
              }}>
                ⚡ Free forever
              </span>
            </div>

            {/* Form body */}
            <div style={{ padding: 'clamp(24px, 3vw, 32px)' }}>

              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ textAlign: 'center', padding: '48px 0' }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                      style={{
                        width: '52px', height: '52px', borderRadius: '50%',
                        background: '#ECFDF5',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 16px',
                      }}
                    >
                      <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
                        <path d="M2 9L7.5 14.5L20 2" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                    <p style={{ fontFamily: ff, fontSize: '18px', fontWeight: 700, color: '#09090B', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                      ✓ Sent! We&apos;ll respond within 2 hours on WhatsApp.
                    </p>
                    <p style={{ fontFamily: ff, fontSize: '14px', color: '#52525B' }}>
                      Check your WhatsApp for your savings analysis.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" exit={{ opacity: 0 }}>

                    {/* Progress track */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '28px' }}>
                      {[0, 1, 2, 3].map((i) => {
                        const done   = filledSteps[i]
                        const active = !done && (firstEmpty === i || (firstEmpty === -1 && i === 3))
                        return (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < 3 ? '1' : 'none' }}>
                            <div style={{
                              width:  active ? '22px' : '8px',
                              height: '8px',
                              borderRadius: active ? '4px' : '50%',
                              background: done ? '#34D399' : active ? '#4F46E5' : '#E4E4E7',
                              boxShadow: active ? '0 0 8px rgba(79,70,229,0.5)' : 'none',
                              transition: 'all 0.3s',
                              flexShrink: 0,
                            }} />
                            {i < 3 && (
                              <div style={{ flex: 1, height: '1px', background: '#E4E4E7', margin: '0 2px' }} />
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {/* Salary */}
                    <div className={shakeSalary ? 'calc-shake' : ''} style={{ marginBottom: '18px' }}>
                      <label style={{
                        fontFamily: ff, fontSize: '11px', fontWeight: 700,
                        letterSpacing: '0.09em', textTransform: 'uppercase',
                        color: '#A1A1AA', display: 'block', marginBottom: '9px',
                      }}>
                        Monthly take-home salary
                      </label>
                      <div style={{ position: 'relative' }}>
                        <select
                          value={salary}
                          onChange={e => setSalary(e.target.value)}
                          style={{
                            width: '100%', appearance: 'none', WebkitAppearance: 'none',
                            background: '#FAFAFA', border: `1px solid ${salary ? '#059669' : '#E4E4E7'}`,
                            borderRadius: '10px', padding: '13px 40px 13px 16px',
                            fontFamily: ff, fontSize: '14px', fontWeight: 500,
                            color: salary ? '#09090B' : '#A1A1AA',
                            cursor: 'pointer', outline: 'none', transition: 'border-color 0.2s',
                          }}
                        >
                          <option value="">Select range</option>
                          {SALARY_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                        <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                            <path d="M1 1L5 5L9 1" stroke="#A1A1AA" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* EMI */}
                    <div className={shakeEmi ? 'calc-shake' : ''} style={{ marginBottom: '18px' }}>
                      <label style={{
                        fontFamily: ff, fontSize: '11px', fontWeight: 700,
                        letterSpacing: '0.09em', textTransform: 'uppercase',
                        color: '#A1A1AA', display: 'block', marginBottom: '9px',
                      }}>
                        Total EMI per month
                      </label>
                      <div style={{ position: 'relative' }}>
                        <select
                          value={emi}
                          onChange={e => setEmi(e.target.value)}
                          style={{
                            width: '100%', appearance: 'none', WebkitAppearance: 'none',
                            background: '#FAFAFA', border: `1px solid ${emi ? '#059669' : '#E4E4E7'}`,
                            borderRadius: '10px', padding: '13px 40px 13px 16px',
                            fontFamily: ff, fontSize: '14px', fontWeight: 500,
                            color: emi ? '#09090B' : '#A1A1AA',
                            cursor: 'pointer', outline: 'none', transition: 'border-color 0.2s',
                          }}
                        >
                          <option value="">Select range</option>
                          {EMI_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                        <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                            <path d="M1 1L5 5L9 1" stroke="#A1A1AA" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Loans + City row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>

                      {/* Loans */}
                      <div>
                        <label style={{
                          fontFamily: ff, fontSize: '11px', fontWeight: 700,
                          letterSpacing: '0.09em', textTransform: 'uppercase',
                          color: '#A1A1AA', display: 'block', marginBottom: '9px',
                        }}>
                          Active loans / cards
                        </label>
                        <div style={{ position: 'relative' }}>
                          <select
                            value={loans}
                            onChange={e => setLoans(e.target.value)}
                            style={{
                              width: '100%', appearance: 'none', WebkitAppearance: 'none',
                              background: '#FAFAFA', border: `1px solid ${loans ? '#059669' : '#E4E4E7'}`,
                              borderRadius: '10px', padding: '13px 32px 13px 16px',
                              fontFamily: ff, fontSize: '14px', fontWeight: 500,
                              color: loans ? '#09090B' : '#A1A1AA',
                              cursor: 'pointer', outline: 'none',
                            }}
                          >
                            <option value="">Select</option>
                            {LOAN_OPTS.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                          <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                              <path d="M1 1L5 5L9 1" stroke="#A1A1AA" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* City */}
                      <div>
                        <label style={{
                          fontFamily: ff, fontSize: '11px', fontWeight: 700,
                          letterSpacing: '0.09em', textTransform: 'uppercase',
                          color: '#A1A1AA', display: 'block', marginBottom: '9px',
                        }}>
                          Your city
                        </label>
                        <div style={{ position: 'relative' }}>
                          <div style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4, pointerEvents: 'none' }}>
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                              <path d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5c0-2.49-2.01-4.5-4.5-4.5z" stroke="#A1A1AA" strokeWidth="1.3" />
                              <circle cx="8" cy="6" r="1.5" stroke="#A1A1AA" strokeWidth="1.3" />
                            </svg>
                          </div>
                          <input
                            type="text" value={city} placeholder="Delhi, Mumbai…"
                            onChange={e => setCity(e.target.value)}
                            style={{
                              width: '100%', background: '#FAFAFA',
                              border: `1px solid ${city.trim().length > 1 ? '#059669' : '#E4E4E7'}`,
                              borderRadius: '10px', padding: '13px 14px 13px 36px',
                              fontFamily: ff, fontSize: '14px', fontWeight: 500,
                              color: '#09090B', outline: 'none', transition: 'border-color 0.2s',
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Live preview */}
                    <motion.div
                      animate={{ opacity: showPreview ? 1 : 0, y: showPreview ? 0 : 5 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '11px 14px',
                        background: 'linear-gradient(90deg, rgba(79,70,229,0.06) 0%, rgba(5,150,105,0.04) 100%)',
                        border: '1px solid rgba(79,70,229,0.12)',
                        borderRadius: '10px', marginBottom: '18px',
                        pointerEvents: showPreview ? 'auto' : 'none',
                      }}
                    >
                      <div style={{
                        width: '22px', height: '22px', borderRadius: '6px',
                        background: '#4F46E5', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <svg viewBox="0 0 11 11" fill="none" width="11" height="11">
                          <path d="M5.5 1v4.5L8 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                      <span style={{ fontFamily: ff, fontSize: '12px', fontWeight: 600, color: '#4F46E5' }}>
                        You could save{' '}
                        <span style={{ color: '#059669' }}>
                          {savingsRange ? `${savingsRange[0]}–${savingsRange[1]}` : ''}/month
                        </span>
                      </span>
                    </motion.div>

                    {/* Divider */}
                    <div style={{ borderTop: '1px solid #E4E4E7', margin: '4px 0 18px' }} />

                    {/* Phone */}
                    <div className={shakePhone ? 'calc-shake' : ''} style={{ marginBottom: '18px' }}>
                      <label style={{
                        fontFamily: ff, fontSize: '11px', fontWeight: 700,
                        letterSpacing: '0.09em', textTransform: 'uppercase',
                        color: '#A1A1AA', display: 'block', marginBottom: '9px',
                      }}>
                        WhatsApp number
                      </label>
                      <div style={{ position: 'relative' }}>
                        <span style={{
                          position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                          fontFamily: ff, fontSize: '14px', fontWeight: 600,
                          color: '#A1A1AA', pointerEvents: 'none',
                        }}>
                          +91
                        </span>
                        <input
                          type="tel" value={phone} maxLength={10}
                          placeholder="10-digit mobile number"
                          inputMode="numeric"
                          onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                          style={{
                            width: '100%', background: '#FAFAFA',
                            border: `1px solid ${/^[6-9]\d{9}$/.test(phone) ? '#059669' : '#E4E4E7'}`,
                            borderRadius: '10px', padding: '13px 14px 13px 46px',
                            fontFamily: ff, fontSize: '14px', fontWeight: 500,
                            color: '#09090B', outline: 'none', transition: 'border-color 0.2s',
                          }}
                        />
                      </div>
                    </div>

                    {/* Consent */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '18px' }}>
                      <input
                        type="checkbox" id="lf-consent"
                        checked={consent} onChange={e => setConsent(e.target.checked)}
                        style={{ width: '15px', height: '15px', accentColor: '#4F46E5', cursor: 'pointer', flexShrink: 0, marginTop: '2px' }}
                      />
                      <label htmlFor="lf-consent" style={{
                        fontFamily: ff, fontSize: '11px', lineHeight: 1.5, cursor: 'pointer',
                        color: consentRed ? '#DC2626' : '#A1A1AA',
                        transition: 'color 0.2s',
                      }}>
                        I agree to receive my savings analysis on WhatsApp. I can opt out anytime. (TRAI compliant)
                      </label>
                    </div>

                    {/* Submit button */}
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      style={{
                        width: '100%', position: 'relative', overflow: 'hidden',
                        background: submitting ? '#A1A1AA' : '#111111',
                        color: 'white', fontFamily: ff,
                        fontSize: '15px', fontWeight: 700,
                        padding: '16px 24px', borderRadius: '10px', border: 'none',
                        cursor: submitting ? 'not-allowed' : 'pointer',
                        letterSpacing: '-0.01em',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                        transition: 'background 0.15s, box-shadow 0.15s',
                      }}
                    >
                      {!submitting && (
                        <div style={{
                          width: '20px', height: '20px', borderRadius: '50%',
                          background: 'rgba(255,255,255,0.2)', flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5h6M5 2l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                      {submitting ? 'Sending…' : 'Get My Free EMI Analysis'}
                      {/* Shimmer sweep */}
                      {!submitting && <div className="calc-shimmer-div" />}
                    </button>

                    {/* No CIBIL */}
                    <div style={{
                      textAlign: 'center', marginTop: '10px',
                      fontFamily: ff, fontSize: '11px', color: '#A1A1AA', letterSpacing: '0.02em',
                    }}>
                      ✓ No CIBIL check &nbsp;·&nbsp; ✓ No documents &nbsp;·&nbsp; ✓ Free forever
                    </div>

                    {/* Social proof */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', marginTop: '14px' }}>
                      <div style={{ display: 'flex' }}>
                        {['RK', 'PS', 'AM', 'SG'].map((init, i) => (
                          <div key={i} style={{
                            width: '22px', height: '22px', borderRadius: '50%',
                            background: 'rgba(79,70,229,0.25)',
                            border: '2px solid white',
                            marginRight: i < 3 ? '-7px' : '0',
                            fontFamily: ff, fontSize: '7px', fontWeight: 800, color: '#818CF8',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            {init}
                          </div>
                        ))}
                      </div>
                      <span style={{ fontFamily: ff, fontSize: '11px', color: '#A1A1AA', marginLeft: '14px' }}>
                        <strong style={{ color: '#52525B' }}>500+</strong> salaried professionals already saved
                      </span>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
