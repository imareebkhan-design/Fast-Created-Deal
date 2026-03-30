'use client'

import { useEffect, useRef, useState } from 'react'

function useVisible(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, visible] as const
}

const ff = 'var(--font-sans)'

export default function ProblemSection() {
  const [sectionRef, sectionVisible] = useVisible(0.06)

  return (
    <section
      style={{
        background: '#F8F8FA',
        padding: 'clamp(64px, 8vw, 100px) clamp(24px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dot grid background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(79,70,229,0.055) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }} />
      {/* Red blob top-right */}
      <div style={{
        position: 'absolute', width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%)',
        top: '-100px', right: '-100px', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Grid */}
      <div
        ref={sectionRef}
        style={{
          position: 'relative', zIndex: 1,
          maxWidth: '1200px', margin: '0 auto',
          display: 'grid',
          gap: '72px',
          alignItems: 'start',
        }}
        className="grid-cols-1 lg:grid-cols-[52fr_48fr]"
      >

        {/* ── LEFT ── */}
        <div>
          <span style={{
            display: 'block', fontFamily: ff, fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4F46E5',
            marginBottom: '20px',
          }}>
            The Problem
          </span>

          <h2 style={{
            fontFamily: ff,
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 900, lineHeight: 1.06,
            letterSpacing: '-0.03em', color: '#09090B',
            marginBottom: '24px',
          }}>
            Your salary hits.<br />It&rsquo;s gone before<br />you breathe.
          </h2>

          <p style={{
            fontFamily: ff, fontSize: '16px', fontStyle: 'italic',
            color: '#52525B', lineHeight: 1.7, maxWidth: '420px',
            marginBottom: '52px', paddingLeft: '16px',
            borderLeft: '2px solid #E4E4E7',
          }}>
            &ldquo;You&rsquo;re not bad with money. You were sold the wrong loans at the wrong rates. That&rsquo;s fixable.&rdquo;
          </p>

          {/* Problem items */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              {
                num: '01',
                title: 'Multiple EMIs bleeding you dry',
                desc: '3–5 different EMIs. Different banks. Different due dates. One missed payment — your CIBIL takes a hit you didn\'t deserve.',
              },
              {
                num: '02',
                title: 'Paying 2× more interest than you should',
                desc: 'Personal loans at 18–24%. Credit card rollovers at 36–42%. You\'re not spending more — you\'re being overcharged.',
              },
              {
                num: '03',
                title: 'Nobody is in your corner',
                desc: 'Banks won\'t restructure their own loans. It costs them income. You\'re managing it alone with no clear path out.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`ps-item${sectionVisible ? ' ps-on' : ''}`}
                style={{
                  padding: '22px 0',
                  borderTop: i === 0 ? '1px solid #E4E4E7' : 'none',
                  borderBottom: '1px solid #E4E4E7',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start',
                  transitionDelay: `${i * 0.13}s`,
                }}
              >
                <span style={{
                  fontFamily: ff, fontSize: '12px', fontWeight: 700,
                  color: '#A1A1AA', minWidth: '26px', paddingTop: '3px',
                }}>
                  {item.num}
                </span>
                <div>
                  <div style={{ fontFamily: ff, fontSize: '17px', fontWeight: 700, color: '#09090B', marginBottom: '6px', letterSpacing: '-0.01em' }}>
                    {item.title}
                  </div>
                  <div style={{ fontFamily: ff, fontSize: '15px', color: '#52525B', lineHeight: 1.65 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div
          className="lg:sticky"
          style={{ top: '88px', display: 'flex', flexDirection: 'column', gap: '12px' }}
        >

          {/* Card 1 — Salary drain */}
          <div
            className={`ps-vc-1${sectionVisible ? ' ps-on' : ''}`}
            style={{
              background: '#FFFFFF', border: '1px solid #E4E4E7',
              borderRadius: '16px', padding: '18px 20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 6px 18px rgba(0,0,0,0.07), 0 16px 40px rgba(0,0,0,0.04)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{ fontFamily: ff, fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#A1A1AA', marginBottom: '8px' }}>
              Your salary this month
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '4px' }}>
              <div style={{ fontFamily: ff, fontSize: '30px', fontWeight: 900, color: '#09090B', letterSpacing: '-0.03em', lineHeight: 1 }}>₹1,20,000</div>
              <div style={{ fontFamily: ff, fontSize: '10px', fontWeight: 700, background: '#ECFDF5', color: '#059669', padding: '4px 10px', borderRadius: '99px', marginTop: '4px' }}>
                Credited ✓
              </div>
            </div>

            {/* Drain bar */}
            <div style={{ height: '7px', borderRadius: '99px', background: '#F0F0F2', overflow: 'hidden', margin: '14px 0 8px' }}>
              <div className="ps-drain-bar" style={{ height: '100%', borderRadius: '99px', width: '85%', background: '#059669' }} />
            </div>

            {/* Alert */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontFamily: ff, fontSize: '12px', fontWeight: 700, color: '#DC2626', marginBottom: '14px', lineHeight: 1.4 }}>
              <span className="ps-dot-r" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#DC2626', flexShrink: 0, display: 'inline-block' }} />
              ₹97,000 gone to EMIs before you spent a rupee
            </div>

            {/* EMI list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { color: '#004C8F', name: 'HDFC Personal Loan',    rate: '21%', amt: '₹32,000', strike: false },
                { color: '#C7000B', name: 'ICICI Credit Card',     rate: '38%', amt: '₹28,500', strike: false },
                { color: '#004C8F', name: 'HDFC Credit Card',      rate: '42%', amt: '₹24,000', strike: true  },
                { color: '#ED7D2B', name: 'Bajaj — iPhone 15 Pro', rate: '14%', amt: '₹12,500', strike: false },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 11px', borderRadius: '9px', background: '#FAFAFA', border: '1px solid #F0F0F2' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '3px', flexShrink: 0, background: row.color }} />
                  <div style={{ fontFamily: ff, fontSize: '12px', fontWeight: 600, color: '#27272A', flex: 1 }}>{row.name}</div>
                  <div style={{ fontFamily: ff, fontSize: '10px', fontWeight: 700, color: '#DC2626', background: '#FEF2F2', padding: '2px 7px', borderRadius: '5px', whiteSpace: 'nowrap' }}>{row.rate}</div>
                  <div style={{ fontFamily: ff, fontSize: '13px', fontWeight: 800, color: '#DC2626', letterSpacing: '-0.01em', whiteSpace: 'nowrap', position: 'relative' }}>
                    {row.amt}
                    {row.strike && (
                      <span
                        className={`ps-emi-strike${sectionVisible ? '' : ''}`}
                        style={{ position: 'absolute', top: '50%', left: 0, height: '2px', background: '#DC2626', borderRadius: '1px', display: 'block' }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Shimmer */}
            <div
              className="card-shimmer"
              style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)',
              }}
            />
          </div>

          {/* Mini cards row — flat, no float */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div
              className={`ps-mini-card ps-mc-1${sectionVisible ? ' ps-on' : ''}`}
              style={{ background: '#FFFFFF', border: '1px solid #E4E4E7', borderRadius: '14px', padding: '14px 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05), 0 6px 20px rgba(0,0,0,0.06)' }}
            >
              <div style={{ fontFamily: ff, fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#A1A1AA', marginBottom: '4px' }}>Left after EMIs</div>
              <div style={{ fontFamily: ff, fontSize: '24px', fontWeight: 900, color: '#DC2626', letterSpacing: '-0.025em', lineHeight: 1, marginTop: '2px' }}>₹23,000</div>
              <div style={{ fontFamily: ff, fontSize: '12px', color: '#A1A1AA' }}>of ₹1.2L salary</div>
              <div style={{ height: '4px', borderRadius: '99px', background: '#F0F0F2', overflow: 'hidden', margin: '8px 0 5px' }}>
                <div style={{ height: '100%', width: '19%', borderRadius: '99px', background: '#DC2626' }} />
              </div>
              <div style={{ fontFamily: ff, fontSize: '11px', color: '#A1A1AA' }}>Only 19% left for life</div>
            </div>

            <div
              className={`ps-mini-card ps-mc-2${sectionVisible ? ' ps-on' : ''}`}
              style={{ background: '#FFFFFF', border: '1px solid #E4E4E7', borderRadius: '14px', padding: '14px 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05), 0 6px 20px rgba(0,0,0,0.06)' }}
            >
              <div style={{ fontFamily: ff, fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#A1A1AA', marginBottom: '4px' }}>You&rsquo;re paying</div>
              <div style={{ fontFamily: ff, fontSize: '14px', fontWeight: 800, color: '#09090B', marginTop: '4px' }}>Way too much.</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '8px' }}>
                {['18–24% PL', '36–42% CC'].map((pill) => (
                  <span key={pill} style={{ fontFamily: ff, fontSize: '11px', fontWeight: 700, padding: '4px 9px', borderRadius: '99px', background: '#FEF2F2', color: '#DC2626' }}>{pill}</span>
                ))}
              </div>
              <div style={{ fontFamily: ff, fontSize: '11px', color: '#A1A1AA', marginTop: '8px' }}>vs 10–12% if consolidated</div>
            </div>
          </div>

          {/* Dark card 1 — Banks won't help */}
          <div
            className={`ps-vc-4${sectionVisible ? ' ps-on' : ''}`}
            style={{
              background: '#18181B', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px', padding: '18px 20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.22), 0 12px 40px rgba(0,0,0,0.16)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{ fontFamily: ff, fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '8px' }}>The real problem</div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontFamily: ff, fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.92)', marginBottom: '7px', lineHeight: 1.45 }}>
              <span className="ps-dot-r" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#DC2626', flexShrink: 0, marginTop: '3px', display: 'inline-block' }} />
              Banks won&rsquo;t restructure their own loans
            </div>
            <div style={{ fontFamily: ff, fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
              It costs them income. They profit from your high-interest debt. Asking your bank to lower your rate is asking them to earn less.
            </div>
            <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginTop: '12px' }}>
              {['HDFC', 'ICICI', 'Bajaj', 'Axis', 'Kotak'].map((bank) => (
                <span key={bank} style={{ fontFamily: ff, fontSize: '11px', fontWeight: 600, padding: '5px 12px', borderRadius: '7px', background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.09)' }}>{bank}</span>
              ))}
              <span style={{ fontFamily: ff, fontSize: '11px', fontWeight: 800, padding: '5px 12px', borderRadius: '7px', background: 'rgba(79,70,229,0.28)', color: 'rgba(255,255,255,0.92)', border: '1px solid rgba(79,70,229,0.55)' }}>You — alone</span>
            </div>
          </div>

          {/* Dark card 2 — Payment chaos */}
          <div
            className={`ps-vc-5${sectionVisible ? ' ps-on' : ''}`}
            style={{
              background: '#18181B', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px', padding: '18px 20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.22), 0 12px 40px rgba(0,0,0,0.16)',
            }}
          >
            <div style={{ fontFamily: ff, fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '8px' }}>Payment chaos</div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontFamily: ff, fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.92)', marginBottom: '7px', lineHeight: 1.45 }}>
              <span className="ps-dot-a" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B', flexShrink: 0, marginTop: '3px', display: 'inline-block' }} />
              4 different due dates. One slip destroys your CIBIL.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginTop: '10px' }}>
              {[
                { bank: 'HDFC Personal Loan',   date: '5th every month',  hot: false },
                { bank: 'ICICI Credit Card',     date: '⚠ Due in 2 days', hot: true  },
                { bank: 'HDFC Credit Card',      date: '18th every month', hot: false },
                { bank: 'Bajaj Consumer Loan',   date: '28th every month', hot: false },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <span style={{ fontFamily: ff, fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.65)' }}>{row.bank}</span>
                  <span style={{ fontFamily: ff, fontSize: '11px', fontWeight: 700, color: row.hot ? '#EF4444' : 'rgba(255,255,255,0.35)' }}>{row.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dark card 3 — CIBIL drop */}
          <div
            className={`ps-vc-6${sectionVisible ? ' ps-on' : ''}`}
            style={{
              background: '#18181B', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px', padding: '18px 20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.22), 0 12px 40px rgba(0,0,0,0.16)',
            }}
          >
            <div style={{ fontFamily: ff, fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '8px' }}>The silent damage</div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontFamily: ff, fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.92)', marginBottom: '7px', lineHeight: 1.45 }}>
              <span className="ps-dot-i" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#818CF8', flexShrink: 0, marginTop: '3px', display: 'inline-block' }} />
              Your CIBIL is quietly getting destroyed
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', padding: '10px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px' }}>
              <div>
                <div style={{ fontFamily: ff, fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '4px' }}>Current score</div>
                <div style={{ fontFamily: ff, fontSize: '30px', fontWeight: 900, color: '#EF4444', letterSpacing: '-0.03em', lineHeight: 1 }}>661</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: ff, fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through' }}>748</div>
                <div style={{ fontFamily: ff, fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}>18 months ago</div>
              </div>
            </div>
            <div style={{ fontFamily: ff, fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '7px', lineHeight: 1.5 }}>
              High credit utilisation + multiple active EMIs = banks flag you as high risk. You get rejected or offered even worse rates — exactly when you need help most.
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
