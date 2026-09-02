'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Props {
  children: React.ReactNode
}

export function ProGate({ children }: Props) {
  const [status, setStatus] = useState<'loading' | 'free' | 'pro'>('loading')

  useEffect(() => {
    fetch('/api/subscription-status')
      .then(r => r.json())
      .then(d => setStatus(d.subscribed ? 'pro' : 'free'))
      .catch(() => setStatus('free'))
  }, [])

  if (status === 'loading') {
    return <div style={{ padding: '40px 0', display: 'flex', justifyContent: 'center' }}><div className="skeleton" style={{ width: 320, height: 160, borderRadius: 12 }} /></div>
  }

  if (status === 'free') {
    return (
      <div style={{ margin: '32px 0', background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 14, padding: '40px 32px', textAlign: 'center', maxWidth: 520 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>⭐</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#92400e', marginBottom: 8 }}>Pro plan required</div>
        <div style={{ fontSize: 14, color: '#78350f', lineHeight: 1.6, marginBottom: 28 }}>
          This tool is available on the Pro plan — $20/month for unlimited access to every tool, AI coaching, resume analysis, and more.
        </div>
        <Link href="/upgrade" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f59e0b', color: '#fff', padding: '12px 28px', borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
          Upgrade to Pro Now →
        </Link>
        <div style={{ fontSize: 12, color: '#92400e', marginTop: 12, opacity: 0.7 }}>Cancel anytime · No contracts</div>
      </div>
    )
  }

  return <>{children}</>
}
