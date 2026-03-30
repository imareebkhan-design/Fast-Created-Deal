const items = [
  'RBI Regulated Bank Partners',
  '40+ Banks & NBFCs',
  '₹500 Cr+ Disbursed',
  '13 Years of Experience',
  '500+ Clients Saved',
  '2-Hour WhatsApp Response',
  'Zero Rejected Applications',
  '48-Hour Bank Disbursal',
]

export default function TickerStrip() {
  const doubled = [...items, ...items]

  return (
    <div style={{
      backgroundColor: '#0f0f0f',
      overflow: 'hidden',
      padding: '10px 0',
      borderTop: '0.5px solid rgba(255,255,255,0.06)',
      borderBottom: '0.5px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        display: 'flex',
        width: 'max-content',
        animation: 'ticker 36s linear infinite',
      }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.7)',
              whiteSpace: 'nowrap',
              padding: '0 28px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '28px',
            }}
          >
            {item}
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '8px', lineHeight: 1 }}>●</span>
          </span>
        ))}
      </div>
    </div>
  )
}
