'use client'
import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import posthog from 'posthog-js'

const COMPANIES = [
  { name: 'Google', color: '#4285F4', bg: 'rgba(66,133,244,0.12)' },
  { name: 'Amazon', color: '#FF9900', bg: 'rgba(255,153,0,0.12)' },
  { name: 'Microsoft', color: '#00A4EF', bg: 'rgba(0,164,239,0.12)' },
  { name: 'Meta', color: '#0082FB', bg: 'rgba(0,130,251,0.12)' },
  { name: 'Apple', color: '#a8a8a8', bg: 'rgba(168,168,168,0.12)' },
  { name: 'Stripe', color: '#635BFF', bg: 'rgba(99,91,255,0.12)' },
  { name: 'Salesforce', color: '#00A1E0', bg: 'rgba(0,161,224,0.12)' },
  { name: 'Netflix', color: '#E50914', bg: 'rgba(229,9,20,0.12)' },
]

export default function SignupPage() {
  return <Suspense><SignupForm /></Suspense>
}

function SignupForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/onboarding'

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      const supabase2 = createClient()
      const { data: { user } } = await supabase2.auth.getUser()
      if (user) posthog.identify(user.id, { email: user.email, name })
      fetch('/api/welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      }).catch(() => {})
      router.push(redirectTo)
      router.refresh()
    }
  }

  const handleGoogleSignup = async () => {
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
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 44 }}>
          <Link href="/">
            <Image src="/logo.svg" alt="Hayven" width={200} height={56} style={{ objectFit: 'contain' }} priority />
          </Link>
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 6 }}>
          Create your account
        </h1>
        <p style={{ fontSize: 14, color: '#64748b', marginBottom: 28, lineHeight: 1.6 }}>
          Free to get started. No credit card required.
        </p>

        {/* Google OAuth — primary */}
        <button
          onClick={handleGoogleSignup}
          type="button"
          style={{
            height: 50, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            background: '#0f172a', border: 'none', borderRadius: 10,
            fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer', marginBottom: 14,
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
          <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>or sign up with email</span>
          <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
        </div>

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={lbl}>NAME</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required style={inp} autoFocus />
          </div>
          <div>
            <label style={lbl}>EMAIL</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required style={inp} />
          </div>
          <div>
            <label style={lbl}>PASSWORD</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters" minLength={6} required style={inp} />
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
            {loading ? 'Creating account…' : 'Create account →'}
          </button>
        </form>

        <p style={{ marginTop: 24, fontSize: 13, color: '#94a3b8', textAlign: 'center' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
        </p>

        <p style={{ marginTop: 28, fontSize: 11, color: '#cbd5e1', textAlign: 'center', lineHeight: 1.6 }}>
          By creating an account you agree to our{' '}
          <Link href="/terms" style={{ color: '#94a3b8', textDecoration: 'underline' }}>Terms of Service</Link>
          {' '}and{' '}
          <Link href="/privacy" style={{ color: '#94a3b8', textDecoration: 'underline' }}>Privacy Policy</Link>.
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
              <div key={c.name} style={{
                background: c.bg, border: `1px solid ${c.color}30`,
                borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600,
                color: c.color,
              }}>
                {c.name}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
