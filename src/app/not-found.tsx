import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f8fafc',
      padding: '24px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 72, fontWeight: 900, color: '#e2e8f0', lineHeight: 1 }}>404</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginTop: 16, marginBottom: 8 }}>
        Page not found
      </div>
      <div style={{ fontSize: 14, color: '#64748b', marginBottom: 32, maxWidth: 320, lineHeight: 1.6 }}>
        The page you are looking for does not exist or has been moved.
      </div>
      <Link href="/dashboard" style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: '#2D6EA8', color: '#fff',
        padding: '11px 22px', borderRadius: 9,
        fontSize: 14, fontWeight: 600, textDecoration: 'none',
      }}>
        Go to dashboard
      </Link>
    </div>
  )
}
