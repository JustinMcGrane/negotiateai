'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Logo } from '@/components/ui/Logo'

const INPUT = 'bg-c-surface2 border-[1.5px] border-c-border rounded-app-sm text-c-text text-[14px] px-3 py-[11px] outline-none focus:border-c-purple focus:bg-c-surface transition-all w-full'
const LABEL = 'text-[11px] text-c-text3 uppercase tracking-[.07em] font-semibold'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSent(true)
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

      {sent ? (
        <div className="animate-fade-in">
          <div className="w-14 h-14 bg-c-green-d rounded-[16px] flex items-center justify-center mb-5">
            <span className="text-c-green text-[22px]">✓</span>
          </div>
          <h1 className="font-display text-[26px] font-bold tracking-[-0.03em] text-c-text mb-2">Check your email</h1>
          <p className="text-[14px] text-c-text3 mb-6 leading-[1.6]">
            We sent a reset link to <strong className="text-c-text">{email}</strong>. Check your inbox and follow the link.
          </p>
          <Link href="/login" className="text-c-purple font-semibold text-[13px] hover:underline">
            ← Back to sign in
          </Link>
        </div>
      ) : (
        <>
          <h1 className="font-display text-[26px] font-bold tracking-[-0.03em] text-c-text mb-[6px]">Reset password</h1>
          <p className="text-[14px] text-c-text3 mb-7">Enter your email and we&apos;ll send you a reset link.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-[7px]">
              <label className={LABEL}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className={INPUT} autoFocus />
            </div>

            {error && (
              <div className="bg-c-red-d text-c-red text-[13px] px-4 py-[10px] rounded-app-sm border border-[#F0997B44]">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-c-purple text-white rounded-app-sm px-4 py-[11px] text-[14px] font-semibold cursor-pointer hover:bg-c-purple-l transition-all disabled:opacity-60 mt-1"
            >
              {loading ? 'Sending…' : 'Send reset link'}
            </button>
          </form>

          <p className="text-[13px] text-c-text3 mt-6 text-center">
            Remembered it?{' '}
            <Link href="/login" className="text-c-purple font-semibold hover:underline">Sign in</Link>
          </p>
        </>
      )}
    </div>
  )
}
