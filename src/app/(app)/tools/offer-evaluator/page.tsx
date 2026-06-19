'use client'
import { useState } from 'react'
import { ToolPage } from '@/components/negotiate/ToolPage'

interface Result {
  score: number; verdict: string; totalComp4yr: number; marketMedian: number
  gap: number; analysis: string; negotiate: string[]
}

function fmt(n: number) { return '$' + n.toLocaleString() }

function scoreColor(s: number) {
  if (s >= 75) return 'var(--color-success)'
  if (s >= 55) return 'var(--color-warning)'
  return 'var(--color-danger)'
}

export default function OfferEvaluator() {
  const [form, setForm] = useState({ role: '', baseSalary: '', bonus: '', equity: '', location: '', stage: '' })
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const inp: React.CSSProperties = { height: 40, border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, padding: '0 12px', fontSize: 13, background: '#fff', width: '100%' }
  const sel: React.CSSProperties = { ...inp }
  const lbl: React.CSSProperties = { fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/offer-evaluate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      setResult(await res.json())
    } catch { setError('Evaluation failed. Please try again.') }
    setLoading(false)
  }

  return (
    <ToolPage title="Offer evaluator" desc="Score any job offer 0–100 and get a breakdown of exactly what to negotiate.">
      <form onSubmit={submit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginBottom: 20 }}>
          <div><div style={lbl}>ROLE</div><input style={inp} placeholder="Senior Product Manager" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required /></div>
          <div><div style={lbl}>BASE SALARY ($)</div><input type="number" style={inp} placeholder="130000" value={form.baseSalary} onChange={(e) => setForm({ ...form, baseSalary: e.target.value })} required /></div>
          <div><div style={lbl}>ANNUAL BONUS ($)</div><input type="number" style={inp} placeholder="15000" value={form.bonus} onChange={(e) => setForm({ ...form, bonus: e.target.value })} /></div>
          <div><div style={lbl}>EQUITY 4YR VALUE ($)</div><input type="number" style={inp} placeholder="60000" value={form.equity} onChange={(e) => setForm({ ...form, equity: e.target.value })} /></div>
          <div><div style={lbl}>LOCATION</div><input style={inp} placeholder="New York, NY" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required /></div>
          <div>
            <div style={lbl}>COMPANY STAGE</div>
            <select style={sel} value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })} required>
              <option value="">Select</option>
              {['Pre-seed / Seed', 'Series A', 'Series B', 'Series C+', 'Public company', 'Private equity'].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <button type="submit" disabled={loading} style={{ height: 38, padding: '0 20px', background: '#141414', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, opacity: loading ? 0.6 : 1 }}>
          {loading ? 'Evaluating…' : 'Evaluate offer →'}
        </button>
      </form>

      {error && <div style={{ marginTop: 16, fontSize: 13, color: 'var(--color-danger)', background: '#FDF2F2', padding: '10px 14px', borderRadius: 8 }}>{error}</div>}

      {loading && !result && <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>{[1,2,3].map((i) => <div key={i} className="skeleton" style={{ height: 48 }} />)}</div>}

      {result && (
        <div style={{ marginTop: 32 }} className="animate-slide-up">
          <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            <div style={{ background: 'var(--color-background-secondary)', borderRadius: 8, padding: '16px 24px', textAlign: 'center', minWidth: 120 }}>
              <div style={{ fontSize: 36, fontWeight: 500, color: scoreColor(result.score) }}>{result.score}</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>Offer score</div>
            </div>
            <div style={{ background: 'var(--color-background-secondary)', borderRadius: 8, padding: '16px 24px', textAlign: 'center', minWidth: 120 }}>
              <div style={{ fontSize: 18, fontWeight: 500, textTransform: 'capitalize' }}>{result.verdict}</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>Market position</div>
            </div>
            <div style={{ background: 'var(--color-background-secondary)', borderRadius: 8, padding: '16px 24px', textAlign: 'center', minWidth: 120 }}>
              <div style={{ fontSize: 18, fontWeight: 500 }}>{fmt(result.totalComp4yr)}</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>4-year total comp</div>
            </div>
            <div style={{ background: 'var(--color-background-secondary)', borderRadius: 8, padding: '16px 24px', textAlign: 'center', minWidth: 120 }}>
              <div style={{ fontSize: 18, fontWeight: 500, color: result.gap > 0 ? 'var(--color-danger)' : 'var(--color-success)' }}>
                {result.gap > 0 ? '-' : '+'}{fmt(Math.abs(result.gap))}
              </div>
              <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>vs. market median</div>
            </div>
          </div>

          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{result.analysis}</div>

          <div style={{ border: '0.5px solid var(--color-border-tertiary)', borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 10 }}>3 THINGS TO NEGOTIATE</div>
            {result.negotiate.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 20, height: 20, background: '#141414', color: '#fff', borderRadius: 4, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontSize: 13 }}>{item}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, padding: '14px 16px', background: 'var(--color-background-secondary)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Build your counter-offer script.</div>
            <a href="/tools/counter-offer" style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', textDecoration: 'none' }}>Counter-offer builder →</a>
          </div>
        </div>
      )}
    </ToolPage>
  )
}
