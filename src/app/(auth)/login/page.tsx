'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

const COMPANIES = ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Stripe', 'Salesforce', 'Netflix']

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
    }
  }

  const handleGoogleLogin = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  const inp: React.CSSProperties = {
    height: 44, width: '100%', background: '#fff',
    border: '1px solid #e2e8f0', borderRadius: 10,
    padding: '0 14px', fontSize: 14, outline: 'none',
    boxSizing: 'border-box',
  }
  const lbl: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 6, display: 'block' }

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>

      {/* Left — Form */}
      <div style={{ flex: '0 0 480px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 56px', background: '#fff' }}>
        <div style={{ marginBottom: 40 }}>
          <Link href="/">
            <Image src="/logo.svg" alt="Hayven" width={130} height={36} style={{ objectFit: 'contain' }} priority />
          </Link>
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 6 }}>
          Welcome back
        </h1>
        <p style={{ fontSize: 14, color: '#64748b', marginBottom: 28, lineHeight: 1.6 }}>
          Sign in to continue with Sarah.
        </p>

        {/* Google OAuth */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          style={{
            height: 46, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10,
            fontSize: 14, fontWeight: 600, color: '#0f172a', cursor: 'pointer', marginBottom: 20,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.96l3.007 2.332C4.672 5.163 6.656 3.58 9 3.58z"/>
          </svg>
          Continue with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
          <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>OR</span>
          <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={lbl}>EMAIL</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required style={inp} autoFocus />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label style={{ ...lbl, marginBottom: 0 }}>PASSWORD</label>
              <Link href="/forgot-password" style={{ fontSize: 12, color: '#94a3b8', textDecoration: 'none' }}>Forgot password?</Link>
            </div>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={inp} />
          </div>

          {error && (
            <div style={{ fontSize: 13, color: '#b91c1c', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px' }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            height: 46, background: '#141414', color: '#fff', border: 'none',
            borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: loading ? 'default' : 'pointer',
            opacity: loading ? 0.6 : 1, marginTop: 4,
          }}>
            {loading ? 'Signing in…' : 'Sign in →'}
          </button>
        </form>

        <p style={{ marginTop: 24, fontSize: 13, color: '#94a3b8', textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" style={{ color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>Sign up free</Link>
        </p>
      </div>

      {/* Right — Social proof panel */}
      <div style={{
        flex: 1, background: '#0f172a', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '48px 56px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)' }} />

        <div style={{ display: 'flex', gap: 40, marginBottom: 56, position: 'relative' }}>
          {[
            { value: '$27K', label: 'avg left on table without negotiating' },
            { value: '85%', label: 'who negotiate get more money' },
          ].map(s => (
            <div key={s.value}>
              <div style={{ fontSize: 40, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 6, lineHeight: 1.4, maxWidth: 140 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16, padding: '28px 28px 24px', marginBottom: 48, position: 'relative',
        }}>
          <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
            {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: 18, color: '#f59e0b' }}>★</span>)}
          </div>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>
            &ldquo;I went from feeling totally unprepared to negotiating $18K more than the initial offer. Sarah walked me through every step.&rdquo;
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Early access user</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Software Engineer, San Francisco</div>
            </div>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
            Used by professionals at
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {COMPANIES.map(c => (
              <div key={c} style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600,
                color: 'rgba(255,255,255,0.5)',
              }}>
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
