'use client'
import { useState } from 'react'
import { Check, ArrowLeft, Zap } from 'lucide-react'
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
      key: 'free',
      name: 'Free',
      price: '$0',
      sub: 'Forever free',
      features: [
        'Sarah salary assessment (one session)',
        'See your current market value',
        'Get your target role + salary',
        'Realistic timeline to get there',
      ],
      cta: 'Current plan',
      priceId: '',
      disabled: true,
    },
    {
      key: 'pro',
      name: 'Professional',
      price: '$49',
      sub: '/month',
      features: [
        'Sarah AI recruiter — unlimited coaching',
        'All 10 negotiation tools — unlimited',
        'Resume analyzer',
        'Cover letter generator',
        'Offer evaluator + counter-offer builder',
        'Raise builder + negotiation playbook',
        'Better AI quality (Claude Sonnet)',
        'Session history',
      ],
      cta: 'Get Professional',
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || '',
      highlight: true,
    },
    {
      key: 'elite',
      name: 'Elite',
      price: '$79',
      sub: '/month',
      features: [
        'Everything in Professional',
        'Sarah remembers you across every session',
        'Mock interview coaching with feedback',
        'Live negotiation roleplay with Sarah',
        'Annual Review Coach',
        'Promotion Planner',
        'Competing Offer Strategy Tool',
        'Career Timeline builder',
        'PDF compensation report',
        'Priority support',
      ],
      cta: 'Get Elite',
      priceId: process.env.NEXT_PUBLIC_STRIPE_ELITE_PRICE_ID || '',
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background-secondary)', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--color-text-secondary)', textDecoration: 'none', marginBottom: 32 }}>
          <ArrowLeft size={14} /> Back to dashboard
        </Link>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>
            Choose your plan
          </h1>
          <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', maxWidth: 500, margin: '0 auto' }}>
            Most people who use NegotiateAI land a higher salary within 6 months. Pick the plan that matches where you are.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {plans.map((plan) => (
            <div key={plan.key} style={{
              background: plan.key === 'elite' ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' : '#fff',
              border: plan.highlight ? '2px solid #141414' : plan.key === 'elite' ? '1px solid rgba(102,126,234,0.4)' : '0.5px solid var(--color-border-tertiary)',
              borderRadius: 16, padding: 28, position: 'relative',
              display: 'flex', flexDirection: 'column',
            }}>
              {plan.highlight && (
                <div style={{ position: 'absolute', top: -11, left: 24, background: '#141414', color: '#fff', fontSize: 11, padding: '2px 10px', borderRadius: 4, fontWeight: 600 }}>
                  Most popular
                </div>
              )}
              {plan.key === 'elite' && (
                <div style={{ position: 'absolute', top: -11, left: 24, background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff', fontSize: 11, padding: '2px 10px', borderRadius: 4, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Zap size={10} /> Best results
                </div>
              )}

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: plan.key === 'elite' ? 'rgba(255,255,255,0.6)' : 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{plan.name}</div>
                <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em', color: plan.key === 'elite' ? '#fff' : 'var(--color-text-primary)' }}>{plan.price}</div>
                <div style={{ fontSize: 13, color: plan.key === 'elite' ? 'rgba(255,255,255,0.4)' : 'var(--color-text-tertiary)', marginTop: 2 }}>{plan.sub}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, marginBottom: 24 }}>
                {plan.features.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <Check size={13} color={plan.key === 'elite' ? '#667eea' : '#10b981'} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13, color: plan.key === 'elite' ? 'rgba(255,255,255,0.7)' : 'var(--color-text-secondary)', lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>

              <button
                disabled={plan.disabled || loading === plan.key}
                onClick={() => !plan.disabled && checkout(plan.priceId, plan.key)}
                style={{
                  width: '100%', height: 44,
                  background: plan.key === 'elite'
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : plan.highlight ? '#141414' : 'transparent',
                  color: plan.key === 'free' ? 'var(--color-text-secondary)' : '#fff',
                  border: plan.key === 'free' ? '0.5px solid var(--color-border-primary)' : 'none',
                  borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: plan.disabled ? 'default' : 'pointer',
                  opacity: (plan.disabled || loading === plan.key) ? 0.5 : 1,
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
