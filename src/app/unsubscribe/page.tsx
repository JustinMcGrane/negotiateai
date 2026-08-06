import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Unsubscribe | Hayven',
  description: 'Unsubscribe from Hayven emails.',
}

export default function UnsubscribePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '40px 16px' }}>
      <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
        <div style={{ marginBottom: 24, fontSize: 32 }}>✉️</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 12, letterSpacing: '-0.02em' }}>Unsubscribe</h1>
        <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.7, marginBottom: 32 }}>
          To unsubscribe from Hayven emails, reply to any email you received from us with the word &ldquo;unsubscribe&rdquo; in the subject line, or contact us at{' '}
          <a href="mailto:hello@gethayven.com" style={{ color: '#4169E1', textDecoration: 'none' }}>hello@gethayven.com</a>.
        </p>
        <Link href="/" style={{ display: 'inline-block', fontSize: 14, color: '#64748b', textDecoration: 'none' }}>
          ← Back to Hayven
        </Link>
      </div>
    </div>
  )
}
