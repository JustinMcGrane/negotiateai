'use client'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { ToolPage } from '@/components/negotiate/ToolPage'

interface Result { email: string; script: string; tip: string }

export default function CounterOffer() {
  const [form, setForm] = useState({ role: '', company: '', offer: '', counter: '', leverage: '' })
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedScript, setCopiedScript] = useState(false)

  function copyEmail() {
    if (!result) return
    navigator.clipboard.writeText(result.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }
  function copyScript() {
    if (!result) return
    navigator.clipboard.writeText(result.script)
    setCopiedScript(true)
    setTimeout(() => setCopiedScript(false), 2000)
  }

  const inp: React.CSSProperties = { height: 40, border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, padding: '0 12px', fontSize: 13, background: '#fff', width: '100%' }
  const lbl: React.CSSProperties = { fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const res = await fetch('/api/counter-offer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      setResult(await res.json())
    } catch { setError('Generation failed. Please try again.') }
    setLoading(false)
  }

  return (
    <ToolPage title="Counter-offer builder" desc="Generate a ready-to-send counter-offer email and phone script for your specific situation.">
      <form onSubmit={submit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginBottom: 20 }}>
          <div><div style={lbl}>ROLE</div><input style={inp} placeholder="Senior Engineer" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required /></div>
          <div><div style={lbl}>COMPANY</div><input style={inp} placeholder="Acme Corp" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required /></div>
          <div><div style={lbl}>THEIR OFFER ($)</div><input type="number" style={inp} placeholder="130000" value={form.offer} onChange={(e) => setForm({ ...form, offer: e.target.value })} required /></div>
          <div><div style={lbl}>YOUR COUNTER ($)</div><input type="number" style={inp} placeholder="150000" value={form.counter} onChange={(e) => setForm({ ...form, counter: e.target.value })} required /></div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={lbl}>LEVERAGE / CONTEXT</div>
          <textarea style={{ ...inp, height: 80, padding: '10px 12px' }} placeholder="e.g. competing offer, market data, specialized skills, relocation involved..." value={form.leverage} onChange={(e) => setForm({ ...form, leverage: e.target.value })} required />
        </div>
        <button type="submit" disabled={loading} style={{ height: 38, padding: '0 20px', background: '#141414', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, opacity: loading ? 0.6 : 1 }}>
          {loading ? 'Building…' : 'Build counter-offer →'}
        </button>
      </form>

      {error && <div style={{ marginTop: 16, fontSize: 13, color: 'var(--color-danger)', background: '#FDF2F2', padding: '10px 14px', borderRadius: 8 }}>{error}</div>}
      {loading && !result && <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>{[1,2].map((i) => <div key={i} className="skeleton" style={{ height: 120 }} />)}</div>}

      {result && (
        <div style={{ marginTop: 32 }} className="animate-slide-up">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>EMAIL</div>
            <button onClick={copyEmail} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: copiedEmail ? '#16a34a' : '#64748b', background: 'transparent', border: '0.5px solid #e2e8f0', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>
              {copiedEmail ? <Check size={12} /> : <Copy size={12} />}
              {copiedEmail ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre style={{ fontFamily: 'inherit', fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-wrap', background: 'var(--color-background-secondary)', borderRadius: 8, padding: 16, marginBottom: 20, border: '0.5px solid var(--color-border-tertiary)' }}>{result.email}</pre>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>PHONE SCRIPT</div>
            <button onClick={copyScript} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: copiedScript ? '#16a34a' : '#64748b', background: 'transparent', border: '0.5px solid #e2e8f0', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>
              {copiedScript ? <Check size={12} /> : <Copy size={12} />}
              {copiedScript ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', display: 'none' }}>PHONE SCRIPT</div>
          <div style={{ fontStyle: 'italic', fontSize: 13, lineHeight: 1.7, color: 'var(--color-text-secondary)', background: 'var(--color-background-secondary)', borderRadius: 8, padding: 16, marginBottom: 20, border: '0.5px solid var(--color-border-tertiary)' }}>
            &ldquo;{result.script}&rdquo;
          </div>

          <div style={{ border: '0.5px solid var(--color-border-tertiary)', borderRadius: 8, padding: 14, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>DELIVERY TIP</div>
            <div style={{ fontSize: 13 }}>{result.tip}</div>
          </div>

          <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', padding: '10px 14px', background: 'var(--color-background-secondary)', borderRadius: 6 }}>
            Review and personalize before sending. Hayven provides AI-generated guidance for informational purposes.
          </div>
        </div>
      )}
    </ToolPage>
  )
}
