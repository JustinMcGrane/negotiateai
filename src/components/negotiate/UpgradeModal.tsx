'use client'
import { X } from 'lucide-react'

interface Props {
  onClose: () => void
}

export function UpgradeModal({ onClose }: Props) {
  async function handleUpgrade() {
    const priceId = process.env.NEXT_PUBLIC_STRIPE_PRO_TRIAL_PRICE_ID || process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || ''
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100, padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 12, padding: 32, maxWidth: 460, width: '100%',
        border: '0.5px solid var(--color-border-secondary)',
      }} onClick={(e) => e.stopPropagation()} className="animate-slide-up">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 500 }}>Upgrade to Pro</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>
              You've reached the free limit. Try Pro for 7 days.
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--color-text-tertiary)', padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        <div style={{
          border: '2px solid #141414', borderRadius: 10, padding: 20,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Professional</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                Unlimited coaching + all 10 negotiation tools
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>$4.99</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>then $19.99/mo</div>
            </div>
          </div>
          <button onClick={handleUpgrade}
            style={{
              marginTop: 14, width: '100%', height: 38, background: '#141414', color: '#fff',
              border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>
            Try 7 days for $4.99
          </button>
        </div>

        <div style={{ marginTop: 16, fontSize: 12, color: 'var(--color-text-tertiary)', textAlign: 'center' }}>
          Cancel anytime. <a href="/upgrade" style={{ color: 'var(--color-text-secondary)', textDecoration: 'underline' }}>See what's included</a>
        </div>
      </div>
    </div>
  )
}
