'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setDone(true)
      setTimeout(() => router.push('/dashboard'), 2000)
    }
  }

  const inputStyle = {
    width: '100%', padding: '10px 12px', fontSize: 14,
    background: 'var(--color-background-secondary)',
    border: '0.5px solid var(--color-border-tertiary)',
    borderRadius: 8, color: 'var(--color-text-primary)',
    outline: 'none', boxSizing: 'border-box' as const,
  }

  return (
    <div style={{
      background: '#fff', border: '0.5px solid var(--color-border-tertiary)',
      borderRadius: 16, padding: '40px 36px', width: '100%', maxWidth: 400,
      boxShadow: '0 8px 32px rgba(0,0,0,0.07)',
    }}>
      <div style={{ marginBottom: 28 }}>
        <Link href="/">
          <Image src="/logo.svg" alt="Hayven" width={140} height={40} style={{ objectFit: 'contain' }} />
        </Link>
      </div>

      {done ? (
        <div>
          <div style={{ width: 48, height: 48, background: '#ecfdf5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <span style={{ color: '#10b981', fontSize: 22 }}>✓</span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 8 }}>Password updated</h1>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>Redirecting you to your dashboard…</p>
        </div>
      ) : (
        <>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 6 }}>Set new password</h1>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 24 }}>Choose a strong password for your account.</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)', letterSpacing: '0.07em', display: 'block', marginBottom: 6 }}>NEW PASSWORD</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" required style={inputStyle} autoFocus />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)', letterSpacing: '0.07em', display: 'block', marginBottom: 6 }}>CONFIRM PASSWORD</label>
              <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat password" required style={inputStyle} />
            </div>

            {error && (
              <div style={{ background: '#fef2f2', border: '0.5px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#dc2626' }}>{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                background: '#141414', color: '#fff', border: 'none',
                borderRadius: 8, padding: '11px', fontSize: 14, fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1, marginTop: 4,
              }}
            >
              {loading ? 'Updating…' : 'Update password'}
            </button>
          </form>
        </>
      )}
    </div>
  )
}
