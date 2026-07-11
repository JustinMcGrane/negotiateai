'use client'
import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function BillingPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [currentPlan, setCurrentPlan] = useState<string>('free')
  const [portalLoading, setPortalLoading] = useState(false)

  useEffect(() => {
    createClient().from('profiles').select('plan').single().then(({ data }) => {
      if (data?.plan) setCurrentPlan(data.plan)
    })
  }, [])

  async function openPortal() {
    setPortalLoading(true)
    const res = await fetch('/api/portal', { method: 'POST' })
    if (res.ok) {
      const { url } = await res.json()
      window.location.href = url
    } else {
      setPortalLoading(false)
    }
  }

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
      features: ['1 use per tool', '1 practice simulation', 'Basic results'],
      cta: 'Current plan',
      disabled: true,
      priceId: '',
    },
    {
      key: 'pro',
      name: 'Pro',
      price: '$29',
      sub: '/mo · or $249/yr',
      features: ['Unlimited all 10 tools', 'Full session history', 'PDF export', 'Progress tracking', 'Priority support'],
      cta: 'Upgrade to Pro',
      disabled: false,
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || '',
      highlight: true,
    },
    {
      key: 'report',
      name: 'One-time report',
      price: '$49',
      sub: 'One-time, no subscription',
      features: ['Full compensation audit', 'PDF report delivered', 'All Intelligence + Strategy tools once', '1 simulation'],
      cta: 'Buy report',
      disabled: false,
      priceId: process.env.NEXT_PUBLIC_STRIPE_REPORT_PRICE_ID || '',
    },
  ]

  return (
    <div style={{ padding: '32px 32px 80px', maxWidth: 860 }}>
      <h1 style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>Billing & plans</h1>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 32 }}>Upgrade to unlock unlimited access and advanced features.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 32 }}>
        {plans.map((plan) => (
          <div key={plan.key} style={{
            background: '#fff',
            border: plan.highlight ? '2px solid #141414' : '0.5px solid var(--color-border-tertiary)',
            borderRadius: 12, padding: 24, position: 'relative',
          }}>
            {plan.highlight && <div style={{ position: 'absolute', top: -10, left: 20, background: '#141414', color: '#fff', fontSize: 11, padding: '2px 8px', borderRadius: 4 }}>Most popular</div>}
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{plan.name}</div>
            <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 2 }}>{plan.price}</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 20 }}>{plan.sub}</div>
            {plan.features.map((f) => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Check size={12} color="var(--color-success)" />
                <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{f}</span>
              </div>
            ))}
            <button
              disabled={plan.disabled || loading === plan.key}
              onClick={() => !plan.disabled && checkout(plan.priceId, plan.key)}
              style={{
                marginTop: 20, width: '100%', height: 38,
                background: plan.highlight ? '#141414' : 'transparent',
                color: plan.highlight ? '#fff' : 'var(--color-text-primary)',
                border: plan.highlight ? 'none' : '0.5px solid var(--color-border-primary)',
                borderRadius: 8, fontSize: 13,
                opacity: (plan.disabled || loading === plan.key) ? 0.5 : 1,
              }}>
              {loading === plan.key ? 'Loading…' : plan.cta}
            </button>
          </div>
        ))}
      </div>

      {(currentPlan === 'pro' || currentPlan === 'elite') && (
        <div style={{ marginBottom: 24, background: '#fff', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 10, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>Manage subscription</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Update payment method, view invoices, or cancel.</div>
          </div>
          <button onClick={openPortal} disabled={portalLoading} style={{ height: 36, padding: '0 16px', background: '#141414', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', opacity: portalLoading ? 0.6 : 1 }}>
            {portalLoading ? 'Opening…' : 'Manage billing →'}
          </button>
        </div>
      )}

      <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
        Payments are processed securely by Stripe. Cancel anytime. NegotiateAI provides AI-generated guidance for informational purposes.
      </div>
    </div>
  )
}
