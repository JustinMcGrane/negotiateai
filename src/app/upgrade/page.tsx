'use client'
import { useState } from 'react'
import { Check, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function UpgradePage() {
  const [loading, setLoading] = useState(false)

  async function checkout() {
    const { data: { user } } = await createClient().auth.getUser()
    if (!user) {
      window.location.href = '/login?redirect=/upgrade'
      return
    }
    const priceId = process.env.NEXT_PUBLIC_STRIPE_PRO_TRIAL_PRICE_ID || process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || ''
    if (!priceId) return
    setLoading(true)
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    setLoading(false)
  }

  const features = [
    'Sarah career coach — unlimited coaching',
    'All 10 negotiation tools — unlimited',
    'Resume analyzer',
    'Cover letter generator',
    'Offer evaluator + counter-offer builder',
    'Raise builder + negotiation playbook',
    'Session history',
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background-secondary)', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--color-text-secondary)', textDecoration: 'none', marginBottom: 32 }}>
          <ArrowLeft size={14} /> Back to dashboard
        </Link>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>
            Upgrade to Pro
          </h1>
          <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', maxWidth: 400, margin: '0 auto' }}>
            Try 7 days for $4.99 — then $19.99/month. Cancel anytime.
          </p>
        </div>

        <div style={{
          background: '#fff',
          border: '2px solid #141414',
          borderRadius: 16, padding: 32,
          position: 'relative',
        }}>
          <div style={{ position: 'absolute', top: -11, left: 24, background: '#141414', color: '#fff', fontSize: 11, padding: '2px 10px', borderRadius: 4, fontWeight: 600 }}>
            Professional
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em' }}>$4.99</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>for 7 days — then $19.99/month</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {features.map((f) => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <Check size={13} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>{f}</span>
              </div>
            ))}
          </div>

          <button
            disabled={loading}
            onClick={checkout}
            style={{
              width: '100%', height: 48,
              background: '#141414', color: '#fff',
              border: 'none', borderRadius: 10,
              fontSize: 15, fontWeight: 600, cursor: loading ? 'default' : 'pointer',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Loading…' : 'Try 7 days for $4.99'}
          </button>
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--color-text-tertiary)', marginTop: 20 }}>
          Payments processed securely by Stripe. Cancel anytime.
        </p>
      </div>
    </div>
  )
}
