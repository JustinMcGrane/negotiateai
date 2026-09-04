'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type Step = 'form' | 'loading' | 'result'

interface WorthResult {
  message: string
  underpaid_by: number
  market_median: number
  market_range: { min: number; max: number }
  percentile: number
}

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString()
}

export function LandingSarahWidget() {
  const [step, setStep] = useState<Step>('form')
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [result, setResult] = useState<WorthResult | null>(null)
  const [error, setError] = useState('')

  async function analyze() {
    const salaryNum = Number(salary.replace(/[^0-9]/g, ''))
    if (!title.trim() || !salaryNum) return
    setStep('loading')
    setError('')
    try {
      const res = await fetch('/api/worth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), location: location.trim(), salary: salaryNum }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setResult(data)
      setStep('result')
    } catch {
      setError('Something went wrong — try again.')
      setStep('form')
    }
  }

  const salaryNum = Number(salary.replace(/[^0-9]/g, ''))
  const signupParams = result
    ? `?title=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}&salary=${salaryNum}&median=${result.market_median}&gap=${result.underpaid_by}`
    : ''
  const underpaid = result && result.underpaid_by > 0

  const inputStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: '14px 16px',
    fontSize: 15,
    color: '#fff',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box' as const,
  }

  const labelStyle = {
    fontSize: 13,
    fontWeight: 600,
    color: '#94a3b8',
    marginBottom: 8,
    display: 'block' as const,
  }

  return (
    <section style={{ background: '#0f172a', padding: '96px 40px' }} className="landing-section-pad">
      <div style={{ maxWidth: 640, margin: '0 auto' }}>

        {step === 'form' && (
          <>
            {/* Sarah intro bubble */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 36, alignItems: 'flex-start' }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
              }}>S</div>
              <div style={{
                background: '#1e2d45',
                borderRadius: '4px 18px 18px 18px',
                padding: '18px 22px',
                flex: 1,
              }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Sarah · AI Career Coach</div>
                <div style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.65 }}>
                  Hi! I&apos;m Sarah. Tell me your role and what you&apos;re currently making — I&apos;ll tell you exactly where you stand in the market and whether you&apos;re leaving money on the table.
                </div>
              </div>
            </div>

            {/* Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 24 }}>
              <div>
                <label style={labelStyle}>Job title</label>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Senior Product Manager"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Location <span style={{ fontWeight: 400, color: '#475569' }}>(optional)</span></label>
                <input
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="e.g. San Francisco, CA"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Current salary</label>
                <input
                  value={salary}
                  onChange={e => setSalary(e.target.value)}
                  placeholder="e.g. 120,000"
                  style={inputStyle}
                  onKeyDown={e => { if (e.key === 'Enter') analyze() }}
                />
              </div>
            </div>

            {error && <div style={{ fontSize: 13, color: '#f87171', marginBottom: 14 }}>{error}</div>}

            <button
              onClick={analyze}
              disabled={!title.trim() || !salary.trim()}
              style={{
                width: '100%', padding: '16px', borderRadius: 12, border: 'none',
                background: !title.trim() || !salary.trim() ? '#1e293b' : '#5865f2',
                color: !title.trim() || !salary.trim() ? '#475569' : '#fff',
                fontSize: 16, fontWeight: 700, cursor: !title.trim() || !salary.trim() ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'background 0.2s',
              }}
            >
              Check my market value <ArrowRight size={16} />
            </button>
          </>
        )}

        {step === 'loading' && (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <div style={{ fontSize: 15, color: '#94a3b8', marginBottom: 8 }}>Sarah is analyzing your data…</div>
            <div style={{ fontSize: 13, color: '#475569' }}>Checking LinkedIn, Glassdoor & Levels.fyi</div>
          </div>
        )}

        {step === 'result' && result && (
          <>
            {/* Sarah result bubble */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'flex-start' }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
              }}>S</div>
              <div style={{ background: '#1e2d45', borderRadius: '4px 18px 18px 18px', padding: '18px 22px', flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Sarah · AI Career Coach</div>
                <div style={{ fontSize: 15, color: '#e2e8f0', lineHeight: 1.65 }}>{result.message}</div>
              </div>
            </div>

            {/* Numbers card */}
            <div style={{
              background: underpaid ? 'rgba(239,68,68,0.07)' : 'rgba(16,185,129,0.07)',
              border: `1px solid ${underpaid ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'}`,
              borderRadius: 16, padding: '20px 24px', marginBottom: 28,
            }}>
              {underpaid && (
                <div style={{ fontSize: 28, fontWeight: 800, color: '#ef4444', letterSpacing: '-0.03em', marginBottom: 12 }}>
                  {fmt(result.underpaid_by)}/yr gap
                </div>
              )}
              <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', letterSpacing: '0.06em', marginBottom: 4 }}>MARKET MEDIAN</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#e2e8f0' }}>{fmt(result.market_median)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', letterSpacing: '0.06em', marginBottom: 4 }}>MARKET RANGE</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#e2e8f0' }}>{fmt(result.market_range.min)}–{fmt(result.market_range.max)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', letterSpacing: '0.06em', marginBottom: 4 }}>YOUR PERCENTILE</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#e2e8f0' }}>{result.percentile}th</div>
                </div>
              </div>
            </div>

            {/* Signup CTA */}
            <div style={{
              background: 'rgba(102,126,234,0.1)',
              border: '1px solid rgba(102,126,234,0.25)',
              borderRadius: 16, padding: '24px',
            }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
                {underpaid ? 'Ready to close the gap?' : 'Want to negotiate even higher?'}
              </div>
              <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 20, lineHeight: 1.6 }}>
                Sign up free and Sarah will build you a personalized negotiation plan — step by step.
              </div>
              <Link href={`/signup/google${signupParams}`} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                background: '#fff', color: '#0f172a', textDecoration: 'none',
                borderRadius: 10, padding: '13px 20px',
                fontSize: 14, fontWeight: 700, marginBottom: 10,
              }}>
                <svg width="16" height="16" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                  <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.96l3.007 2.332C4.672 5.163 6.656 3.58 9 3.58z"/>
                </svg>
                Continue with Google — It&apos;s Free
              </Link>
              <Link href={`/signup${signupParams}`} style={{
                display: 'block', textAlign: 'center',
                fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
              }}>
                or sign up with email
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
