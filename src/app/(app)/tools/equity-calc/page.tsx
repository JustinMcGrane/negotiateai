'use client'
import { useState } from 'react'
import { ToolPage } from '@/components/negotiate/ToolPage'

interface Result {
  conservative: number; base: number; optimistic: number
  likelihood: string; insight: string; questions: string[]
}

function fmt(n: number) { return '$' + n.toLocaleString() }

export default function EquityCalc() {
  const [form, setForm] = useState({ type: '', amount: '', valuation: '', strikePrice: '', vestingSchedule: '', stage: '' })
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const inp: React.CSSProperties = { height: 40, border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, padding: '0 12px', fontSize: 13, background: '#fff', width: '100%' }
  const lbl: React.CSSProperties = { fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const res = await fetch('/api/equity-model', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      setResult(await res.json())
    } catch { setError('Calculation failed. Please try again.') }
    setLoading(false)
  }

  return (
    <ToolPage title="Equity calculator" desc="Model your equity value across conservative, base, and optimistic exit scenarios.">
      <form onSubmit={submit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginBottom: 20 }}>
          <div>
            <div style={lbl}>EQUITY TYPE</div>
            <select style={inp} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} required>
              <option value="">Select</option>
              {['ISOs (Incentive stock options)', 'NSOs (Non-qualified stock options)', 'RSUs', 'Common stock'].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div><div style={lbl}>GRANT AMOUNT (SHARES)</div><input type="number" style={inp} placeholder="10000" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required /></div>
          <div><div style={lbl}>CURRENT VALUATION ($)</div><input type="number" style={inp} placeholder="50000000" value={form.valuation} onChange={(e) => setForm({ ...form, valuation: e.target.value })} required /></div>
          <div><div style={lbl}>STRIKE PRICE ($, options only)</div><input type="number" style={inp} placeholder="1.00" step="0.01" value={form.strikePrice} onChange={(e) => setForm({ ...form, strikePrice: e.target.value })} /></div>
          <div>
            <div style={lbl}>VESTING SCHEDULE</div>
            <select style={inp} value={form.vestingSchedule} onChange={(e) => setForm({ ...form, vestingSchedule: e.target.value })} required>
              <option value="">Select</option>
              {['4yr / 1yr cliff', '4yr / no cliff', '3yr / 1yr cliff', 'Monthly over 2 years', 'Other'].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <div style={lbl}>COMPANY STAGE</div>
            <select style={inp} value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })} required>
              <option value="">Select</option>
              {['Pre-seed / Seed', 'Series A', 'Series B', 'Series C+', 'Pre-IPO'].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <button type="submit" disabled={loading} style={{ height: 38, padding: '0 20px', background: '#141414', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, opacity: loading ? 0.6 : 1 }}>
          {loading ? 'Modeling…' : 'Model equity value →'}
        </button>
      </form>

      {error && <div style={{ marginTop: 16, fontSize: 13, color: 'var(--color-danger)', background: '#FDF2F2', padding: '10px 14px', borderRadius: 8 }}>{error}</div>}

      {result && (
        <div style={{ marginTop: 32 }} className="animate-slide-up">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
            {([['Conservative', result.conservative, 'var(--color-danger)'], ['Base case', result.base, 'var(--color-warning)'], ['Optimistic', result.optimistic, 'var(--color-success)']] as [string, number, string][]).map(([label, val, color]) => (
              <div key={label} style={{ background: 'var(--color-background-secondary)', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 500, color }}>{fmt(val)}</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ border: '0.5px solid var(--color-border-tertiary)', borderRadius: 8, padding: 14, marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>LIKELIHOOD OF MEANINGFUL RETURN</div>
            <div style={{ fontSize: 13 }}>{result.likelihood}</div>
          </div>

          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>{result.insight}</div>

          <div style={{ border: '0.5px solid var(--color-border-tertiary)', borderRadius: 8, padding: 14 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 10 }}>QUESTIONS TO ASK YOUR COMPANY</div>
            {result.questions.map((q, i) => <div key={i} style={{ fontSize: 13, marginBottom: 8, paddingLeft: 12, borderLeft: '2px solid var(--color-border-tertiary)' }}>{q}</div>)}
          </div>
        </div>
      )}
    </ToolPage>
  )
}
