'use client'
import { useState, useEffect, useRef } from 'react'
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

const SAMPLE_RESULTS = [
  { title: 'Senior Product Manager', location: 'San Francisco, CA', gap: 24000 },
  { title: 'Software Engineer', location: 'Austin, TX', gap: 18000 },
  { title: 'Marketing Manager', location: 'New York, NY', gap: 31000 },
]

const GAP_AMOUNTS = ['$12K gap', '$31K gap', '$8K gap', '$22K gap', '$19K gap']

const inputStyle = {
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 10,
  padding: '13px 14px',
  fontSize: 14,
  color: '#fff',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box' as const,
  transition: 'border-color 0.2s, background 0.2s',
}

const labelStyle = {
  fontSize: 12,
  fontWeight: 600 as const,
  color: '#94a3b8',
  marginBottom: 6,
  display: 'block' as const,
}

export function HeroWidget() {
  const [step, setStep] = useState<Step>('form')
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [result, setResult] = useState<WorthResult | null>(null)
  const [error, setError] = useState('')
  const [gapIdx, setGapIdx] = useState(0)
  const [btnHover, setBtnHover] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setInterval(() => setGapIdx(i => (i + 1) % GAP_AMOUNTS.length), 1800)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

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
  const ready = title.trim() && salary.trim()

  const focusedInputStyle = (name: string) => ({
    ...inputStyle,
    border: focused === name ? '1px solid rgba(88,101,242,0.6)' : inputStyle.border,
    background: focused === name ? 'rgba(88,101,242,0.08)' : inputStyle.background,
    boxShadow: focused === name ? '0 0 0 3px rgba(88,101,242,0.12)' : 'none',
  })

  return (
    <>
      <style>{`
        @keyframes widget-rise {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 24px rgba(88,101,242,0.25), 0 32px 80px rgba(0,0,0,0.35); }
          50%       { box-shadow: 0 0 48px rgba(88,101,242,0.45), 0 32px 80px rgba(0,0,0,0.35); }
        }
        @keyframes dot-ping {
          0%   { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes counter-tick {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes loading-bar {
          0%   { width: 0%; }
          60%  { width: 80%; }
          100% { width: 95%; }
        }
      `}</style>

      <div
        ref={ref}
        style={{
          background: 'linear-gradient(160deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: 24,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)',
          animation: visible
            ? 'widget-rise 0.6s cubic-bezier(0.22,1,0.36,1) both, glow-pulse 3s ease-in-out 0.6s infinite'
            : 'none',
          opacity: visible ? 1 : 0,
          position: 'relative',
        }}
      >
        {/* Top accent line */}
        <div style={{
          height: 3,
          background: 'linear-gradient(90deg, #5865f2, #818cf8, #5865f2)',
          backgroundSize: '200% auto',
          animation: 'shimmer 3s linear infinite',
        }} />

        {/* Header */}
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ position: 'relative', width: 10, height: 10 }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#10b981', animation: 'dot-ping 1.8s cubic-bezier(0,0,0.2,1) infinite' }} />
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#10b981' }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0', letterSpacing: '-0.01em' }}>Check My Market Value</span>
          </div>
          <span style={{
            fontSize: 11, color: '#64748b', fontWeight: 600,
            background: 'rgba(255,255,255,0.05)',
            padding: '3px 8px', borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.07)',
          }}>↑ 3,241 this week</span>
        </div>

        <div style={{ padding: '22px 20px' }}>
          {step === 'form' && (
            <>
              {/* Sarah bubble */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'flex-start' }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 800, color: '#fff',
                  boxShadow: '0 4px 12px rgba(102,126,234,0.4)',
                }}>S</div>
                <div style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px 16px 16px 16px',
                  padding: '11px 14px', fontSize: 13, color: '#e2e8f0', lineHeight: 1.6,
                }}>
                  Hi! I&apos;m Sarah. Tell me your role and what you&apos;re currently making — I&apos;ll tell you exactly where you stand.
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Job title</label>
                  <input
                    value={title} onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Senior Product Manager"
                    style={focusedInputStyle('title')}
                    onFocus={() => setFocused('title')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Location <span style={{ fontWeight: 400, color: '#475569' }}>(optional)</span></label>
                  <input
                    value={location} onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. San Francisco, CA"
                    style={focusedInputStyle('location')}
                    onFocus={() => setFocused('location')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Current salary</label>
                  <input
                    value={salary} onChange={e => setSalary(e.target.value)}
                    placeholder="e.g. 120,000"
                    style={focusedInputStyle('salary')}
                    onFocus={() => setFocused('salary')}
                    onBlur={() => setFocused(null)}
                    onKeyDown={e => { if (e.key === 'Enter') analyze() }}
                  />
                </div>
              </div>

              {error && <div style={{ fontSize: 12, color: '#f87171', marginBottom: 12 }}>{error}</div>}

              <button
                onClick={analyze}
                disabled={!ready}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                style={{
                  width: '100%', padding: '14px', borderRadius: 12, border: 'none',
                  background: ready
                    ? btnHover
                      ? 'linear-gradient(135deg, #6872f5, #4f5de8)'
                      : 'linear-gradient(135deg, #5865f2, #4f5de8)'
                    : 'rgba(255,255,255,0.06)',
                  color: ready ? '#fff' : '#475569',
                  fontSize: 14, fontWeight: 700, cursor: ready ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'all 0.2s',
                  boxShadow: ready ? (btnHover ? '0 8px 24px rgba(88,101,242,0.5)' : '0 4px 16px rgba(88,101,242,0.35)') : 'none',
                  transform: ready && btnHover ? 'translateY(-1px)' : 'none',
                  letterSpacing: '-0.01em',
                }}
              >
                {!ready
                  ? <><span>{`Find your ${GAP_AMOUNTS[gapIdx]}`}</span> <ArrowRight size={14} /></>
                  : <>See if I&apos;m underpaid <ArrowRight size={14} /></>
                }
              </button>

              {/* Blurred sample results */}
              <div style={{ marginTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#334155', letterSpacing: '0.1em', marginBottom: 10, textTransform: 'uppercase' }}>Recent results</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {SAMPLE_RESULTS.map((r, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', filter: 'blur(1.5px)', userSelect: 'none', pointerEvents: 'none' }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0' }}>{r.title}</div>
                        <div style={{ fontSize: 11, color: '#64748b' }}>{r.location}</div>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#ef4444' }}>${Math.round(r.gap / 1000)}K gap</div>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: 10, fontSize: 11, color: '#334155' }}>Submit your info to unlock your result</div>
              </div>
            </>
          )}

          {step === 'loading' && (
            <div style={{ textAlign: 'center', padding: '36px 0' }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 800, color: '#fff',
                margin: '0 auto 16px',
                boxShadow: '0 8px 24px rgba(102,126,234,0.4)',
              }}>S</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', marginBottom: 6 }}>Sarah is analyzing your data…</div>
              <div style={{ fontSize: 12, color: '#475569', marginBottom: 20 }}>Checking market data & Levels.fyi</div>
              <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 10, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 10,
                  background: 'linear-gradient(90deg, #5865f2, #818cf8)',
                  animation: 'loading-bar 3s ease-out forwards',
                }} />
              </div>
            </div>
          )}

          {step === 'result' && result && (
            <>
              <div style={{ display: 'flex', gap: 10, marginBottom: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>S</div>
                <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px 14px 14px 14px', padding: '10px 14px', fontSize: 13, color: '#e2e8f0', lineHeight: 1.6 }}>
                  {result.message}
                </div>
              </div>

              <div style={{ background: underpaid ? 'rgba(239,68,68,0.07)' : 'rgba(16,185,129,0.07)', border: `1px solid ${underpaid ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'}`, borderRadius: 12, padding: '16px', marginBottom: 16 }}>
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

              <div style={{ background: 'rgba(102,126,234,0.1)', border: '1px solid rgba(102,126,234,0.25)', borderRadius: 14, padding: '18px' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                  {underpaid ? 'Ready to close the gap?' : 'Want to negotiate even higher?'}
                </div>
                <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 16, lineHeight: 1.6 }}>
                  Sign up free — Sarah will build you a step-by-step plan.
                </div>
                <Link href={`/signup/google${signupParams}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: '#fff', color: '#0f172a', textDecoration: 'none', borderRadius: 9, padding: '11px 16px', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
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
    </>
  )
}
