'use client'
import { useState } from 'react'
import { ToolPage } from '@/components/negotiate/ToolPage'

interface Result { subject: string; email: string; talkingPoints: string[]; timing: string }

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, border: '0.5px solid var(--color-border-secondary)', background: copied ? '#10b981' : '#fff', color: copied ? '#fff' : 'var(--color-text-secondary)', cursor: 'pointer' }}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

export default function RaiseBuilder() {
  const [form, setForm] = useState({ role: '', currentSalary: '', targetSalary: '', timeInRole: '', wins: '' })
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const inp: React.CSSProperties = { height: 40, border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, padding: '0 12px', fontSize: 13, background: '#fff', width: '100%' }
  const lbl: React.CSSProperties = { fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const res = await fetch('/api/raise-builder', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      setResult(await res.json())
    } catch { setError('Generation failed. Please try again.') }
    setLoading(false)
  }

  return (
    <ToolPage title="Raise request builder" desc="Build a compelling raise request email and talking points from your accomplishments.">
      <form onSubmit={submit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginBottom: 20 }}>
          <div><div style={lbl}>CURRENT ROLE</div><input style={inp} placeholder="Senior Product Manager" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required /></div>
          <div><div style={lbl}>CURRENT SALARY ($)</div><input type="number" style={inp} placeholder="120000" value={form.currentSalary} onChange={(e) => setForm({ ...form, currentSalary: e.target.value })} required /></div>
          <div><div style={lbl}>TARGET SALARY ($)</div><input type="number" style={inp} placeholder="140000" value={form.targetSalary} onChange={(e) => setForm({ ...form, targetSalary: e.target.value })} required /></div>
          <div>
            <div style={lbl}>TIME IN ROLE</div>
            <select style={inp} value={form.timeInRole} onChange={(e) => setForm({ ...form, timeInRole: e.target.value })} required>
              <option value="">Select</option>
              {['6-11 months', '1 year', '18 months', '2 years', '3+ years'].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={lbl}>KEY WINS & ACCOMPLISHMENTS</div>
          <textarea style={{ ...inp, height: 100, padding: '10px 12px' }} placeholder="e.g. launched product that grew revenue 20%, managed $2M budget, reduced churn by 15%, led team of 8..." value={form.wins} onChange={(e) => setForm({ ...form, wins: e.target.value })} required />
        </div>
        <button type="submit" disabled={loading} style={{ height: 38, padding: '0 20px', background: '#141414', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, opacity: loading ? 0.6 : 1 }}>
          {loading ? 'Building…' : 'Build raise request →'}
        </button>
      </form>

      {error && <div style={{ marginTop: 16, fontSize: 13, color: 'var(--color-danger)', background: '#FDF2F2', padding: '10px 14px', borderRadius: 8 }}>{error}</div>}

      {result && (
        <div style={{ marginTop: 32 }} className="animate-slide-up">
          <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>SUBJECT LINE</div>
          <div style={{ fontSize: 13, fontWeight: 500, padding: '8px 12px', background: 'var(--color-background-secondary)', borderRadius: 6, marginBottom: 16 }}>{result.subject}</div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>EMAIL</div>
            <CopyButton text={result.email} />
          </div>
          <pre style={{ fontFamily: 'inherit', fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-wrap', background: 'var(--color-background-secondary)', borderRadius: 8, padding: 16, marginBottom: 20, border: '0.5px solid var(--color-border-tertiary)' }}>{result.email}</pre>

          <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 10 }}>TALKING POINTS (in-person)</div>
          {result.talkingPoints.map((pt, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 20, height: 20, background: '#141414', color: '#fff', borderRadius: 4, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
              <div style={{ fontSize: 13, lineHeight: 1.6 }}>{pt}</div>
            </div>
          ))}

          <div style={{ border: '0.5px solid var(--color-border-tertiary)', borderRadius: 8, padding: 14, marginTop: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>TIMING ADVICE</div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>{result.timing}</div>
          </div>

          <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', padding: '10px 14px', background: 'var(--color-background-secondary)', borderRadius: 6 }}>
            Review and personalize before sending. NegotiateAI provides AI-generated guidance for informational purposes.
          </div>
        </div>
      )}
    </ToolPage>
  )
}
