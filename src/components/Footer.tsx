'use client'

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#F4F4F5',
      borderTop: '1px solid #E4E4E7',
      paddingTop: '52px',
      paddingBottom: '28px',
      fontFamily: 'var(--font-sans)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          style={{ marginBottom: '40px' }}
        >
          {/* Col 1 — brand */}
          <div>
            <p style={{ fontSize: '16px', fontWeight: 600, color: '#09090B', letterSpacing: '-0.02em', marginBottom: '10px' }}>
              Fast Credit Deal
            </p>
            <p style={{ fontSize: '14px', color: '#52525B', lineHeight: 1.65, marginBottom: '14px' }}>
              EMI consolidation specialists for salaried professionals. 13 years of trust.
            </p>
            <p style={{ fontSize: '14px', color: '#09090B', fontWeight: 500 }}>+91 83838 10454</p>
            <p style={{ fontSize: '14px', color: '#09090B', fontWeight: 500 }}>info@fastcreditdeal.com</p>
          </div>

          {/* Col 2 — quick links */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 600, color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                ['#pain', 'The Problem'],
                ['#results', 'Real Results'],
                ['#process', 'How It Works'],
                ['#emi-calculator', 'EMI Calculator'],
                ['#form', 'Get Free Analysis'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    style={{ fontSize: '14px', color: '#52525B', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#09090B')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#52525B')}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — our promise */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 600, color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
              Our Promise
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'RBI Regulated Bank Partners',
                '40+ Banks & NBFCs Network',
                '₹500 Cr+ Successfully Disbursed',
                '13 Years of Experience',
                '10,000+ Customers Served',
                '2-Hour WhatsApp Response',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '14px', height: '14px', borderRadius: '50%',
                    background: '#059669',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: '1px',
                  }}>
                    <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
                      <path d="M1 2.5L2.5 4L6 1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{ fontSize: '13px', color: '#52525B' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{ borderTop: '1px solid #E4E4E7', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}
          className="md:flex-row md:justify-between"
        >
          <p style={{ fontSize: '12px', color: '#A1A1AA' }}>© 2026 Fast Credit Deal. All Rights Reserved.</p>
          <p style={{ fontSize: '12px', color: '#A1A1AA' }}>Building No. 8, 3rd Floor, DLF Industrial Area, Kirti Nagar, West Delhi – 110015</p>
        </div>
      </div>
    </footer>
  )
}
