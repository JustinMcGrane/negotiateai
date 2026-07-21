'use client'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { ToolPage } from '@/components/negotiate/ToolPage'
import { EliteGate } from '@/components/negotiate/EliteGate'

type Result = { assessment: string; timeline: string; gaps: { area: string; action: string }[]; milestones: { month: string; goal: string }[]; script: string }

export default function PromotionPlannerPage() {
  const [form, setForm] = useState({ currentRole: '', targetRole: '', tenure: '', strengths: '', gaps: '', companySize: '', timeframe: '12' })
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copiedScript, setCopiedScript] = useState(false)

  function copyScript() {
    if (!result) return
    navigator.clipboard.writeText(result.script)
    setCopiedScript(true)
    setTimeout(() => setCopiedScript(false), 2000)
  }

  const inp: React.CSSProperties = { height: 40, border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, padding: '0 12px', fontSize: 13, background: '#fff', width: '100%' }
  const sel: React.CSSProperties = { ...inp }
  const ta: React.CSSProperties = { ...inp, height: 80, padding: '10px 12px', resize: 'vertical' as const }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/promotion-planner', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      setResult(await res.json())
    } catch { setError('Generation failed. Please try again.') }
    setLoading(false)
  }

  return (
    <EliteGate>
    <ToolPage title="Promotion Planner" desc="Get a realistic, step-by-step plan to earn your next promotion with exact milestones and a timeline.">
      <form onSubmit={submit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>CURRENT ROLE</div>
            <input style={inp} placeholder="Software Engineer II" value={form.currentRole} onChange={e => setForm({ ...form, currentRole: e.target.value })} required />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>TARGET ROLE</div>
            <input style={inp} placeholder="Senior Software Engineer" value={form.targetRole} onChange={e => setForm({ ...form, targetRole: e.target.value })} required />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>TIME IN CURRENT ROLE</div>
            <input style={inp} placeholder="18 months" value={form.tenure} onChange={e => setForm({ ...form, tenure: e.target.value })} required />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>TARGET TIMEFRAME</div>
            <select style={sel} value={form.timeframe} onChange={e => setForm({ ...form, timeframe: e.target.value })}>
              <option value="6">6 months</option>
              <option value="12">12 months</option>
              <option value="18">18 months</option>
              <option value="24">24 months</option>
            </select>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>COMPANY SIZE</div>
            <select style={sel} value={form.companySize} onChange={e => setForm({ ...form, companySize: e.target.value })}>
              <option value="">Select</option>
              <option value="startup">Startup (&lt;50)</option>
              <option value="scaleup">Scale-up (50–500)</option>
              <option value="mid">Mid-size (500–5000)</option>
              <option value="enterprise">Enterprise (5000+)</option>
            </select>
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>YOUR STRENGTHS</div>
          <textarea style={ta} placeholder="Strong technical skills, good communicator, shipped 2 major projects..." value={form.strengths} onChange={e => setForm({ ...form, strengths: e.target.value })} required />
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>PERCEIVED GAPS (honest self-assessment)</div>
          <textarea style={ta} placeholder="Less experience with cross-team projects, haven't led anyone yet..." value={form.gaps} onChange={e => setForm({ ...form, gaps: e.target.value })} />
        </div>
        <button type="submit" disabled={loading} style={{ height: 38, padding: '0 20px', background: '#141414', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, opacity: loading ? 0.6 : 1 }}>
          {loading ? 'Building your plan…' : 'Build promotion plan →'}
        </button>
      </form>

      {error && <div style={{ marginTop: 16, fontSize: 13, color: 'var(--color-danger)', background: '#FDF2F2', padding: '10px 14px', borderRadius: 8 }}>{error}</div>}

      {result && (
        <div style={{ marginTop: 32 }} className="animate-slide-up">
          <div style={{ background: 'var(--color-background-secondary)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>HONEST ASSESSMENT</div>
            <p style={{ fontSize: 13, lineHeight: 1.7, margin: 0 }}>{result.assessment}</p>
          </div>

          <div style={{ background: '#eff6ff', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: '#1e40af', fontWeight: 600, marginBottom: 6 }}>REALISTIC TIMELINE</div>
            <p style={{ fontSize: 13, color: '#1e40af', margin: 0 }}>{result.timeline}</p>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Gaps to close</div>
            {result.gaps.map((g, i) => (
              <div key={i} style={{ border: '0.5px solid var(--color-border-tertiary)', borderRadius: 8, padding: 14, marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{g.area}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{g.action}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Month-by-month milestones</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {result.milestones.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ minWidth: 70, fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)', paddingTop: 2 }}>{m.month}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.6 }}>{m.goal}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ border: '0.5px solid var(--color-border-tertiary)', borderRadius: 10, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>HOW TO HAVE THE CONVERSATION WITH YOUR MANAGER</div>
              <button onClick={copyScript} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: copiedScript ? '#16a34a' : '#64748b', background: 'transparent', border: '0.5px solid #e2e8f0', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>
                {copiedScript ? <Check size={12} /> : <Copy size={12} />}
                {copiedScript ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.8, margin: 0, whiteSpace: 'pre-wrap' }}>{result.script}</p>
          </div>
        </div>
      )}
    </ToolPage>
    </EliteGate>
  )
}
