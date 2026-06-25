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
            <div style={{ fontSize: 16, fontWeight: 500 }}>Upgrade your plan</div>
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
                <div style={{ fontSize: 13, fontWeight: 600 }}>Professional</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                  Unlimited coaching + all 10 negotiation tools
                </div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>$49<span style={{ fontSize: 12, fontWeight: 400 }}>/mo</span></div>
            </div>
            <button onClick={() => handleUpgrade(process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || '')}
              style={{
                marginTop: 14, width: '100%', height: 38, background: '#141414', color: '#fff',
                border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>
              Get Professional
            </button>
          </div>

          <div style={{ border: '0.5px solid var(--color-border-tertiary)', borderRadius: 10, padding: 20, background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Elite</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
                  Everything + memory, mock interviews, roleplay
                </div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#fff' }}>$79<span style={{ fontSize: 12, fontWeight: 400 }}>/mo</span></div>
            </div>
            <button onClick={() => handleUpgrade(process.env.NEXT_PUBLIC_STRIPE_ELITE_PRICE_ID || '')}
              style={{
                marginTop: 14, width: '100%', height: 38,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff',
                border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>
              Get Elite
            </button>
          </div>
        </div>

        <div style={{ marginTop: 16, fontSize: 12, color: 'var(--color-text-tertiary)', textAlign: 'center' }}>
          <a href="/upgrade" style={{ color: 'var(--color-text-secondary)', textDecoration: 'underline' }}>See full plan comparison</a>
        </div>
      </div>
    </div>
  )
}
