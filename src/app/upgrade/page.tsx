'use client'
import { useState } from 'react'
import { Check, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function UpgradePage() {
  const [loading, setLoading] = useState<string | null>(null)

  async function checkout(priceId: string, key: string) {
    if (!priceId) return
    setLoading(key)
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    setLoading(null)
  }

  const plans = [
    {
      key: 'pro',
      name: 'Pro',
      price: '$29',
      sub: '/mo · or $249/yr',
      features: [
        'Unlimited access to all 10 tools',
        'Sarah AI recruiter — unlimited messages',
        'Annual Review Coach',
        'Promotion Planner',
        'Competing Offer Tool',
        'Career Timeline',
        'Full session history',
        'PDF export',
        'Progress tracking',
        'Priority support',
      ],
      cta: 'Upgrade to Pro',
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || '',
      highlight: true,
    },
    {
      key: 'report',
      name: 'One-time report',
      price: '$49',
      sub: 'One-time, no subscription',
      features: [
        'Full compensation audit',
        'PDF report delivered',
        'All Intelligence + Strategy tools once',
        '1 simulation',
      ],
      cta: 'Buy report',
      priceId: process.env.NEXT_PUBLIC_STRIPE_REPORT_PRICE_ID || '',
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background-secondary)', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--color-text-secondary)', textDecoration: 'none', marginBottom: 32 }}>
          <ArrowLeft size={14} /> Back to dashboard
        </Link>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 12 }}>Unlock your full potential</h1>
          <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', maxWidth: 480, margin: '0 auto' }}>
            Get unlimited access to every tool, Sarah's full coaching capabilities, and features built to move your career forward.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, maxWidth: 680, margin: '0 auto' }}>
          {plans.map((plan) => (
            <div key={plan.key} style={{
              background: '#fff',
              border: plan.highlight ? '2px solid #141414' : '0.5px solid var(--color-border-tertiary)',
              borderRadius: 16, padding: 28, position: 'relative',
            }}>
              {plan.highlight && (
                <div style={{ position: 'absolute', top: -11, left: 24, background: '#141414', color: '#fff', fontSize: 11, padding: '2px 10px', borderRadius: 4, fontWeight: 600 }}>
                  Most popular
                </div>
              )}
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{plan.name}</div>
              <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 2 }}>{plan.price}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 24 }}>{plan.sub}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {plan.features.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <Check size={13} color="#10b981" style={{ flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>
              <button
                disabled={loading === plan.key}
                onClick={() => checkout(plan.priceId, plan.key)}
                style={{
                  width: '100%', height: 42,
                  background: plan.highlight ? '#141414' : 'transparent',
                  color: plan.highlight ? '#fff' : 'var(--color-text-primary)',
                  border: plan.highlight ? 'none' : '0.5px solid var(--color-border-primary)',
                  borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer',
                  opacity: loading === plan.key ? 0.5 : 1,
                }}
              >
                {loading === plan.key ? 'Loading…' : plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--color-text-tertiary)', marginTop: 32 }}>
          Payments processed securely by Stripe. Cancel anytime.
        </p>
      </div>
    </div>
  )
}
