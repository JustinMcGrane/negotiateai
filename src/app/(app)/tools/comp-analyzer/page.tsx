'use client'
import { useState } from 'react'
import { ToolPage } from '@/components/negotiate/ToolPage'

interface Result {
  p25: number; p50: number; p75: number; p90: number
  insight: string; tip: string; recommendedTarget: number
}

function fmt(n: number) { return '$' + n.toLocaleString() }

export default function CompAnalyzer() {
  const [form, setForm] = useState({ role: '', experience: '', location: '', companySize: '', industry: '' })
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const sel: React.CSSProperties = { height: 40, border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, padding: '0 12px', fontSize: 13, background: '#fff', width: '100%' }
  const inp: React.CSSProperties = { ...sel }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/comp-analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      setResult(await res.json())
    } catch { setError('Analysis failed. Please try again.') }
    setLoading(false)
  }

  const max = result ? result.p90 : 1

  return (
    <ToolPage title="Compensation analyzer" desc="See your market rate at the 25th through 90th percentile for your role, location, and experience level.">
      <form onSubmit={submit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>JOB TITLE</div>
            <input style={inp} placeholder="e.g. Senior Software Engineer" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>YEARS OF EXPERIENCE</div>
            <select style={sel} value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} required>
              <option value="">Select</option>
              {['0-2 years', '2-5 years', '5-8 years', '8-12 years', '12+ years'].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>LOCATION</div>
            <input style={inp} placeholder="e.g. San Francisco, CA" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>COMPANY SIZE</div>
            <select style={sel} value={form.companySize} onChange={(e) => setForm({ ...form, companySize: e.target.value })} required>
              <option value="">Select</option>
              {['1-50 employees', '50-200 employees', '200-1000 employees', '1000-5000 employees', '5000+ employees'].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>INDUSTRY</div>
            <select style={sel} value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} required>
              <option value="">Select</option>
              {['Technology / SaaS', 'Finance / FinTech', 'Healthcare', 'E-commerce / Retail', 'Media / Entertainment', 'Consulting', 'Other'].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <button type="submit" disabled={loading} style={{ height: 38, padding: '0 20px', background: '#141414', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, opacity: loading ? 0.6 : 1 }}>
          {loading ? 'Analyzing…' : 'Analyze compensation →'}
        </button>
      </form>

      {error && <div style={{ marginTop: 16, fontSize: 13, color: 'var(--color-danger)', background: '#FDF2F2', padding: '10px 14px', borderRadius: 8 }}>{error} <button onClick={() => submit({ preventDefault: () => {} } as React.FormEvent)} style={{ marginLeft: 8, background: 'none', border: 'none', color: 'var(--color-danger)', textDecoration: 'underline', fontSize: 13, cursor: 'pointer' }}>Retry</button></div>}

      {loading && !result && (
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[1,2,3].map((i) => <div key={i} className="skeleton" style={{ height: 48 }} />)}
        </div>
      )}

      {result && (
        <div style={{ marginTop: 32 }} className="animate-slide-up">
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 16 }}>Market rates for {form.role} in {form.location}</div>

          {([['25th percentile', result.p25], ['50th percentile (median)', result.p50], ['75th percentile', result.p75], ['90th percentile', result.p90]] as [string, number][]).map(([label, val]) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>{label}</span>
                <span style={{ fontWeight: 500 }}>{fmt(val)}</span>
              </div>
              <div style={{ height: 8, background: 'var(--color-background-secondary)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(val / max) * 100}%`, background: '#141414', borderRadius: 4, transition: 'width 0.6s ease' }} />
              </div>
            </div>
          ))}

          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: 'var(--color-background-secondary)', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>RECOMMENDED TARGET</div>
              <div style={{ fontSize: 22, fontWeight: 500, color: 'var(--color-success)' }}>{fmt(result.recommendedTarget)}</div>
            </div>
            <div style={{ background: 'var(--color-background-secondary)', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{result.insight}</div>
            </div>
          </div>

          <div style={{ marginTop: 16, border: '0.5px solid var(--color-border-tertiary)', borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>NEGOTIATION TIP</div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>{result.tip}</div>
          </div>

          <div style={{ marginTop: 24, padding: '14px 16px', background: 'var(--color-background-secondary)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Ready to negotiate? Build your strategy next.</div>
            <a href="/tools/counter-offer" style={{ fontSize: 13, color: 'var(--color-text-primary)', fontWeight: 500, textDecoration: 'none' }}>Build counter-offer →</a>
          </div>
        </div>
      )}
    </ToolPage>
  )
}
