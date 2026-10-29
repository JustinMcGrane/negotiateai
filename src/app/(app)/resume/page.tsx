'use client'
import { useState, useEffect } from 'react'
import { Sparkles, CheckCircle, AlertCircle, ArrowRight, ChevronDown, ChevronUp, FileText, Trash2, ExternalLink } from 'lucide-react'
import { ClientPageHeader } from '@/components/negotiate/ClientPageHeader'
import { UpgradeModal } from '@/components/negotiate/UpgradeModal'
import { ProGate } from '@/components/negotiate/ProGate'
import Link from 'next/link'
import posthog from 'posthog-js'

type SavedResume = { id: string; title: string; created_at: string; updated_at: string }

function SavedResumes() {
  const [resumes, setResumes] = useState<SavedResume[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<{ id: string; title: string; content: string } | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/resumes')
      .then(r => r.json())
      .then(d => { setResumes(d.resumes ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function loadResume(id: string, title: string) {
    const res = await fetch(`/api/resumes/${id}`)
    if (res.ok) {
      const data = await res.json()
      setSelected({ id, title, content: data.content })
    }
  }

  async function deleteResume(id: string) {
    setDeleting(id)
    await fetch(`/api/resumes/${id}`, { method: 'DELETE' })
    setResumes(prev => prev.filter(r => r.id !== id))
    if (selected?.id === id) setSelected(null)
    setDeleting(null)
  }

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-text-tertiary)', fontSize: 14 }}>Loading saved resumes…</div>

  if (selected) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: 13, padding: 0 }}>← Back</button>
          <span style={{ fontSize: 16, fontWeight: 600 }}>{selected.title}</span>
        </div>
        <pre style={{
          whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: 13, lineHeight: 1.7,
          background: 'var(--color-background-secondary)',
          border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: 10, padding: '20px 24px',
          color: 'var(--color-text-primary)', fontFamily: 'inherit',
        }}>{selected.content}</pre>
      </div>
    )
  }

  if (resumes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 24px' }}>
        <FileText size={36} color="var(--color-text-tertiary)" style={{ marginBottom: 12 }} />
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>No saved resumes yet</div>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 20 }}>
          Chat with Sarah in Resume Coach and she&apos;ll automatically save any resume she rewrites for you.
        </p>
        <Link href="/resume-coach" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff', textDecoration: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600,
        }}>
          Open Resume Coach <ExternalLink size={13} />
        </Link>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {resumes.map(r => (
        <div key={r.id} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: 'var(--color-background-secondary)',
          border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: 10, padding: '14px 16px',
        }}>
          <FileText size={16} color="#667eea" style={{ flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.title}</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginTop: 2 }}>
              {new Date(r.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
          <button onClick={() => loadResume(r.id, r.title)} style={{
            fontSize: 13, color: '#667eea', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500,
          }}>View</button>
          <button onClick={() => deleteResume(r.id)} disabled={deleting === r.id} style={{
            background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary)', padding: 4,
            opacity: deleting === r.id ? 0.4 : 1,
          }}>
            <Trash2 size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}

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
  sarahUpgradeMessage?: string | null
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
  const [tab, setTab] = useState<'analyze' | 'saved'>('analyze')
  const [text, setText] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [showJD, setShowJD] = useState(false)
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [error, setError] = useState('')
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

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
      if (res.status === 429 || res.status === 403) {
        posthog.capture('upgrade_modal_shown', { feature: 'resume' })
        setShowUpgradeModal(true)
        return
      }
      if (!res.ok) throw new Error()
      const data = await res.json()
      posthog.capture('resume_analyzed', { score: data.overallScore })
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
    <ProGate><div>
      {showUpgradeModal && <UpgradeModal feature="resume" onClose={() => setShowUpgradeModal(false)} />}
      <ClientPageHeader title="Resume" description="Analyze, coach, and save your resumes" />
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 24px 80px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Resume</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: 8, fontSize: 14 }}>
          Recruiter-grade feedback. ATS scoring. Rewritten bullets. Prioritized action plan.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: 'var(--color-background-secondary)', borderRadius: 10, padding: 4, width: 'fit-content' }}>
        {(['analyze', 'saved'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '7px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
            background: tab === t ? 'var(--color-background-primary)' : 'transparent',
            color: tab === t ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
            boxShadow: tab === t ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 0.15s',
          }}>
            {t === 'analyze' ? 'Analyze' : 'My Resumes'}
          </button>
        ))}
      </div>

      {tab === 'saved' && <SavedResumes />}
      {tab === 'analyze' && <>

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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: 16 }}>
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

          {/* Sarah upgrade prompt for free users */}
          {analysis.sarahUpgradeMessage && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)',
              border: '1px solid rgba(102,126,234,0.3)',
              borderRadius: 16, padding: '28px 24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <span style={{ fontSize: 14 }}>✦</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>Sarah has more to say</div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.75, marginBottom: 20, opacity: 0.8 }}>
                I&apos;ve identified exactly what&apos;s holding your resume back. With Pro, I can rewrite your entire resume line by line, tailor it to specific job descriptions, and help you practice talking through every bullet in an interview. The changes above could be the difference between getting ignored and getting the interview.
              </p>
              <a href="/account/billing" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff', textDecoration: 'none',
                borderRadius: 10, padding: '12px 24px',
                fontSize: 14, fontWeight: 600,
              }}>
                Get Started Free
              </a>
            </div>
          )}
        </div>
      )}
    </>}
    </div>
    </div></ProGate>
  )
}
