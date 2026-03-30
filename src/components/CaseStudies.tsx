'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const cases = [
  {
    name: 'Rajan S.',
    role: 'Senior Software Engineer',
    city: 'Bengaluru',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    before: 112000,
    after: 68500,
    saving: 43500,
    loans: 5,
    note: 'saving from Month 1',
    quote: "I had 5 loans and was spending ₹1.12L every month just on EMIs. FCD got it down to ₹68,500 in under a month. I didn't believe it until I saw my bank statement.",
  },
  {
    name: 'Meera K.',
    role: 'Senior Manager, Govt. of India',
    city: 'New Delhi',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    before: 78000,
    after: 47200,
    saving: 30800,
    loans: 3,
    note: 'closed in 37 days',
    quote: "As a government employee I was worried about eligibility. They found an NBFC the same day. My EMI dropped by ₹30,800 — that's basically my food and travel budget recovered.",
  },
  {
    name: 'Vikram P.',
    role: 'Branch Manager, HDFC Bank',
    city: 'Mumbai',
    avatar: 'https://randomuser.me/api/portraits/men/57.jpg',
    before: 95000,
    after: 61500,
    saving: 33500,
    loans: 4,
    note: 'same-day NBFC approval',
    quote: "Even working in a bank, I couldn't restructure my own loans. Fast Credit Deal did in 4 days what I couldn't do in 4 years. The WhatsApp process was completely transparent.",
  },
  {
    name: 'Priya M.',
    role: 'Senior Teacher, DPS',
    city: 'Pune',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    before: 52000,
    after: 34000,
    saving: 18000,
    loans: 3,
    note: '48-hr bank disbursal',
    quote: "I was managing 3 loans on a teacher's salary. Now I have ₹18,000 extra every month. I've started a SIP. Life has genuinely changed.",
  },
]

function fmt(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

function useCountFrom(from: number, to: number, active: boolean, duration: number, delay = 0) {
  const [count, setCount] = useState(from)
  useEffect(() => {
    if (!active) return
    let rafId: number
    const timer = setTimeout(() => {
      let start: number | null = null
      const step = (ts: number) => {
        if (!start) start = ts
        const progress = Math.min((ts - start) / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(from + (to - from) * ease))
        if (progress < 1) rafId = requestAnimationFrame(step)
        else setCount(to)
      }
      rafId = requestAnimationFrame(step)
    }, delay)
    return () => { clearTimeout(timer); cancelAnimationFrame(rafId) }
  }, [active, from, to, duration, delay])
  return count
}

function MapPin() {
  return (
    <svg
      width="11" height="11" viewBox="0 0 12 12" fill="none"
      style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '2px', flexShrink: 0, position: 'relative', top: '-1px' }}
    >
      <path d="M6 0.5C4.067 0.5 2.5 2.067 2.5 4C2.5 6.625 6 10.5 6 10.5s3.5-3.875 3.5-6.5C9.5 2.067 7.933 0.5 6 0.5Z" fill="#4F46E5"/>
      <circle cx="6" cy="4" r="1.3" fill="white"/>
    </svg>
  )
}

function CaseCard({ c, index, sectionActive }: { c: typeof cases[0]; index: number; sectionActive: boolean }) {
  const staggerDelaySec = index * 0.15
  const staggerDelayMs = index * 150

  // After: counts down from before → after over 800ms
  const afterCount = useCountFrom(c.before, c.after, sectionActive, 800, staggerDelayMs + 400)
  // Saving: counts up from 0 → saving over 600ms
  const savingCount = useCountFrom(0, c.saving, sectionActive, 600, staggerDelayMs + 500)

  const strikeDelaySec = staggerDelaySec + 0.3

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={sectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ delay: staggerDelaySec, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E4E4E7',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Person */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid #E4E4E7' }}>
          <Image src={c.avatar} alt={c.name} width={44} height={44} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, color: '#09090B', marginBottom: '1px' }}>{c.name}</p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#A1A1AA', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {c.role} · <MapPin />{c.city}
          </p>
        </div>
        <span style={{
          background: '#EEF2FF',
          borderRadius: '100px',
          padding: '3px 10px',
          fontSize: '11px',
          fontWeight: 600,
          color: '#4F46E5',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          fontFamily: 'var(--font-sans)',
        }}>
          {c.loans} loans
        </span>
      </div>

      {/* Quote */}
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '13px',
        color: '#52525B',
        lineHeight: 1.75,
        marginBottom: '20px',
        fontStyle: 'italic',
        flex: 1,
      }}>
        &ldquo;{c.quote}&rdquo;
      </p>

      {/* Before / After */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
        {/* Before — animated strikethrough */}
        <div style={{ background: '#FEF2F2', borderRadius: '8px', padding: '12px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Before</p>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 700, color: '#DC2626', letterSpacing: '-0.03em' }}>
              {fmt(c.before)}
            </p>
            {/* Strikethrough line that draws left → right */}
            <motion.div
              initial={{ width: 0 }}
              animate={sectionActive ? { width: '100%' } : { width: 0 }}
              transition={{ delay: strikeDelaySec, duration: 0.4, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: 0,
                top: '52%',
                height: '2px',
                background: '#DC2626',
                borderRadius: '1px',
              }}
            />
          </div>
        </div>

        {/* After — counts down */}
        <div style={{ background: '#ECFDF5', borderRadius: '8px', padding: '12px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>After</p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 700, color: '#059669', letterSpacing: '-0.03em' }}>
            {fmt(afterCount)}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: '#F4F4F5', borderRadius: '100px', height: '3px', marginBottom: '10px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={sectionActive ? { width: `${(c.after / c.before) * 100}%` } : { width: 0 }}
          transition={{ delay: staggerDelaySec + 0.4, duration: 1.1, ease: 'easeOut' }}
          style={{ background: '#059669', borderRadius: '100px', height: '100%' }}
        />
      </div>

      {/* Saving + note */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600, color: '#059669' }}>
          Saving {fmt(savingCount)}/mo
        </span>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#A1A1AA' }}>{c.note}</span>
      </div>

      {/* Verified badge */}
      <div>
        <span style={{
          display: 'inline-block',
          background: '#ECFDF5',
          color: '#059669',
          fontSize: '11px',
          fontWeight: 600,
          borderRadius: '99px',
          padding: '3px 10px',
          fontFamily: 'var(--font-sans)',
        }}>
          ✓ Verified disbursal
        </span>
      </div>
    </motion.div>
  )
}

export default function CaseStudies() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [sectionActive, setSectionActive] = useState(false)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setSectionActive(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="results" style={{ backgroundColor: '#F4F4F5', padding: '96px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px', marginBottom: '56px' }}
          className="lg:grid-cols-[320px_1fr]"
        >
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
                marginBottom: '14px',
              }}
            >
              Real Results
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
              People like you.<br />Real savings.<br />Real numbers.
            </motion.h2>
          </div>

          <div className="hidden lg:flex" style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ textAlign: 'right' }}
            >
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#A1A1AA', marginBottom: '4px' }}>
                All savings from actual disbursement records.
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#A1A1AA' }}>
                Names changed for privacy.
              </p>
            </motion.div>
          </div>
        </div>

        {/* 2×2 grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cases.map((c, i) => (
            <CaseCard key={i} c={c} index={i} sectionActive={sectionActive} />
          ))}
        </div>
      </div>
    </section>
  )
}
