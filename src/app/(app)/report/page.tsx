import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Compensation Report — NegotiateAI' }

export default async function ReportPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

  if (profile?.plan !== 'report' && profile?.plan !== 'pro') {
    return (
      <div style={{ padding: '32px 32px 80px', maxWidth: 600 }}>
        <h1 style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>Compensation report</h1>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 24 }}>Purchase a one-time compensation report to get a full audit of your compensation.</p>
        <div style={{ background: '#141414', color: '#fff', borderRadius: 12, padding: '24px 28px' }}>
          <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>One-time compensation report — $49</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>Full audit using all Intelligence and Strategy tools. PDF delivered. No subscription.</div>
          <Link href="/account/billing" style={{ display: 'inline-block', background: '#fff', color: '#141414', padding: '8px 18px', borderRadius: 8, fontSize: 13, textDecoration: 'none' }}>Buy report →</Link>
        </div>
      </div>
    )
  }

  const { data: sessions } = await supabase.from('sessions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1)
  const latestSession = sessions?.[0]

  return (
    <div style={{ padding: '32px 32px 80px', maxWidth: 860 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 500 }}>Compensation report</h1>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>Generated for {user.email} · {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        <button onClick={() => window.print()} style={{ height: 34, padding: '0 14px', background: 'transparent', border: '0.5px solid var(--color-border-primary)', borderRadius: 6, fontSize: 12 }} className="no-print">
          Save as PDF
        </button>
      </div>

      <div style={{ background: '#fff', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>Getting started</div>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
          Your report is generated as you use the tools. Complete the steps below to build a full picture of your compensation situation. Each tool output will appear in this report.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { label: 'Compensation analyzer', href: '/tools/comp-analyzer', done: false },
            { label: 'Offer evaluator', href: '/tools/offer-evaluator', done: false },
            { label: 'Equity calculator', href: '/tools/equity-calc', done: false },
            { label: 'Cost of not negotiating', href: '/tools/cost-calculator', done: false },
            { label: 'Negotiation playbook', href: '/tools/playbook', done: false },
            { label: 'Negotiation simulator', href: '/tools/simulator', done: !!latestSession },
          ].map((step) => (
            <div key={step.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--color-background-secondary)', borderRadius: 6 }}>
              <span style={{ fontSize: 13 }}>{step.label}</span>
              {step.done
                ? <span style={{ fontSize: 11, color: 'var(--color-success)' }}>✓ Complete</span>
                : <Link href={step.href} style={{ fontSize: 12, color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Start →</Link>
              }
            </div>
          ))}
        </div>
      </div>

      {latestSession && (
        <div style={{ background: '#fff', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>Latest simulation results</div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            {[['Overall', latestSession.overall_score], ['Confidence', latestSession.confidence_score], ['Tactics', latestSession.tactics_score]].map(([l, v]) => (
              <div key={l as string} style={{ flex: 1, background: 'var(--color-background-secondary)', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 500 }}>{v}</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{latestSession.outcome}</div>
        </div>
      )}
    </div>
  )
}
