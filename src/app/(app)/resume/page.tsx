'use client'
import { useState } from 'react'
import { Sparkles, CheckCircle, AlertCircle, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import { ClientPageHeader } from '@/components/negotiate/ClientPageHeader'

type SectionScore = { name: string; score: number; feedback: string }
type BulletRewrite = { original: string; rewritten: string; reason: string }

type Analysis = {
  overallScore: number
  atsScore: number
  summary: string
  marketPosition: string
  sections: SectionScore[]
  strengths: string[]
  criticalIssues: string[]
  bulletRewrites: BulletRewrite[]
  missingKeywords: string[]
  topPriorities: string[]
  interviewReadiness: string
}

function ScoreCircle({ score, label }: { score: number; label: string }) {
  const color = score >= 80 ? '#10b981' : score >= 65 ? '#f59e0b' : score >= 50 ? '#f97316' : '#ef4444'
  const grade = score >= 80 ? 'Strong' : score >= 65 ? 'Good' : score >= 50 ? 'Fair' : 'Weak'
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: 88, height: 88, borderRadius: '50%', margin: '0 auto 8px',
        background: `conic-gradient(${color} ${score * 3.6}deg, #e5e7eb 0deg)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: 70, height: 70, borderRadius: '50%',
          background: 'var(--color-background-secondary)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 22, fontWeight: 700, color, lineHeight: 1 }}>{score}</span>
          <span style={{ fontSize: 9, color, fontWeight: 600, marginTop: 2 }}>{grade}</span>
        </div>
      </div>
      <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', fontWeight: 500 }}>{label}</div>
    </div>
  )
}

function SectionBar({ section }: { section: SectionScore }) {
  const [open, setOpen] = useState(false)
  const color = section.score >= 80 ? '#10b981' : section.score >= 65 ? '#f59e0b' : section.score >= 50 ? '#f97316' : '#ef4444'
  return (
    <div style={{
      background: 'var(--color-background-secondary)',
      border: '0.5px solid var(--color-border-tertiary)',
      borderRadius: 10, overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 16px', background: 'transparent', border: 'none',
          cursor: 'pointer', textAlign: 'left',
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 500 }}>{section.name}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color }}>{section.score}/100</span>
          </div>
          <div style={{ height: 6, background: '#e5e7eb', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${section.score}%`, background: color, borderRadius: 3, transition: 'width 0.6s ease' }} />
          </div>
        </div>
        {open ? <ChevronUp size={14} color="var(--color-text-tertiary)" /> : <ChevronDown size={14} color="var(--color-text-tertiary)" />}
      </button>
      {open && (
        <div style={{ padding: '0 16px 14px', fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6, borderTop: '0.5px solid var(--color-border-tertiary)' }}>
          {section.feedback}
        </div>
      )}
    </div>
  )
}

function BulletCard({ bullet }: { bullet: BulletRewrite }) {
  return (
    <div style={{
      background: 'var(--color-background-secondary)',
      border: '0.5px solid var(--color-border-tertiary)',
      borderRadius: 10, padding: 16, display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#ef4444', marginBottom: 5, letterSpacing: '0.05em' }}>BEFORE</div>
        <div style={{
          fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6,
          background: '#fef2f2', borderRadius: 6, padding: '8px 12px',
          borderLeft: '3px solid #ef4444',
        }}>{bullet.original}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ArrowRight size={14} color="var(--color-text-tertiary)" />
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#10b981', marginBottom: 5, letterSpacing: '0.05em' }}>AFTER</div>
        <div style={{
          fontSize: 13, color: 'var(--color-text-primary)', lineHeight: 1.6,
          background: '#ecfdf5', borderRadius: 6, padding: '8px 12px',
          borderLeft: '3px solid #10b981',
        }}>{bullet.rewritten}</div>
      </div>
      <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', fontStyle: 'italic' }}>{bullet.reason}</div>
    </div>
  )
}

export default function ResumePage() {
  const [text, setText] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [showJD, setShowJD] = useState(false)
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [error, setError] = useState('')

  async function analyze() {
    if (!text.trim()) return
    setLoading(true)
    setAnalysis(null)
    setError('')
    try {
      const res = await fetch('/api/resume-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: text, targetRole: jobTitle, jobDescription: jobDesc }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setAnalysis(data)
    } catch {
      setError('Analysis failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px', fontSize: 14,
    background: 'var(--color-background-secondary)',
    border: '0.5px solid var(--color-border-tertiary)',
    borderRadius: 8, color: 'var(--color-text-primary)', outline: 'none',
    boxSizing: 'border-box' as const,
  }

  return (
    <div>
      <ClientPageHeader title="Resume Analyzer" description="Recruiter-grade feedback and ATS scoring" />
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 24px 80px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Resume Analyzer</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: 8, fontSize: 14 }}>
          Recruiter-grade feedback. ATS scoring. Rewritten bullets. Prioritized action plan.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Target Role <span style={{ color: 'var(--color-text-tertiary)', fontWeight: 400 }}>(optional but recommended)</span></label>
          <input
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
            placeholder="e.g. Senior Product Manager at a Series B startup"
            style={inputStyle}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500 }}>Job Description <span style={{ color: 'var(--color-text-tertiary)', fontWeight: 400 }}>(for ATS keyword matching)</span></label>
            <button
              onClick={() => setShowJD(!showJD)}
              style={{ fontSize: 12, color: '#4A90D9', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {showJD ? 'Hide' : '+ Add job description'}
            </button>
          </div>
          {showJD && (
            <textarea
              value={jobDesc}
              onChange={e => setJobDesc(e.target.value)}
              placeholder="Paste the job description here to get keyword gap analysis and targeted feedback..."
              rows={6}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
            />
          )}
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Your Resume *</label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste the full text of your resume here..."
            rows={14}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6, fontFamily: 'monospace', fontSize: 13 }}
          />
        </div>

        {error && (
          <div style={{ fontSize: 13, color: '#ef4444', background: '#fef2f2', padding: '10px 14px', borderRadius: 8 }}>
            {error}
          </div>
        )}

        <button
          onClick={analyze}
          disabled={!text.trim() || loading}
          style={{
            background: '#141414', color: '#fff', border: 'none',
            borderRadius: 8, padding: '13px 24px', fontSize: 14, fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
            opacity: !text.trim() || loading ? 0.5 : 1, alignSelf: 'flex-start',
          }}
        >
          <Sparkles size={15} />
          {loading ? 'Analyzing your resume…' : 'Analyze Resume'}
        </button>

        {loading && (
          <div style={{
            background: 'var(--color-background-secondary)',
            border: '0.5px solid var(--color-border-tertiary)',
            borderRadius: 12, padding: 24, textAlign: 'center',
          }}>
            <div style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 8 }}>Reviewing your resume like a hiring manager…</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>Checking ATS compatibility, scoring each section, identifying quick wins</div>
          </div>
        )}
      </div>

      {analysis && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

          {/* Scores */}
          <div style={{
            background: 'var(--color-background-secondary)',
            border: '0.5px solid var(--color-border-tertiary)',
            borderRadius: 14, padding: 28,
          }}>
            <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
              <ScoreCircle score={analysis.overallScore} label="Overall Score" />
              <ScoreCircle score={analysis.atsScore} label="ATS Score" />
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, margin: '0 0 12px', textAlign: 'center' }}>{analysis.summary}</p>
            <div style={{
              background: '#f0f9ff', border: '0.5px solid #bae6fd',
              borderRadius: 8, padding: '10px 16px',
              fontSize: 13, color: '#0369a1', textAlign: 'center',
            }}>
              {analysis.marketPosition}
            </div>
          </div>

          {/* Top 3 Priorities */}
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ background: '#141414', color: '#fff', borderRadius: 6, padding: '2px 8px', fontSize: 12 }}>ACTION PLAN</span>
              Top 3 Priorities
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {analysis.topPriorities.map((p, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  background: 'var(--color-background-secondary)',
                  border: '0.5px solid var(--color-border-tertiary)',
                  borderRadius: 10, padding: 14,
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: '#141414', color: '#fff',
                    fontSize: 12, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>{i + 1}</div>
                  <span style={{ fontSize: 13, lineHeight: 1.6 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Issues + Strengths */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{
              background: '#fef2f2', border: '0.5px solid #fecaca',
              borderRadius: 12, padding: 20,
            }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 6, color: '#dc2626' }}>
                <AlertCircle size={14} /> Critical Issues
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {analysis.criticalIssues.map((issue, i) => (
                  <div key={i} style={{ fontSize: 13, color: '#7f1d1d', lineHeight: 1.6, paddingLeft: 12, borderLeft: '2px solid #ef4444' }}>
                    {issue}
                  </div>
                ))}
              </div>
            </div>
            <div style={{
              background: '#ecfdf5', border: '0.5px solid #a7f3d0',
              borderRadius: 12, padding: 20,
            }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 6, color: '#059669' }}>
                <CheckCircle size={14} /> What’s Working
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {analysis.strengths.map((s, i) => (
                  <div key={i} style={{ fontSize: 13, color: '#064e3b', lineHeight: 1.6, paddingLeft: 12, borderLeft: '2px solid #10b981' }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section Scores */}
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 14px' }}>Section-by-Section Breakdown</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {analysis.sections.map((section, i) => (
                <SectionBar key={i} section={section} />
              ))}
            </div>
          </div>

          {/* Bullet Rewrites */}
          {analysis.bulletRewrites && analysis.bulletRewrites.length > 0 && (
            <div>
              <h2 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 6px' }}>Bullet Point Rewrites</h2>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: '0 0 14px' }}>
                Copy these directly. Quantified, action-led bullets get 40% more recruiter callbacks.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {analysis.bulletRewrites.map((bullet, i) => (
                  <BulletCard key={i} bullet={bullet} />
                ))}
              </div>
            </div>
          )}

          {/* Missing Keywords */}
          {analysis.missingKeywords && analysis.missingKeywords.length > 0 && (
            <div style={{
              background: 'var(--color-background-secondary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 12, padding: 20,
            }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 6px' }}>Missing Keywords</h2>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: '0 0 14px' }}>
                Add these naturally into your experience bullets and skills section to pass ATS filters.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {analysis.missingKeywords.map((kw, i) => (
                  <span key={i} style={{
                    background: '#fff7ed', color: '#c2410c',
                    border: '0.5px solid #fed7aa',
                    borderRadius: 6, padding: '5px 12px', fontSize: 13, fontWeight: 500,
                  }}>{kw}</span>
                ))}
              </div>
            </div>
          )}

          {/* Interview Readiness */}
          <div style={{
            background: '#141414', color: '#fff',
            borderRadius: 12, padding: '20px 24px',
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, opacity: 0.5, marginBottom: 4, letterSpacing: '0.06em' }}>INTERVIEW READINESS</div>
              <div style={{ fontSize: 14, lineHeight: 1.6 }}>{analysis.interviewReadiness}</div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}
