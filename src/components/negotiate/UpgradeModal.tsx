'use client'
import { X } from 'lucide-react'

interface Props {
  onClose: () => void
  upgradeHook?: string
}

export function UpgradeModal({ onClose, upgradeHook }: Props) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100, padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: '#0f172a', borderRadius: 16, padding: '32px 28px', maxWidth: 460, width: '100%',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
      }} onClick={(e) => e.stopPropagation()}>

        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute' as const, top: 16, right: 16,
          background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 4,
        }}>
          <X size={18} />
        </button>

        {/* Hook */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#60a5fa', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>
            You&apos;ve used your free messages
          </p>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1.3, letterSpacing: '-0.02em', margin: 0 }}>
            {upgradeHook || 'You could be leaving $20,000+ on the table.'}
          </h2>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          {[
            { value: '$27K', label: 'avg left on table' },
            { value: '85%', label: 'who negotiate get more' },
          ].map(s => (
            <div key={s.value} style={{
              flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 10,
              padding: '12px 16px', border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div style={{ marginBottom: 24 }}>
          {[
            'Unlimited conversations with Sarah',
            'Resume builder with AI feedback & ATS scoring',
            'Job tracker to manage your entire search',
            'Offer evaluator & counter-offer builder',
            'Equity calculator & negotiation playbook',
          ].map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 10, color: '#60a5fa' }}>✓</span>
              </div>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{f}</span>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10, padding: '14px 16px', marginBottom: 24,
        }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, margin: '0 0 8px', fontStyle: 'italic' }}>
            &ldquo;I negotiated $18K more than my initial offer. Sarah walked me through every step.&rdquo;
          </p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: 0 }}>Early access user · Software Engineer, San Francisco</p>
        </div>

        {/* CTA */}
        <a href="/upgrade" style={{
          display: 'block', textAlign: 'center',
          background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
          color: '#fff', textDecoration: 'none',
          borderRadius: 10, padding: '14px 20px',
          fontSize: 15, fontWeight: 700,
          boxShadow: '0 4px 20px rgba(59,130,246,0.3)',
          marginBottom: 10,
        }}>
          Try it free today — no credit card required
        </a>

        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center', margin: 0 }}>
          $20/month after free period · Cancel anytime
        </p>
      </div>
    </div>
  )
}
