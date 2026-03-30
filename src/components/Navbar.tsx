'use client'

import { useState, useEffect, useCallback } from 'react'

const NAV_LINKS = ['Home', 'How It Works', 'About', 'Banks', 'Contact']

const FONT = "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif"

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  /* 3D tilt — nav links (±8°) */
  const onLinkMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -8
    const ry = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  8
    e.currentTarget.style.transform =
      `perspective(300px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`
  }, [])
  const onLinkLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = ''
  }, [])

  /* 3D tilt — CTA buttons (±6°) */
  const onBtnMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -6
    const ry = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  6
    e.currentTarget.style.transform =
      `perspective(300px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px) scale(1.02)`
  }, [])
  const onBtnLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = ''
  }, [])

  return (
    <>
      {/* ── Keyframes & responsive rules ── */}
      <style>{`
        @keyframes nav-slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nav-ring-spin { to { transform: rotate(360deg); } }
        @keyframes nav-pulse-dot {
          0%   { box-shadow: 0 0 0 0   rgba(37,211,102,0.5); }
          60%  { box-shadow: 0 0 0 5px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0   rgba(37,211,102,0); }
        }

        .nav-outer-wrap { animation: nav-slide-down 0.6s cubic-bezier(0.23,1,0.32,1) both; }

        .nav-ring { animation: nav-ring-spin 12s linear infinite; transform-origin: center; }
        .nav-logo-wrap:hover .nav-ring { animation-duration: 2.5s; }

        .nav-wa-dot { animation: nav-pulse-dot 2.5s ease infinite; }

        /* Shimmer sweep on WhatsApp button */
        .nav-wa-btn { position: relative; overflow: hidden; }
        .nav-wa-btn::before {
          content: '';
          position: absolute; top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          transition: left 0.5s ease;
        }
        .nav-wa-btn:hover::before { left: 160%; }

        /* Chevron rotates 180° on parent link hover */
        a:hover .nav-chevron { transform: rotate(180deg) translateY(1px); opacity: 0.8; }

        /* Responsive */
        .nav-center-links { display: flex; }
        .nav-calc-btn     { display: flex; }
        .wa-label         { display: inline; }
        .nav-hamburger    { display: none !important; }

        @media (max-width: 860px) {
          .nav-center-links { display: none !important; }
          .nav-calc-btn     { display: none !important; }
          .wa-label         { display: none !important; }
          .nav-hamburger    { display: flex !important; }
        }
        @media (max-width: 500px) {
          .nav-pill   { border-radius: 14px !important; padding: 0 18px !important; }
          .nav-outer-wrap { padding: 12px 16px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .nav-outer-wrap { animation: none; }
          .nav-ring       { animation: none; }
          .nav-wa-dot     { animation: none; }
        }
      `}</style>

      {/* ── Fixed floating wrapper ── */}
      <div
        className="nav-outer-wrap"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 1000,
          display: 'flex', justifyContent: 'center',
          padding: '16px 24px',
          pointerEvents: 'none',
        }}
      >
        <nav
          className="nav-pill"
          style={{
            pointerEvents: 'all',
            width: '100%', maxWidth: 1100,
            background: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(18px) saturate(1.6)',
            WebkitBackdropFilter: 'blur(18px) saturate(1.6)',
            border: `1px solid ${scrolled ? 'rgba(0,0,0,0.11)' : 'rgba(0,0,0,0.08)'}`,
            borderRadius: 18,
            padding: '0 28px',
            height: 64,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            boxShadow: scrolled
              ? '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)'
              : '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05)',
            transition: 'box-shadow 0.4s ease, background 0.4s ease, border-color 0.4s ease',
            position: 'relative',
            fontFamily: FONT,
          }}
        >
          {/* ── Logo ── */}
          <a
            href="#"
            className="nav-logo-wrap"
            aria-label="Fast Credit Deal Home"
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              textDecoration: 'none', flexShrink: 0,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'perspective(400px) rotateY(-6deg) rotateX(2deg) scale(1.03)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = '' }}
          >
            {/* Spinning ring mark */}
            <div style={{ position: 'relative', width: 38, height: 38, flexShrink: 0 }}>
              <svg className="nav-ring" viewBox="0 0 38 38" fill="none" width="38" height="38">
                <defs>
                  <linearGradient id="navRingGrad" x1="0" y1="0" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"   stopColor="#f5c842" />
                    <stop offset="38%"  stopColor="#e8960a" />
                    <stop offset="75%"  stopColor="#c47b00" />
                    <stop offset="100%" stopColor="#111111" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <circle cx="19" cy="19.5" r="15" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="4" />
                <circle cx="19" cy="19"   r="15" fill="none" stroke="#ece9e2" strokeWidth="2.5" />
                <circle cx="19" cy="19"   r="15" fill="none"
                  stroke="url(#navRingGrad)" strokeWidth="2.5"
                  strokeDasharray="88 6" strokeLinecap="round"
                  transform="rotate(-95 19 19)"
                />
                <circle cx="19" cy="19" r="11" fill="#ffffff" />
                <circle cx="19" cy="19" r="11" fill="none" stroke="#ece9e2" strokeWidth="0.5" />
              </svg>
              {/* Geometric F mark */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                <svg viewBox="0 0 18 18" width="13" height="13" fill="none">
                  <rect x="4"   y="3"   width="2.2" height="12"  rx="0.9" fill="#111111" />
                  <rect x="4"   y="3"   width="9.5" height="2.2" rx="0.9" fill="#111111" />
                  <rect x="4"   y="8.4" width="7.5" height="2"   rx="0.9" fill="#111111" />
                  <circle cx="13.5" cy="14.2" r="1.5" fill="#e8960a" />
                </svg>
              </div>
            </div>

            {/* Wordmark */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ width: 18, height: 2, background: 'linear-gradient(90deg,#e8960a,#f5c842)', borderRadius: 2 }} />
              <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 15, color: '#111111', letterSpacing: '-0.025em', lineHeight: 1, whiteSpace: 'nowrap' }}>
                Fast <span style={{ color: '#e8960a' }}>Credit</span> Deal
              </div>
            </div>
          </a>

          {/* ── Center nav links ── */}
          <ul
            className="nav-center-links"
            style={{ alignItems: 'center', gap: 4, listStyle: 'none', padding: 0, margin: 0, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
          >
            {NAV_LINKS.map(link => (
              <li key={link}>
                <a
                  href={link === 'Home' ? '#' : `#${link.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{
                    position: 'relative',
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '7px 14px',
                    fontFamily: FONT,
                    fontWeight: activeLink === link ? 700 : 600,
                    fontSize: 13.5,
                    color: activeLink === link ? '#111111' : '#333333',
                    textDecoration: 'none',
                    borderRadius: 10,
                    letterSpacing: '-0.01em',
                    transition: 'color 0.2s ease, background 0.2s ease',
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center bottom',
                  }}
                  onMouseMove={onLinkMove}
                  onMouseLeave={e => {
                    onLinkLeave(e)
                    e.currentTarget.style.background = ''
                    e.currentTarget.style.color = activeLink === link ? '#111111' : '#333333'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#111111'
                    e.currentTarget.style.background = 'rgba(0,0,0,0.045)'
                  }}
                  onClick={() => setActiveLink(link)}
                >
                  {link === 'How It Works' ? (
                    <>
                      How It Works
                      <Chevron />
                    </>
                  ) : link}

                  {activeLink === link && (
                    <span style={{
                      position: 'absolute', bottom: 4,
                      left: '50%', transform: 'translateX(-50%)',
                      width: 16, height: 2,
                      background: 'linear-gradient(90deg,#e8960a,#f5c842)',
                      borderRadius: 2,
                    }} />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Right CTAs ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>

            {/* Calculate Savings */}
            <a
              href="#calculator"
              className="nav-calc-btn"
              style={{
                alignItems: 'center', gap: 6,
                padding: '9px 16px',
                background: 'transparent', color: '#111111',
                fontFamily: FONT, fontWeight: 600, fontSize: 13,
                letterSpacing: '-0.01em',
                borderRadius: 12, textDecoration: 'none',
                border: '1.5px solid rgba(0,0,0,0.08)',
                cursor: 'pointer',
                transition: 'transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease, border-color 0.25s ease, background 0.25s ease, color 0.25s ease',
                transformStyle: 'preserve-3d',
              }}
              onMouseMove={onBtnMove}
              onMouseLeave={e => {
                onBtnLeave(e)
                e.currentTarget.style.background    = 'transparent'
                e.currentTarget.style.borderColor   = 'rgba(0,0,0,0.08)'
                e.currentTarget.style.color         = '#111111'
                e.currentTarget.style.boxShadow     = ''
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background    = 'rgba(232,150,10,0.06)'
                e.currentTarget.style.borderColor   = 'rgba(232,150,10,0.4)'
                e.currentTarget.style.color         = '#c47b00'
                e.currentTarget.style.boxShadow     = '0 6px 20px rgba(232,150,10,0.12)'
              }}
            >
              Calculate Savings
            </a>

            {/* WhatsApp Us */}
            <a
              href="https://wa.me/918383810454"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-wa-btn"
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '9px 18px',
                background: '#111111', color: '#ffffff',
                fontFamily: FONT, fontWeight: 700, fontSize: 13,
                letterSpacing: '-0.01em',
                borderRadius: 12, textDecoration: 'none',
                border: 'none', cursor: 'pointer',
                transition: 'transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease, background 0.3s ease',
                transformStyle: 'preserve-3d',
              }}
              onMouseMove={onBtnMove}
              onMouseLeave={e => {
                onBtnLeave(e)
                e.currentTarget.style.background  = '#111111'
                e.currentTarget.style.boxShadow   = ''
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background  = '#1a1a1a'
                e.currentTarget.style.boxShadow   = '0 8px 24px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.1)'
              }}
            >
              <span className="nav-wa-dot" style={{ width: 7, height: 7, background: '#25D366', borderRadius: '50%', flexShrink: 0 }} />
              <span className="wa-label">WhatsApp Us</span>
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="nav-hamburger"
              style={{ flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8 }}
            >
              <span style={{ display: 'block', width: 22, height: 2, background: '#111111', borderRadius: 2, transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)', transform: mobileOpen ? 'translateY(7px) rotate(45deg)'  : '' }} />
              <span style={{ display: 'block', width: 22, height: 2, background: '#111111', borderRadius: 2, transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1), opacity 0.25s', opacity: mobileOpen ? 0 : 1, transform: mobileOpen ? 'scaleX(0)' : '' }} />
              <span style={{ display: 'block', width: 22, height: 2, background: '#111111', borderRadius: 2, transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)', transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : '' }} />
            </button>
          </div>
        </nav>
      </div>

      {/* ── Mobile slide-down drawer ── */}
      <div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          zIndex: 999,
          padding: '88px 28px 36px',
          display: 'flex', flexDirection: 'column', gap: 4,
          transform: mobileOpen ? 'translateY(0)' : 'translateY(-110%)',
          transition: 'transform 0.45s cubic-bezier(0.23,1,0.32,1)',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
        }}
      >
        {NAV_LINKS.map(link => (
          <a
            key={link}
            href={link === 'Home' ? '#' : `#${link.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => { setActiveLink(link); setMobileOpen(false) }}
            style={{
              fontFamily: FONT, fontWeight: 600, fontSize: 18,
              color: '#111111', textDecoration: 'none',
              padding: '14px 0',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              transition: 'color 0.2s, padding-left 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#e8960a'; e.currentTarget.style.paddingLeft = '6px' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#111111'; e.currentTarget.style.paddingLeft = '0' }}
          >
            {link}
            <span style={{ fontSize: 14, opacity: 0.3 }}>→</span>
          </a>
        ))}

        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a
            href="#calculator"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              padding: '14px 20px',
              background: 'transparent', color: '#111111',
              fontFamily: FONT, fontWeight: 600, fontSize: 14,
              borderRadius: 14, textDecoration: 'none',
              border: '1.5px solid rgba(0,0,0,0.08)',
            }}
          >
            Calculate My Savings
          </a>
          <a
            href="https://wa.me/918383810454"
            target="_blank" rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8,
              padding: '14px 20px',
              background: '#111111', color: '#ffffff',
              fontFamily: FONT, fontWeight: 700, fontSize: 14,
              borderRadius: 14, textDecoration: 'none',
            }}
          >
            <span className="nav-wa-dot" style={{ width: 7, height: 7, background: '#25D366', borderRadius: '50%', flexShrink: 0 }} />
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* Spacer so fixed nav doesn't overlap hero */}
      <div style={{ height: 96 }} aria-hidden="true" />
    </>
  )
}

function Chevron() {
  return (
    <span
      style={{ fontSize: 10, opacity: 0.5, display: 'inline-block', marginTop: 1, transition: 'transform 0.25s ease' }}
      className="nav-chevron"
    >▾</span>
  )
}
