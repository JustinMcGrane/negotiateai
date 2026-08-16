'use client'
import { X } from 'lucide-react'

interface Props {
  onClose: () => void
}

export function UpgradeModal({ onClose }: Props) {
  function handleUpgrade() {
    window.location.href = '/upgrade'
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
            <div style={{ fontSize: 16, fontWeight: 700 }}>Find out your worth</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>
              Start your 7-day trial and get full access to Sarah + all tools.
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--color-text-tertiary)', padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ border: '2px solid #141414', borderRadius: 10, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Professional</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                Unlimited coaching + all 10 negotiation tools
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>$4.99</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>then $19.99/mo</div>
            </div>
          </div>
          <button onClick={handleUpgrade}
            style={{
              width: '100%', height: 42,
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              color: '#fff', border: 'none', borderRadius: 8,
              fontSize: 13, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 3px 10px rgba(239,68,68,0.3)',
            }}>
            ✦ FIND OUT YOUR WORTH FOR $4.99
          </button>
        </div>

        <div style={{ marginTop: 16, fontSize: 12, color: 'var(--color-text-tertiary)', textAlign: 'center' }}>
          Cancel anytime. <a href="/upgrade" style={{ color: 'var(--color-text-secondary)', textDecoration: 'underline' }}>See what's included</a>
        </div>
      </div>
    </div>
  )
}
