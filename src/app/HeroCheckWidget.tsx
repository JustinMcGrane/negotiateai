'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'

type CompResult = {
  p25: number
  p50: number
  p75: number
  p90: number
  insight: string
  tip: string
  recommendedTarget: number
}

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function track(event: string) {
  if (typeof window !== 'undefined' && (window as Record<string, unknown>).gtag) {
    (window as Record<string, unknown> & { gtag: Function }).gtag('event', event)
  }
}

export default function HeroCheckWidget() {
  const [role, setRole] = useState('')
  const [location, setLocation] = useState('')
  const [roleError, setRoleError] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CompResult | null>(null)
  const [salary, setSalary] = useState('')
  const [comparison, setComparison] = useState<null | { diff: number; pct: number }>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleStep1() {
    if (!role.trim()) {
      setRoleError('Please enter your job title to continue.')
      inputRef.current?.focus()
      return
    }
    setRoleError('')
    track('step1_submit')
    setLoading(true)
    try {
      const res = await fetch('/api/comp-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: role.trim(), location: location.trim() || 'United States', experience: '', companySize: '', industry: '' }),
      })
      const data = await res.json()
      if (data.p50) setResult(data)
    } catch {
      // silent fail — keep form
    } finally {
      setLoading(false)
    }
  }

  function handleStep2() {
    if (!salary || !result) return
    const userSalary = parseFloat(salary.replace(/[^0-9.]/g, ''))
    if (!userSalary) return
    track('step2_submit')
    const diff = userSalary - result.p50
    const pct = Math.round((diff / result.p50) * 100)
    setComparison({ diff, pct })
  }

  const isAbove = comparison && comparison.pct >= 0

  return (
    <div style={{ maxWidth: 460, width: '100%', margin: '0 auto' }}>

      {!result ? (
        /* ── Step 1 ── */
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 16, padding: '28px 24px',
        }}>
          <div style={{ marginBottom: 18 }}>
            <label htmlFor="hero-role" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Your job title
            </label>
            <input
              id="hero-role"
              ref={inputRef}
              type="text"
              value={role}
              onChange={e => { setRole(e.target.value); if (e.target.value) setRoleError('') }}
              onFocus={() => track('hero_input_focus')}
              onKeyDown={e => e.key === 'Enter' && handleStep1()}
              placeholder="e.g. Software Engineer, Product Manager"
              aria-describedby={roleError ? 'role-error' : undefined}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '14px 16px', fontSize: 15,
                background: 'rgba(255,255,255,0.08)',
                border: `1.5px solid ${roleError ? '#f87171' : 'rgba(255,255,255,0.18)'}`,
                borderRadius: 10, color: '#fff', outline: 'none',
                WebkitTapHighlightColor: 'transparent',
              }}
            />
            {roleError && (
              <p id="role-error" role="alert" style={{ margin: '6px 0 0', fontSize: 12, color: '#f87171' }}>{roleError}</p>
            )}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label htmlFor="hero-location" style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              <MapPin size={11} /> Location <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
            </label>
            <input
              id="hero-location"
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleStep1()}
              placeholder="e.g. San Francisco, CA or Remote"
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '14px 16px', fontSize: 15,
                background: 'rgba(255,255,255,0.08)',
                border: '1.5px solid rgba(255,255,255,0.18)',
                borderRadius: 10, color: '#fff', outline: 'none',
              }}
            />
          </div>

          <button
            onClick={handleStep1}
            disabled={loading}
            style={{
              width: '100%', height: 52, fontSize: 15, fontWeight: 700,
              background: loading ? '#1d4ed8' : '#2563eb',
              color: '#fff', border: 'none', borderRadius: 11,
              cursor: loading ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'background 0.15s',
            }}
          >
            {loading ? (
              <>
                <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                Checking market data…
              </>
            ) : (
              <>Check my market value <ArrowRight size={15} /></>
            )}
          </button>

          <p style={{ margin: '12px 0 0', fontSize: 12, color: '#64748b', textAlign: 'center' }}>
            Free · No account required · We don&apos;t store your salary
          </p>

          {/* Example preview */}
          <div style={{ marginTop: 20, padding: '14px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', letterSpacing: '0.1em', marginBottom: 10 }}>EXAMPLE RESULT</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>Senior Product Manager · Austin, TX</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[{ label: 'Low', val: '$145K', muted: true }, { label: 'Median', val: '$178K', highlight: true }, { label: 'High', val: '$215K', muted: true }].map(b => (
                <div key={b.label} style={{
                  flex: 1, minWidth: 70, textAlign: 'center',
                  padding: '8px 6px',
                  background: b.highlight ? 'rgba(37,99,235,0.2)' : 'rgba(255,255,255,0.04)',
                  borderRadius: 8,
                  border: b.highlight ? '1px solid rgba(37,99,235,0.4)' : '1px solid rgba(255,255,255,0.06)',
                }}>
                  <div style={{ fontSize: 11, color: '#64748b', marginBottom: 3 }}>{b.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: b.highlight ? '#93c5fd' : '#94a3b8' }}>{b.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : !comparison ? (
        /* ── Step 2 ── */
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 16, padding: '28px 24px',
        }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 14 }}>
              Market rate for <strong style={{ color: '#e2e8f0' }}>{role}{location ? ` in ${location}` : ''}</strong>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[{ label: 'Low', val: result.p25 }, { label: 'Median', val: result.p50, highlight: true }, { label: 'High', val: result.p90 }].map(b => (
                <div key={b.label} style={{
                  flex: 1, textAlign: 'center', padding: '12px 8px',
                  background: b.highlight ? 'rgba(37,99,235,0.2)' : 'rgba(255,255,255,0.04)',
                  border: b.highlight ? '1px solid rgba(37,99,235,0.4)' : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 10,
                }}>
                  <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>{b.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: b.highlight ? '#93c5fd' : '#94a3b8' }}>{fmt(b.val)}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label htmlFor="hero-salary" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              What are you currently earning?
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 15, pointerEvents: 'none' }}>$</span>
              <input
                id="hero-salary"
                type="number"
                value={salary}
                onChange={e => setSalary(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleStep2()}
                placeholder="e.g. 120000"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '14px 16px 14px 28px', fontSize: 15,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1.5px solid rgba(255,255,255,0.18)',
                  borderRadius: 10, color: '#fff', outline: 'none',
                }}
              />
            </div>
          </div>

          <button
            onClick={handleStep2}
            disabled={!salary}
            style={{
              width: '100%', height: 52, fontSize: 15, fontWeight: 700,
              background: salary ? '#2563eb' : 'rgba(37,99,235,0.3)',
              color: salary ? '#fff' : 'rgba(255,255,255,0.4)',
              border: 'none', borderRadius: 11,
              cursor: salary ? 'pointer' : 'default',
              transition: 'all 0.15s',
            }}
          >
            See how I compare
          </button>
        </div>
      ) : (
        /* ── Result ── */
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          border: `1px solid ${isAbove ? 'rgba(52,211,153,0.3)' : 'rgba(251,146,60,0.3)'}`,
          borderRadius: 16, padding: '28px 24px', textAlign: 'center',
        }}>
          <div style={{
            fontSize: 48, fontWeight: 900, letterSpacing: '-0.03em',
            color: isAbove ? '#34d399' : '#fb923c',
            marginBottom: 8,
          }}>
            {Math.abs(comparison.pct)}%
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#e2e8f0', marginBottom: 6 }}>
            {isAbove ? 'above' : 'below'} market median
          </div>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 24 }}>
            {isAbove
              ? `You're earning ${fmt(Math.abs(comparison.diff))} more than the median.`
              : `The gap is ${fmt(Math.abs(comparison.diff))} — that's money left on the table.`}
          </div>

          {result.insight && (
            <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7, marginBottom: 24, textAlign: 'left', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: 10 }}>
              {result.insight}
            </p>
          )}

          <Link
            href="/signup"
            onClick={() => track('signup_click')}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              width: '100%', height: 52, fontSize: 15, fontWeight: 700,
              background: '#2563eb', color: '#fff',
              borderRadius: 11, textDecoration: 'none',
            }}
          >
            {isAbove ? 'Save my result + get negotiation tips' : 'Get my negotiation plan from Sarah'} <ArrowRight size={15} />
          </Link>
          <p style={{ margin: '10px 0 0', fontSize: 12, color: '#64748b' }}>Free to start · No credit card</p>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
