'use client'

import { motion } from 'framer-motion'

const ff = 'var(--font-sans)'
const GREEN  = '#10B981'
const ACCENT = '#4F46E5'
const RED    = '#EF4444'
const INK    = '#09090B'
const BODY   = '#52525B'
const MUTED  = '#A1A1AA'
const BORDER = '#E4E4E7'

// ─── Data ─────────────────────────────────────────────────────────
const ADV_CARDS = [
  {
    badge: 'Our edge', num: '01',
    iconBg: 'rgba(79,70,229,0.15)', icon: '🎯',
    title: 'We know which bank says yes — before you apply',
    body: "13 years of placements across 40+ lenders means we've seen every profile. We know HDFC's current appetite, IDFC's sweet spot, and Kotak's current thresholds. We place you once, in the right place.",
  },
  {
    badge: 'Zero silence', num: '02',
    iconBg: 'rgba(16,185,129,0.12)', icon: '💬',
    title: 'WhatsApp updates at every step. No more chasing.',
    body: 'You hear from us within 2 hours. Every time your file moves — submitted, processing, approved — you get a WhatsApp message. No calls you didn\'t ask for. No silence after documents.',
  },
  {
    badge: null, num: '03',
    iconBg: 'rgba(245,158,11,0.12)', icon: '⚡',
    title: '48 hrs bank. Same day NBFC. While others take 2 weeks.',
    body: 'Standard DSAs take 7–15 days because they\'re navigating banks cold. Our direct relationships mean your file jumps the queue. Bank disbursal in 48 hours. NBFC same day.',
  },
  {
    badge: null, num: '04',
    iconBg: 'rgba(239,68,68,0.1)', icon: '🎯',
    title: 'We only take cases we can close. Seriously.',
    body: 'We work exclusively with salaried professionals carrying ₹40K+ EMI burden. If your profile doesn\'t qualify, we tell you immediately — and explain exactly why. No false hope. No wasted time.',
  },
]

const COMP_ROWS = [
  { others: 'You research and compare 40 banks yourself', feature: 'Bank selection', fcd: 'We match your exact profile to the lender most likely to approve', bankPills: false, fcdGreen: false },
  { others: 'RM collects documents, then goes silent',    feature: 'After docs',      fcd: 'WhatsApp update every time your file moves — no chasing needed',                bankPills: false, fcdGreen: false },
  { others: 'Generic consolidation for anyone who applies', feature: 'Specialisation', fcd: 'Salaried EMI overload only — across our 40+ lender network',                   bankPills: true,  fcdGreen: false },
  { others: 'Low CIBIL? Rejected with no explanation.',   feature: 'CIBIL concerns',  fcd: 'We assess your full profile — payment history, income stability — before any application', bankPills: false, fcdGreen: false },
  { others: 'Generic advice — ₹0 back in your pocket monthly', feature: 'Real outcome', fcd: '₹20K–₹50K back in your account every month',                               bankPills: false, fcdGreen: true  },
  { others: '7–15 days. No visibility into what\'s happening.', feature: 'Speed',       fcd: '48 hrs bank disbursal. Same day NBFC. 21 days average.',                     bankPills: false, fcdGreen: false },
]

const BANK_PILLS = [
  { color: '#004C8F', name: 'HDFC'  },
  { color: '#F37329', name: 'ICICI' },
  { color: '#22409A', name: 'Kotak' },
  { color: '#C8232C', name: 'Axis'  },
  { color: '#1A1A8C', name: 'SBI'   },
  { color: '#00843D', name: 'IDFC'  },
]

// ─── Helpers ──────────────────────────────────────────────────────
function XMark() {
  return <span style={{ color: RED, fontSize: '16px', flexShrink: 0 }}>✗</span>
}
function CheckMark() {
  return <span style={{ color: GREEN, fontSize: '16px', flexShrink: 0 }}>✓</span>
}

// ─── Main Component ───────────────────────────────────────────────
export default function WhyUsSection() {
  return (
    <section
      id="why"
      style={{
        position: 'relative',
        padding: 'clamp(64px, 8vw, 100px) 0 clamp(80px, 10vw, 120px)',
        overflow: 'hidden',
        backgroundColor: '#FAFAFA',
      }}
    >
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, #E4E4E7 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        pointerEvents: 'none',
      }} />
      {/* Indigo blob */}
      <div style={{
        position: 'absolute', width: '500px', height: '500px', borderRadius: '50%',
        background: 'rgba(79,70,229,0.06)', top: '-100px', right: '-100px',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />
      {/* Green blob */}
      <div style={{
        position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
        background: 'rgba(16,185,129,0.05)', bottom: 0, left: '-80px',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)', position: 'relative', zIndex: 2 }}>

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
            gap: 'clamp(32px, 6vw, 80px)',
            alignItems: 'end',
            marginBottom: 'clamp(48px, 6vw, 72px)',
          }}
        >
          {/* Left: overline + headline */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <motion.div
                animate={{ opacity: [1, 0.5, 1], scale: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '6px', height: '6px', borderRadius: '50%', background: ACCENT }}
              />
              <span style={{ fontFamily: ff, fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT }}>
                Why Fast Credit Deal
              </span>
            </div>
            <h2 style={{
              fontFamily: ff, fontSize: 'clamp(32px, 4.5vw, 52px)',
              fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: INK,
            }}>
              We don&apos;t just find<br />loans. We{' '}
              <em style={{ fontStyle: 'normal', color: GREEN }}>engineer</em>
              <br />your way out.
            </h2>
          </div>

          {/* Right: body + mini-stats */}
          <div style={{ paddingBottom: '6px' }}>
            <p style={{ fontFamily: ff, fontSize: '17px', color: BODY, lineHeight: 1.7, marginBottom: '28px' }}>
              Most loan advisors throw your profile at every bank and hope something sticks. We do the opposite — we study your exact EMI burden, map it to the right lender, and only move when we know you&apos;ll be approved. That&apos;s why our clients save ₹28,000–₹45,000 every month.
            </p>
            <div style={{ display: 'flex', gap: '24px' }}>
              {[
                { num: '₹2.3', sup: 'Cr+', label: 'Total saved' },
                { num: '500',  sup: '+',   label: 'Clients helped' },
                { num: '21',   sup: 'd',   label: 'Avg. disbursal' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'contents' }}>
                  {i > 0 && <div style={{ width: '1px', background: BORDER, alignSelf: 'stretch', margin: '4px 0' }} />}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontFamily: ff, fontSize: '28px', fontWeight: 800, color: INK, letterSpacing: '-0.02em' }}>
                      {s.num}<span style={{ color: GREEN }}>{s.sup}</span>
                    </div>
                    <div style={{ fontFamily: ff, fontSize: '11px', fontWeight: 500, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── ADVANTAGE CARDS ────────────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '80px',
        }}>
          {ADV_CARDS.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ delay: (i + 1) * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, borderColor: 'rgba(79,70,229,0.4)', transition: { duration: 0.2 } }}
              style={{
                background: '#FFFFFF',
                border: `1px solid ${BORDER}`,
                borderRadius: '16px',
                padding: '28px 24px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
              }}
            >
              {c.badge && (
                <div style={{
                  position: 'absolute', top: '24px', right: '20px',
                  fontFamily: ff, fontSize: '10px', fontWeight: 600,
                  color: GREEN, background: 'rgba(16,185,129,0.12)',
                  border: '1px solid rgba(16,185,129,0.2)',
                  borderRadius: '99px', padding: '3px 10px', letterSpacing: '0.04em',
                }}>
                  {c.badge}
                </div>
              )}
              <div style={{ fontFamily: ff, fontSize: '11px', fontWeight: 700, color: ACCENT, letterSpacing: '0.08em', marginBottom: '20px' }}>
                {c.num}
              </div>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: c.iconBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '18px', fontSize: '22px',
              }}>
                {c.icon}
              </div>
              <div style={{ fontFamily: ff, fontSize: '16px', fontWeight: 700, color: INK, marginBottom: '10px', lineHeight: 1.3 }}>
                {c.title}
              </div>
              <div style={{ fontFamily: ff, fontSize: '13px', color: BODY, lineHeight: 1.65 }}>
                {c.body}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── COMPARISON TABLE ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: '#FAFAFA',
            border: `1px solid ${BORDER}`,
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          {/* Header row */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
            background: '#F4F4F5', borderBottom: `1px solid ${BORDER}`,
          }}
            className="wus-comp-grid"
          >
            <div style={{ padding: '18px 28px', fontFamily: ff, fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: RED, borderRight: `1px solid ${BORDER}` }}>
              ✗ &nbsp;Others
            </div>
            <div style={{ padding: '18px 28px', fontFamily: ff, fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED, textAlign: 'center', borderRight: `1px solid ${BORDER}` }}
              className="wus-feature-col"
            >
              The difference
            </div>
            <div style={{ padding: '18px 28px', fontFamily: ff, fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: GREEN, display: 'flex', alignItems: 'center', gap: '8px' }}>
              ✓ &nbsp;Fast Credit Deal
              <span style={{
                fontFamily: ff, fontSize: '10px', fontWeight: 600,
                background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)',
                borderRadius: '99px', padding: '2px 8px', color: GREEN, letterSpacing: '0.04em',
              }}>
                Recommended
              </span>
            </div>
          </div>

          {/* Data rows */}
          {COMP_ROWS.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                borderBottom: i < COMP_ROWS.length - 1 ? `1px solid #F4F4F5` : 'none',
              }}
              className="wus-comp-grid"
            >
              {/* Others */}
              <div style={{
                padding: '18px 28px', fontFamily: ff, fontSize: '14px', color: MUTED,
                borderRight: `1px solid ${BORDER}`,
                textDecoration: 'line-through',
                textDecorationColor: 'rgba(239,68,68,0.4)',
                display: 'flex', alignItems: 'center', gap: '10px', lineHeight: 1.4,
              }}>
                <XMark />
                {row.others}
              </div>

              {/* Feature */}
              <div style={{
                padding: '18px 28px', fontFamily: ff, fontSize: '12px', fontWeight: 500,
                color: MUTED, textAlign: 'center', borderRight: `1px solid ${BORDER}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}
                className="wus-feature-col"
              >
                {row.feature}
              </div>

              {/* FCD */}
              <div style={{
                padding: '18px 28px',
                fontFamily: ff, fontWeight: 600,
                fontSize: row.fcdGreen ? '15px' : '14px',
                color: row.fcdGreen ? GREEN : INK,
                background: 'rgba(16,185,129,0.04)',
                display: 'flex',
                flexDirection: row.bankPills ? 'column' : 'row',
                alignItems: row.bankPills ? 'flex-start' : 'center',
                gap: '10px',
                lineHeight: 1.4,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckMark />
                  <span>{row.fcd}</span>
                </div>
                {row.bankPills && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    {BANK_PILLS.map(p => (
                      <div key={p.name} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '5px',
                        background: '#F4F4F5', border: `1px solid ${BORDER}`,
                        borderRadius: '99px', padding: '3px 10px 3px 6px',
                        fontFamily: ff, fontSize: '11px', fontWeight: 600, color: BODY,
                      }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                        {p.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── BOTTOM: TEXT + FLOATING VISUAL ─────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: '60px',
          alignItems: 'center',
          marginTop: '80px',
        }}>
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 style={{
              fontFamily: ff, fontSize: 'clamp(24px, 3vw, 32px)',
              fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em',
              color: INK, marginBottom: '16px',
            }}>
              Stop overpaying.<br />
              <em style={{ fontStyle: 'normal', color: GREEN }}>Start reclaiming</em> your salary.
            </h3>
            <p style={{
              fontFamily: ff, fontSize: '15px', color: BODY,
              lineHeight: 1.7, marginBottom: '28px', maxWidth: '500px',
            }}>
              If you&apos;re a salaried professional spending more than ₹40,000/month on EMIs across multiple loans, we can show you — in 60 seconds, for free — exactly how much you&apos;re overpaying and what your new EMI could look like.
            </p>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a
                href="#calculator"
                style={{
                  background: '#FAFAFA', color: INK,
                  border: `1px solid ${BORDER}`,
                  borderRadius: '8px', padding: '14px 28px',
                  fontFamily: ff, fontSize: '15px', fontWeight: 700,
                  cursor: 'pointer', textDecoration: 'none',
                  transition: 'background 0.2s',
                  display: 'inline-block',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#E4E4E7' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#FAFAFA' }}
              >
                Calculate my savings →
              </a>
              <a
                href="https://wa.me/918383810454"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#25D366', color: 'white',
                  borderRadius: '8px', padding: '14px 24px',
                  fontFamily: ff, fontSize: '15px', fontWeight: 700,
                  cursor: 'pointer', textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#22c55e' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#25D366' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Areeb
              </a>
            </div>
          </motion.div>

          {/* 3D Floating visual */}
          <div className="wus-float-visual" style={{ position: 'relative', height: '420px' }}>

            {/* Card 1: Speed comparison */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [-3, -1.5, -3] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', top: 0, right: 0,
                width: '240px',
                background: '#FFFFFF', border: `1px solid ${BORDER}`,
                borderRadius: '16px', overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <div className="wus-shimmer-div" />
              <div style={{ padding: '20px' }}>
                <div style={{ fontFamily: ff, fontSize: '10px', fontWeight: 600, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
                  Disbursal speed
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{ fontFamily: ff, fontSize: '40px', fontWeight: 900, color: GREEN, letterSpacing: '-0.03em', lineHeight: 1 }}
                >
                  21<span style={{ fontSize: '20px', fontWeight: 500, color: MUTED }}>d avg</span>
                </motion.div>
                <div style={{ fontFamily: ff, fontSize: '12px', color: MUTED, marginTop: '4px' }}>
                  vs 7–15 days industry standard
                </div>
                <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { label: 'FCD', color: GREEN, pct: '35%', val: '21d', labelColor: GREEN },
                    { label: 'Others', color: RED, pct: '90%', val: '60d+', labelColor: MUTED },
                  ].map((bar, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
                      <span style={{ fontFamily: ff, color: bar.labelColor, width: '50px', flexShrink: 0 }}>{bar.label}</span>
                      <div style={{ flex: 1, height: '4px', background: '#F4F4F5', borderRadius: '99px', overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: bar.pct }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 + i * 0.2 }}
                          style={{ height: '100%', background: bar.color, borderRadius: '99px' }}
                        />
                      </div>
                      <span style={{ fontFamily: ff, color: BODY, fontWeight: 600, fontSize: '10px' }}>{bar.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 2: Bank match */}
            <motion.div
              animate={{ y: [0, -14, 0], rotate: [4, 2.5, 4] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              style={{
                position: 'absolute', top: '130px', left: 0,
                width: '220px',
                background: '#FFFFFF', border: `1px solid ${BORDER}`,
                borderRadius: '16px', overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <div className="wus-shimmer-div" />
              <div style={{ padding: '18px' }}>
                <div style={{ fontFamily: ff, fontSize: '10px', fontWeight: 600, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
                  Matched lenders for your profile
                </div>
                {[
                  { color: '#004C8F', name: 'HDFC Bank',       badge: 'Pre-approved ✓', badgeBg: 'rgba(16,185,129,0.15)', badgeColor: GREEN },
                  { color: '#00843D', name: 'IDFC First',       badge: 'Best match ★',   badgeBg: 'rgba(79,70,229,0.2)',   badgeColor: '#818CF8' },
                  { color: '#22409A', name: 'Kotak Mahindra',   badge: 'Pre-approved ✓', badgeBg: 'rgba(16,185,129,0.15)', badgeColor: GREEN },
                ].map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.12, duration: 0.35 }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: i < 2 ? `1px solid #F4F4F5` : 'none',
                      fontSize: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px', color: BODY, fontFamily: ff, fontWeight: 600 }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: b.color }} />
                      {b.name}
                    </div>
                    <span style={{
                      fontFamily: ff, fontSize: '9px', fontWeight: 700,
                      borderRadius: '99px', padding: '2px 7px',
                      background: b.badgeBg, color: b.badgeColor,
                    }}>
                      {b.badge}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Card 3: Monthly saving */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              style={{
                position: 'absolute', bottom: '20px', right: '20px',
                width: '200px',
                background: '#FFFFFF', border: `1px solid ${BORDER}`,
                borderRadius: '16px', overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <div className="wus-shimmer-div" />
              <div style={{ padding: '18px' }}>
                <div style={{ fontFamily: ff, fontSize: '10px', fontWeight: 600, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                  Monthly saving
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                  style={{ fontFamily: ff, fontSize: '32px', fontWeight: 900, color: GREEN, letterSpacing: '-0.02em' }}
                >
                  ₹33,000
                </motion.div>
                <div style={{ fontFamily: ff, fontSize: '11px', color: MUTED, marginTop: '2px' }}>
                  per month, every month
                </div>
                <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <motion.div
                    animate={{ opacity: [1, 0.5, 1], scale: [1, 0.8, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ width: '6px', height: '6px', borderRadius: '50%', background: GREEN }}
                  />
                  <span style={{ fontFamily: ff, fontSize: '10px', color: MUTED }}>Salaried · Delhi NCR</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  )
}
