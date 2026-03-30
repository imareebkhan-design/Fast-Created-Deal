'use client'

import { motion } from 'framer-motion'

const pains = [
  {
    num: '01',
    title: 'Multiple EMIs bleeding you dry',
    body: '3–5 different EMIs. Different banks. Different due dates. One missed payment — your CIBIL takes a hit you didn\'t deserve.',
  },
  {
    num: '02',
    title: 'Paying 2× more interest than you should',
    body: 'Personal loans at 18–24%. Credit card rollovers at 36–42%. You\'re not spending more — you\'re being overcharged.',
  },
  {
    num: '03',
    title: 'Nobody is in your corner',
    body: 'Banks won\'t restructure their own loans. It costs them income. You\'re managing it alone with no clear path out.',
  },
]

export default function PainPoints() {
  return (
    <section id="pain" style={{ backgroundColor: '#FAFAFA', padding: '96px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '56px' }}
          className="lg:grid-cols-[360px_1fr]"
        >
          {/* Left — header */}
          <div>
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
                marginBottom: '16px',
              }}
            >
              The Problem
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(28px, 3vw, 36px)',
                fontWeight: 600,
                color: '#09090B',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                marginBottom: '20px',
              }}
            >
              Your salary hits.<br />
              It&apos;s gone before<br />
              you breathe.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                color: '#52525B',
                lineHeight: 1.75,
                maxWidth: '320px',
                fontStyle: 'italic',
              }}
            >
              &ldquo;You&apos;re not bad with money. You were sold the wrong loans at the wrong rates. That&apos;s fixable.&rdquo;
            </motion.p>
          </div>

          {/* Right — pains list */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {pains.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'flex-start',
                  padding: '28px 0',
                  borderBottom: i < pains.length - 1 ? '1px solid #E4E4E7' : 'none',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#E4E4E7',
                  letterSpacing: '-0.02em',
                  flexShrink: 0,
                  paddingTop: '2px',
                }}>
                  {p.num}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#09090B',
                    marginBottom: '8px',
                    lineHeight: 1.35,
                  }}>
                    {p.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    color: '#52525B',
                    lineHeight: 1.7,
                  }}>
                    {p.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
