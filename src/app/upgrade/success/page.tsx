'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function SuccessForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id') || ''

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!sessionId) { setFetching(false); return }
    fetch(`/api/checkout/session?id=${sessionId}`)
      .then(r => r.json())
      .then(d => { if (d.email) setEmail(d.email) })
      .finally(() => setFetching(false))
  }, [sessionId])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    setError('')

    const res = await fetch('/api/checkout/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, password }),
    })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Something went wrong')
      setLoading(false)
      return
    }

    // Sign in
    const { error: signInError } = await createClient().auth.signInWithPassword({ email: data.email, password })
    if (signInError) {
      setError('Account created — please sign in.')
      setLoading(false)
      router.push('/login')
      return
    }

    router.push('/dashboard')
  }

  if (fetching) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px', color: '#94a3b8' }}>
        Setting up your access…
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ maxWidth: 420, width: '100%' }}>

        {/* Icon */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 12 }}>
            Payment confirmed.
          </h1>
          <p style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.65, maxWidth: 340, margin: '0 auto' }}>
            Set a password so Sarah can remember your goals, track your progress, and coach you over time.
          </p>
        </div>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              readOnly
              style={{
                width: '100%', height: 44, padding: '0 14px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8, fontSize: 14, color: '#64748b',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Create a password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              autoFocus
              required
              style={{
                width: '100%', height: 44, padding: '0 14px',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 8, fontSize: 14, color: '#fff',
                boxSizing: 'border-box', outline: 'none',
              }}
            />
          </div>

          {error && (
            <p style={{ fontSize: 13, color: '#f87171', margin: 0 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              height: 48, width: '100%',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              color: '#fff', border: 'none', borderRadius: 10,
              fontSize: 15, fontWeight: 700, cursor: loading ? 'default' : 'pointer',
              opacity: loading ? 0.7 : 1,
              boxShadow: '0 4px 20px rgba(239,68,68,0.35)',
              marginTop: 4,
            }}
          >
            {loading ? 'Setting up…' : 'Meet Sarah →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#334155', marginTop: 20 }}>
          Already have an account? <a href="/login" style={{ color: '#64748b', textDecoration: 'underline' }}>Sign in</a>
        </p>
      </div>
    </div>
  )
}

export default function UpgradeSuccessPage() {
  return (
    <Suspense>
      <SuccessForm />
    </Suspense>
  )
}
