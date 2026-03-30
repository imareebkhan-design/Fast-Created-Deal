'use client'

import { useEffect, useRef, useState } from 'react'

interface StatConfig {
  label: string
  display: (t: number) => string
  target: number
}

const stats: StatConfig[] = [
  { target: 23,  label: 'Total EMI saved for clients',    display: (t) => `₹${(t / 10).toFixed(1)} Cr+` },
  { target: 500, label: 'Salaried professionals helped',  display: (t) => `${t}+` },
  { target: 10,  label: 'Bank & NBFC experience',         display: (t) => `${t}+ Yrs` },
  { target: 21,  label: 'Average time to disbursal',      display: (t) => `${t} Days` },
]

// ── Bank SVG logo marks ──────────────────────────────────────────────────────
// Each SVG is 40×22px — simplified but brand-accurate logo marks

const logos: Record<string, React.ReactNode> = {
  'HDFC': (
    <svg width="40" height="22" viewBox="0 0 40 22" fill="none">
      <rect width="40" height="22" rx="3" fill="#004B8D"/>
      <text x="20" y="15" textAnchor="middle" fill="white" fontSize="8" fontWeight="800" fontFamily="Arial,sans-serif" letterSpacing="0.5">HDFC</text>
    </svg>
  ),
  'ICICI': (
    <svg width="40" height="22" viewBox="0 0 40 22" fill="none">
      <rect width="40" height="22" rx="3" fill="#F47920"/>
      <rect x="6" y="7" width="3" height="8" rx="1" fill="white"/>
      <rect x="11" y="7" width="3" height="8" rx="1" fill="white"/>
      <rect x="16" y="7" width="3" height="8" rx="1" fill="white"/>
      <rect x="21" y="7" width="3" height="8" rx="1" fill="white"/>
      <rect x="26" y="7" width="3" height="8" rx="1" fill="white"/>
      <rect x="31" y="7" width="3" height="8" rx="1" fill="white"/>
    </svg>
  ),
  'SBI': (
    <svg width="40" height="22" viewBox="0 0 40 22" fill="none">
      <rect width="40" height="22" rx="3" fill="#22409A"/>
      {/* Simplified SBI keyhole/pillar */}
      <circle cx="14" cy="10" r="4" fill="none" stroke="white" strokeWidth="1.8"/>
      <rect x="11.5" y="10" width="5" height="5" rx="1" fill="white"/>
      {/* SBI text */}
      <text x="27" y="15" textAnchor="middle" fill="white" fontSize="8.5" fontWeight="800" fontFamily="Arial,sans-serif">SBI</text>
    </svg>
  ),
  'Axis Bank': (
    <svg width="40" height="22" viewBox="0 0 40 22" fill="none">
      <rect width="40" height="22" rx="3" fill="#97144D"/>
      {/* Simplified Axis A mark */}
      <path d="M7 16L11 7L15 16" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M8.5 13h5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <text x="28" y="15" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="Arial,sans-serif">AXIS</text>
    </svg>
  ),
  'Kotak': (
    <svg width="40" height="22" viewBox="0 0 40 22" fill="none">
      <rect width="40" height="22" rx="3" fill="#ED1C24"/>
      {/* K mark */}
      <text x="10" y="16" fill="white" fontSize="13" fontWeight="900" fontFamily="Arial,sans-serif">K</text>
      <text x="22" y="15" fill="white" fontSize="7.5" fontWeight="600" fontFamily="Arial,sans-serif">KOTAK</text>
    </svg>
  ),
  'Bajaj': (
    <svg width="40" height="22" viewBox="0 0 40 22" fill="none">
      <rect width="40" height="22" rx="3" fill="#003399"/>
      {/* Bajaj chevron */}
      <path d="M6 7h6l4 4-4 4H6l4-4z" fill="#FF6600"/>
      <text x="27" y="15" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="700" fontFamily="Arial,sans-serif">BAJAJ</text>
    </svg>
  ),
  'IndusInd': (
    <svg width="40" height="22" viewBox="0 0 40 22" fill="none">
      <rect width="40" height="22" rx="3" fill="#0033A0"/>
      {/* Diamond mark */}
      <path d="M9 11L12 7L15 11L12 15Z" fill="white" opacity="0.9"/>
      <text x="27" y="15" textAnchor="middle" fill="white" fontSize="7" fontWeight="700" fontFamily="Arial,sans-serif">INDUS</text>
    </svg>
  ),
  'Yes Bank': (
    <svg width="40" height="22" viewBox="0 0 40 22" fill="none">
      <rect width="40" height="22" rx="3" fill="#0A2240"/>
      {/* YES in gold accent */}
      <text x="8" y="15" fill="#F5A623" fontSize="9" fontWeight="900" fontFamily="Arial,sans-serif">YES</text>
      <text x="26" y="15" fill="white" fontSize="7.5" fontWeight="600" fontFamily="Arial,sans-serif">BANK</text>
    </svg>
  ),
  'IDFC First': (
    <svg width="40" height="22" viewBox="0 0 40 22" fill="none">
      <rect width="40" height="22" rx="3" fill="#00A7B5"/>
      <text x="20" y="12" textAnchor="middle" fill="white" fontSize="7" fontWeight="800" fontFamily="Arial,sans-serif">IDFC</text>
      <text x="20" y="20" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="6" fontWeight="600" fontFamily="Arial,sans-serif">FIRST BANK</text>
    </svg>
  ),
  'PNB': (
    <svg width="40" height="22" viewBox="0 0 40 22" fill="none">
      <rect width="40" height="22" rx="3" fill="#1A3A8B"/>
      {/* Crown / star hint */}
      <path d="M11 14L13 8L16 12L19 8L21 14Z" fill="#F5A623" opacity="0.9"/>
      <text x="30" y="15" textAnchor="middle" fill="white" fontSize="8.5" fontWeight="800" fontFamily="Arial,sans-serif">PNB</text>
    </svg>
  ),
  'BOB': (
    <svg width="40" height="22" viewBox="0 0 40 22" fill="none">
      <rect width="40" height="22" rx="3" fill="#FF7A00"/>
      {/* Diamond sun mark */}
      <circle cx="13" cy="11" r="4.5" fill="none" stroke="white" strokeWidth="1.5"/>
      <circle cx="13" cy="11" r="2" fill="white"/>
      <text x="28" y="15" textAnchor="middle" fill="white" fontSize="8.5" fontWeight="800" fontFamily="Arial,sans-serif">BOB</text>
    </svg>
  ),
  'Tata Capital': (
    <svg width="40" height="22" viewBox="0 0 40 22" fill="none">
      <rect width="40" height="22" rx="3" fill="#0066B3"/>
      {/* Tata T mark */}
      <rect x="7" y="7" width="8" height="2" rx="1" fill="white"/>
      <rect x="10" y="7" width="2" height="8" rx="1" fill="white"/>
      <text x="28" y="15" textAnchor="middle" fill="white" fontSize="7" fontWeight="700" fontFamily="Arial,sans-serif">TATA</text>
    </svg>
  ),
}

const banks = Object.keys(logos)
const banksDoubled = [...banks, ...banks]

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return count
}

function StatItem({ stat, active, index, total }: { stat: StatConfig; active: boolean; index: number; total: number }) {
  const count = useCountUp(stat.target, active)
  const isLast = index === total - 1

  return (
    <div
      style={{
        flex: 1,
        padding: '0 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        borderRight: isLast ? 'none' : '1px solid #E4E4E7',
      }}
      className="border-none md:border-r-auto px-4 md:px-10"
    >
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'clamp(32px, 4vw, 48px)',
        fontWeight: 700,
        color: '#09090B',
        lineHeight: 1,
        letterSpacing: '-0.04em',
      }}>
        {stat.display(count)}
      </span>
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '12px',
        fontWeight: 500,
        color: '#A1A1AA',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        textAlign: 'center',
        maxWidth: '160px',
        lineHeight: 1.5,
      }}>
        {stat.label}
      </span>
    </div>
  )
}

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {/* ── Stats row ── */}
      <div style={{
        backgroundColor: '#FAFAFA',
        borderTop: '1px solid #E4E4E7',
        borderBottom: '1px solid #E4E4E7',
        padding: '48px 24px',
      }}>
        <div
          style={{ maxWidth: '1200px', margin: '0 auto' }}
          className="grid grid-cols-2 gap-10 md:flex md:gap-0"
        >
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} active={active} index={i} total={stats.length} />
          ))}
        </div>
      </div>

      {/* ── Bank logo ticker ── */}
      <div
        className="bank-ticker-wrap"
        style={{
          backgroundColor: '#F4F4F5',
          height: '48px',
          borderTop: '1px solid #E4E4E7',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          className="bank-ticker-track"
          style={{
            display: 'flex',
            alignItems: 'center',
            width: 'max-content',
            gap: '10px',
            paddingLeft: '10px',
          }}
        >
          {banksDoubled.map((name, i) => (
            <div
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                background: '#FFFFFF',
                border: '1px solid #E4E4E7',
                borderRadius: '8px',
                padding: '5px 10px',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {logos[name]}
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                fontWeight: 500,
                color: '#3F3F46',
              }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
