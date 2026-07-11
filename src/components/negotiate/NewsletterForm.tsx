'use client'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

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
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ background: '#fff', border: '1px solid #bbf7d0', borderRadius: 12, padding: '20px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 24, marginBottom: 8 }}>🎉</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#15803d', marginBottom: 4 }}>You're in! Check your inbox.</div>
        <div style={{ fontSize: 13, color: '#166534' }}>Your 30-day Pro trial link is on its way.</div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 8, maxWidth: 460, margin: '0 auto', flexWrap: 'wrap' }}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        style={{
          flex: 1, minWidth: 200, height: 48, padding: '0 16px', fontSize: 14,
          border: '1px solid #bbf7d0', borderRadius: 9, background: '#fff',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          height: 48, padding: '0 22px', background: '#15803d', color: '#fff',
          border: 'none', borderRadius: 9, fontSize: 14, fontWeight: 700,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
          opacity: status === 'loading' ? 0.7 : 1, whiteSpace: 'nowrap',
        }}
      >
        {status === 'loading' ? 'Subscribing…' : <><span>Claim my free trial</span> <ArrowRight size={14} /></>}
      </button>
      {status === 'error' && <div style={{ width: '100%', fontSize: 13, color: '#dc2626', textAlign: 'center' }}>Something went wrong. Please try again.</div>}
    </form>
  )
}
