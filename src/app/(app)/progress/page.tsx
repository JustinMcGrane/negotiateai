import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Progress — NegotiateAI' }

function avg(nums: number[]) { return nums.length ? Math.round(nums.reduce((a, b) => a + b, 0) / nums.length) : 0 }
function scoreColor(s: number) {
  if (s >= 75) return 'var(--color-success)'
  if (s >= 55) return 'var(--color-warning)'
  return 'var(--color-danger)'
}

export default async function ProgressPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

  if (profile?.plan === 'free') {
    return (
      <div style={{ padding: '32px 32px 80px', maxWidth: 600 }}>
        <h1 style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>Progress</h1>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 24 }}>Upgrade to Pro to unlock full progress tracking.</p>
        <div style={{ background: '#141414', color: '#fff', borderRadius: 12, padding: '24px 28px' }}>
          <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>Pro feature</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>Track your score over time, see skill breakdowns, and review every session.</div>
          <Link href="/account/billing" style={{ display: 'inline-block', background: '#fff', color: '#141414', padding: '8px 18px', borderRadius: 8, fontSize: 13, textDecoration: 'none' }}>Upgrade to Pro →</Link>
        </div>
      </div>
    )
  }

  const { data: sessions } = await supabase.from('sessions').select('*').eq('user_id', user.id).order('created_at', { ascending: false })

  const allSessions = sessions || []
  const scores = allSessions.map((s) => s.overall_score || 0)
  const last5 = scores.slice(0, 5)
  const prev5 = scores.slice(5, 10)
  const avgLast5 = avg(last5)
  const avgPrev5 = avg(prev5)
  const trend = avgLast5 - avgPrev5
  const maxScore = allSessions.length ? Math.max(...scores) : 0

  const confAvg = avg(allSessions.map((s) => s.confidence_score || 0))
  const tacticsAvg = avg(allSessions.map((s) => s.tactics_score || 0))

  const toolCounts: Record<string, number> = {}
  ;(profile?.tools_used || []).forEach((t: string) => { toolCounts[t] = (toolCounts[t] || 0) + 1 })

  return (
    <div style={{ padding: '32px 32px 80px', maxWidth: 860 }}>
      <h1 style={{ fontSize: 18, fontWeight: 500, marginBottom: 24 }}>Progress</h1>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { value: allSessions.length, label: 'Total sessions' },
          { value: avg(scores) || '—', label: 'Avg score' },
          { value: maxScore || '—', label: 'Best score' },
          { value: trend > 0 ? `↑ ${trend}` : trend < 0 ? `↓ ${Math.abs(trend)}` : '—', label: 'vs. last 5' },
        ].map((m) => (
          <div key={m.label} style={{ flex: 1, minWidth: 100, background: 'var(--color-background-secondary)', borderRadius: 8, padding: '16px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 500 }}>{m.value}</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 3 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Score chart */}
      {allSessions.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>Score over time</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 100, padding: '0 4px' }}>
            {[...allSessions].reverse().slice(-20).map((s, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', background: scoreColor(s.overall_score || 0), height: `${s.overall_score || 0}%`, borderRadius: '2px 2px 0 0', minHeight: 2 }} />
                <div style={{ fontSize: 9, color: 'var(--color-text-tertiary)' }}>{s.overall_score}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skill breakdown */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>Skill breakdown</div>
        <div style={{ border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, padding: 20, background: '#fff' }}>
          {[['Overall', avg(scores)], ['Confidence', confAvg], ['Tactics', tacticsAvg]].map(([label, val]) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                <span>{label}</span><span style={{ fontWeight: 500, color: scoreColor(val as number) }}>{val || 0}</span>
              </div>
              <div style={{ height: 6, background: 'var(--color-background-secondary)', borderRadius: 3 }}>
                <div style={{ height: '100%', width: `${val || 0}%`, background: scoreColor(val as number), borderRadius: 3, transition: 'width 0.6s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Session history */}
      {allSessions.length > 0 && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>Session history</div>
          <div style={{ border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, overflow: 'hidden' }}>
            {allSessions.map((s, i) => (
              <div key={s.id} style={{
                padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: i < allSessions.length - 1 ? '0.5px solid var(--color-border-tertiary)' : 'none',
                background: '#fff', flexWrap: 'wrap', gap: 8,
              }}>
                <div>
                  <div style={{ fontSize: 13 }}>{s.role}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                    {s.persona_name} · ${parseInt(s.offer || '0').toLocaleString()} → ${parseInt(s.target || '0').toLocaleString()}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ fontSize: 20, fontWeight: 500, color: scoreColor(s.overall_score || 0) }}>{s.overall_score}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>{new Date(s.created_at).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {allSessions.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--color-text-secondary)', fontSize: 13 }}>
          No sessions yet. <Link href="/tools/simulator" style={{ color: 'var(--color-text-primary)', fontWeight: 500, textDecoration: 'none' }}>Start your first simulation →</Link>
        </div>
      )}
    </div>
  )
}
