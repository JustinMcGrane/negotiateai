'use client'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { ToolPage } from '@/components/negotiate/ToolPage'
import { EliteGate } from '@/components/negotiate/EliteGate'

type Result = { leverage: string; strategy: string; script: string; emailTemplate: string; risks: string[]; likelyOutcome: string }

export default function CompetingOfferPage() {
  const [form, setForm] = useState({ currentRole: '', currentSalary: '', competingOffer: '', competingCompany: '', preferCurrent: 'yes', currentManager: 'good', timeline: '' })
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copiedScript, setCopiedScript] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  function copyScript() {
    if (!result) return
    navigator.clipboard.writeText(result.script)
    setCopiedScript(true)
    setTimeout(() => setCopiedScript(false), 2000)
  }
  function copyEmail() {
    if (!result) return
    navigator.clipboard.writeText(result.emailTemplate)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const inp: React.CSSProperties = { height: 40, border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, padding: '0 12px', fontSize: 13, background: '#fff', width: '100%' }
  const sel: React.CSSProperties = { ...inp }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/competing-offer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      setResult(await res.json())
    } catch { setError('Generation failed. Please try again.') }
    setLoading(false)
  }

  return (
    <EliteGate>
    <ToolPage title="Competing Offer Tool" desc="Have an outside offer? Use it strategically to get a raise or counteroffer without burning bridges.">
      <form onSubmit={submit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>CURRENT ROLE</div>
            <input style={inp} placeholder="Senior Engineer" value={form.currentRole} onChange={e => setForm({ ...form, currentRole: e.target.value })} required />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>CURRENT SALARY</div>
            <input style={inp} placeholder="$130,000" value={form.currentSalary} onChange={e => setForm({ ...form, currentSalary: e.target.value })} required />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>COMPETING OFFER (total comp)</div>
            <input style={inp} placeholder="$165,000 + 10k bonus" value={form.competingOffer} onChange={e => setForm({ ...form, competingOffer: e.target.value })} required />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>COMPETING COMPANY</div>
            <input style={inp} placeholder="Stripe" value={form.competingCompany} onChange={e => setForm({ ...form, competingCompany: e.target.value })} required />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>DECISION DEADLINE</div>
            <input style={inp} placeholder="5 business days" value={form.timeline} onChange={e => setForm({ ...form, timeline: e.target.value })} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>PREFER TO STAY?</div>
            <select style={sel} value={form.preferCurrent} onChange={e => setForm({ ...form, preferCurrent: e.target.value })}>
              <option value="yes">Yes — would stay if they match</option>
              <option value="maybe">Maybe — depends on the counter</option>
              <option value="no">No — ready to leave either way</option>
            </select>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>RELATIONSHIP WITH MANAGER</div>
            <select style={sel} value={form.currentManager} onChange={e => setForm({ ...form, currentManager: e.target.value })}>
              <option value="great">Great — strong advocate</option>
              <option value="good">Good — professional and supportive</option>
              <option value="neutral">Neutral</option>
              <option value="difficult">Difficult</option>
            </select>
          </div>
        </div>
        <button type="submit" disabled={loading} style={{ height: 38, padding: '0 20px', background: '#141414', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, opacity: loading ? 0.6 : 1 }}>
          {loading ? 'Building strategy…' : 'Build competing offer strategy →'}
        </button>
      </form>

      {error && <div style={{ marginTop: 16, fontSize: 13, color: 'var(--color-danger)', background: '#FDF2F2', padding: '10px 14px', borderRadius: 8 }}>{error}</div>}

      {result && (
        <div style={{ marginTop: 32 }} className="animate-slide-up">
          <div style={{ background: 'var(--color-background-secondary)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>YOUR LEVERAGE</div>
            <p style={{ fontSize: 13, lineHeight: 1.7, margin: 0 }}>{result.leverage}</p>
          </div>

          <div style={{ background: '#ecfdf5', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: '#065f46', fontWeight: 600, marginBottom: 6 }}>RECOMMENDED STRATEGY</div>
            <p style={{ fontSize: 13, color: '#065f46', lineHeight: 1.7, margin: 0 }}>{result.strategy}</p>
          </div>

          <div style={{ background: '#fffbeb', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: '#92400e', fontWeight: 600, marginBottom: 6 }}>RISKS TO BE AWARE OF</div>
            {result.risks.map((r, i) => <div key={i} style={{ fontSize: 13, color: '#92400e', marginBottom: 4 }}>• {r}</div>)}
          </div>

          <div style={{ border: '0.5px solid var(--color-border-tertiary)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>CONVERSATION SCRIPT</div>
              <button onClick={copyScript} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: copiedScript ? '#16a34a' : '#64748b', background: 'transparent', border: '0.5px solid #e2e8f0', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>
                {copiedScript ? <Check size={12} /> : <Copy size={12} />}
                {copiedScript ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.8, margin: 0, whiteSpace: 'pre-wrap' }}>{result.script}</p>
          </div>

          <div style={{ border: '0.5px solid var(--color-border-tertiary)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>EMAIL TEMPLATE</div>
              <button onClick={copyEmail} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: copiedEmail ? '#16a34a' : '#64748b', background: 'transparent', border: '0.5px solid #e2e8f0', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>
                {copiedEmail ? <Check size={12} /> : <Copy size={12} />}
                {copiedEmail ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre style={{ fontSize: 13, lineHeight: 1.8, margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{result.emailTemplate}</pre>
          </div>

          <div style={{ background: 'var(--color-background-secondary)', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>LIKELY OUTCOME</div>
            <p style={{ fontSize: 13, lineHeight: 1.7, margin: 0 }}>{result.likelyOutcome}</p>
          </div>
        </div>
      )}
    </ToolPage>
    </EliteGate>
  )
}
