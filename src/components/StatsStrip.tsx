'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

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

// ── Bank logo definitions ────────────────────────────────────────────────────
// Real PNGs from Figma community file for major banks; SVG marks for others
type BankLogo =
  | { type: 'img'; name: string; src: string; w: number; h: number }
  | { type: 'svg'; name: string; node: React.ReactNode; w: number }

const BANK_LOGOS: BankLogo[] = [
  {
    type: 'img', name: 'HDFC Bank',
    src: '/banks/hdfc.png', w: 116, h: 24,
  },
  {
    type: 'img', name: 'ICICI Bank',
    src: '/banks/icici.png', w: 100, h: 24,
  },
  {
    type: 'img', name: 'State Bank of India',
    src: '/banks/sbi.png', w: 60, h: 24,
  },
  {
    type: 'img', name: 'Axis Bank',
    src: '/banks/axis.png', w: 80, h: 24,
  },
  {
    type: 'svg', name: 'Kotak Mahindra Bank', w: 160,
    node: (
      <svg width="160" height="24" viewBox="0 0 160 24" fill="none">
        <text x="0" y="18" fill="#ED1C24" fontSize="20" fontWeight="900" fontFamily="'Arial Black',Arial,sans-serif">K</text>
        <text x="18" y="18" fill="#231F20" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif" letterSpacing="0.5">OTAK MAHINDRA</text>
      </svg>
    ),
  },
  {
    type: 'svg', name: 'IDFC FIRST Bank', w: 100,
    node: (
      <svg width="100" height="24" viewBox="0 0 100 24" fill="none">
        <text x="0" y="15" fill="#00A7B5" fontSize="12" fontWeight="900" fontFamily="'Arial Black',Arial,sans-serif" letterSpacing="1">IDFC</text>
        <text x="0" y="24" fill="#00A7B5" fontSize="9" fontWeight="600" fontFamily="Arial,sans-serif" letterSpacing="0.5">FIRST BANK</text>
      </svg>
    ),
  },
  {
    type: 'svg', name: 'IndusInd Bank', w: 130,
    node: (
      <svg width="130" height="24" viewBox="0 0 130 24" fill="none">
        <path d="M8 2L14 10L8 18L2 10Z" fill="#0033A0"/>
        <text x="20" y="17" fill="#0033A0" fontSize="13" fontWeight="800" fontFamily="'Arial Black',Arial,sans-serif" letterSpacing="-0.3">IndusInd</text>
        <text x="20" y="24" fill="#0033A0" fontSize="9" fontWeight="400" fontFamily="Arial,sans-serif">Bank</text>
      </svg>
    ),
  },
  {
    type: 'svg', name: 'Yes Bank', w: 86,
    node: (
      <svg width="86" height="24" viewBox="0 0 86 24" fill="none">
        <text x="0" y="17" fill="#0A2240" fontSize="16" fontWeight="900" fontFamily="'Arial Black',Arial,sans-serif">YES</text>
        <text x="42" y="17" fill="#0A2240" fontSize="14" fontWeight="400" fontFamily="Arial,sans-serif">BANK</text>
        <rect x="0" y="20" width="38" height="2" rx="1" fill="#F5A623"/>
      </svg>
    ),
  },
  {
    type: 'svg', name: 'Punjab National Bank', w: 104,
    node: (
      <svg width="104" height="24" viewBox="0 0 104 24" fill="none">
        <path d="M4 16L8 6L12 12L16 6L20 6L20 16Z" fill="#1A3A8B"/>
        <text x="25" y="17" fill="#1A3A8B" fontSize="13" fontWeight="900" fontFamily="'Arial Black',Arial,sans-serif">PNB</text>
      </svg>
    ),
  },
  {
    type: 'svg', name: 'Bank of Baroda', w: 120,
    node: (
      <svg width="120" height="24" viewBox="0 0 120 24" fill="none">
        <circle cx="10" cy="12" r="7" stroke="#FF7A00" strokeWidth="2.2" fill="none"/>
        <circle cx="10" cy="12" r="3" fill="#FF7A00"/>
        <text x="23" y="11" fill="#FF7A00" fontSize="10" fontWeight="800" fontFamily="'Arial Black',Arial,sans-serif">Bank of</text>
        <text x="23" y="22" fill="#FF7A00" fontSize="10" fontWeight="800" fontFamily="'Arial Black',Arial,sans-serif">Baroda</text>
      </svg>
    ),
  },
  {
    type: 'svg', name: 'Bajaj Finance', w: 118,
    node: (
      <svg width="118" height="24" viewBox="0 0 118 24" fill="none">
        <path d="M2 7h9l6 5-6 5H2l6-5z" fill="#FF6600"/>
        <text x="20" y="16" fill="#003399" fontSize="12.5" fontWeight="900" fontFamily="'Arial Black',Arial,sans-serif">Bajaj</text>
        <text x="62" y="16" fill="#555" fontSize="11" fontWeight="400" fontFamily="Arial,sans-serif">Finance</text>
      </svg>
    ),
  },
  {
    type: 'svg', name: 'Tata Capital', w: 108,
    node: (
      <svg width="108" height="24" viewBox="0 0 108 24" fill="none">
        <rect x="3" y="5" width="14" height="2.5" rx="1.25" fill="#0066B3"/>
        <rect x="8.75" y="5" width="2.5" height="14" rx="1.25" fill="#0066B3"/>
        <text x="22" y="14" fill="#0066B3" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">TATA</text>
        <text x="22" y="23" fill="#0066B3" fontSize="10" fontWeight="400" fontFamily="Arial,sans-serif">Capital</text>
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

// ── Logo item ────────────────────────────────────────────────────────────────
function LogoItem({ logo }: { logo: BankLogo }) {
  const hoverStyle = {
    flexShrink: 0,
    opacity: 0.65,
    transition: 'opacity 0.2s',
    display: 'flex',
    alignItems: 'center',
    height: '28px',
    cursor: 'default',
  }

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).style.opacity = '1'
  }
  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).style.opacity = '0.65'
  }

  return (
    <div title={logo.name} style={hoverStyle} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {logo.type === 'img' ? (
        <Image
          src={logo.src}
          alt={logo.name}
          width={logo.w}
          height={logo.h}
          style={{ height: '28px', width: 'auto', objectFit: 'contain' }}
          unoptimized
        />
      ) : (
        logo.node
      )}
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
            gap: '56px',
            animation: 'bank-ticker 35s linear infinite',
          }}
        >
          {logosDoubled.map((logo, i) => (
            <LogoItem key={i} logo={logo} />
          ))}
        </div>
      </div>

    </div>
  )
}
