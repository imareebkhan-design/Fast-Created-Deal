'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Helpers ────────────────────────────────────────────────────────
function fmt(n: number) { return '₹' + n.toLocaleString('en-IN') }

function fmtAnnual(n: number) {
  return n >= 100000
    ? `₹${(n / 100000).toFixed(1)}L`
    : `₹${Math.round(n / 1000)}K`
}

function calcSavings(emi: number, loans: number) {
  const savingPct   = 0.22 + loans * 0.025
  const savingLow   = Math.round(emi * Math.max(0.18, savingPct - 0.05) / 500) * 500
  const savingHigh  = Math.round(emi * Math.min(0.45, savingPct + 0.07) / 500) * 500
  const savingMid   = Math.round((savingLow + savingHigh) / 2 / 500) * 500
  const newEmi      = emi - savingMid
  const annual      = savingMid * 12
  const annualStr   = fmtAnnual(annual)
  const rateDrop    = Math.round((savingMid / emi) * 100)
  const blendedRate = (18 + loans * 0.8).toFixed(1)
  return { savingLow, savingHigh, savingMid, newEmi, annual, annualStr, rateDrop, blendedRate }
}

const LOAN_TYPES    = ['Personal Loan', 'Credit Card', 'Home Loan', 'Consumer Loan', 'Car Loan', 'Education Loan']
const DEFAULT_ACTIVE = new Set(['Personal Loan', 'Credit Card', 'Consumer Loan'])

interface Particle { id: number; x: number; y: number; color: string }

const ff = 'var(--font-sans)'

// ─── Component ──────────────────────────────────────────────────────
export default function EMICalculator() {
  // Slider state
  const [emi, setEmi]           = useState(65000)
  const [loanCount, setLoanCount] = useState(4)
  const [activeLoanTypes, setActiveLoanTypes] = useState<Set<string>>(new Set(DEFAULT_ACTIVE))
  const [emiActive, setEmiActive] = useState(false)
  const emiTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Gate state
  const [showGate, setShowGate]   = useState(false)
  const [name,     setName]       = useState('')
  const [phone,    setPhone]      = useState('')
  const [consent,  setConsent]    = useState(false)
  const [shakeName,    setShakeName]    = useState(false)
  const [shakePhone,   setShakePhone]   = useState(false)
  const [shakeConsent, setShakeConsent] = useState(false)
  const [submitting,   setSubmitting]   = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [confetti,  setConfetti]  = useState<Particle[]>([])

  // ─── Calculations ──────────────────────────────────────────────
  const s = calcSavings(emi, loanCount)
  const emiPct      = ((emi - 15000) / (300000 - 15000)) * 100
  const loanPct     = ((loanCount - 2) / (10 - 2)) * 100
  const emiTrackBg  = `linear-gradient(90deg, #4F46E5 0%, #4F46E5 ${emiPct}%, #E4E4E7 ${emiPct}%, #E4E4E7 100%)`
  const loanTrackBg = `linear-gradient(90deg, #4F46E5 0%, #4F46E5 ${loanPct}%, #E4E4E7 ${loanPct}%, #E4E4E7 100%)`
  const newEmiColor = s.savingMid > 20000 ? '#34D399' : '#A5B4FC'
  const annualGateStr = s.annual >= 100000
    ? `₹${(s.annual / 100000).toFixed(1)}L saved this year`
    : `₹${Math.round(s.annual / 1000)}K saved this year`

  // ─── Handlers ──────────────────────────────────────────────────
  const handleEmiChange = (val: number) => {
    setEmi(val)
    setEmiActive(true)
    if (emiTimer.current) clearTimeout(emiTimer.current)
    emiTimer.current = setTimeout(() => setEmiActive(false), 800)
  }

  const toggleLoanType = (type: string) => {
    setActiveLoanTypes(prev => {
      const next = new Set(prev)
      if (next.has(type)) next.delete(type); else next.add(type)
      return next
    })
  }

  const fireConfetti = () => {
    const colors = ['#4F46E5', '#818CF8', '#34D399', '#6EE7B7', '#F59E0B']
    const particles: Particle[] = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      x: Math.random() * 220 - 110,
      y: -(40 + Math.random() * 180),
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setConfetti(particles)
    setTimeout(() => setConfetti([]), 1200)
  }

  const shake = (setter: (v: boolean) => void) => {
    setter(true)
    setTimeout(() => setter(false), 400)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let err = false
    if (!name.trim() || name.trim().length < 2) { shake(setShakeName);    err = true }
    if (!/^[6-9]\d{9}$/.test(phone))            { shake(setShakePhone);   err = true }
    if (!consent)                                 { shake(setShakeConsent); err = true }
    if (err) return
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 900))
    setSubmitting(false)
    fireConfetti()
    setSubmitSuccess(true)
    const w = window as unknown as { gtag?: (...args: unknown[]) => void }
    if (typeof w.gtag === 'function') w.gtag('event', 'lead_captured', { emi, loan_count: loanCount })
    setTimeout(() => {
      setShowGate(false)
      setSubmitSuccess(false)
    }, 2600)
  }

  // ─── Render ────────────────────────────────────────────────────
  return (
    <section
      id="emi-calculator"
      style={{
        background: '#FFFFFF',
        padding: 'clamp(60px, 7vw, 80px) clamp(24px, 6vw, 80px) clamp(80px, 9vw, 100px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, rgba(79,70,229,0.045) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      {/* Accent glow */}
      <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.055) 0%, transparent 65%)', top: '-200px', right: '-100px', pointerEvents: 'none' }} />
      {/* Green glow */}
      <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.04) 0%, transparent 65%)', bottom: '-100px', left: '-100px', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <span style={{ display: 'block', fontFamily: ff, fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#e8960a', marginBottom: '16px' }}>
          EMI Calculator
        </span>
        <h2 style={{ fontFamily: ff, fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.06, color: '#09090B', marginBottom: '8px' }}>
          Most people are shocked<br />by this number.
        </h2>
        <p style={{ fontFamily: ff, fontSize: '17px', color: '#52525B', marginBottom: '52px', maxWidth: '480px', lineHeight: 1.6 }}>
          Move the sliders to see what you&apos;re actually overpaying — and what you could keep.
        </p>

        {/* ── Calculator Card ── */}
        <div
          style={{
            position: 'relative',
            background: '#FFFFFF',
            border: '1px solid #E4E4E7',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0,0,0,0.03), 0 16px 40px rgba(0,0,0,0.07), 0 40px 80px rgba(0,0,0,0.05)',
          }}
        >
          {/* macOS top bar */}
          <div style={{ background: '#09090B', padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34D399' }} />
            <span style={{ fontFamily: ff, fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginLeft: '6px', letterSpacing: '0.02em' }}>
              EMI Savings Calculator
            </span>
            <span style={{ marginLeft: 'auto', fontFamily: ff, fontSize: '11px', fontWeight: 700, background: 'rgba(79,70,229,0.25)', color: '#A5B4FC', border: '1px solid rgba(79,70,229,0.35)', padding: '4px 12px', borderRadius: '99px', letterSpacing: '0.04em' }}>
              ⚡ Live estimate
            </span>
          </div>

          {/* Two-column body */}
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ── LEFT: Inputs ── */}
            <div
              style={{ padding: 'clamp(24px, 4vw, 36px) clamp(20px, 4vw, 36px) clamp(24px, 4vw, 36px) clamp(20px, 4vw, 40px)' }}
              className="border-b border-[#E4E4E7] lg:border-b-0 lg:border-r lg:border-[#E4E4E7]"
            >
              {/* Slider 1: Monthly EMI */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ fontFamily: ff, fontSize: '11px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#A1A1AA' }}>
                    Total monthly EMI
                  </span>
                  <span style={{ fontFamily: ff, fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: emiActive ? '#4F46E5' : '#09090B', transition: 'color 0.2s' }}>
                    {fmt(emi)}
                  </span>
                </div>
                <div style={{ padding: '8px 0', marginBottom: '10px' }}>
                  <input
                    type="range" className="calc-slider"
                    min={15000} max={300000} step={1000} value={emi}
                    onChange={e => handleEmiChange(Number(e.target.value))}
                    style={{ background: emiTrackBg }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: ff, fontSize: '11px', color: '#A1A1AA', fontWeight: 500 }}>
                  <span>₹15,000</span>
                  <span>₹3,00,000</span>
                </div>

                {/* Saving hint */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', padding: '10px 14px', background: 'linear-gradient(90deg, rgba(79,70,229,0.06) 0%, rgba(5,150,105,0.04) 100%)', border: '1px solid rgba(79,70,229,0.12)', borderRadius: '10px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '5px', background: '#4F46E5', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M5.5 1v4.5L8 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: ff, fontSize: '12px', fontWeight: 600, color: '#4F46E5' }}>
                    Save ~{fmt(s.savingLow)}–<span style={{ color: '#059669' }}>{fmt(s.savingHigh)}</span>/mo
                  </span>
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #E4E4E7', margin: '0 0 28px' }} />

              {/* Slider 2: Loan count */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ fontFamily: ff, fontSize: '11px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#A1A1AA' }}>
                    Active loans &amp; cards
                  </span>
                  <span style={{ fontFamily: ff, fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: '#09090B' }}>
                    {loanCount} {loanCount === 1 ? 'loan' : 'loans'}
                  </span>
                </div>
                <div style={{ padding: '8px 0', marginBottom: '10px' }}>
                  <input
                    type="range" className="calc-slider"
                    min={2} max={10} step={1} value={loanCount}
                    onChange={e => setLoanCount(Number(e.target.value))}
                    style={{ background: loanTrackBg }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: ff, fontSize: '11px', color: '#A1A1AA', fontWeight: 500 }}>
                  <span>2 loans</span>
                  <span>10 loans</span>
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #E4E4E7', margin: '0 0 24px' }} />

              {/* Loan type toggles */}
              <div>
                <span style={{ display: 'block', fontFamily: ff, fontSize: '11px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#A1A1AA', marginBottom: '12px' }}>
                  Loan types you have
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {LOAN_TYPES.map(type => {
                    const on = activeLoanTypes.has(type)
                    return (
                      <button
                        key={type}
                        onClick={() => toggleLoanType(type)}
                        style={{
                          padding: '8px 14px', borderRadius: '8px', cursor: 'pointer',
                          border: `1px solid ${on ? '#4F46E5' : '#E4E4E7'}`,
                          background: on ? '#4F46E5' : 'transparent',
                          color: on ? '#FFFFFF' : '#A1A1AA',
                          fontFamily: ff, fontSize: '12px', fontWeight: 600,
                          transition: 'all 0.15s',
                          boxShadow: on ? '0 2px 8px rgba(79,70,229,0.3)' : 'none',
                          userSelect: 'none',
                        }}
                        onMouseEnter={e => { if (!on) { (e.currentTarget as HTMLButtonElement).style.borderColor = '#4F46E5'; (e.currentTarget as HTMLButtonElement).style.color = '#4F46E5' } }}
                        onMouseLeave={e => { if (!on) { (e.currentTarget as HTMLButtonElement).style.borderColor = '#E4E4E7'; (e.currentTarget as HTMLButtonElement).style.color = '#A1A1AA' } }}
                      >
                        {type}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Live result panel ── */}
            <div style={{ padding: 'clamp(24px, 4vw, 36px) clamp(20px, 4vw, 40px) clamp(24px, 4vw, 36px) clamp(20px, 4vw, 36px)', background: '#09090B', display: 'flex', flexDirection: 'column' }}>

              {/* New EMI */}
              <div style={{ paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: '24px' }}>
                <div style={{ fontFamily: ff, fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '6px' }}>
                  Your new EMI after consolidation
                </div>
                <div style={{ fontFamily: ff, fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.3)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Was <span style={{ textDecoration: 'line-through', color: 'rgba(255,255,255,0.25)' }}>{fmt(emi)}</span>/mo
                </div>
                <div style={{ fontFamily: ff, fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 900, color: newEmiColor, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '4px', transition: 'color 0.3s' }}>
                  {fmt(s.newEmi)}
                </div>
                <div style={{ fontFamily: ff, fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                  estimated new monthly EMI
                </div>
              </div>

              {/* Stats 2×2 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                {[
                  { val: fmt(s.savingMid), label: 'Monthly saving',  green: true  },
                  { val: s.annualStr,       label: 'Annual saving',   green: false },
                  { val: `${s.rateDrop}%`,  label: 'Rate reduction',  green: true  },
                  { val: '21 days',         label: 'Avg. disbursal',  green: false },
                ].map((box, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '14px 16px' }}>
                    <div style={{ fontFamily: ff, fontSize: 'clamp(16px, 2.5vw, 22px)', fontWeight: 900, color: box.green ? '#34D399' : '#FFFFFF', letterSpacing: '-0.025em', lineHeight: 1, marginBottom: '4px' }}>
                      {box.val}
                    </div>
                    <div style={{ fontFamily: ff, fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}>
                      {box.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Rate comparison */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '14px 16px', marginBottom: '24px' }}>
                <div style={{ fontFamily: ff, fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>
                  Interest rate comparison
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontFamily: ff, fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Your current blended rate</span>
                  <span style={{ fontFamily: ff, fontSize: '12px', fontWeight: 700, color: '#EF4444' }}>~{s.blendedRate}%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0 0' }}>
                  <span style={{ fontFamily: ff, fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>After FCD consolidation</span>
                  <span style={{ fontFamily: ff, fontSize: '12px', fontWeight: 700, color: '#34D399' }}>10.5–13%</span>
                </div>
              </div>

              {/* CTA area */}
              <div style={{ marginTop: 'auto' }}>
                {/* Unlock teaser */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', background: 'rgba(79,70,229,0.12)', border: '1px solid rgba(79,70,229,0.25)', borderRadius: '12px', marginBottom: '14px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(79,70,229,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="#818CF8" strokeWidth="1.3" />
                      <path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="#818CF8" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div style={{ fontFamily: ff, fontSize: '12px', lineHeight: 1.5, color: 'rgba(255,255,255,0.6)' }}>
                    <strong style={{ color: '#A5B4FC', fontWeight: 700 }}>Your personalised savings report is ready.</strong>{' '}
                    Enter your details to unlock the exact breakdown — which bank, which rate, which EMI.
                  </div>
                </div>

                {/* Unlock button */}
                <button
                  onClick={() => setShowGate(true)}
                  style={{
                    width: '100%', background: '#111111', color: '#FFFFFF',
                    fontFamily: ff, fontSize: '15px', fontWeight: 700,
                    padding: '16px 24px', borderRadius: '10px', border: 'none',
                    cursor: 'pointer', letterSpacing: '-0.01em',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                    position: 'relative', overflow: 'hidden',
                    transition: 'background 0.15s, box-shadow 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1a1a1a'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 24px rgba(0,0,0,0.35)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#111111'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)' }}
                >
                  <div className="calc-shimmer-div" />
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5h6M5 2l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{ position: 'relative' }}>Unlock My Free Analysis</span>
                </button>

                <div style={{ textAlign: 'center', marginTop: '10px', fontFamily: ff, fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.02em' }}>
                  ✓ No CIBIL check &nbsp;·&nbsp; ✓ No documents &nbsp;·&nbsp; ✓ Free forever
                </div>
              </div>
            </div>
          </div>

          {/* ── Gate Overlay ── */}
          <AnimatePresence>
            {showGate && (
              <motion.div
                key="gate"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(6,6,8,0.97)',
                  backdropFilter: 'blur(20px) saturate(1.4)',
                  WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
                  borderRadius: '24px',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  padding: 'clamp(24px, 4vw, 40px) clamp(20px, 4vw, 32px)',
                  textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.06)',
                  zIndex: 20,
                  overflowY: 'auto',
                }}
              >
                {/* Ambient glow */}
                <div style={{ position: 'absolute', width: '320px', height: '200px', background: 'radial-gradient(ellipse, rgba(52,211,153,0.12) 0%, transparent 70%)', top: '60px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} />

                {/* Floating badge */}
                <div
                  className="calc-float-badge"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)', borderRadius: '99px', padding: '5px 14px', marginBottom: '16px', position: 'relative' }}
                >
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34D399', boxShadow: '0 0 6px rgba(52,211,153,0.8)' }} />
                  <span style={{ fontFamily: ff, fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#34D399' }}>
                    Your estimate is ready
                  </span>
                </div>

                {/* THE NUMBER */}
                <div style={{ marginBottom: '6px', position: 'relative' }}>
                  <span
                    className="calc-save-pulse"
                    style={{ display: 'block', fontFamily: ff, fontSize: 'clamp(48px, 8vw, 72px)', fontWeight: 900, color: '#34D399', letterSpacing: '-0.05em', lineHeight: 1 }}
                  >
                    {fmt(s.savingMid)}
                  </span>
                  <span style={{ fontFamily: ff, fontSize: '18px', fontWeight: 600, color: 'rgba(52,211,153,0.5)', letterSpacing: '-0.01em' }}>/month</span>
                </div>
                <div style={{ fontFamily: ff, fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.35)', marginBottom: '6px', letterSpacing: '0.02em' }}>
                  estimated monthly savings
                </div>

                {/* Annual strip */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '8px 16px', marginBottom: '28px' }}>
                  <span style={{ fontFamily: ff, fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>That&apos;s</span>
                  <span style={{ fontFamily: ff, fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>{annualGateStr}</span>
                </div>

                {/* Heading */}
                <div style={{ fontFamily: ff, fontSize: '18px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '6px' }}>
                  Unlock your free breakdown
                </div>
                <div style={{ fontFamily: ff, fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '20px', lineHeight: 1.5, maxWidth: '300px' }}>
                  Which bank. Which rate. Which EMI. We&apos;ll send the full analysis to your WhatsApp in minutes.
                </div>

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  style={{ width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '10px' }}
                  noValidate
                >
                  {/* Name */}
                  <div className={shakeName ? 'calc-shake' : ''} style={{ position: 'relative' }}>
                    <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.35, pointerEvents: 'none' }} width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="5.5" r="2.5" stroke="white" strokeWidth="1.3" />
                      <path d="M2.5 13c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    <input
                      type="text" placeholder="Your full name" value={name}
                      autoComplete="name"
                      onChange={e => setName(e.target.value)}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: `1px solid ${shakeName ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '10px', padding: '13px 16px 13px 40px', fontFamily: ff, fontSize: '16px', color: '#FFFFFF', outline: 'none', transition: 'border-color 0.15s, background 0.15s' }}
                      onFocus={e => { e.target.style.borderColor = 'rgba(79,70,229,0.55)'; e.target.style.background = 'rgba(255,255,255,0.09)' }}
                      onBlur={e => { e.target.style.borderColor = shakeName ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.06)' }}
                    />
                  </div>

                  {/* Phone */}
                  <div className={shakePhone ? 'calc-shake' : ''} style={{ position: 'relative' }}>
                    <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.35, pointerEvents: 'none' }} width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="2" y="1" width="12" height="14" rx="2" stroke="white" strokeWidth="1.3" />
                      <circle cx="8" cy="12" r="0.8" fill="white" />
                      <rect x="5" y="3.5" width="6" height="1" rx="0.5" fill="white" opacity="0.4" />
                    </svg>
                    <span style={{ position: 'absolute', left: '40px', top: '50%', transform: 'translateY(-50%)', fontFamily: ff, fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', pointerEvents: 'none' }}>+91</span>
                    <input
                      type="tel" placeholder="WhatsApp number" maxLength={10} value={phone}
                      autoComplete="tel" inputMode="numeric"
                      onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: `1px solid ${shakePhone ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '10px', padding: '13px 16px 13px 66px', fontFamily: ff, fontSize: '16px', color: '#FFFFFF', outline: 'none', transition: 'border-color 0.15s, background 0.15s' }}
                      onFocus={e => { e.target.style.borderColor = 'rgba(79,70,229,0.55)'; e.target.style.background = 'rgba(255,255,255,0.09)' }}
                      onBlur={e => { e.target.style.borderColor = shakePhone ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.06)' }}
                    />
                  </div>

                  {/* Consent */}
                  <div className={shakeConsent ? 'calc-shake' : ''} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', textAlign: 'left' }}>
                    <input
                      type="checkbox" id="emi-consent" checked={consent}
                      onChange={e => setConsent(e.target.checked)}
                      style={{ width: '16px', height: '16px', borderRadius: '4px', accentColor: '#4F46E5', cursor: 'pointer', flexShrink: 0, marginTop: '1px' }}
                    />
                    <label
                      htmlFor="emi-consent"
                      style={{ fontFamily: ff, fontSize: '11px', color: shakeConsent ? 'rgba(239,68,68,0.8)' : 'rgba(255,255,255,0.3)', lineHeight: 1.5, cursor: 'pointer', transition: 'color 0.3s' }}
                    >
                      I agree to receive my savings analysis on WhatsApp. I can opt out anytime. (TRAI compliant)
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit" disabled={submitting}
                    style={{
                      width: '100%', position: 'relative', overflow: 'hidden',
                      background: submitSuccess ? '#059669' : submitting ? 'rgba(79,70,229,0.4)' : '#4F46E5',
                      color: '#FFFFFF', fontFamily: ff, fontSize: '15px', fontWeight: 700,
                      padding: '15px', borderRadius: '10px', border: 'none',
                      cursor: submitting ? 'not-allowed' : 'pointer', letterSpacing: '-0.01em',
                      boxShadow: submitSuccess
                        ? '0 4px 20px rgba(5,150,105,0.55)'
                        : '0 4px 20px rgba(79,70,229,0.5), 0 0 0 1px rgba(79,70,229,0.6)',
                      transition: 'background 0.3s, box-shadow 0.3s',
                    }}
                    onMouseEnter={e => { if (!submitting && !submitSuccess) (e.currentTarget as HTMLButtonElement).style.background = '#4338CA' }}
                    onMouseLeave={e => { if (!submitting && !submitSuccess) (e.currentTarget as HTMLButtonElement).style.background = '#4F46E5' }}
                  >
                    {!submitting && !submitSuccess && <div className="calc-shimmer-div" />}
                    <span style={{ position: 'relative' }}>
                      {submitSuccess ? '✓ Sent to WhatsApp!' : submitting ? 'Sending…' : 'Send My Free Analysis →'}
                    </span>
                  </button>

                  {/* Social proof */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ display: 'flex' }}>
                      {['RK', 'PS', 'AM', 'SG'].map((init, i) => (
                        <div key={i} style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(79,70,229,0.4)', border: '1.5px solid rgba(9,9,11,0.9)', marginRight: i < 3 ? '-6px' : 0, fontFamily: ff, fontSize: '8px', color: '#A5B4FC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, zIndex: 4 - i, position: 'relative' }}>
                          {init}
                        </div>
                      ))}
                    </div>
                    <span style={{ fontFamily: ff, fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginLeft: '10px' }}>
                      500+ salaried professionals already saved
                    </span>
                  </div>
                </form>

                <div style={{ fontFamily: ff, fontSize: '11px', color: 'rgba(255,255,255,0.2)', marginTop: '8px', letterSpacing: '0.01em' }}>
                  ✓ No CIBIL check &nbsp;·&nbsp; ✓ No documents &nbsp;·&nbsp; ✓ Free forever
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Confetti */}
          {confetti.map(p => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              style={{ position: 'absolute', top: '50%', left: '50%', width: '6px', height: '6px', marginLeft: '-3px', marginTop: '-3px', borderRadius: '50%', background: p.color, pointerEvents: 'none', zIndex: 30 }}
            />
          ))}
        </div>

        <p style={{ fontFamily: ff, fontSize: '11px', color: '#A1A1AA', marginTop: '20px' }}>
          *Estimates based on average FCD outcomes. Actual savings depend on your credit profile. Free analysis · No obligation.
        </p>
      </div>
    </section>
  )
}
