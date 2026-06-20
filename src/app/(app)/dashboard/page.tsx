import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { TrendingUp, FileSearch, Play, ArrowRight, UserCircle, FileText, Search } from 'lucide-react'

export const metadata: Metadata = { title: 'Dashboard — NegotiateAI' }

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
  const isNew = !profile?.tools_used?.length && !sessions?.length

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const avgScore = sessions?.length
    ? Math.round(sessions.reduce((sum, s) => sum + (s.overall_score || 0), 0) / sessions.length)
    : 0
  const bestScore = sessions?.length ? Math.max(...sessions.map((s) => s.overall_score || 0)) : 0

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px 80px' }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>{greeting}, {firstName}</h1>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: 0 }}>
          {plan === 'pro' ? 'Pro plan' : 'Free plan'} · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* New user welcome */}
      {isNew && (
        <div style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
          borderRadius: 16, padding: '28px 32px', marginBottom: 28,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 20,
        }}>
          <div>
            <div style={{ fontSize: 11, color: '#a5b4fc', fontWeight: 600, letterSpacing: '0.06em', marginBottom: 8 }}>GET STARTED</div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Sarah is ready for you.</h2>
            <p style={{ fontSize: 14, color: '#c7d2fe', margin: 0, lineHeight: 1.6, maxWidth: 380 }}>
              Your AI recruiter is waiting. Tell her where you are in your job search and she will tell you exactly what to do next.
            </p>
          </div>
          <Link href="/recruiter" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', color: '#1e1b4b',
            padding: '12px 22px', borderRadius: 10,
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
            flexShrink: 0,
          }}>
            Talk to Sarah <ArrowRight size={15} />
          </Link>
        </div>
      )}

      {/* Stats (only show if they have activity) */}
      {!isNew && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12, marginBottom: 28 }}>
          {[
            { value: profile?.tools_used?.length || 0, label: 'Tools used' },
            { value: profile?.sessions_used || 0, label: 'Sessions' },
            { value: bestScore || '—', label: 'Best score' },
            { value: avgScore || '—', label: 'Avg score' },
          ].map((m) => (
            <div key={m.label} style={{
              background: 'var(--color-background-secondary)',
              borderRadius: 10, padding: '16px 18px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{m.value}</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 3 }}>{m.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Career Hub quick access */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, color: 'var(--color-text-tertiary)', letterSpacing: '0.04em' }}>CAREER HUB</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
          {[
            { href: '/recruiter', icon: UserCircle, color: '#6366f1', bg: '#eef2ff', name: 'AI Recruiter — Sarah', desc: 'Get personalized career advice' },
            { href: '/resume', icon: FileText, color: '#0891b2', bg: '#e0f2fe', name: 'Resume Analyzer', desc: 'Get recruiter-grade feedback' },
            { href: '/jobs', icon: Search, color: '#059669', bg: '#ecfdf5', name: 'Job Search', desc: 'Find roles that fit you' },
          ].map((t) => (
            <Link key={t.href} href={t.href} style={{
              background: '#fff', border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 12, padding: 16,
              display: 'flex', gap: 12, textDecoration: 'none',
            }}>
              <div style={{ width: 36, height: 36, background: t.bg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <t.icon size={16} color={t.color} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>{t.name}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{t.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Negotiation tools */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, color: 'var(--color-text-tertiary)', letterSpacing: '0.04em' }}>NEGOTIATION TOOLS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
          {[
            { href: '/tools/comp-analyzer', icon: TrendingUp, color: '#0F6E56', bg: '#E8F5F0', name: 'Compensation analyzer', desc: 'See your market rate' },
            { href: '/tools/offer-evaluator', icon: FileSearch, color: '#0F6E56', bg: '#E8F5F0', name: 'Offer evaluator', desc: 'Score any job offer 0–100' },
            { href: '/tools/simulator', icon: Play, color: '#141414', bg: '#f0f0f0', name: 'Negotiation simulator', desc: 'Practice with an AI recruiter' },
          ].map((t) => (
            <Link key={t.href} href={t.href} style={{
              background: '#fff', border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 12, padding: 16,
              display: 'flex', gap: 12, textDecoration: 'none',
            }}>
              <div style={{ width: 36, height: 36, background: t.bg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <t.icon size={16} color={t.color} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>{t.name}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{t.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      {(toolUses?.length || 0) > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, color: 'var(--color-text-tertiary)', letterSpacing: '0.04em' }}>RECENT ACTIVITY</div>
          <div style={{ background: '#fff', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, overflow: 'hidden' }}>
            {toolUses?.map((use, i) => (
              <div key={use.id} style={{
                padding: '12px 16px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: i < (toolUses.length - 1) ? '0.5px solid var(--color-border-tertiary)' : 'none',
              }}>
                <div style={{ fontSize: 13 }}>{use.tool_id}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
                  {new Date(use.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upgrade banner for free users who have used the app */}
      {plan === 'free' && !isNew && (
        <div style={{
          background: '#141414', color: '#fff', borderRadius: 14, padding: '22px 28px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>You are on the free plan</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
              Upgrade to Pro for unlimited access to all tools and unlimited chats with Sarah.
            </div>
          </div>
          <Link href="/account/billing" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#fff', color: '#141414',
            padding: '9px 18px', borderRadius: 9,
            fontSize: 13, fontWeight: 700, textDecoration: 'none',
          }}>
            Upgrade to Pro <ArrowRight size={13} />
          </Link>
        </div>
      )}
    </div>
  )
}
