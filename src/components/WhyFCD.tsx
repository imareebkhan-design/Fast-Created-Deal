'use client'

import { motion } from 'framer-motion'

const reasons = [
  {
    num: '01',
    title: 'We know approval odds before applying',
    body: '13 years + 40 banks = we know where to place you before we apply. Zero rejected applications. Your CIBIL stays protected.',
  },
  {
    num: '02',
    title: 'WhatsApp-first. You\'ll never chase us.',
    body: '2-hour guaranteed response. Every update on WhatsApp. No unsolicited calls. No ghosting.',
  },
  {
    num: '03',
    title: '48 hours bank. Same day NBFC.',
    body: 'Most DSAs take 7–15 days. Our bank relationships let us move faster than anyone else.',
  },
  {
    num: '04',
    title: 'We only take cases we can close.',
    body: 'Salaried EMI overload is our only specialty. If we take your case, we deliver.',
  },
]

const comparison = [
  ['Compare 40 banks yourself', 'We pick the right lender for you'],
  ['RM ghosts you after docs',  'WhatsApp updates every step'],
  ['Serve everyone',            'Salaried EMI cases only'],
  ['Generic advice',            '₹20K–₹50K back monthly'],
  ['7–15 days to disburse',     '48 hrs bank / same day NBFC'],
]

export default function WhyFCD() {
  return (
    <section id="why" style={{ backgroundColor: '#FAFAFA', padding: '96px 0', borderTop: '1px solid #E4E4E7' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'block',
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 600,
              color: '#4F46E5',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '14px',
            }}
          >
            Why Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(26px, 3vw, 36px)',
              fontWeight: 600,
              color: '#09090B',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
            }}
          >
            We don&apos;t work with everyone.<br />
            We work for you.
          </motion.h2>
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}
          className="lg:grid-cols-[1fr_420px]"
        >
          {/* LEFT — reasons */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {reasons.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start',
                  padding: '24px 0',
                  borderBottom: i < reasons.length - 1 ? '1px solid #E4E4E7' : 'none',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#E4E4E7',
                  flexShrink: 0,
                  paddingTop: '2px',
                  letterSpacing: '-0.02em',
                }}>
                  {r.num}
                </span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 600, color: '#09090B', marginBottom: '6px', lineHeight: 1.35 }}>{r.title}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#52525B', lineHeight: 1.7 }}>{r.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT — comparison table */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.55 }}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E4E4E7',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#F4F4F5', borderBottom: '1px solid #E4E4E7' }}>
              <div style={{ padding: '12px 18px', fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Others</div>
              <div style={{ padding: '12px 18px', fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, color: '#09090B', textTransform: 'uppercase', letterSpacing: '0.06em', borderLeft: '1px solid #E4E4E7' }}>Fast Credit Deal</div>
            </div>
            {comparison.map(([other, fcd], i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: i < comparison.length - 1 ? '1px solid #F4F4F5' : 'none' }}>
                <div style={{ padding: '12px 18px', fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#A1A1AA', lineHeight: 1.5 }}>{other}</div>
                <div style={{ padding: '12px 18px', fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500, color: '#09090B', borderLeft: '1px solid #F4F4F5', lineHeight: 1.5 }}>{fcd}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
