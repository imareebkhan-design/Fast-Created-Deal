'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const ff = 'var(--font-sans)'

// ── shared IntersectionObserver hook ────────────────────────────────
function useVisible(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); io.disconnect() } },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, v] as const
}

// ── count-from helper ────────────────────────────────────────────────
function useCountFrom(from: number, to: number, active: boolean, duration: number, delay = 0) {
  const [count, setCount] = useState(from)
  useEffect(() => {
    if (!active) return
    let rafId: number
    const t = setTimeout(() => {
      let start: number | null = null
      const step = (ts: number) => {
        if (!start) start = ts
        const p = Math.min((ts - start) / duration, 1)
        const e = 1 - Math.pow(1 - p, 3)
        setCount(Math.round(from + (to - from) * e))
        if (p < 1) rafId = requestAnimationFrame(step)
        else setCount(to)
      }
      rafId = requestAnimationFrame(step)
    }, delay)
    return () => { clearTimeout(t); cancelAnimationFrame(rafId) }
  }, [active, from, to, duration, delay])
  return count
}

function fmt(n: number) { return '₹' + n.toLocaleString('en-IN') }

// ── Step 01 mockup ────────────────────────────────────────────────────
function Step01Mockup() {
  const [ref, v] = useVisible(0.2)
  const fields = [
    { label: 'Monthly salary',       value: '₹1,20,000' },
    { label: 'Total EMI per month',  value: '₹97,000'   },
    { label: 'Number of loans',      value: '4 loans'   },
  ]
  return (
    <div ref={ref} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {fields.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={v ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ delay: i * 0.15 + 0.1, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ fontFamily: ff, fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px', letterSpacing: '0.04em' }}>
            {f.label}
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px', padding: '10px 14px',
            fontFamily: ff, fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.85)',
          }}>
            {f.value}
          </div>
        </motion.div>
      ))}
      <motion.button
        initial={{ opacity: 0 }}
        animate={v ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        style={{
          marginTop: '4px', alignSelf: 'flex-start',
          background: '#4F46E5', border: 'none', borderRadius: '8px',
          padding: '10px 18px', fontFamily: ff, fontSize: '13px',
          fontWeight: 600, color: '#FFFFFF', cursor: 'pointer',
          letterSpacing: '-0.01em',
        }}
      >
        Calculate →
      </motion.button>
    </div>
  )
}

// ── Step 02 mockup ────────────────────────────────────────────────────
function Step02Mockup() {
  const [ref, v] = useVisible(0.2)
  return (
    <div ref={ref} style={{ marginTop: '24px' }}>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={v ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ delay: 0.15, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'rgba(5,150,105,0.15)', border: '1px solid rgba(5,150,105,0.25)',
          borderRadius: '14px', padding: '14px 16px',
        }}
      >
        {/* WA header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11.9 2.1A6.86 6.86 0 0 0 7 0 6.93 6.93 0 0 0 .6 10.4L0 14l3.7-.97A6.93 6.93 0 0 0 7 14a6.93 6.93 0 0 0 6.93-6.93c0-1.85-.72-3.59-2.03-4.97ZM7 12.83a5.75 5.75 0 0 1-2.93-.8l-.21-.13-2.2.58.59-2.14-.14-.22A5.76 5.76 0 1 1 7 12.83Zm3.16-4.32c-.17-.09-.99-.49-1.14-.55-.16-.05-.27-.08-.38.09-.12.17-.45.55-.55.66-.1.12-.2.13-.37.05-.18-.09-.74-.27-1.41-.87a5.3 5.3 0 0 1-.97-1.21c-.1-.18 0-.27.08-.36l.25-.29c.08-.1.1-.17.16-.28.05-.12.02-.22-.02-.31-.04-.09-.38-.91-.52-1.24-.14-.33-.28-.28-.38-.29h-.32c-.11 0-.3.04-.46.22-.16.17-.6.59-.6 1.43s.62 1.66.7 1.77c.09.12 1.22 1.86 2.95 2.61.41.18.73.28.98.36.41.13.79.11 1.08.07.33-.05.99-.4 1.13-.8.14-.39.14-.72.1-.79-.04-.07-.15-.11-.33-.2Z" fill="white"/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: ff, fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.9)', lineHeight: 1.2 }}>Fast Credit Deal</div>
            <div style={{ fontFamily: ff, fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>now</div>
          </div>
        </div>
        {/* Message */}
        <div style={{ fontFamily: ff, fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.65 }}>
          Hi Rahul 👋 Your analysis is ready.<br />
          Current EMI: <span style={{ fontWeight: 600 }}>₹97,000/mo</span><br />
          After consolidation: <span style={{ fontWeight: 600, color: '#34D399' }}>₹64,000/mo</span><br />
          You save: <span style={{ fontWeight: 700, color: '#34D399' }}>₹33,000 every month</span><br />
          Ready to proceed? Reply <span style={{ fontWeight: 700 }}>YES</span>
        </div>
        {/* Delivered */}
        <div style={{ textAlign: 'right', marginTop: '8px', fontFamily: ff, fontSize: '11px', fontWeight: 600, color: '#34D399' }}>
          Delivered ✓✓
        </div>
      </motion.div>
    </div>
  )
}

// ── Step 03 mockup ────────────────────────────────────────────────────
function Step03Mockup() {
  const [ref, v] = useVisible(0.2)
  const banks = [
    { color: '#004C8F', name: 'HDFC',       badge: 'Pre-approved ✓', badgeColor: '#059669', badgeBg: 'rgba(5,150,105,0.15)', badgeBorder: 'rgba(5,150,105,0.3)', rate: '10.5% p.a.' },
    { color: '#ED1C24', name: 'Kotak',      badge: 'Pre-approved ✓', badgeColor: '#059669', badgeBg: 'rgba(5,150,105,0.15)', badgeBorder: 'rgba(5,150,105,0.3)', rate: '11.2% p.a.' },
    { color: '#00A7B5', name: 'IDFC First', badge: 'Best match ★',   badgeColor: '#818CF8', badgeBg: 'rgba(79,70,229,0.18)', badgeBorder: 'rgba(79,70,229,0.35)', rate: '10.1% p.a.' },
  ]
  return (
    <div ref={ref} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {banks.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={v ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ delay: i * 0.12 + 0.1, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '8px', padding: '10px 12px',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}
        >
          <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: b.color, flexShrink: 0 }} />
          <span style={{ fontFamily: ff, fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', flex: 1 }}>
            {b.name}
          </span>
          <span style={{
            fontFamily: ff, fontSize: '10px', fontWeight: 700,
            color: b.badgeColor, background: b.badgeBg, border: `1px solid ${b.badgeBorder}`,
            borderRadius: '6px', padding: '2px 8px', whiteSpace: 'nowrap',
          }}>
            {b.badge}
          </span>
          <span style={{ fontFamily: ff, fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>
            {b.rate}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

// ── Step 04 mockup ────────────────────────────────────────────────────
function Step04Mockup() {
  const [ref, v] = useVisible(0.2)
  const afterCount = useCountFrom(97000, 64000, v, 800, 700)

  return (
    <div ref={ref} style={{ marginTop: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

        {/* Before */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontFamily: ff, fontSize: '10px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Before</div>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{ fontFamily: ff, fontSize: '26px', fontWeight: 800, color: '#EF4444', letterSpacing: '-0.03em', lineHeight: 1 }}>
              ₹97,000
            </div>
            {/* Strikethrough */}
            <motion.div
              initial={{ width: 0 }}
              animate={v ? { width: '100%' } : { width: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
              style={{
                position: 'absolute', left: 0, top: '50%',
                height: '2px', background: '#EF4444', borderRadius: '1px',
              }}
            />
          </div>
          <div style={{ fontFamily: ff, fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>/month</div>
        </div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={v ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ delay: 0.5, duration: 0.3, type: 'spring', stiffness: 400, damping: 20 }}
          style={{ flexShrink: 0 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>

        {/* After */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontFamily: ff, fontSize: '10px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>After</div>
          <div style={{ fontFamily: ff, fontSize: '26px', fontWeight: 800, color: '#059669', letterSpacing: '-0.03em', lineHeight: 1 }}>
            {fmt(afterCount)}
          </div>
          <div style={{ fontFamily: ff, fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>/month</div>
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={v ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
            transition={{ delay: 1.2, duration: 0.35 }}
            style={{
              display: 'inline-block', marginTop: '8px',
              fontFamily: ff, fontSize: '11px', fontWeight: 700,
              color: '#34D399', background: 'rgba(5,150,105,0.15)',
              border: '1px solid rgba(5,150,105,0.3)',
              borderRadius: '99px', padding: '3px 10px',
            }}
          >
            Save ₹33,000
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────
const steps = [
  {
    num: '01',
    title: 'Tell us your situation',
    body: 'Fill the form in 60 seconds. Salary, total EMI, number of loans. That\'s all we need.',
    time: '60 sec',
    mockup: <Step01Mockup />,
  },
  {
    num: '02',
    title: 'We analyse your profile',
    body: 'Within 2 hours, our expert sends a clear breakdown on WhatsApp — exactly how much you can save.',
    time: '2 hrs',
    mockup: <Step02Mockup />,
  },
  {
    num: '03',
    title: 'We find the right lender',
    body: '13 years + 40 banks = we know where you\'ll be approved before we apply. Zero rejected applications.',
    time: 'Same day',
    mockup: <Step03Mockup />,
  },
  {
    num: '04',
    title: 'You save. Every month.',
    body: 'Bank disbursals in 48 hours. NBFC same day. Your new, lower EMI starts from Month 1.',
    time: '48 hrs',
    mockup: <Step04Mockup />,
  },
]

export default function HowItWorks() {
  return (
    <section id="process" style={{ backgroundColor: '#18181B', padding: '96px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              display: 'block', fontFamily: ff, fontSize: '11px', fontWeight: 600,
              color: '#4F46E5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px',
            }}
          >
            The Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: ff, fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 600,
              color: '#FFFFFF', lineHeight: 1.15, letterSpacing: '-0.03em',
            }}
          >
            Four steps.<br />Lower EMI in 4 days.
          </motion.h2>
        </div>

        {/* 2×2 grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden' }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: '#18181B',
                padding: '36px 32px 28px',
                minHeight: '320px',
                display: 'flex',
                flexDirection: 'column',
                borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              {/* Top row: step number + time badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                <span style={{
                  fontFamily: ff, fontSize: '56px', fontWeight: 700,
                  color: 'rgba(255,255,255,0.25)', lineHeight: 1, letterSpacing: '-0.04em',
                }}>
                  {step.num}
                </span>
                <span style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '6px', padding: '6px 14px',
                  fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.75)',
                  letterSpacing: '0.01em', fontFamily: ff,
                }}>
                  {step.time}
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: ff, fontSize: '16px', fontWeight: 600,
                color: '#FFFFFF', marginBottom: '10px', lineHeight: 1.35,
              }}>
                {step.title}
              </h3>

              {/* Body */}
              <p style={{
                fontFamily: ff, fontSize: '14px',
                color: 'rgba(255,255,255,0.45)', lineHeight: 1.75,
              }}>
                {step.body}
              </p>

              {/* Mockup */}
              {step.mockup}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
