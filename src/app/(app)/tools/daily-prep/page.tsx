'use client'
import { useState, useEffect } from 'react'
import { ToolPage } from '@/components/negotiate/ToolPage'

type Feedback = {
  score: number
  verdict: string
  whatWorked: string
  whatToImprove: string
  betterResponse: string
  streak: number
}

function ScoreRing({ score }: { score: number }) {
  const color = score >= 75 ? '#10b981' : score >= 55 ? '#f59e0b' : '#ef4444'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: `conic-gradient(${color} ${score}%, #f0f0f0 0)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ width: 54, height: 54, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color }}>{score}</div>
      </div>
      <div>
        <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 2 }}>NEGOTIATION SCORE</div>
        <div style={{ fontSize: 15, fontWeight: 600 }}>{score >= 80 ? 'Excellent' : score >= 65 ? 'Good' : score >= 50 ? 'Fair' : 'Needs work'}</div>
      </div>
    </div>
  )
}

export default function DailyPrepPage() {
  const [scenario, setScenario] = useState('')
  const [response, setResponse] = useState('')
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingScenario, setLoadingScenario] = useState(true)
  const [streak, setStreak] = useState(0)

  async function fetchScenario() {
    setLoadingScenario(true)
    setFeedback(null)
    setResponse('')
    const res = await fetch('/api/daily-scenario')
    const d = await res.json()
    setScenario(d.scenario || '')
    setLoadingScenario(false)
  }

  useEffect(() => { fetchScenario() }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!response.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/daily-scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario, response }),
      })
      const d = await res.json()
      setFeedback(d)
      setStreak(d.streak || 0)
    } catch { /* ignore */ }
    setLoading(false)
  }

  return (
    <ToolPage title="Daily negotiation prep" desc="One scenario a day. Get instant coaching feedback and track your streak.">

      {streak > 0 && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff7ed', border: '0.5px solid #fed7aa', borderRadius: 20, padding: '4px 12px', marginBottom: 20, fontSize: 13, color: '#c2410c', fontWeight: 600 }}>
          🔥 {streak}-day streak
        </div>
      )}

      {loadingScenario ? (
        <div className="skeleton" style={{ height: 80, borderRadius: 10, marginBottom: 20 }} />
      ) : (
        <div style={{ background: '#141414', color: '#fff', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 8, letterSpacing: '0.06em' }}>TODAY'S SCENARIO</div>
          <p style={{ fontSize: 15, lineHeight: 1.65, margin: 0 }}>{scenario}</p>
        </div>
      )}

      {!feedback && (
        <form onSubmit={submit}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>YOUR RESPONSE — what would you actually say?</div>
            <textarea
              value={response}
              onChange={e => setResponse(e.target.value)}
              placeholder="Write out what you'd say in this situation — as if it's real. Don't overthink it, just respond naturally..."
              rows={5}
              required
              style={{ width: '100%', padding: '12px 14px', fontSize: 13, lineHeight: 1.65, border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, background: '#fff', resize: 'vertical', boxSizing: 'border-box' as const }}
            />
          </div>
          <button type="submit" disabled={loading || !response.trim()} style={{ height: 38, padding: '0 20px', background: '#141414', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', opacity: loading || !response.trim() ? 0.6 : 1 }}>
            {loading ? 'Getting feedback…' : 'Get coaching feedback →'}
          </button>
        </form>
      )}

      {feedback && (
        <div className="animate-slide-up">
          <ScoreRing score={feedback.score} />

          <div style={{ background: 'var(--color-background-secondary)', borderRadius: 10, padding: 14, marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>VERDICT</div>
            <p style={{ fontSize: 14, fontWeight: 500, margin: 0, lineHeight: 1.5 }}>{feedback.verdict}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div style={{ background: '#ecfdf5', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 11, color: '#065f46', fontWeight: 600, marginBottom: 6 }}>WHAT WORKED</div>
              <p style={{ fontSize: 13, color: '#065f46', margin: 0, lineHeight: 1.6 }}>{feedback.whatWorked}</p>
            </div>
            <div style={{ background: '#fffbeb', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 11, color: '#92400e', fontWeight: 600, marginBottom: 6 }}>WHAT TO IMPROVE</div>
              <p style={{ fontSize: 13, color: '#92400e', margin: 0, lineHeight: 1.6 }}>{feedback.whatToImprove}</p>
            </div>
          </div>

          <div style={{ background: '#eff6ff', borderRadius: 10, padding: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: '#1e40af', fontWeight: 600, marginBottom: 8 }}>STRONGER RESPONSE</div>
            <p style={{ fontSize: 13, color: '#1e40af', margin: 0, lineHeight: 1.7, fontStyle: 'italic' }}>&ldquo;{feedback.betterResponse}&rdquo;</p>
          </div>

          {streak > 0 && (
            <div style={{ background: '#fff7ed', border: '0.5px solid #fed7aa', borderRadius: 10, padding: 14, marginBottom: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>🔥</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#c2410c' }}>{streak}-day streak!</div>
              <div style={{ fontSize: 13, color: '#c2410c', marginTop: 2 }}>Come back tomorrow to keep it going.</div>
            </div>
          )}

          <button onClick={fetchScenario} style={{ height: 38, padding: '0 20px', background: 'transparent', border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', color: 'var(--color-text-primary)' }}>
            Try another scenario →
          </button>
        </div>
      )}
    </ToolPage>
  )
}
