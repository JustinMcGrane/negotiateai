'use client'
import { X } from 'lucide-react'

interface Props {
  onClose: () => void
}

export function UpgradeModal({ onClose }: Props) {
  async function handleUpgrade(priceId: string) {
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
              You've reached the free plan limit for this tool.
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--color-text-tertiary)', padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{
            border: '2px solid #141414', borderRadius: 10, padding: 20,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>Pro</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                  Unlimited access to all 16 tools
                </div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 500 }}>$20<span style={{ fontSize: 12, fontWeight: 400 }}>/mo</span></div>
            </div>
            <button onClick={() => handleUpgrade(process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || '')}
              style={{
                marginTop: 14, width: '100%', height: 38, background: '#141414', color: '#fff',
                border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500,
              }}>
              Upgrade to Pro — $20/mo
            </button>
          </div>
        </div>

        <div style={{ marginTop: 16, fontSize: 12, color: 'var(--color-text-tertiary)', textAlign: 'center' }}>
          Questions? <a href="/account/billing" style={{ color: 'var(--color-text-secondary)', textDecoration: 'underline' }}>View all plan details</a>
        </div>
      </div>
    </div>
  )
}
