'use client'
import { useState } from 'react'
import { ToolPage } from '@/components/negotiate/ToolPage'
import { EliteGate } from '@/components/negotiate/EliteGate'

type Milestone = { year: string; role: string; salary: string; milestone: string }
type Result = { summary: string; milestones: Milestone[]; salaryGrowth: string; keyMoves: string[]; risks: string[] }

export default function CareerTimelinePage() {
  const [form, setForm] = useState({ currentRole: '', currentSalary: '', experience: '', goal: '', location: '', companyType: '' })
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const inp: React.CSSProperties = { height: 40, border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, padding: '0 12px', fontSize: 13, background: '#fff', width: '100%' }
  const sel: React.CSSProperties = { ...inp }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/career-timeline', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      setResult(await res.json())
    } catch { setError('Generation failed. Please try again.') }
    setLoading(false)
  }

  return (
    <EliteGate>
    <ToolPage title="Career Timeline" desc="See a realistic 3-year map of your career trajectory — roles, salaries, and the moves that will get you there.">
      <form onSubmit={submit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>CURRENT ROLE</div>
            <input style={inp} placeholder="Software Engineer" value={form.currentRole} onChange={e => setForm({ ...form, currentRole: e.target.value })} required />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>CURRENT SALARY</div>
            <input style={inp} placeholder="$120,000" value={form.currentSalary} onChange={e => setForm({ ...form, currentSalary: e.target.value })} required />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>YEARS OF EXPERIENCE</div>
            <select style={sel} value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} required>
              <option value="">Select</option>
              {['0–2 years', '2–5 years', '5–8 years', '8–12 years', '12+ years'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>LOCATION</div>
            <input style={inp} placeholder="San Francisco, CA" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>WHERE DO YOU WANT TO END UP?</div>
            <input style={inp} placeholder="VP of Engineering, $300k, remote" value={form.goal} onChange={e => setForm({ ...form, goal: e.target.value })} required />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>COMPANY TYPE PREFERENCE</div>
            <select style={sel} value={form.companyType} onChange={e => setForm({ ...form, companyType: e.target.value })}>
              <option value="">No preference</option>
              <option value="startup">Startups — growth & equity upside</option>
              <option value="bigtech">Big Tech — stability & comp</option>
              <option value="scaleup">Scale-ups — best of both</option>
              <option value="any">Open to anything</option>
            </select>
          </div>
        </div>
        <button type="submit" disabled={loading} style={{ height: 38, padding: '0 20px', background: '#141414', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, opacity: loading ? 0.6 : 1 }}>
          {loading ? 'Mapping your trajectory…' : 'Build career timeline →'}
        </button>
      </form>

      {error && <div style={{ marginTop: 16, fontSize: 13, color: 'var(--color-danger)', background: '#FDF2F2', padding: '10px 14px', borderRadius: 8 }}>{error}</div>}

      {result && (
        <div style={{ marginTop: 32 }} className="animate-slide-up">
          <div style={{ background: 'var(--color-background-secondary)', borderRadius: 10, padding: 16, marginBottom: 24 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>TRAJECTORY OVERVIEW</div>
            <p style={{ fontSize: 13, lineHeight: 1.7, margin: 0 }}>{result.summary}</p>
          </div>

          {/* Timeline */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Your 3-year roadmap</div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 16, top: 0, bottom: 0, width: 2, background: 'var(--color-border-tertiary)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {result.milestones.map((m, i) => (
                  <div key={i} style={{ display: 'flex', gap: 20, paddingLeft: 44, paddingBottom: 28, position: 'relative' }}>
                    <div style={{
                      position: 'absolute', left: 8, top: 4,
                      width: 18, height: 18, borderRadius: '50%',
                      background: i === 0 ? '#141414' : i === result.milestones.length - 1 ? '#10b981' : '#fff',
                      border: `2px solid ${i === 0 ? '#141414' : i === result.milestones.length - 1 ? '#10b981' : 'var(--color-border-secondary)'}`,
                      zIndex: 1,
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-tertiary)' }}>{m.year}</span>
                        <span style={{ fontSize: 14, fontWeight: 700 }}>{m.role}</span>
                        <span style={{ fontSize: 13, color: '#10b981', fontWeight: 600 }}>{m.salary}</span>
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6 }}>{m.milestone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: '#EBF5FB', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: '#2D6EA8', fontWeight: 600, marginBottom: 6 }}>SALARY GROWTH PROJECTION</div>
            <p style={{ fontSize: 13, color: '#2D6EA8', margin: 0, lineHeight: 1.6 }}>{result.salaryGrowth}</p>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Key moves that will make or break this trajectory</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {result.keyMoves.map((move, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 14px', background: 'var(--color-background-secondary)', borderRadius: 8 }}>
                  <span style={{ fontWeight: 700, color: '#141414', flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ fontSize: 13, lineHeight: 1.5 }}>{move}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ border: '0.5px solid #fca5a5', background: '#fef2f2', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 11, color: '#991b1b', fontWeight: 600, marginBottom: 8 }}>RISKS THAT COULD DERAIL THIS PLAN</div>
            {result.risks.map((r, i) => (
              <div key={i} style={{ fontSize: 13, color: '#7f1d1d', marginBottom: i < result.risks.length - 1 ? 6 : 0 }}>• {r}</div>
            ))}
          </div>
        </div>
      )}
    </ToolPage>
    </EliteGate>
  )
}
