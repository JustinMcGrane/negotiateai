'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Logo } from '@/components/ui/Logo'

const INPUT = 'bg-c-surface2 border-[1.5px] border-c-border rounded-app-sm text-c-text text-[14px] px-3 py-[11px] outline-none focus:border-c-purple focus:bg-c-surface transition-all w-full'
const LABEL = 'text-[11px] text-c-text3 uppercase tracking-[.07em] font-semibold'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Supabase handles the token from the URL hash automatically
  }, [])

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

  return (
    <div
      className="bg-c-surface border border-c-border rounded-[20px] p-10 w-full max-w-md"
      style={{ boxShadow: '0 24px 64px rgba(30,27,58,.12)' }}
    >
      <div className="mb-9">
        <Logo width={160} />
      </div>

      {done ? (
        <div className="animate-fade-in">
          <div className="w-14 h-14 bg-c-green-d rounded-[16px] flex items-center justify-center mb-5">
            <span className="text-c-green text-[22px]">✓</span>
          </div>
          <h1 className="font-display text-[26px] font-bold tracking-[-0.03em] text-c-text mb-2">Password updated</h1>
          <p className="text-[14px] text-c-text3 leading-[1.6]">Redirecting you to your dashboard…</p>
        </div>
      ) : (
        <>
          <h1 className="font-display text-[26px] font-bold tracking-[-0.03em] text-c-text mb-[6px]">Set new password</h1>
          <p className="text-[14px] text-c-text3 mb-7">Choose a strong password for your account.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-[7px]">
              <label className={LABEL}>New password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" required className={INPUT} autoFocus />
            </div>
            <div className="flex flex-col gap-[7px]">
              <label className={LABEL}>Confirm password</label>
              <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repeat password" required className={INPUT} />
            </div>

            {error && (
              <div className="bg-c-red-d text-c-red text-[13px] px-4 py-[10px] rounded-app-sm border border-[#F0997B44]">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-c-purple text-white rounded-app-sm px-4 py-[11px] text-[14px] font-semibold cursor-pointer hover:bg-c-purple-l transition-all disabled:opacity-60 mt-1"
            >
              {loading ? 'Updating…' : 'Update password'}
            </button>
          </form>
        </>
      )}
    </div>
  )
}
