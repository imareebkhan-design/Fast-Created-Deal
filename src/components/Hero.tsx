'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const HEADLINE = 'Stop overpaying your EMIs.'

const fade = (delay: number, y = 10) => ({
  hidden: { opacity: 0, y, scale: 1 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { delay: delay / 1000, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
})

const scaleIn = (delay: number) => ({
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1, scale: 1,
    transition: { delay: delay / 1000, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
})

function charDelay(char: string): number {
  const base = 95 + Math.random() * 55
  if (char === ',' || char === ';') return base + 120
  if (char === '.' || char === '!' || char === '?') return base + 180
  if (char === ' ') return base - 20
  return base
}

function playClick() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(820, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(480, ctx.currentTime + 0.04)
    gain.gain.setValueAtTime(0.06, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.05)
  } catch {
    // silent fallback
  }
}

function TypewriterH1({ text, startDelay = 300 }: { text: string; startDelay?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(timer)
  }, [startDelay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) return
    const next = text[displayed.length]
    const delay = charDelay(next)
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
      playClick()
    }, delay)
    return () => clearTimeout(t)
  }, [started, displayed, text])

  return (
    <h1
      style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        lineHeight: 1.06,
        color: '#09090B',
        letterSpacing: '-0.04em',
        margin: '0 auto 24px',
        minHeight: '1.1em',
      }}
      className="text-[40px] sm:text-[58px] max-w-[660px]"
    >
      {displayed}
      {displayed.length < text.length && (
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: '2px',
            height: '0.85em',
            background: '#09090B',
            marginLeft: '2px',
            verticalAlign: 'text-bottom',
            animation: 'cursor-blink 0.8s step-end infinite',
          }}
        />
      )}
    </h1>
  )
}

// ── Background decoration components ────────────────────────────────────────

function CreditCard({
  side,
  bankName,
  last4,
  gradientFrom,
  gradientTo,
  floatClass,
  shimmerClass,
}: {
  side: 'left' | 'right'
  bankName: string
  last4: string
  gradientFrom: string
  gradientTo: string
  floatClass: string
  shimmerClass: string
}) {
  return (
    <div
      className={`floating-card ${floatClass}`}
      style={{
        position: 'absolute',
        [side]: '2%',
        top: '15%',
        width: '200px',
        height: '126px',
        borderRadius: '14px',
        background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.14), 0 24px 64px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <div style={{ padding: '16px', height: '100%', boxSizing: 'border-box', position: 'relative' }}>
        <div style={{ width: '28px', height: '20px', borderRadius: '3px', background: 'rgba(255,180,0,0.9)', marginBottom: '10px' }} />
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', marginBottom: '6px' }}>
          {bankName}
        </div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.14em' }}>
          •••• •••• •••• {last4}
        </div>
        {side === 'left' && (
          <div style={{ position: 'absolute', right: '14px', bottom: '14px', display: 'flex' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,80,0,0.85)' }} />
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,160,0,0.75)', marginLeft: '-8px' }} />
          </div>
        )}
      </div>
      <div
        className={shimmerClass}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
        }}
      />
    </div>
  )
}

const PILLS = [
  { label: 'SBI',      color: '#004C8F', side: 'left'  as const, top: '52%' },
  { label: 'Axis Bank',color: '#E31837', side: 'right' as const, top: '38%' },
  { label: 'Bajaj',   color: '#FF6600', side: 'left'  as const, top: '70%' },
  { label: 'Kotak',   color: '#00B4D8', side: 'right' as const, top: '65%' },
]

const PILL_FLOATS = ['float-e', 'float-a', 'float-b', 'float-c']

// ── Main component ────────────────────────────────────────────────────────────

export default function Hero() {
  const scrollToCalc = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('emi-calculator')?.scrollIntoView({ behavior: 'smooth' })
  }

  const postDelay = HEADLINE.length * 120 + 300

  return (
    <section
      id="hero"
      style={{
        backgroundColor: '#FFFFFF',
        paddingTop: 'clamp(64px, 10vw, 120px)',
        paddingBottom: 'clamp(48px, 6vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 'clamp(600px, 85vh, 820px)',
      }}
    >

      {/* ── Background decoration layer ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>

        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, #E4E4E7 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.6,
        }} />

        {/* Indigo glow blob — top-left */}
        <div style={{
          position: 'absolute',
          width: '400px', height: '400px',
          borderRadius: '50%',
          background: 'rgba(79,70,229,0.06)',
          top: '-100px', left: '-100px',
          filter: 'blur(80px)',
        }} />

        {/* Emerald glow blob — bottom-right */}
        <div style={{
          position: 'absolute',
          width: '300px', height: '300px',
          borderRadius: '50%',
          background: 'rgba(5,150,105,0.05)',
          bottom: '-60px', right: '-40px',
          filter: 'blur(60px)',
        }} />

        {/* Credit cards — hidden below 1024px via .floating-card CSS class */}
        <CreditCard
          side="left"
          bankName="HDFC BANK"
          last4="4821"
          gradientFrom="#1a1a2e"
          gradientTo="#0f3460"
          floatClass="float-a"
          shimmerClass="card-shimmer"
        />
        <CreditCard
          side="right"
          bankName="ICICI BANK"
          last4="7364"
          gradientFrom="#1e3a5f"
          gradientTo="#1565c0"
          floatClass="float-b"
          shimmerClass="card-shimmer-b"
        />

        {/* EMI saving card — bottom-left */}
        <div
          className="emi-card float-c"
          style={{
            position: 'absolute',
            left: '2%',
            bottom: '10%',
            width: '180px',
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E4E4E7',
            padding: '14px 16px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            boxSizing: 'border-box',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Monthly saving</p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '22px', fontWeight: 700, color: '#059669', letterSpacing: '-0.03em', marginBottom: '2px' }}>₹33,000</p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#A1A1AA', marginBottom: '8px' }}>after consolidation</p>
          <div style={{ height: '3px', borderRadius: '99px', background: '#E4E4E7' }}>
            <div style={{ width: '72%', height: '100%', borderRadius: '99px', background: '#059669' }} />
          </div>
        </div>

        {/* Loan count card — bottom-right */}
        <div
          className="loan-card float-d"
          style={{
            position: 'absolute',
            right: '2%',
            bottom: '12%',
            width: '164px',
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E4E4E7',
            padding: '12px 14px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            boxSizing: 'border-box',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Active loans</p>
          <div style={{ display: 'flex', gap: '5px', marginBottom: '6px' }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#FEF2F2', border: '1px solid #FECACA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '12px', height: '8px', borderRadius: '2px', background: '#DC2626' }} />
              </div>
            ))}
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#ECFDF5', border: '1px solid #A7F3D0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#059669' }} />
            </div>
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 600, color: '#059669' }}>Merged into 1</p>
        </div>

        {/* Bank pills */}
        {PILLS.map((pill, i) => (
          <div
            key={pill.label}
            className={`bank-pill ${PILL_FLOATS[i]}`}
            style={{
              position: 'absolute',
              [pill.side]: '2%',
              top: pill.top,
              background: '#FFFFFF',
              borderRadius: '99px',
              border: '1px solid #E4E4E7',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 600,
              color: '#27272A',
              whiteSpace: 'nowrap',
              zIndex: 1,
            }}
          >
            <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: pill.color, flexShrink: 0 }} />
            {pill.label}
          </div>
        ))}

      </div>

      {/* ── Text content — always on top ── */}
      <div style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '0 24px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
      }}>

        {/* 1 — Overline */}
        <motion.p
          variants={fade(100, 8)} initial="hidden" animate="show"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            fontWeight: 600,
            color: '#4F46E5',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '20px',
          }}
        >
          For salaried professionals in Delhi NCR, Mumbai &amp; Bangalore
        </motion.p>

        {/* 2 — H1 typewriter */}
        <TypewriterH1 text={HEADLINE} startDelay={300} />

        {/* 3 — Sub-headline */}
        <motion.p
          variants={fade(postDelay)} initial="hidden" animate="show"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '20px',
            fontWeight: 400,
            color: '#52525B',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto 36px',
          }}
        >
          Find out how much you can save — most of our clients save ₹28,000–₹40,000 every month. No documents, no credit check, no commitment.
        </motion.p>

        {/* 4 — Primary CTA */}
        <motion.div
          variants={scaleIn(postDelay + 150)} initial="hidden" animate="show"
          style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}
        >
          <motion.button
            onClick={scrollToCalc}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-[520px]"
            style={{
              height: '56px',
              background: '#09090B',
              color: '#FFFFFF',
              fontFamily: 'var(--font-sans)',
              fontSize: '18px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#27272A')}
            onMouseLeave={e => (e.currentTarget.style.background = '#09090B')}
          >
            Calculate My Savings →
          </motion.button>
        </motion.div>

        {/* 5 — Trust strip */}
        <motion.p
          variants={fade(postDelay + 300)} initial="hidden" animate="show"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: '#A1A1AA',
            marginBottom: '16px',
            lineHeight: 1.6,
            marginTop: '20px',
          }}
        >
          ✓ No CIBIL impact&nbsp;&nbsp;·&nbsp;&nbsp;✓ No documents at this stage&nbsp;&nbsp;·&nbsp;&nbsp;✓ Takes 60 seconds
        </motion.p>

        {/* 6 — Social proof */}
        <motion.p
          variants={fade(postDelay + 400)} initial="hidden" animate="show"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '16px',
            color: '#52525B',
          }}
        >
          ★★★★★&nbsp; Trusted by 500+ salaried professionals
        </motion.p>

        {/* 7 — Scroll indicator */}
        <motion.a
          href="#emi-calculator"
          onClick={scrollToCalc}
          variants={fade(postDelay + 600)} initial="hidden" animate="show"
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            marginTop: '40px',
            textDecoration: 'none',
          }}
        >
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#A1A1AA', letterSpacing: '0.01em' }}>
            See how much you can save
          </span>
          <span className="scroll-bounce" style={{ display: 'flex', alignItems: 'center', color: '#A1A1AA' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </motion.a>

      </div>
    </section>
  )
}
