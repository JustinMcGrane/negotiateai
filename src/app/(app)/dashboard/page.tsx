import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { TrendingUp, FileSearch, Play, ArrowRight, UserCircle, FileText, Search, Lock, CalendarCheck, Rocket, Briefcase, GitBranch } from 'lucide-react'
import { MarketAlertCard } from '@/components/negotiate/MarketAlertCard'

export const metadata: Metadata = { title: 'Dashboard — NegotiateAI' }

function computeHealthScore(profile: Record<string, string> | null): number {
  if (!profile) return 42
  let score = 45
  if (profile.onboarding_role) score += 8
  if (profile.onboarding_goal) score += 5
  const expBonus: Record<string, number> = { '0-2': 0, '3-5': 8, '6-10': 14, '10+': 18 }
  score += expBonus[profile.onboarding_experience] ?? 0
  const sitBonus: Record<string, number> = { actively_looking: 5, have_offer: 12, employed: 16, casually_looking: 3 }
  score += sitBonus[profile.onboarding_situation] ?? 0
  if (profile.plan === 'pro') score += 10
  return Math.min(score, 99)
}

function healthLabel(score: number): { label: string; color: string; bg: string } {
  if (score >= 80) return { label: 'Strong', color: '#059669', bg: '#ecfdf5' }
  if (score >= 60) return { label: 'Moderate', color: '#d97706', bg: '#fffbeb' }
  return { label: 'Needs Work', color: '#dc2626', bg: '#fef2f2' }
}

type FeatureCard = {
  icon: React.ElementType
  title: string
  copy: (role: string, experience: string) => string
  iconColor: string
  iconBg: string
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    icon: CalendarCheck,
    title: 'Annual Review Coach',
    copy: (role, exp) => `Get a prep plan for your ${role || 'role'} review based on your ${exp || 'current'} years of experience.`,
    iconColor: '#6366f1',
    iconBg: '#eef2ff',
  },
  {
    icon: Rocket,
    title: 'Promotion Planner',
    copy: (role) => `Build a 90-day case for your ${role ? role + ' promotion' : 'next promotion'} with milestones and talking points.`,
    iconColor: '#0891b2',
    iconBg: '#e0f2fe',
  },
  {
    icon: Briefcase,
    title: 'Competing Offer Tool',
    copy: (role) => `Use a competing offer to negotiate a raise in your ${role || 'current'} role without burning bridges.`,
    iconColor: '#059669',
    iconBg: '#ecfdf5',
  },
  {
    icon: GitBranch,
    title: 'Career Timeline',
    copy: (role, exp) => `Map your ${role || 'career'} trajectory over the next 3 years given your ${exp || 'current'} experience level.`,
    iconColor: '#7c3aed',
    iconBg: '#f5f3ff',
  },
]

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, last_checkin_at')
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
    ? Math.round(sessions.reduce((sum: number, s: { overall_score?: number }) => sum + (s.overall_score || 0), 0) / sessions.length)
    : 0
  const bestScore = sessions?.length ? Math.max(...sessions.map((s: { overall_score?: number }) => s.overall_score || 0)) : 0

  const healthScore = computeHealthScore(profile)
  const { label: healthLabelText, color: healthColor, bg: healthBg } = healthLabel(healthScore)

  const role = profile?.onboarding_role || ''
  const expMap: Record<string, string> = { '0-2': '0–2', '3-5': '3–5', '6-10': '6–10', '10+': '10+' }
  const experience = expMap[profile?.onboarding_experience] || ''

  const isPro = plan === 'pro' || plan === 'elite'
  const lastCheckin = profile?.last_checkin_at ? new Date(profile.last_checkin_at) : null
  const daysSinceCheckin = lastCheckin ? Math.floor((Date.now() - lastCheckin.getTime()) / (1000 * 60 * 60 * 24)) : null
  const checkinDue = isPro && (daysSinceCheckin === null || daysSinceCheckin >= 90)

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px 80px' }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>{greeting}, {firstName}</h1>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: 0 }}>
          {plan === 'pro' ? 'Pro plan' : 'Free plan'} · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Compensation Health Score */}
      <div style={{
        background: 'var(--color-background-secondary)',
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: 16, padding: '28px 32px',
        marginBottom: 28,
        display: 'flex', alignItems: 'center', gap: 32,
      }}>
        <div>
          <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 1, color: 'var(--color-text-primary)', letterSpacing: '-2px' }}>
            {healthScore}
          </div>
          <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginTop: 4, fontWeight: 500 }}>out of 100</div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: 'var(--color-text-tertiary)', marginBottom: 6 }}>COMPENSATION HEALTH SCORE</div>
          <span style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: healthBg, color: healthColor, marginBottom: 8 }}>
            {healthLabelText}
          </span>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6, maxWidth: 340 }}>
            {healthScore < 60
              ? 'Your profile suggests you may be leaving money on the table. Complete your profile and analyze your offer to improve your score.'
              : healthScore < 80
              ? 'You have a solid foundation. Use the tools below to sharpen your negotiation position.'
              : 'You are in a strong position. Keep your skills and offer data up to date to stay ahead.'}
          </p>
        </div>
      </div>

      {/* Check-in due card */}
      {checkinDue && (
        <div style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
          border: '1px solid #86efac',
          borderRadius: 14, padding: '20px 24px', marginBottom: 20,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <div>
            <div style={{ fontSize: 12, color: '#166534', fontWeight: 700, letterSpacing: '0.05em', marginBottom: 4 }}>QUARTERLY CHECK-IN DUE</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#14532d', marginBottom: 4 }}>
              {daysSinceCheckin === null ? "It's time for your first check-in with Sarah." : `It has been ${daysSinceCheckin} days since your last check-in.`}
            </div>
            <div style={{ fontSize: 13, color: '#166534' }}>A lot can change in 3 months. Let Sarah reassess your market value.</div>
          </div>
          <Link href="/recruiter?checkin=true" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#16a34a', color: '#fff',
            padding: '10px 18px', borderRadius: 9,
            fontSize: 13, fontWeight: 700, textDecoration: 'none', flexShrink: 0,
          }}>
            Start check-in <ArrowRight size={13} />
          </Link>
        </div>
      )}

      {/* Market alert card */}
      <MarketAlertCard role={role} />

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

      {/* Stats */}
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

      {/* Career Hub */}
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

      {/* Negotiation Tools */}
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

      {/* Elite feature cards */}
      {(() => {
        const isElite = plan === 'elite'
        const cardLinks: Record<string, string> = {
          'Annual Review Coach': '/tools/annual-review',
          'Promotion Planner': '/tools/promotion-planner',
          'Competing Offer Tool': '/tools/competing-offer',
          'Career Timeline': '/tools/career-timeline',
        }
        return (
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-tertiary)', letterSpacing: '0.04em' }}>
                {isElite ? 'ELITE TOOLS' : 'ELITE FEATURES'}
              </div>
              {!isElite && <Link href="/upgrade" style={{ fontSize: 12, color: 'var(--color-text-tertiary)', textDecoration: 'underline' }}>Upgrade to Elite</Link>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
              {FEATURE_CARDS.map((card) => (
                <Link key={card.title} href={isElite ? (cardLinks[card.title] || '/upgrade') : '/upgrade'} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'var(--color-background-secondary)',
                    border: '0.5px solid var(--color-border-tertiary)',
                    borderRadius: 12, padding: 16,
                    opacity: isElite ? 1 : 0.85,
                    position: 'relative',
                    height: '100%',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                      <div style={{ width: 36, height: 36, background: card.iconBg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <card.icon size={16} color={card.iconColor} />
                      </div>
                      {!isElite && (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                          fontSize: 10, fontWeight: 700, color: '#92400e',
                          background: '#fef3c7', borderRadius: 20, padding: '2px 8px',
                        }}>
                          <Lock size={9} /> ELITE
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 4 }}>{card.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                      {card.copy(role, experience)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )
      })()}

      {/* Recent activity */}
      {(toolUses?.length || 0) > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, color: 'var(--color-text-tertiary)', letterSpacing: '0.04em' }}>RECENT ACTIVITY</div>
          <div style={{ background: '#fff', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, overflow: 'hidden' }}>
            {toolUses?.map((use: { id: string; tool_id: string; created_at: string }, i: number) => (
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

      {/* Upgrade banner */}
      {plan === 'free' && !isNew && (
        <div style={{
          background: '#141414', color: '#fff', borderRadius: 14, padding: '22px 28px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>You are on the free plan</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
              Upgrade to Pro for unlimited access to all tools and the features above.
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
