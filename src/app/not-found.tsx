import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FAFAFA',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'var(--font-sans)',
      textAlign: 'center',
    }}>
      <p style={{ fontSize: '11px', fontWeight: 600, color: '#4F46E5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
        404
      </p>
      <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700, color: '#09090B', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '14px' }}>
        Page not found
      </h1>
      <p style={{ fontSize: '16px', color: '#52525B', lineHeight: 1.7, maxWidth: '380px', marginBottom: '32px' }}>
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to calculating your savings.
      </p>
      <Link
        href="/"
        style={{
          height: '46px',
          padding: '0 24px',
          background: '#4F46E5',
          color: '#FFFFFF',
          fontSize: '15px',
          fontWeight: 600,
          borderRadius: '7px',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          letterSpacing: '-0.01em',
        }}
      >
        Back to home
      </Link>
    </div>
  )
}
