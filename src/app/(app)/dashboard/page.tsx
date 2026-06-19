import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { TrendingUp, FileSearch, Play, ArrowRight } from 'lucide-react'

export const metadata: Metadata = { title: 'Dashboard — NegotiateAI' }

function MetricCard({ value, label }: { value: string | number; label: string }) {
  return (
    <div style={{
      background: 'var(--color-background-secondary)', borderRadius: 8,
      padding: '16px 20px', textAlign: 'center', flex: 1,
    }}>
      <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em' }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 3 }}>{label}</div>
    </div>
  )
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: sessions } = await supabase
    .from('sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: toolUses } = await supabase
    .from('tool_uses')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const firstName = (profile?.name || user.email || 'there').split(' ')[0]
  const plan = profile?.plan || 'free'
  const avgScore = sessions?.length
    ? Math.round(sessions.reduce((sum, s) => sum + (s.overall_score || 0), 0) / sessions.length)
    : 0
  const bestScore = sessions?.length ? Math.max(...sessions.map((s) => s.overall_score || 0)) : 0

  return (
    <div style={{ padding: '32px 32px 80px', maxWidth: 860 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 18, fontWeight: 500 }}>Good morning, {firstName}</h1>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>
          {plan === 'free' ? 'Free plan' : plan === 'pro' ? 'Pro plan' : 'Report plan'} · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        <MetricCard value={profile?.tools_used?.length || 0} label="Tools used" />
        <MetricCard value={profile?.sessions_used || 0} label="Sessions completed" />
        <MetricCard value={bestScore || '—'} label="Best score" />
        <MetricCard value={avgScore || '—'} label="Avg score" />
      </div>

      {/* Quick start */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>Quick start</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
          {[
            { href: '/tools/comp-analyzer', icon: TrendingUp, color: '#0F6E56', bg: '#E8F5F0', name: 'Compensation analyzer', desc: 'See your market rate at every percentile.' },
            { href: '/tools/counter-offer', icon: FileSearch, color: '#854F0B', bg: '#FEF3E2', name: 'Counter-offer builder', desc: 'Generate a ready-to-send negotiation email.' },
            { href: '/tools/simulator', icon: Play, color: '#141414', bg: '#f0f0f0', name: 'Negotiation simulator', desc: 'Practice against a realistic AI recruiter.' },
          ].map((t) => (
            <Link key={t.href} href={t.href} style={{
              background: '#fff', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12,
              padding: 16, display: 'flex', gap: 12, textDecoration: 'none',
              transition: 'border-color 0.15s',
            }}>
              <div style={{ width: 36, height: 36, background: t.bg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <t.icon size={16} color={t.color} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)' }}>{t.name}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{t.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      {(toolUses?.length || 0) > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>Recent activity</div>
          <div style={{ border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, overflow: 'hidden' }}>
            {toolUses?.map((use, i) => (
              <div key={use.id} style={{
                padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: i < (toolUses.length - 1) ? '0.5px solid var(--color-border-tertiary)' : 'none',
                background: '#fff',
              }}>
                <div>
                  <div style={{ fontSize: 13 }}>{use.tool_id}</div>
                  {use.output_summary && <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{use.output_summary}</div>}
                </div>
                <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>
                  {new Date(use.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upgrade banner */}
      {plan === 'free' && (
        <div style={{
          background: '#141414', color: '#fff', borderRadius: 12, padding: '20px 24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>You&apos;re on the free plan</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 3 }}>
              Upgrade to Pro for unlimited access to all 10 tools.
            </div>
          </div>
          <Link href="/account/billing" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#fff', color: '#141414', padding: '7px 14px',
            borderRadius: 8, fontSize: 13, textDecoration: 'none',
          }}>
            Upgrade to Pro <ArrowRight size={13} />
          </Link>
        </div>
      )}
    </div>
  )
}
