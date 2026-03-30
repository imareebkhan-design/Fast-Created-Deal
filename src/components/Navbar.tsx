'use client'

import { useState, useEffect } from 'react'
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid #E4E4E7',
        boxShadow: scrolled ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
        transition: 'box-shadow 0.25s ease',
        fontFamily: 'var(--font-sans)',
      }}
      className="h-16 sm:h-14"
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Left — text logo */}
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '18px',
          fontWeight: 600,
          color: '#09090B',
          letterSpacing: '-0.02em',
        }}>
          Fast Credit Deal
        </span>

        {/* Right — phone + availability */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#25D366',
            flexShrink: 0,
            animation: 'wa-pulse 2.5s infinite',
          }} />
          <div>
            <a
              href="tel:+918383810454"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                fontWeight: 600,
                color: '#09090B',
                textDecoration: 'none',
                display: 'block',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#4F46E5')}
              onMouseLeave={e => (e.currentTarget.style.color = '#09090B')}
            >
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#25D366', marginRight: '4px' }}>WhatsApp</span>+91 83838 10454
            </a>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              color: '#A1A1AA',
              display: 'block',
              lineHeight: 1.2,
            }}>
              Responds in &lt; 2 hrs
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
