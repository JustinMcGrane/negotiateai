import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  openGraph: {
    siteName: 'Hayven',
    type: 'article',
    images: [{ url: 'https://gethayven.com/logo.png', width: 1200, height: 630, alt: 'Hayven' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@gethayven',
  },
}

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
            fontSize: 14, fontWeight: 700,
            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
            color: '#fff',
            textDecoration: 'none', padding: '8px 18px', borderRadius: 8,
            display: 'flex', alignItems: 'center', gap: 6,
            boxShadow: '0 3px 10px rgba(239,68,68,0.3)',
          }}>Upgrade to Pro Now <ArrowRight size={14} /></Link>
        </div>
      </header>
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px 120px' }}>
        {children}
      </main>
      <footer style={{ borderTop: '0.5px solid #e5e7eb', padding: '32px 24px', textAlign: 'center' }}>
        <Link href="/" style={{ fontSize: 13, color: '#94a3b8', textDecoration: 'none' }}>← Back to Hayven</Link>
      </footer>
    </div>
  )
}
