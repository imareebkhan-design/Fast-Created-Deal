'use client'

import { useEffect, useRef } from 'react'

const MARQUEE_BANKS = [
  { name: 'HDFC Bank',           color: '#004C8F' },
  { name: 'ICICI Bank',          color: '#F37329' },
  { name: 'Kotak Mahindra',      color: '#22409A' },
  { name: 'Axis Bank',           color: '#C8232C' },
  { name: 'State Bank of India', color: '#1A1A8C' },
  { name: 'IDFC First Bank',     color: '#00843D' },
  { name: 'IndusInd Bank',       color: '#5A2D82' },
  { name: 'Yes Bank',            color: '#003B6D' },
  { name: 'Bajaj Finserv',       color: '#E87722' },
  { name: 'Tata Capital',        color: '#0066B3' },
  { name: 'Punjab National Bank',color: '#8B0000' },
  { name: 'Bank of Baroda',      color: '#006400' },
  { name: 'Hero FinCorp',        color: '#FF6600' },
  { name: 'Aditya Birla Finance',color: '#B22222' },
]

const BANK_CHIPS = [
  { name: 'HDFC Bank',    color: '#004C8F' },
  { name: 'ICICI Bank',   color: '#F37329' },
  { name: 'Kotak Mahindra', color: '#22409A' },
  { name: 'Axis Bank',    color: '#C8232C' },
  { name: 'SBI',          color: '#1A1A8C' },
  { name: 'IDFC First',   color: '#00843D' },
  { name: 'IndusInd',     color: '#5A2D82' },
  { name: 'Yes Bank',     color: '#003B6D' },
  { name: 'Bajaj Finserv',color: '#E87722' },
  { name: 'Tata Capital', color: '#0066B3' },
  { name: 'PNB',          color: '#8B0000' },
  { name: 'Bank of Baroda',color: '#006400' },
]

const NAVIGATE_LINKS = [
  { href: '#problem',    label: 'The EMI Problem' },
  { href: '#calculator', label: 'EMI Savings Calculator', badge: 'Free' },
  { href: '#process',    label: 'How It Works' },
  { href: '#results',    label: 'Real Client Results' },
  { href: '#why',        label: 'Why Fast Credit Deal' },
  { href: '#consult',    label: 'Get Free Analysis', badge: '2hr response' },
]

const CONSOLIDATE_LINKS = [
  'Personal Loan Debt',
  'Credit Card Balances',
  'Consumer Loans',
  'Home Loan Top-ups',
  'Overdraft Accounts',
  'Multiple EMI Burden',
]

const PROMISES = [
  'RBI-regulated partners only',
  '40+ banks & NBFCs network',
  'WhatsApp update at every stage',
  'Zero documents at enquiry',
  'No CIBIL impact to check eligibility',
  '2-hour guaranteed response',
  'Zero rejected applications',
]

export default function Footer() {
  const fadeRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const els = fadeRefs.current.filter(Boolean) as HTMLDivElement[]

    // Trigger immediately if already in view
    els.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible')
      }
    })

    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const setRef = (i: number) => (el: HTMLDivElement | null) => {
    fadeRefs.current[i] = el
  }

  return (
    <footer style={{ background: '#09090B', position: 'relative', overflow: 'hidden' }}>
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* Glow — indigo top-left */}
      <div style={{
        position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
        filter: 'blur(100px)', zIndex: 0,
        width: 500, height: 300,
        background: 'rgba(79,70,229,0.07)',
        top: 0, left: -80,
      }} />
      {/* Glow — green bottom-right */}
      <div style={{
        position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
        filter: 'blur(100px)', zIndex: 0,
        width: 400, height: 300,
        background: 'rgba(16,185,129,0.05)',
        bottom: 0, right: 0,
      }} />

      {/* ── MARQUEE STRIP ── */}
      <div
        className="footer-marquee-wrap"
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'relative', zIndex: 2,
          overflow: 'hidden',
          padding: '14px 0',
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        <div className="footer-marquee-track" style={{ display: 'flex', width: 'max-content' }}>
          {[...MARQUEE_BANKS, ...MARQUEE_BANKS].map((b, i) => (
            <div
              key={i}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '0 28px',
                fontSize: 12, fontWeight: 600,
                color: 'rgba(255,255,255,0.25)',
                letterSpacing: '0.04em', whiteSpace: 'nowrap',
                borderRight: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: b.color, flexShrink: 0, display: 'inline-block' }} />
              {b.name}
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN BODY ── */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '64px 48px 0',
        position: 'relative', zIndex: 2,
        display: 'grid',
        gridTemplateColumns: '300px 1fr 1fr 1fr',
        gap: 60,
      }}
        className="footer-grid"
      >
        {/* Brand column */}
        <div ref={setRef(0)} className="footer-fade-up" style={{ transitionDelay: '0s' }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: '#FAFAFA', letterSpacing: '-0.02em', marginBottom: 4 }}>
            Fast Credit Deal
          </div>
          <div style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 18 }}>
            RBI-Registered Loan DSA · Est. 2011
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: 28, maxWidth: 240 }}>
            EMI consolidation specialists for salaried professionals in Delhi NCR, Mumbai and Bangalore. We help you reclaim your salary — one consolidated loan at a time.
          </div>

          {/* Stat pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
            <StatPill color="rgba(16,185,129,0.12)" num="₹2.3 Cr+" label="Total EMI savings delivered"
              icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>}
            />
            <StatPill color="rgba(79,70,229,0.12)" num="500+ clients" label="Salaried professionals helped"
              icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>}
            />
            <StatPill color="rgba(245,158,11,0.1)" num="21 days avg" label="Average disbursal time"
              icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
            />
          </div>

          {/* Contact links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <ContactLink href="https://wa.me/918383810454" iconBg="rgba(37,211,102,0.12)" iconColor="#25D366"
              icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>}
              label="+91 83838 10454"
            />
            <ContactLink href="tel:+918383810454" iconBg="rgba(79,70,229,0.12)" iconColor="#818CF8"
              icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>}
              label="+91 83838 10454"
            />
            <ContactLink href="mailto:info@fastcreditdeal.com" iconBg="rgba(255,255,255,0.06)" iconColor="rgba(255,255,255,0.4)"
              icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
              label="info@fastcreditdeal.com"
            />
          </div>
        </div>

        {/* Navigate column */}
        <div ref={setRef(1)} className="footer-fade-up" style={{ transitionDelay: '0.1s' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>
            Navigate
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {NAVIGATE_LINKS.map(({ href, label, badge }) => (
              <a
                key={href}
                href={href}
                className="footer-nav-link"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 14, color: 'rgba(255,255,255,0.45)',
                  textDecoration: 'none',
                  padding: '7px 0',
                  borderBottom: '1px solid transparent',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FAFAFA')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              >
                {label}
                {badge && (
                  <span style={{
                    fontSize: 9, fontWeight: 700,
                    background: 'rgba(16,185,129,0.12)', color: '#10B981',
                    borderRadius: 99, padding: '2px 7px',
                    letterSpacing: '0.04em',
                  }}>
                    {badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* We consolidate column */}
        <div ref={setRef(2)} className="footer-fade-up" style={{ transitionDelay: '0.2s' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>
            We consolidate
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {CONSOLIDATE_LINKS.map(label => (
              <a
                key={label}
                href="#"
                className="footer-nav-link"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 14, color: 'rgba(255,255,255,0.45)',
                  textDecoration: 'none',
                  padding: '7px 0',
                  borderBottom: '1px solid transparent',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FAFAFA')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Our promise column */}
        <div ref={setRef(3)} className="footer-fade-up" style={{ transitionDelay: '0.3s' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>
            Our promise
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {PROMISES.map((text, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  fontSize: 13, color: 'rgba(255,255,255,0.4)',
                  lineHeight: 1.5,
                  padding: '7px 0',
                  borderBottom: i < PROMISES.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  transition: 'color 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >
                <div style={{
                  width: 16, height: 16, borderRadius: '50%',
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 1,
                  fontSize: 8, color: '#10B981', fontWeight: 700,
                }}>
                  ✓
                </div>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BANK CHIPS ── */}
      <div
        ref={setRef(4)}
        className="footer-fade-up"
        style={{
          maxWidth: 1200, margin: '48px auto 0',
          padding: '0 48px',
          position: 'relative', zIndex: 2,
          transitionDelay: '0.35s',
        }}
      >
        <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
          Lending partners
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {BANK_CHIPS.map(({ name, color }) => (
            <BankChip key={name} name={name} color={color} />
          ))}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ maxWidth: 1200, margin: '40px auto 0', padding: '0 48px', position: 'relative', zIndex: 2 }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '24px 48px',
        position: 'relative', zIndex: 2,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24, flexWrap: 'wrap',
      }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', lineHeight: 1.5 }}>
          © 2026 Fast Credit Deal. All rights reserved.
          <span style={{ color: 'rgba(255,255,255,0.1)', margin: '0 8px' }}>·</span>
          RBI-Registered Loan DSA
          <span style={{ color: 'rgba(255,255,255,0.1)', margin: '0 8px' }}>·</span>
          Delhi NCR · Mumbai · Bangalore
        </div>

        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', gap: 6 }}>
          Built with{' '}
          <span className="footer-heart" style={{ color: '#EF4444', fontSize: 11 }}>♥</span>
          {' '}for India&apos;s salaried workforce
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          {['Privacy Policy', 'Terms of Service', 'Grievance Redressal'].map(label => (
            <a
              key={label}
              href="#"
              style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; padding: 40px 24px 0 !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  )
}

/* ── Sub-components ────────────────────────────────────────────── */

function StatPill({ color, num, label, icon }: { color: string; num: string; label: string; icon: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 10, padding: '10px 14px',
        transition: 'border-color 0.2s, background 0.2s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'rgba(79,70,229,0.3)'
        el.style.background = 'rgba(79,70,229,0.05)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'rgba(255,255,255,0.07)'
        el.style.background = 'rgba(255,255,255,0.04)'
      }}
    >
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, background: color,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#FAFAFA', letterSpacing: '-0.01em', lineHeight: 1 }}>{num}</div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 500, marginTop: 1 }}>{label}</div>
      </div>
    </div>
  )
}

function ContactLink({ href, iconBg, iconColor, icon, label }: {
  href: string; iconBg: string; iconColor: string; icon: React.ReactNode; label: string
}) {
  return (
    <a
      href={href}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 9,
        fontSize: 13, color: 'rgba(255,255,255,0.45)',
        textDecoration: 'none', transition: 'color 0.2s',
        padding: '4px 0',
      }}
      onMouseEnter={e => (e.currentTarget.style.color = '#FAFAFA')}
      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
    >
      <div style={{
        width: 20, height: 20, borderRadius: 6,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, background: iconBg, color: iconColor,
      }}>
        {icon}
      </div>
      {label}
    </a>
  )
}

function BankChip({ name, color }: { name: string; color: string }) {
  return (
    <div
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 99, padding: '5px 12px 5px 8px',
        fontSize: 12, fontWeight: 600,
        color: 'rgba(255,255,255,0.35)',
        transition: 'border-color 0.2s, color 0.2s, background 0.2s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'rgba(255,255,255,0.15)'
        el.style.color = 'rgba(255,255,255,0.65)'
        el.style.background = 'rgba(255,255,255,0.06)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'rgba(255,255,255,0.07)'
        el.style.color = 'rgba(255,255,255,0.35)'
        el.style.background = 'rgba(255,255,255,0.04)'
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0, display: 'inline-block' }} />
      {name}
    </div>
  )
}
