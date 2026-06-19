'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { BrandMark } from '@/components/negotiate/BrandMark'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  const inp: React.CSSProperties = {
    height: 40, width: '100%', background: '#fff',
    border: '0.5px solid var(--color-border-secondary)', borderRadius: 8,
    padding: '0 12px', fontSize: 13,
  }
  const lbl: React.CSSProperties = { fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-background-secondary)', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 380, background: '#fff', border: '0.5px solid var(--color-border-secondary)', borderRadius: 12, padding: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28, gap: 8 }}>
          <BrandMark />
          <div style={{ fontSize: 13, fontWeight: 500 }}>NegotiateAI</div>
        </div>

        <h1 style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>Welcome back</h1>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 24 }}>Sign in to your account</p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <div style={lbl}>EMAIL</div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required style={inp} autoFocus />
          </div>
          <div>
            <div style={lbl}>PASSWORD</div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required style={inp} />
          </div>

          {error && (
            <div style={{ fontSize: 12, color: 'var(--color-danger)', background: '#FDF2F2', border: '0.5px solid rgba(163,45,45,0.2)', borderRadius: 6, padding: '8px 12px' }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            height: 38, background: '#141414', color: '#fff', border: 'none',
            borderRadius: 8, fontSize: 13, opacity: loading ? 0.6 : 1, marginTop: 4,
          }}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div style={{ marginTop: 20, textAlign: 'center', fontSize: 13, color: 'var(--color-text-secondary)' }}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>Sign up</Link>
        </div>
      </div>
    </div>
  )
}
