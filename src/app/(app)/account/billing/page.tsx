'use client'
import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function BillingPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [currentPlan, setCurrentPlan] = useState<string | null>(null)

  useEffect(() => {
    createClient().auth.getUser().then(async ({ data }) => {
      if (!data.user) return
      const { data: profile } = await createClient().from('profiles').select('plan').eq('id', data.user.id).single()
      setCurrentPlan(profile?.plan ?? 'free')
    })
  }, [])

  async function checkout(priceId: string, key: string) {
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
      features: ['Sarah salary assessment (one session)', 'See your current market value', 'Get your target role + salary', 'Realistic timeline to get there'],
      cta: 'Current plan',
      disabled: true,
      priceId: '',
    },
    {
      key: 'pro',
      name: 'Professional',
      price: '$49',
      sub: '/month',
      features: ['Sarah AI recruiter — unlimited coaching', 'All 10 negotiation tools — unlimited', 'Resume analyzer + cover letter generator', 'Offer evaluator + counter-offer builder', 'Raise builder + negotiation playbook', 'Session history'],
      cta: 'Get Professional',
      disabled: false,
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || '',
      highlight: true,
    },
    {
      key: 'elite',
      name: 'Elite',
      price: '$79',
      sub: '/month',
      features: ['Everything in Professional', 'Sarah remembers you across sessions', 'Mock interview coaching with feedback', 'Live negotiation roleplay with Sarah', 'Annual Review Coach + Promotion Planner', 'PDF compensation report', 'Priority support'],
      cta: 'Get Elite',
      disabled: false,
      priceId: process.env.NEXT_PUBLIC_STRIPE_ELITE_PRICE_ID || '',
    },
  ]

  return (
    <div style={{ padding: '32px 32px 80px', maxWidth: 860 }}>
      <h1 style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>Billing &amp; plans</h1>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 32 }}>Upgrade to unlock unlimited access and advanced features.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 32 }}>
        {plans.map((plan) => (
          <div key={plan.key} style={{
            background: plan.key === 'elite' ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' : '#fff',
            border: plan.highlight ? '2px solid #141414' : plan.key === 'elite' ? '1px solid rgba(102,126,234,0.4)' : '0.5px solid var(--color-border-tertiary)',
            borderRadius: 12, padding: 24, position: 'relative',
          }}>
            {plan.highlight && <div style={{ position: 'absolute', top: -10, left: 20, background: '#141414', color: '#fff', fontSize: 11, padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>Most popular</div>}
            {plan.key === 'elite' && <div style={{ position: 'absolute', top: -10, left: 20, background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff', fontSize: 11, padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>Best results</div>}
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: plan.key === 'elite' ? '#fff' : 'var(--color-text-primary)' }}>{plan.name}</div>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 2, color: plan.key === 'elite' ? '#fff' : 'var(--color-text-primary)' }}>{plan.price}</div>
            <div style={{ fontSize: 12, color: plan.key === 'elite' ? 'rgba(255,255,255,0.4)' : 'var(--color-text-tertiary)', marginBottom: 20 }}>{plan.sub}</div>
            {plan.features.map((f) => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                <Check size={12} color={plan.key === 'elite' ? '#667eea' : 'var(--color-success)'} style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 12, color: plan.key === 'elite' ? 'rgba(255,255,255,0.7)' : 'var(--color-text-secondary)' }}>{f}</span>
              </div>
            ))}
            {currentPlan === plan.key ? (
              <div style={{
                marginTop: 20, width: '100%', height: 38,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                border: '1.5px solid #16a34a', borderRadius: 8,
                fontSize: 13, fontWeight: 700, color: '#16a34a',
              }}>
                <Check size={14} color="#16a34a" /> Current Plan
              </div>
            ) : (
              <button
                disabled={loading === plan.key}
                onClick={() => checkout(plan.priceId, plan.key)}
                style={{
                  marginTop: 20, width: '100%', height: 38,
                  background: plan.key === 'elite'
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : plan.highlight ? '#141414' : 'transparent',
                  color: plan.key === 'free' ? 'var(--color-text-primary)' : '#fff',
                  border: plan.key === 'free' ? '0.5px solid var(--color-border-primary)' : 'none',
                  borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: loading === plan.key ? 'default' : 'pointer',
                  opacity: loading === plan.key ? 0.5 : 1,
                }}>
                {loading === plan.key ? 'Loading…' : plan.cta}
              </button>
            )}
          </div>
        ))}
      </div>

      <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
        Payments are processed securely by Stripe. Cancel anytime. Hayven provides AI-generated guidance for informational purposes.
      </div>
    </div>
  )
}
