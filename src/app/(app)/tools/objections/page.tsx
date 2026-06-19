'use client'
import { useState } from 'react'
import { ToolPage } from '@/components/negotiate/ToolPage'

interface Response { label: string; text: string }
interface Result { objection: string; responses: Response[]; insight: string }

const STYLE: Record<string, { bg: string; color: string }> = {
  Assertive: { bg: '#FEF2F2', color: 'var(--color-danger)' },
  Collaborative: { bg: '#E8F5F0', color: 'var(--color-success)' },
  Reframe: { bg: '#EEF2FF', color: '#4338CA' },
}

export default function ObjectionHandler() {
  const [form, setForm] = useState({ objection: '', context: '' })
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const inp: React.CSSProperties = { border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, padding: '10px 12px', fontSize: 13, background: '#fff', width: '100%' }
  const lbl: React.CSSProperties = { fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const res = await fetch('/api/objections', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      setResult(await res.json())
    } catch { setError('Failed. Please try again.') }
    setLoading(false)
  }

  return (
    <ToolPage title="Objection handler" desc="Get three targeted responses to any recruiter pushback — assertive, collaborative, or reframe.">
      <form onSubmit={submit}>
        <div style={{ marginBottom: 14 }}>
          <div style={lbl}>WHAT DID THEY SAY?</div>
          <textarea style={{ ...inp, minHeight: 80 }} placeholder="e.g. We don't have flexibility on base at this time. Or: That's above our band." value={form.objection} onChange={(e) => setForm({ ...form, objection: e.target.value })} required />
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={lbl}>YOUR SITUATION (optional)</div>
          <textarea style={{ ...inp, minHeight: 60 }} placeholder="e.g. first offer, have competing offer, senior candidate, relocating..." value={form.context} onChange={(e) => setForm({ ...form, context: e.target.value })} />
        </div>
        <button type="submit" disabled={loading} style={{ height: 38, padding: '0 20px', background: '#141414', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, opacity: loading ? 0.6 : 1 }}>
          {loading ? 'Generating responses…' : 'Get responses →'}
        </button>
      </form>

      {error && <div style={{ marginTop: 16, fontSize: 13, color: 'var(--color-danger)', background: '#FDF2F2', padding: '10px 14px', borderRadius: 8 }}>{error}</div>}

      {result && (
        <div style={{ marginTop: 32 }} className="animate-slide-up">
          <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>INSIGHT</div>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 24, padding: '10px 14px', background: 'var(--color-background-secondary)', borderRadius: 8 }}>{result.insight}</div>

          {result.responses.map((r) => {
            const style = STYLE[r.label] || { bg: '#f5f5f5', color: '#333' }
            return (
              <div key={r.label} style={{ marginBottom: 14, border: '0.5px solid var(--color-border-tertiary)', borderRadius: 10, padding: 16 }}>
                <div style={{ display: 'inline-block', background: style.bg, color: style.color, fontSize: 11, padding: '2px 8px', borderRadius: 4, marginBottom: 10, fontWeight: 500 }}>{r.label}</div>
                <div style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>&ldquo;{r.text}&rdquo;</div>
              </div>
            )
          })}

          <div style={{ marginTop: 8, padding: '14px 16px', background: 'var(--color-background-secondary)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Practice using these responses live.</div>
            <a href="/tools/simulator" style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', textDecoration: 'none' }}>Negotiation simulator →</a>
          </div>
        </div>
      )}
    </ToolPage>
  )
}
