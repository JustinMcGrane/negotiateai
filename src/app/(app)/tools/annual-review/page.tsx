'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ToolPage } from '@/components/negotiate/ToolPage'

type Result = { summary: string; accomplishments: string[]; gaps: string[]; askAmount: string; script: string; emailDraft: string }

export default function AnnualReviewPage() {
  const router = useRouter()
  const [form, setForm] = useState({ role: '', currentSalary: '', lastRaise: '', accomplishments: '', metrics: '', marketRate: '', managerRelationship: 'good' })

  useEffect(() => {
    createClient().from('profiles').select('plan').single().then(({ data }) => {
      if (data?.plan !== 'elite') router.replace('/upgrade')
    })
  }, [])
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const inp: React.CSSProperties = { height: 40, border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, padding: '0 12px', fontSize: 13, background: '#fff', width: '100%' }
  const sel: React.CSSProperties = { ...inp }
  const ta: React.CSSProperties = { ...inp, height: 80, padding: '10px 12px', resize: 'vertical' as const }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/annual-review', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      setResult(await res.json())
    } catch { setError('Generation failed. Please try again.') }
    setLoading(false)
  }

  return (
    <ToolPage title="Annual Review Coach" desc="Build a compelling case for your raise. Get a tailored script, talking points, and a ready-to-send follow-up email.">
      <form onSubmit={submit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>JOB TITLE</div>
            <input style={inp} placeholder="Senior Product Manager" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>CURRENT SALARY</div>
            <input style={inp} placeholder="$120,000" value={form.currentSalary} onChange={e => setForm({ ...form, currentSalary: e.target.value })} required />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>LAST RAISE (when / how much)</div>
            <input style={inp} placeholder="18 months ago, 3%" value={form.lastRaise} onChange={e => setForm({ ...form, lastRaise: e.target.value })} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>MARKET RATE (optional)</div>
            <input style={inp} placeholder="$140k based on Glassdoor" value={form.marketRate} onChange={e => setForm({ ...form, marketRate: e.target.value })} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>MANAGER RELATIONSHIP</div>
            <select style={sel} value={form.managerRelationship} onChange={e => setForm({ ...form, managerRelationship: e.target.value })}>
              <option value="excellent">Excellent — strong advocate</option>
              <option value="good">Good — supportive</option>
              <option value="neutral">Neutral — professional</option>
              <option value="difficult">Difficult — need to manage carefully</option>
            </select>
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>KEY ACCOMPLISHMENTS THIS YEAR</div>
          <textarea style={ta} placeholder="Led migration to new architecture (saved $200k/yr), shipped 3 major features, grew team from 4 to 7..." value={form.accomplishments} onChange={e => setForm({ ...form, accomplishments: e.target.value })} required />
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>METRICS &amp; IMPACT (numbers help)</div>
          <textarea style={ta} placeholder="NPS improved from 32 to 61, revenue grew 40%, reduced churn by 18%..." value={form.metrics} onChange={e => setForm({ ...form, metrics: e.target.value })} />
        </div>
        <button type="submit" disabled={loading} style={{ height: 38, padding: '0 20px', background: '#141414', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, opacity: loading ? 0.6 : 1 }}>
          {loading ? 'Building your case…' : 'Build review strategy →'}
        </button>
      </form>

      {error && <div style={{ marginTop: 16, fontSize: 13, color: 'var(--color-danger)', background: '#FDF2F2', padding: '10px 14px', borderRadius: 8 }}>{error}</div>}

      {result && (
        <div style={{ marginTop: 32 }} className="animate-slide-up">
          <div style={{ background: 'var(--color-background-secondary)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>ASSESSMENT</div>
            <p style={{ fontSize: 13, lineHeight: 1.7, margin: 0 }}>{result.summary}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div style={{ background: '#ecfdf5', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 11, color: '#065f46', fontWeight: 600, marginBottom: 8 }}>STRONGEST POINTS TO MAKE</div>
              {result.accomplishments.map((a, i) => <div key={i} style={{ fontSize: 13, color: '#065f46', marginBottom: 4, display: 'flex', gap: 6 }}><span>✓</span>{a}</div>)}
            </div>
            <div style={{ background: '#fffbeb', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 11, color: '#92400e', fontWeight: 600, marginBottom: 8 }}>GAPS TO ADDRESS PROACTIVELY</div>
              {result.gaps.map((g, i) => <div key={i} style={{ fontSize: 13, color: '#92400e', marginBottom: 4, display: 'flex', gap: 6 }}><span>→</span>{g}</div>)}
            </div>
          </div>

          <div style={{ background: '#eff6ff', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: '#1e40af', fontWeight: 600, marginBottom: 6 }}>RECOMMENDED ASK</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#1e40af' }}>{result.askAmount}</div>
          </div>

          <div style={{ border: '0.5px solid var(--color-border-tertiary)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8 }}>CONVERSATION SCRIPT</div>
            <p style={{ fontSize: 13, lineHeight: 1.8, margin: 0, whiteSpace: 'pre-wrap' }}>{result.script}</p>
          </div>

          <div style={{ border: '0.5px solid var(--color-border-tertiary)', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8 }}>FOLLOW-UP EMAIL DRAFT</div>
            <pre style={{ fontSize: 13, lineHeight: 1.8, margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{result.emailDraft}</pre>
          </div>
        </div>
      )}
    </ToolPage>
  )
}
