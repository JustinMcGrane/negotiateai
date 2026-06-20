'use client'
import { useState } from 'react'
import { Sparkles, Copy, Check } from 'lucide-react'

export default function CoverLetterPage() {
  const [jobTitle, setJobTitle] = useState('')
  const [company, setCompany] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [resume, setResume] = useState('')
  const [tone, setTone] = useState<'professional' | 'warm' | 'bold'>('professional')
  const [loading, setLoading] = useState(false)
  const [letter, setLetter] = useState('')
  const [copied, setCopied] = useState(false)

  async function generate() {
    if (!jobTitle || !company) return
    setLoading(true)
    setLetter('')
    try {
      const res = await fetch('/api/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle, company, jobDesc, resume, tone }),
      })
      const data = await res.json()
      setLetter(data.letter || '')
    } catch {
      alert('Generation failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function copy() {
    navigator.clipboard.writeText(letter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px', fontSize: 14,
    background: 'var(--color-background-secondary)',
    border: '0.5px solid var(--color-border-tertiary)',
    borderRadius: 8, color: 'var(--color-text-primary)', outline: 'none',
    boxSizing: 'border-box' as const,
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Cover Letter Generator</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: 8, fontSize: 14 }}>
          Generate a tailored, compelling cover letter that gets you to the interview.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Job Title *</label>
          <input value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder="Senior Product Manager" style={inputStyle} />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Company *</label>
          <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Stripe" style={inputStyle} />
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Tone</label>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['professional', 'warm', 'bold'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTone(t)}
              style={{
                padding: '7px 16px', fontSize: 13, borderRadius: 7, cursor: 'pointer',
                border: tone === t ? '1.5px solid #141414' : '0.5px solid var(--color-border-tertiary)',
                background: tone === t ? '#141414' : 'transparent',
                color: tone === t ? '#fff' : 'var(--color-text-secondary)',
                fontWeight: tone === t ? 500 : 400,
                textTransform: 'capitalize',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Job Description (optional but recommended)</label>
        <textarea
          value={jobDesc}
          onChange={e => setJobDesc(e.target.value)}
          placeholder="Paste the job description here…"
          rows={6}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
        />
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Your Background (optional)</label>
        <textarea
          value={resume}
          onChange={e => setResume(e.target.value)}
          placeholder="Paste key highlights from your resume or describe your background…"
          rows={5}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
        />
      </div>

      <button
        onClick={generate}
        disabled={!jobTitle || !company || loading}
        style={{
          background: '#141414', color: '#fff', border: 'none',
          borderRadius: 8, padding: '12px 24px', fontSize: 14, fontWeight: 500,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
          opacity: !jobTitle || !company || loading ? 0.5 : 1,
        }}
      >
        <Sparkles size={15} />
        {loading ? 'Generating…' : 'Generate Cover Letter'}
      </button>

      {letter && (
        <div style={{ marginTop: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Your Cover Letter</h2>
            <button
              onClick={copy}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'var(--color-background-secondary)',
                border: '0.5px solid var(--color-border-tertiary)',
                borderRadius: 7, padding: '7px 14px', fontSize: 13, cursor: 'pointer',
                color: 'var(--color-text-primary)',
              }}
            >
              {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div style={{
            background: 'var(--color-background-secondary)',
            border: '0.5px solid var(--color-border-tertiary)',
            borderRadius: 12, padding: 24,
            fontSize: 14, lineHeight: 1.8, whiteSpace: 'pre-wrap',
            color: 'var(--color-text-primary)',
          }}>
            {letter}
          </div>
        </div>
      )}
    </div>
  )
}
