import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { PageHeader } from '@/components/negotiate/PageHeader'

export const metadata: Metadata = { title: 'Progress — Hayven' }

function avg(nums: number[]) { return nums.length ? Math.round(nums.reduce((a, b) => a + b, 0) / nums.length) : 0 }
function scoreColor(s: number) {
  if (s >= 75) return '#10b981'
  if (s >= 55) return '#f59e0b'
  return '#ef4444'
}

export default async function ProgressPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const { data: sessions } = await supabase.from('sessions').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
  const { data: toolUses } = await supabase.from('tool_uses').select('*').eq('user_id', user.id).order('created_at', { ascending: false })

  const allSessions = sessions || []
  const scores = allSessions.map((s) => s.overall_score || 0)
  const avgScore = avg(scores)
  const maxScore = scores.length ? Math.max(...scores) : 0
  const confAvg = avg(allSessions.map((s) => s.confidence_score || 0))
  const tacticsAvg = avg(allSessions.map((s) => s.tactics_score || 0))
  const last5 = scores.slice(0, 5)
  const prev5 = scores.slice(5, 10)
  const trend = avg(last5) - avg(prev5)
  const isPro = profile?.plan === 'pro' || profile?.plan === 'elite'

  const toolUseCounts: Record<string, number> = {}
  ;(toolUses || []).forEach((t: { tool_id: string }) => {
    toolUseCounts[t.tool_id] = (toolUseCounts[t.tool_id] || 0) + 1
  })

  return (
    <div>
      <PageHeader title="Progress" description="Track your negotiation performance over time." plan={profile?.plan ?? 'free'} userInitial={(profile?.name || user.email || '?')[0].toUpperCase()} />
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '28px 24px 80px' }}>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12, marginBottom: 28 }}>
        {[
          { value: allSessions.length, label: 'Simulations' },
          { value: avgScore || '—', label: 'Avg score' },
          { value: maxScore || '—', label: 'Best score' },
          { value: trend > 0 ? `↑ ${trend}` : trend < 0 ? `↓ ${Math.abs(trend)}` : '—', label: 'Trend' },
          { value: profile?.tools_used?.length || 0, label: 'Tools used' },
        ].map((m) => (
          <div key={m.label} style={{
            background: 'var(--color-background-secondary)',
            borderRadius: 10, padding: '16px 18px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text-primary)' }}>{m.value}</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 4 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {allSessions.length === 0 && (
        <div style={{
          background: '#fff',
          border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: 14, padding: '48px 32px',
          textAlign: 'center', marginBottom: 24,
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
          <h2 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>No simulations yet</h2>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: '0 0 20px', lineHeight: 1.6 }}>
            Practice a salary negotiation to start tracking your scores and improvement over time.
          </p>
          <Link href="/tools/simulator" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#141414', color: '#fff',
            padding: '10px 20px', borderRadius: 9,
            fontSize: 14, fontWeight: 600, textDecoration: 'none',
          }}>Start your first simulation →</Link>
        </div>
      )}

      {/* Score chart */}
      {allSessions.length > 0 && (
        <div style={{
          background: '#fff',
          border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: 14, padding: 24, marginBottom: 20,
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Score over time</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 120 }}>
            {[...allSessions].reverse().slice(-20).map((s, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: 9, color: 'var(--color-text-tertiary)' }}>{s.overall_score}</div>
                <div style={{
                  width: '100%',
                  background: scoreColor(s.overall_score || 0),
                  height: `${s.overall_score || 0}%`,
                  borderRadius: '3px 3px 0 0',
                  minHeight: 3,
                  transition: 'height 0.4s ease',
                }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8, display: 'flex', gap: 16 }}>
            {[['#10b981', '75+'], ['#f59e0b', '55–74'], ['#ef4444', '<55']].map(([color, label]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--color-text-tertiary)' }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
                {label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skill breakdown */}
      {allSessions.length > 0 && (
        <div style={{
          background: '#fff',
          border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: 14, padding: 24, marginBottom: 20,
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 18 }}>Skill breakdown</div>
          {([['Overall', avgScore], ['Confidence', confAvg], ['Negotiation tactics', tacticsAvg]] as [string, number][]).map(([label, val]) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>{label}</span>
                <span style={{ fontWeight: 700, color: scoreColor(val) }}>{val || 0}/100</span>
              </div>
              <div style={{ height: 8, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${val || 0}%`, background: scoreColor(val), borderRadius: 4, transition: 'width 0.6s ease' }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pro gate for session history */}
      {allSessions.length > 0 && !isPro && (
        <div style={{
          background: '#141414', color: '#fff',
          borderRadius: 14, padding: '24px 28px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Full session history</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Review every simulation, transcript, and debrief with Pro.</div>
          </div>
          <Link href="/account/billing" style={{
            background: '#fff', color: '#141414',
            padding: '9px 18px', borderRadius: 8,
            fontSize: 13, fontWeight: 700, textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}>Upgrade to Pro</Link>
        </div>
      )}

      {/* Session history (Pro only) */}
      {allSessions.length > 0 && isPro && (
        <div style={{
          background: '#fff',
          border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: 14, overflow: 'hidden',
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '0.5px solid var(--color-border-tertiary)', fontSize: 14, fontWeight: 600 }}>Session history</div>
          {allSessions.map((s, i) => (
            <div key={s.id} style={{
              padding: '14px 20px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderBottom: i < allSessions.length - 1 ? '0.5px solid var(--color-border-tertiary)' : 'none',
              flexWrap: 'wrap', gap: 8,
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{s.role || 'Negotiation session'}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                  {s.persona_name ? `vs. ${s.persona_name}` : ''}
                  {s.offer ? ` · $${parseInt(s.offer).toLocaleString()} → $${parseInt(s.target || s.offer).toLocaleString()}` : ''}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: scoreColor(s.overall_score || 0) }}>{s.overall_score || '—'}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA if no sessions */}
      {allSessions.length === 0 && (
        <div style={{
          background: 'var(--color-background-secondary)',
          borderRadius: 12, padding: '20px 24px',
          display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Talk to Sarah first</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Get personalized advice before your next practice session.</div>
          </div>
          <Link href="/recruiter" style={{
            background: '#141414', color: '#fff',
            padding: '9px 18px', borderRadius: 8,
            fontSize: 13, fontWeight: 600, textDecoration: 'none',
          }}>Talk to Sarah</Link>
        </div>
      )}
    </div>
    </div>
  )
}
