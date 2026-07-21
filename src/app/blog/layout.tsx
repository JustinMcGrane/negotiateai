import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <header style={{
        borderBottom: '0.5px solid #e5e7eb',
        padding: '0 32px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, background: '#fff', zIndex: 50,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/logo.svg" alt="Hayven" width={190} height={52} style={{ objectFit: 'contain' }} priority />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/login" style={{ fontSize: 14, color: '#6b7280', textDecoration: 'none', padding: '7px 14px' }}>Sign in</Link>
          <Link href="/signup" style={{
            fontSize: 14, fontWeight: 600, background: '#141414', color: '#fff',
            textDecoration: 'none', padding: '8px 18px', borderRadius: 8,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>Get started free <ArrowRight size={14} /></Link>
        </div>
      </header>
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px 96px' }}>
        {children}
      </main>
      <footer style={{ borderTop: '0.5px solid #e5e7eb', padding: '32px 24px', textAlign: 'center' }}>
        <Link href="/" style={{ fontSize: 13, color: '#94a3b8', textDecoration: 'none' }}>← Back to Hayven</Link>
      </footer>
    </div>
  )
}
