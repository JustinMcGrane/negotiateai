import Link from 'next/link'
import { BrandMark } from '@/components/negotiate/BrandMark'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <header style={{ borderBottom: '0.5px solid var(--color-border-tertiary)', padding: '0 24px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <BrandMark size={22} />
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)' }}>NegotiateAI</span>
        </Link>
        <Link href="/signup" style={{ fontSize: 13, background: '#141414', color: '#fff', textDecoration: 'none', padding: '6px 14px', borderRadius: 8 }}>Start free →</Link>
      </header>
      <main style={{ maxWidth: 680, margin: '0 auto', padding: '48px 24px 80px' }}>
        {children}
      </main>
    </div>
  )
}
