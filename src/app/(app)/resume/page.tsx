'use client'
import { useState } from 'react'
import { Upload, CheckCircle, AlertCircle, Sparkles } from 'lucide-react'

type Analysis = {
  score: number
  summary: string
  strengths: string[]
  improvements: string[]
  keywords: string[]
  atsScore: number
}

export default function ResumePage() {
  const [text, setText] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<Analysis | null>(null)

  async function analyze() {
    if (!text.trim()) return
    setLoading(true)
    setAnalysis(null)
    try {
      const res = await fetch('/api/resume-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: text, targetRole: jobTitle }),
      })
      const data = await res.json()
      setAnalysis(data)
    } catch {
      alert('Analysis failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const scoreColor = (s: number) => s >= 80 ? '#10b981' : s >= 60 ? '#f59e0b' : '#ef4444'

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Resume Analyzer</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: 8, fontSize: 14 }}>
          Get expert-level feedback on your resume — ATS optimization, keyword gaps, and actionable improvements.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Target Role (optional)</label>
          <input
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
            placeholder="e.g. Senior Product Manager at a tech startup"
            style={{
              width: '100%', padding: '10px 14px', fontSize: 14,
              background: 'var(--color-background-secondary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 8, color: 'var(--color-text-primary)', outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>
            Paste Your Resume
          </label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste the full text of your resume here..."
            rows={14}
            style={{
              width: '100%', padding: '12px 14px', fontSize: 13,
              background: 'var(--color-background-secondary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 8, color: 'var(--color-text-primary)', outline: 'none',
              resize: 'vertical', lineHeight: 1.6, boxSizing: 'border-box',
            }}
          />
        </div>

        <button
          onClick={analyze}
          disabled={!text.trim() || loading}
          style={{
            background: '#141414', color: '#fff', border: 'none',
            borderRadius: 8, padding: '12px 24px', fontSize: 14, fontWeight: 500,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
            opacity: !text.trim() || loading ? 0.5 : 1, alignSelf: 'flex-start',
          }}
        >
          <Sparkles size={15} />
          {loading ? 'Analyzing…' : 'Analyze Resume'}
        </button>
      </div>

      {analysis && (
        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{
              flex: 1, background: 'var(--color-background-secondary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 12, padding: 24, textAlign: 'center',
            }}>
              <div style={{ fontSize: 48, fontWeight: 700, color: scoreColor(analysis.score) }}>
                {analysis.score}
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4 }}>Overall Score</div>
            </div>
            <div style={{
              flex: 1, background: 'var(--color-background-secondary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 12, padding: 24, textAlign: 'center',
            }}>
              <div style={{ fontSize: 48, fontWeight: 700, color: scoreColor(analysis.atsScore) }}>
                {analysis.atsScore}
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4 }}>ATS Score</div>
            </div>
          </div>

          <div style={{
            background: 'var(--color-background-secondary)',
            border: '0.5px solid var(--color-border-tertiary)',
            borderRadius: 12, padding: 20,
          }}>
            <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>{analysis.summary}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{
              background: 'var(--color-background-secondary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 12, padding: 20,
            }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle size={15} color="#10b981" /> Strengths
              </h3>
              <ul style={{ margin: 0, padding: '0 0 0 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {analysis.strengths.map((s, i) => (
                  <li key={i} style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{s}</li>
                ))}
              </ul>
            </div>
            <div style={{
              background: 'var(--color-background-secondary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 12, padding: 20,
            }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
                <AlertCircle size={15} color="#f59e0b" /> Improvements
              </h3>
              <ul style={{ margin: 0, padding: '0 0 0 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {analysis.improvements.map((s, i) => (
                  <li key={i} style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          {analysis.keywords.length > 0 && (
            <div style={{
              background: 'var(--color-background-secondary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 12, padding: 20,
            }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 12px' }}>Recommended Keywords to Add</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {analysis.keywords.map((kw, i) => (
                  <span key={i} style={{
                    background: '#f0f9ff', color: '#0369a1',
                    border: '0.5px solid #bae6fd',
                    borderRadius: 6, padding: '4px 10px', fontSize: 12, fontWeight: 500,
                  }}>{kw}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
