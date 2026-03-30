const items = [
  'RBI Regulated Bank Partners',
  '40+ Banks & NBFCs',
  '₹500 Cr+ Disbursed',
  '13 Years of Experience',
  '10,000+ Customers Served',
  '2-Hour WhatsApp Response',
  'Zero Rejected Applications',
  '48-Hour Bank Disbursal',
]

export default function TickerStrip() {
  const doubled = [...items, ...items]

  return (
    <div style={{
      backgroundColor: '#18181B',
      overflow: 'hidden',
      padding: '11px 0',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
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
              fontWeight: 500,
              color: 'rgba(255,255,255,0.45)',
              whiteSpace: 'nowrap',
              padding: '0 32px',
              borderRight: '1px solid rgba(255,255,255,0.07)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
