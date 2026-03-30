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
  { target: 10,  label: 'Years of experience',            display: (t) => `${t}+ Yrs` },
  { target: 21,  label: 'Average days to disbursal',      display: (t) => `${t} Days` },
]

// ── Bank logo SVG marks (transparent bg, brand colours) ─────────────────────
const BANK_LOGOS: { name: string; width: number; node: React.ReactNode }[] = [
  {
    name: 'HDFC Bank', width: 90,
    node: (
      <svg width="90" height="28" viewBox="0 0 90 28" fill="none">
        <text x="0" y="19" fill="#004B8D" fontSize="15" fontWeight="900" fontFamily="'Arial Black',Arial,sans-serif" letterSpacing="-0.4">HDFC</text>
        <text x="50" y="19" fill="#004B8D" fontSize="13" fontWeight="400" fontFamily="Arial,sans-serif">Bank</text>
      </svg>
    ),
  },
  {
    name: 'ICICI Bank', width: 100,
    node: (
      <svg width="100" height="28" viewBox="0 0 100 28" fill="none">
        {/* 6 vertical bars — ICICI logo mark */}
        {[0,8,16,24,32,40].map((x, i) => (
          <rect key={i} x={x} y="5" width="4" height="18" rx="2" fill="#F37329"/>
        ))}
        <text x="52" y="19" fill="#F37329" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">Bank</text>
      </svg>
    ),
  },
  {
    name: 'SBI', width: 76,
    node: (
      <svg width="76" height="28" viewBox="0 0 76 28" fill="none">
        {/* SBI keyhole mark */}
        <circle cx="14" cy="11" r="6" stroke="#22409A" strokeWidth="2.2" fill="none"/>
        <rect x="11" y="11" width="6" height="7" rx="1" fill="#22409A"/>
        <text x="26" y="20" fill="#22409A" fontSize="14" fontWeight="900" fontFamily="'Arial Black',Arial,sans-serif">SBI</text>
      </svg>
    ),
  },
  {
    name: 'Axis Bank', width: 86,
    node: (
      <svg width="86" height="28" viewBox="0 0 86 28" fill="none">
        {/* A mark */}
        <path d="M4 22L12 6L20 22" stroke="#97144D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M6.5 17h11" stroke="#97144D" strokeWidth="2" strokeLinecap="round"/>
        <text x="26" y="20" fill="#97144D" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">Axis</text>
      </svg>
    ),
  },
  {
    name: 'Kotak', width: 82,
    node: (
      <svg width="82" height="28" viewBox="0 0 82 28" fill="none">
        {/* K mark */}
        <text x="0" y="21" fill="#ED1C24" fontSize="20" fontWeight="900" fontFamily="'Arial Black',Arial,sans-serif">K</text>
        <text x="18" y="20" fill="#231F20" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">OTAK</text>
      </svg>
    ),
  },
  {
    name: 'Bajaj Finance', width: 110,
    node: (
      <svg width="110" height="28" viewBox="0 0 110 28" fill="none">
        {/* Chevron mark */}
        <path d="M4 8h8l6 6-6 6H4l6-6z" fill="#FF6600"/>
        <text x="22" y="20" fill="#003399" fontSize="13" fontWeight="800" fontFamily="'Arial Black',Arial,sans-serif">Bajaj</text>
        <text x="62" y="20" fill="#666" fontSize="11" fontWeight="400" fontFamily="Arial,sans-serif">Finance</text>
      </svg>
    ),
  },
  {
    name: 'IDFC First', width: 100,
    node: (
      <svg width="100" height="28" viewBox="0 0 100 28" fill="none">
        <text x="0" y="17" fill="#00A7B5" fontSize="13" fontWeight="900" fontFamily="'Arial Black',Arial,sans-serif" letterSpacing="0.5">IDFC</text>
        <text x="0" y="27" fill="#00A7B5" fontSize="9.5" fontWeight="600" fontFamily="Arial,sans-serif" letterSpacing="0.3">FIRST BANK</text>
      </svg>
    ),
  },
  {
    name: 'IndusInd', width: 96,
    node: (
      <svg width="96" height="28" viewBox="0 0 96 28" fill="none">
        {/* Diamond mark */}
        <path d="M10 4L16 11L10 18L4 11Z" fill="#0033A0"/>
        <text x="22" y="19" fill="#0033A0" fontSize="12.5" fontWeight="800" fontFamily="'Arial Black',Arial,sans-serif" letterSpacing="-0.3">IndusInd</text>
      </svg>
    ),
  },
  {
    name: 'Yes Bank', width: 96,
    node: (
      <svg width="96" height="28" viewBox="0 0 96 28" fill="none">
        <text x="0" y="20" fill="#0A2240" fontSize="15" fontWeight="900" fontFamily="'Arial Black',Arial,sans-serif">YES</text>
        <text x="40" y="20" fill="#0A2240" fontSize="13" fontWeight="400" fontFamily="Arial,sans-serif">BANK</text>
        {/* Gold underline accent */}
        <rect x="0" y="23" width="33" height="2" rx="1" fill="#F5A623"/>
      </svg>
    ),
  },
  {
    name: 'PNB', width: 70,
    node: (
      <svg width="70" height="28" viewBox="0 0 70 28" fill="none">
        {/* Crown mark */}
        <path d="M4 14L7 8L10 12L13 8L16 8L16 14Z" fill="#1A3A8B"/>
        <text x="20" y="20" fill="#1A3A8B" fontSize="14" fontWeight="900" fontFamily="'Arial Black',Arial,sans-serif">PNB</text>
      </svg>
    ),
  },
  {
    name: 'Bank of Baroda', width: 106,
    node: (
      <svg width="106" height="28" viewBox="0 0 106 28" fill="none">
        {/* Sun ring */}
        <circle cx="12" cy="14" r="7" stroke="#FF7A00" strokeWidth="2.5" fill="none"/>
        <circle cx="12" cy="14" r="3" fill="#FF7A00"/>
        <text x="24" y="16" fill="#FF7A00" fontSize="11" fontWeight="800" fontFamily="'Arial Black',Arial,sans-serif">Bank of</text>
        <text x="24" y="26" fill="#FF7A00" fontSize="11" fontWeight="800" fontFamily="'Arial Black',Arial,sans-serif">Baroda</text>
      </svg>
    ),
  },
  {
    name: 'Tata Capital', width: 108,
    node: (
      <svg width="108" height="28" viewBox="0 0 108 28" fill="none">
        {/* T mark */}
        <rect x="4" y="6" width="14" height="3" rx="1.5" fill="#0066B3"/>
        <rect x="9.5" y="6" width="3" height="14" rx="1.5" fill="#0066B3"/>
        <text x="24" y="16" fill="#0066B3" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">TATA</text>
        <text x="24" y="26" fill="#0066B3" fontSize="10" fontWeight="400" fontFamily="Arial,sans-serif">Capital</text>
      </svg>
    ),
  },
]

// Duplicate for seamless loop
const logosDoubled = [...BANK_LOGOS, ...BANK_LOGOS]

// ── Count-up hook with stagger delay ────────────────────────────────────────
function useCountUp(target: number, active: boolean, duration = 1500, delay = 0) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let rafId: number
    const timer = setTimeout(() => {
      let start: number | null = null
      const step = (ts: number) => {
        if (!start) start = ts
        const progress = Math.min((ts - start) / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(ease * target))
        if (progress < 1) rafId = requestAnimationFrame(step)
        else setCount(target)
      }
      rafId = requestAnimationFrame(step)
    }, delay)
    return () => { clearTimeout(timer); cancelAnimationFrame(rafId) }
  }, [active, target, duration, delay])
  return count
}

// ── Stat item ────────────────────────────────────────────────────────────────
function StatItem({ stat, active, index, total }: { stat: StatConfig; active: boolean; index: number; total: number }) {
  const count = useCountUp(stat.target, active, 1500, index * 150)
  const isLast = index === total - 1

  return (
    <div
      style={{
        flex: 1,
        padding: '0 clamp(20px, 3vw, 40px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '8px',
        borderRight: isLast ? 'none' : '0.5px solid rgba(0,0,0,0.1)',
      }}
    >
      <span style={{
        fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
        fontSize: 'clamp(28px, 4vw, 44px)',
        fontWeight: 800,
        color: '#09090B',
        lineHeight: 1,
        letterSpacing: '-0.03em',
      }}>
        {stat.display(count)}
      </span>
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '11px',
        fontWeight: 600,
        color: '#888888',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        textAlign: 'center',
        maxWidth: '160px',
        lineHeight: 1.5,
      }}>
        {stat.label}
      </span>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────
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
        backgroundColor: '#f7f5f0',
        borderTop: '0.5px solid rgba(0,0,0,0.07)',
        borderBottom: '0.5px solid rgba(0,0,0,0.07)',
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

      {/* ── Bank logo marquee ── */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderTop: '0.5px solid rgba(0,0,0,0.07)',
          borderBottom: '0.5px solid rgba(0,0,0,0.07)',
          padding: '16px 0',
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            alignItems: 'center',
            gap: '48px',
            animation: 'bank-ticker 35s linear infinite',
          }}
        >
          {logosDoubled.map((logo, i) => (
            <div
              key={i}
              title={logo.name}
              style={{
                flexShrink: 0,
                opacity: 0.7,
                transition: 'opacity 0.2s',
                display: 'flex',
                alignItems: 'center',
                height: '28px',
                cursor: 'default',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.opacity = '1' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.opacity = '0.7' }}
            >
              {logo.node}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
