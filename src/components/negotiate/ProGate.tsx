'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Lock, CheckCircle, TrendingUp, ArrowRight } from 'lucide-react'

interface Props {
  children: React.ReactNode
  toolName?: string
}

const FEATURES = [
  'Every negotiation tool — unlimited',
  'AI resume builder with ATS scoring',
  'Offer evaluator & counter-offer builder',
  'Equity calculator & total comp breakdown',
  'Cover letter generator',
  'Raise builder & negotiation playbook',
]

export function ProGate({ children, toolName }: Props) {
  const [status, setStatus] = useState<'loading' | 'free' | 'pro'>('loading')

  useEffect(() => {
    fetch('/api/subscription-status')
      .then(r => r.json())
      .then(d => setStatus(d.subscribed ? 'pro' : 'free'))
      .catch(() => setStatus('free'))
  }, [])

  if (status === 'loading') {
    return (
      <div style={{ padding: '60px 0', display: 'flex', justifyContent: 'center' }}>
        <div className="skeleton" style={{ width: 480, height: 320, borderRadius: 16 }} />
      </div>
    )
  }

  if (status === 'free') {
    return (
      <div style={{
        margin: '32px auto',
        maxWidth: 560,
        background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)',
        border: '1px solid rgba(99,102,241,0.3)',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
      }}>
        {/* Top accent bar */}
        <div style={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />

        <div style={{ padding: '36px 40px' }}>
          {/* Icon + label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Lock size={17} color="#818cf8" />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#818cf8', letterSpacing: '0.08em' }}>
              PRO FEATURE
            </span>
          </div>

          {/* Headline */}
          <div style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', lineHeight: 1.2, marginBottom: 10 }}>
            {toolName ? `${toolName} is a Pro tool` : 'This tool is for Pro members'}
          </div>
          <div style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.65, marginBottom: 28 }}>
            The average Hayven Pro member negotiates <strong style={{ color: '#a5b4fc' }}>$18,400 more</strong> in their first year. At $20/month, that's a 76× return.
          </div>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
            {FEATURES.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle size={15} color="#6366f1" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: '#cbd5e1' }}>{f}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link href="/account/billing" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: '#fff', padding: '14px 28px', borderRadius: 12,
            fontSize: 15, fontWeight: 700, textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
          }}>
            <TrendingUp size={17} />
            Unlock Pro — $20/month
            <ArrowRight size={15} />
          </Link>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 14 }}>
            {['Cancel anytime', 'No contracts', '5-min setup'].map(t => (
              <span key={t} style={{ fontSize: 11, color: '#475569' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
