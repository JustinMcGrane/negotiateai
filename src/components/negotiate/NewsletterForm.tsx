'use client'
import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'sold_out'>('idle')
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/newsletter')
      .then(r => r.json())
      .then(d => {
        if (d.full) {
          setStatus('sold_out')
        } else {
          setSpotsLeft(1000 - (d.count ?? 0))
        }
      })
      .catch(() => {})
  }, [])

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
      if (res.status === 410 || data.error === 'sold_out') {
        setStatus('sold_out')
      } else if (res.ok) {
        setStatus('success')
        if (data.spot) setSpotsLeft(1000 - data.spot)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sold_out') {
    return (
      <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Early access closed</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>All 1,000 spots have been claimed.</div>
        <div style={{ fontSize: 14, color: '#475569' }}>Sign up at the regular price — Pro is $49/month.</div>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>You&apos;re locked in</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>Check your inbox.</div>
        <div style={{ fontSize: 14, color: '#475569' }}>We&apos;ve sent you a link to activate your $40/month rate before it&apos;s gone.</div>
      </div>
    )
  }

  return (
    <div>
      {spotsLeft !== null && (
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{ display: 'inline-block', fontSize: 13, fontWeight: 700, color: spotsLeft < 100 ? '#dc2626' : '#fff', background: spotsLeft < 100 ? '#fef2f2' : 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: 20 }}>
            {spotsLeft} of 1,000 spots remaining
          </span>
        </div>
      )}
      <form onSubmit={submit} style={{ display: 'flex', gap: 8, maxWidth: 480, margin: '0 auto', flexWrap: 'wrap' }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          style={{
            flex: 1, minWidth: 200, height: 48, padding: '0 16px', fontSize: 14,
            border: '1px solid #334155', borderRadius: 9, background: 'rgba(255,255,255,0.08)',
            color: '#fff', outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            height: 48, padding: '0 22px', background: '#4169E1', color: '#fff',
            border: 'none', borderRadius: 9, fontSize: 14, fontWeight: 700,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            opacity: status === 'loading' ? 0.7 : 1, whiteSpace: 'nowrap',
          }}
        >
          {status === 'loading' ? 'Reserving…' : <><span>Lock in $40/mo</span> <ArrowRight size={14} /></>}
        </button>
        {status === 'error' && <div style={{ width: '100%', fontSize: 13, color: '#fca5a5', textAlign: 'center' }}>Something went wrong. Please try again.</div>}
      </form>
    </div>
  )
}
