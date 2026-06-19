'use client'
import { useState } from 'react'
import { ToolPage } from '@/components/negotiate/ToolPage'

interface Step { title: string; body: string }
interface Result { steps: Step[] }

export default function Playbook() {
  const [form, setForm] = useState({ negotiationType: '', currentOffer: '', target: '', leverage: '' })
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const inp: React.CSSProperties = { height: 40, border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, padding: '0 12px', fontSize: 13, background: '#fff', width: '100%' }
  const lbl: React.CSSProperties = { fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const res = await fetch('/api/playbook', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      setResult(await res.json())
    } catch { setError('Generation failed. Please try again.') }
    setLoading(false)
  }

  return (
    <ToolPage title="Negotiation playbook" desc="Get a personalized 5-step negotiation plan with exact language to use.">
      <form onSubmit={submit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginBottom: 20 }}>
          <div>
            <div style={lbl}>WHAT ARE YOU NEGOTIATING</div>
            <select style={inp} value={form.negotiationType} onChange={(e) => setForm({ ...form, negotiationType: e.target.value })} required>
              <option value="">Select</option>
              {['New job offer', 'Annual raise', 'Promotion', 'Competing offer counter'].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div><div style={lbl}>CURRENT OFFER / SALARY ($)</div><input type="number" style={inp} placeholder="120000" value={form.currentOffer} onChange={(e) => setForm({ ...form, currentOffer: e.target.value })} required /></div>
          <div><div style={lbl}>YOUR TARGET ($)</div><input type="number" style={inp} placeholder="140000" value={form.target} onChange={(e) => setForm({ ...form, target: e.target.value })} required /></div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={lbl}>YOUR STRONGEST LEVERAGE</div>
          <textarea style={{ ...inp, height: 80, padding: '10px 12px' }} placeholder="e.g. competing offer, specialized skill, market data, recent wins, long tenure..." value={form.leverage} onChange={(e) => setForm({ ...form, leverage: e.target.value })} required />
        </div>
        <button type="submit" disabled={loading} style={{ height: 38, padding: '0 20px', background: '#141414', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, opacity: loading ? 0.6 : 1 }}>
          {loading ? 'Building playbook…' : 'Build playbook →'}
        </button>
      </form>

      {error && <div style={{ marginTop: 16, fontSize: 13, color: 'var(--color-danger)', background: '#FDF2F2', padding: '10px 14px', borderRadius: 8 }}>{error}</div>}
      {loading && !result && <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>{[1,2,3,4,5].map((i) => <div key={i} className="skeleton" style={{ height: 72 }} />)}</div>}

      {result && (
        <div style={{ marginTop: 32 }} className="animate-slide-up">
          {result.steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
              <div style={{ width: 28, height: 28, background: '#141414', color: '#fff', borderRadius: 6, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 5 }}>{step.title}</div>
                <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{step.body}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 8, padding: '14px 16px', background: 'var(--color-background-secondary)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Get the exact email and phone script.</div>
            <a href="/tools/counter-offer" style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', textDecoration: 'none' }}>Counter-offer builder →</a>
          </div>
        </div>
      )}
    </ToolPage>
  )
}
