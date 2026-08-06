'use client'
import { useState, useEffect } from 'react'
import { X, ArrowRight } from 'lucide-react'

export function BlogEarlyAccessBanner() {
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null)
  const [dismissed, setDismissed] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'sold_out'>('idle')

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('banner_dismissed')) {
      setDismissed(true)
    }
    fetch('/api/newsletter')
      .then(r => r.json())
      .then(d => {
        if (d.full) setStatus('sold_out')
        else setSpotsLeft(1000 - (d.count ?? 0))
      })
      .catch(() => {})
  }, [])

  function dismiss() {
    setDismissed(true)
    sessionStorage.setItem('banner_dismissed', '1')
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.status === 410 || data.error === 'sold_out') setStatus('sold_out')
      else if (res.ok) { setStatus('success'); if (data.spot) setSpotsLeft(1000 - data.spot) }
    } catch { setStatus('idle') }
  }

  if (dismissed || status === 'sold_out') return null

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      background: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.08)',
      padding: '14px 24px',
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          {status === 'success' ? (
            <p style={{ margin: 0, fontSize: 14, color: '#86efac', fontWeight: 600 }}>✓ You're in — check your inbox for the activation link.</p>
          ) : (
            <>
              <p style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 700, color: '#fff' }}>
                First 1,000 members get Pro at $40/month.
              </p>
              {spotsLeft !== null && (
                <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>{spotsLeft} spots remaining</p>
              )}
            </>
          )}
        </div>
        {status !== 'success' && (
          <form onSubmit={submit} style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                height: 38, padding: '0 12px', fontSize: 13, borderRadius: 7,
                border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)',
                color: '#fff', outline: 'none', width: 200,
              }}
            />
            <button type="submit" disabled={status === 'loading'} style={{
              height: 38, padding: '0 16px', background: '#4169E1', color: '#fff',
              border: 'none', borderRadius: 7, fontSize: 13, fontWeight: 600,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              opacity: status === 'loading' ? 0.7 : 1, whiteSpace: 'nowrap',
            }}>
              {status === 'loading' ? 'Saving…' : <><span>Claim spot</span><ArrowRight size={12} /></>}
            </button>
          </form>
        )}
        <button onClick={dismiss} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 4, flexShrink: 0 }}>
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
