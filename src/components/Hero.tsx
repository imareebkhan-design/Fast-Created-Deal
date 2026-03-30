'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const FONT    = "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif"
const GOLD    = '#e8960a'
const GOLD_DK = '#c47b00'
const HEADLINE = 'Your banks are charging you ₹40,000 more than they should. Every month.'
const GOLD_WORD = 'Every month.'

// ── Animation variants ───────────────────────────────────────────────────────

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

const floatIn = (delay: number) => ({
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1, y: 0,
    transition: { delay: delay / 1000, duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
})

// ── Typewriter ───────────────────────────────────────────────────────────────

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
    const osc  = ctx.createOscillator()
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
  } catch { /* silent fallback */ }
}

function TypewriterH1({ text, startDelay = 300, goldWord }: { text: string; startDelay?: number; goldWord?: string }) {
  const [displayed, setDisplayed] = useState('')
  const [started,   setStarted]   = useState(false)
  const done = displayed.length >= text.length

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(t)
  }, [startDelay])

  useEffect(() => {
    if (!started || done) return
    const next = text[displayed.length]
    const delay = charDelay(next)
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
      playClick()
    }, delay)
    return () => clearTimeout(t)
  }, [started, displayed, text, done])

  const renderContent = () => {
    if (!done || !goldWord) {
      return displayed
    }
    const idx = displayed.lastIndexOf(goldWord)
    if (idx === -1) return displayed
    return (
      <>
        {displayed.slice(0, idx)}
        <span style={{ color: GOLD }}>{goldWord}</span>
      </>
    )
  }

  return (
    <h1
      style={{
        fontFamily: FONT,
        fontWeight: 800,
        lineHeight: 1.06,
        color: '#111111',
        letterSpacing: '-0.04em',
        margin: '0 auto 20px',
        minHeight: '1.1em',
      }}
      className="text-[40px] sm:text-[58px] max-w-[660px]"
    >
      {renderContent()}
      {!done && (
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: '2px', height: '0.85em',
            background: '#111111',
            marginLeft: '2px',
            verticalAlign: 'text-bottom',
            animation: 'cursor-blink 0.8s step-end infinite',
          }}
        />
      )}
    </h1>
  )
}

// ── Floating decoration components ───────────────────────────────────────────

function CreditCard({
  side, bankName, last4, gradientFrom, gradientTo, floatClass, shimmerClass,
}: {
  side: 'left' | 'right'; bankName: string; last4: string
  gradientFrom: string; gradientTo: string; floatClass: string; shimmerClass: string
}) {
  return (
    <div
      className={`floating-card ${floatClass}`}
      style={{
        position: 'absolute', [side]: '2%', top: '15%',
        width: '200px', height: '126px', borderRadius: '14px',
        background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.14), 0 24px 64px rgba(0,0,0,0.08)',
        overflow: 'hidden', zIndex: 1, pointerEvents: 'none',
      }}
    >
      <div style={{ padding: '16px', height: '100%', boxSizing: 'border-box', position: 'relative' }}>
        <div style={{ width: '28px', height: '20px', borderRadius: '3px', background: 'rgba(255,180,0,0.9)', marginBottom: '10px' }} />
        <div style={{ fontFamily: FONT, fontSize: '9px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', marginBottom: '6px' }}>{bankName}</div>
        <div style={{ fontFamily: FONT, fontSize: '11px', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.14em' }}>•••• •••• •••• {last4}</div>
        {side === 'left' && (
          <div style={{ position: 'absolute', right: '14px', bottom: '14px', display: 'flex' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,80,0,0.85)' }} />
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,160,0,0.75)', marginLeft: '-8px' }} />
          </div>
        )}
      </div>
      <div className={shimmerClass} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)' }} />
    </div>
  )
}

const PILLS = [
  { label: 'SBI',       color: '#004C8F', side: 'left'  as const, top: '52%' },
  { label: 'Axis Bank', color: '#E31837', side: 'right' as const, top: '38%' },
  { label: 'Bajaj',     color: '#FF6600', side: 'left'  as const, top: '70%' },
  { label: 'Kotak',     color: '#00B4D8', side: 'right' as const, top: '65%' },
]
const PILL_FLOATS = ['float-e', 'float-a', 'float-b', 'float-c']

// Stagger offsets for entrance animations (ms)
const CARD_DELAYS  = [200, 300]           // left card, right card
const PILL_DELAYS  = [250, 350, 450, 550] // 4 pills
const BADGE_DELAYS = [400, 500]           // emi-card, loan-card

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
        position: 'relative', overflow: 'hidden',
        minHeight: 'clamp(600px, 85vh, 820px)',
      }}
    >
      {/* ── Background decoration layer ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>

        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, #E4E4E7 1px, transparent 1px)',
          backgroundSize: '32px 32px', opacity: 0.6,
        }} />

        {/* Indigo glow blob — top-left */}
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(79,70,229,0.06)', top: '-100px', left: '-100px', filter: 'blur(80px)' }} />

        {/* Emerald glow blob — bottom-right */}
        <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(5,150,105,0.05)', bottom: '-60px', right: '-40px', filter: 'blur(60px)' }} />

        {/* Credit card — left (with entrance animation) */}
        <motion.div variants={floatIn(CARD_DELAYS[0])} initial="hidden" animate="show">
          <CreditCard
            side="left" bankName="HDFC BANK" last4="4821"
            gradientFrom="#1a1a2e" gradientTo="#0f3460"
            floatClass="float-a" shimmerClass="card-shimmer"
          />
        </motion.div>

        {/* Credit card — right */}
        <motion.div variants={floatIn(CARD_DELAYS[1])} initial="hidden" animate="show">
          <CreditCard
            side="right" bankName="ICICI BANK" last4="7364"
            gradientFrom="#1e3a5f" gradientTo="#1565c0"
            floatClass="float-b" shimmerClass="card-shimmer-b"
          />
        </motion.div>

        {/* EMI saving card — bottom-left */}
        <motion.div variants={floatIn(BADGE_DELAYS[0])} initial="hidden" animate="show">
          <div
            className="emi-card float-c"
            style={{
              position: 'absolute', left: '2%', bottom: '10%',
              width: '180px', background: '#FFFFFF', borderRadius: '12px',
              border: '1px solid #E4E4E7', padding: '14px 16px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)', boxSizing: 'border-box', zIndex: 1,
            }}
          >
            <p style={{ fontFamily: FONT, fontSize: '10px', color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Monthly saving</p>
            <p style={{ fontFamily: FONT, fontSize: '22px', fontWeight: 700, color: '#059669', letterSpacing: '-0.03em', marginBottom: '2px' }}>₹33,000</p>
            <p style={{ fontFamily: FONT, fontSize: '11px', color: '#A1A1AA', marginBottom: '8px' }}>after consolidation</p>
            <div style={{ height: '3px', borderRadius: '99px', background: '#E4E4E7' }}>
              <div style={{ width: '72%', height: '100%', borderRadius: '99px', background: '#059669' }} />
            </div>
          </div>
        </motion.div>

        {/* Loan count card — bottom-right */}
        <motion.div variants={floatIn(BADGE_DELAYS[1])} initial="hidden" animate="show">
          <div
            className="loan-card float-d"
            style={{
              position: 'absolute', right: '2%', bottom: '12%',
              width: '164px', background: '#FFFFFF', borderRadius: '12px',
              border: '1px solid #E4E4E7', padding: '12px 14px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)', boxSizing: 'border-box', zIndex: 1,
            }}
          >
            <p style={{ fontFamily: FONT, fontSize: '10px', color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Active loans</p>
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
            <p style={{ fontFamily: FONT, fontSize: '10px', fontWeight: 600, color: '#059669' }}>Merged into 1</p>
          </div>
        </motion.div>

        {/* Bank pills — each with stagger entrance */}
        {PILLS.map((pill, i) => (
          <motion.div key={pill.label} variants={floatIn(PILL_DELAYS[i])} initial="hidden" animate="show">
            <div
              className={`bank-pill ${PILL_FLOATS[i]}`}
              style={{
                position: 'absolute', [pill.side]: '2%', top: pill.top,
                background: '#FFFFFF', borderRadius: '99px',
                border: '1px solid #E4E4E7', display: 'flex',
                alignItems: 'center', gap: '6px', padding: '6px 12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                fontFamily: FONT, fontSize: '11px', fontWeight: 600,
                color: '#27272A', whiteSpace: 'nowrap', zIndex: 1,
              }}
            >
              <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: pill.color, flexShrink: 0 }} />
              {pill.label}
            </div>
          </motion.div>
        ))}

      </div>

      {/* ── Text content ── */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 10 }}>

        {/* 1 — Badge */}
        <motion.div
          variants={fade(100, 8)} initial="hidden" animate="show"
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            background: 'rgba(232,150,10,0.10)',
            border: '1px solid rgba(232,150,10,0.25)',
            borderRadius: '100px',
            padding: '5px 14px',
            fontFamily: FONT,
            fontSize: '11px', fontWeight: 700,
            color: GOLD_DK,
            textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            <span
              className="hero-gold-dot"
              style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD, flexShrink: 0, display: 'inline-block' }}
            />
            For Salaried Professionals
          </span>
        </motion.div>

        {/* 2 — H1 typewriter (fontWeight 800, "EMIs." in gold) */}
        <TypewriterH1 text={HEADLINE} startDelay={300} goldWord={GOLD_WORD} />

        {/* 3 — Sub-headline ("₹28,000–₹40,000" bold + gold) */}
        <motion.p
          variants={fade(postDelay)} initial="hidden" animate="show"
          style={{
            fontFamily: FONT,
            fontSize: '18px', fontWeight: 400,
            color: '#52525B', lineHeight: 1.7,
            maxWidth: '540px', margin: '0 auto 24px',
          }}
        >
          We consolidate your loans and negotiate your rate down. Most clients save{' '}
          <span style={{ fontWeight: 700, color: GOLD }}>₹28,000–₹40,000</span>
          {' '}per month from Month 1.
        </motion.p>

        {/* 4a — Primary CTA */}
        <motion.div
          variants={scaleIn(postDelay + 150)} initial="hidden" animate="show"
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}
        >
          <motion.button
            onClick={scrollToCalc}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-[520px]"
            style={{
              height: '56px',
              background: '#111111', color: '#FFFFFF',
              fontFamily: FONT,
              fontSize: '18px', fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              borderBottom: `2px solid rgba(232,150,10,0.35)`,
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              transition: 'background 0.15s, box-shadow 0.2s, border-bottom-color 0.2s',
              position: 'relative', overflow: 'hidden',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#1a1a1a'
              e.currentTarget.style.borderBottomColor = 'rgba(232,150,10,0.75)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(232,150,10,0.18)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#111111'
              e.currentTarget.style.borderBottomColor = 'rgba(232,150,10,0.35)'
              e.currentTarget.style.boxShadow = ''
            }}
          >
            Check What I&apos;m Overpaying →
          </motion.button>
        </motion.div>

        {/* 4b — Secondary WhatsApp CTA */}
        <motion.div
          variants={fade(postDelay + 200)} initial="hidden" animate="show"
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}
        >
          <a
            href="https://wa.me/918383810454"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              fontFamily: FONT, fontSize: '14px', fontWeight: 600,
              color: GOLD, textDecoration: 'none',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#25D366', display: 'inline-block', flexShrink: 0 }} />
            Or chat on WhatsApp — 2 hr response
          </a>
        </motion.div>

        {/* 5 — Trust strip (gold ✓, tighter spacing, 13px) */}
        <motion.div
          variants={fade(postDelay + 300)} initial="hidden" animate="show"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '6px 0', marginBottom: '10px' }}
        >
          {[
            '13 years experience',
            '40+ bank partners',
            'Delhi NCR, Mumbai & Bangalore',
          ].map((item, i) => (
            <span key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: GOLD, fontWeight: 700, fontSize: '12px' }}>✓</span>
              <span style={{ fontFamily: FONT, fontSize: '13px', color: '#71717A' }}>{item}</span>
              {i < 2 && (
                <span style={{ color: '#D4D4D8', margin: '0 8px', fontSize: '13px' }}>·</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* 6 — Social proof (gold stars, bold "500+") */}
        <motion.p
          variants={fade(postDelay + 400)} initial="hidden" animate="show"
          style={{ fontFamily: FONT, fontSize: '14px', color: '#52525B', margin: 0 }}
        >
          <span style={{ color: GOLD, letterSpacing: '1px' }}>★★★★★</span>
          {' '}
          <span style={{ fontWeight: 700, fontSize: '15px', color: '#111111' }}>500+</span>
          {' '}clients · avg.{' '}
          <span style={{ fontWeight: 700, color: '#111111' }}>₹33,000</span>
          {' '}saved/month
        </motion.p>

        {/* 7 — Scroll indicator */}
        <motion.a
          href="#emi-calculator"
          onClick={scrollToCalc}
          variants={fade(postDelay + 600)} initial="hidden" animate="show"
          style={{
            display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
            gap: '6px', marginTop: '32px',
            textDecoration: 'none', opacity: 0.7,
          }}
          onMouseEnter={e => {
            const span = e.currentTarget.querySelector('.scroll-label') as HTMLElement
            if (span) span.style.borderBottom = `1px solid ${GOLD}`
          }}
          onMouseLeave={e => {
            const span = e.currentTarget.querySelector('.scroll-label') as HTMLElement
            if (span) span.style.borderBottom = '1px solid transparent'
          }}
        >
          <span
            className="scroll-label"
            style={{
              fontFamily: FONT, fontSize: '13px', color: '#888888',
              letterSpacing: '0.01em',
              borderBottom: '1px solid transparent',
              transition: 'border-color 0.2s',
            }}
          >
            See if you qualify
          </span>
          <span className="hero-chev-bounce" style={{ display: 'flex', alignItems: 'center', color: '#888888' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </motion.a>

      </div>
    </section>
  )
}
