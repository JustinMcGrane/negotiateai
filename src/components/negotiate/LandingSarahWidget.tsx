'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

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
    borderRadius: 10,
    padding: '12px 14px',
    fontSize: 14,
    color: '#fff',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box' as const,
  }

  const labelStyle = {
    fontSize: 12,
    fontWeight: 600,
    color: '#94a3b8',
    marginBottom: 6,
    display: 'block' as const,
  }

  return (
    <section style={{ background: '#0f172a', padding: '96px 40px' }} className="landing-section-pad">
      <div className="landing-sarah" style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>

        {/* Left: copy */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#7AB8E8', letterSpacing: '0.1em', marginBottom: 16 }}>CAREER COACH</div>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 20, letterSpacing: '-0.025em' }}>
            Find out your<br />market value free.
          </h2>
          <p style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.7, marginBottom: 28 }}>
            Tell Sarah what you do and what you make. She&apos;ll tell you exactly where you stand — and what to do about it.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
            {[
              'Know exactly what you\'re worth',
              'Get a step-by-step negotiation plan',
              'Interview prep and offer strategy',
              'She remembers your whole journey',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#cbd5e1' }}>
                <CheckCircle size={15} color="#7AB8E8" />
                {item}
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7, fontStyle: 'italic' }}>
              &ldquo;I negotiated an extra $18K because Sarah showed me exactly what to say.&rdquo;
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginTop: 8 }}>— Michael R., Product Manager at Google</div>
          </div>
        </div>

        {/* Right: interactive widget */}
        <div style={{ background: '#1e293b', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }}>
          {/* Widget header */}
          <div style={{ background: '#0f172a', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>Check My Market Value</span>
          </div>

          <div style={{ padding: '24px 20px' }}>

            {step === 'form' && (
              <>
                {/* Sarah bubble */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 700, color: '#fff',
                  }}>S</div>
                  <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px 14px 14px 14px', padding: '10px 14px', fontSize: 13, color: '#e2e8f0', lineHeight: 1.6 }}>
                    Hi! I&apos;m Sarah. Tell me your role and what you&apos;re currently making — I&apos;ll tell you exactly where you stand.
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>Job title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Senior Product Manager" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Location <span style={{ fontWeight: 400, color: '#475569' }}>(optional)</span></label>
                    <input value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. San Francisco, CA" style={inputStyle} />
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

                {error && <div style={{ fontSize: 12, color: '#f87171', marginBottom: 12 }}>{error}</div>}

                <button
                  onClick={analyze}
                  disabled={!title.trim() || !salary.trim()}
                  style={{
                    width: '100%', padding: '13px', borderRadius: 10, border: 'none',
                    background: !title.trim() || !salary.trim() ? 'rgba(255,255,255,0.06)' : '#5865f2',
                    color: !title.trim() || !salary.trim() ? '#475569' : '#fff',
                    fontSize: 14, fontWeight: 700, cursor: !title.trim() || !salary.trim() ? 'default' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                >
                  Check my market value <ArrowRight size={14} />
                </button>
              </>
            )}

            {step === 'loading' && (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 6 }}>Sarah is analyzing your data…</div>
                <div style={{ fontSize: 12, color: '#475569' }}>Checking LinkedIn, Glassdoor & Levels.fyi</div>
              </div>
            )}

            {step === 'result' && result && (
              <>
                {/* Sarah result bubble */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 16, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 700, color: '#fff',
                  }}>S</div>
                  <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px 14px 14px 14px', padding: '10px 14px', fontSize: 13, color: '#e2e8f0', lineHeight: 1.6 }}>
                    {result.message}
                  </div>
                </div>

                {/* Numbers */}
                <div style={{
                  background: underpaid ? 'rgba(239,68,68,0.07)' : 'rgba(16,185,129,0.07)',
                  border: `1px solid ${underpaid ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'}`,
                  borderRadius: 12, padding: '16px', marginBottom: 16,
                }}>
                  {underpaid && (
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#ef4444', letterSpacing: '-0.02em', marginBottom: 10 }}>
                      {fmt(result.underpaid_by)}/yr gap
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#64748b', letterSpacing: '0.06em', marginBottom: 3 }}>MARKET MEDIAN</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>{fmt(result.market_median)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#64748b', letterSpacing: '0.06em', marginBottom: 3 }}>RANGE</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>{fmt(result.market_range.min)}–{fmt(result.market_range.max)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#64748b', letterSpacing: '0.06em', marginBottom: 3 }}>PERCENTILE</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>{result.percentile}th</div>
                    </div>
                  </div>
                </div>

                {/* Signup CTA */}
                <div style={{ background: 'rgba(102,126,234,0.1)', border: '1px solid rgba(102,126,234,0.25)', borderRadius: 14, padding: '18px' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                    {underpaid ? 'Ready to close the gap?' : 'Want to negotiate even higher?'}
                  </div>
                  <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 16, lineHeight: 1.6 }}>
                    Sign up free — Sarah will build you a step-by-step plan.
                  </div>
                  <Link href={`/signup/google${signupParams}`} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    background: '#fff', color: '#0f172a', textDecoration: 'none',
                    borderRadius: 9, padding: '11px 16px', fontSize: 13, fontWeight: 700, marginBottom: 8,
                  }}>
                    <svg width="14" height="14" viewBox="0 0 18 18">
                      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                      <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
                      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.96l3.007 2.332C4.672 5.163 6.656 3.58 9 3.58z"/>
                    </svg>
                    Continue with Google — It&apos;s Free
                  </Link>
                  <Link href={`/signup${signupParams}`} style={{ display: 'block', textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>
                    or sign up with email
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
