'use client'
import { useState, useRef, useEffect } from 'react'
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
  if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).gtag) {
    ;(window as unknown as { gtag: (a: string, b: string) => void }).gtag('event', event)
  }
}

const CHIPS = ['Software Engineer', 'Registered Nurse', 'Marketing Manager', 'Teacher', 'Sales Rep', 'Accountant']

function StatusBadge({ status }: { status: 'underpaid' | 'at_market' | 'above_market' }) {
  const config = {
    underpaid: { label: 'Underpaid', bg: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'rgba(239,68,68,0.3)' },
    at_market: { label: 'At market', bg: 'rgba(234,179,8,0.15)', color: '#fbbf24', border: 'rgba(234,179,8,0.3)' },
    above_market: { label: 'Above market', bg: 'rgba(52,211,153,0.15)', color: '#34d399', border: 'rgba(52,211,153,0.3)' },
  }[status]
  return (
    <span style={{
      display: 'inline-block', fontSize: 12, fontWeight: 700,
      background: config.bg, color: config.color,
      border: `1px solid ${config.border}`,
      borderRadius: 20, padding: '3px 12px', letterSpacing: '0.04em',
    }}>
      {config.label}
    </span>
  )
}

function SpectrumBar({ pct, p25, p90, userSalary }: { pct: number; p25: number; p90: number; userSalary: number }) {
  const range = p90 - p25
  const raw = range > 0 ? (userSalary - p25) / range : 0.5
  const pos = Math.min(98, Math.max(2, raw * 100))
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ position: 'relative', height: 10, borderRadius: 5, background: 'linear-gradient(90deg, #ef4444 0%, #eab308 50%, #22c55e 100%)', marginBottom: 6 }}>
        <div style={{
          position: 'absolute', top: '50%', left: `${pos}%`,
          transform: 'translate(-50%, -50%)',
          width: 16, height: 16, borderRadius: '50%',
          background: '#fff', border: '2.5px solid #0f172a',
          boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#64748b' }}>
        <span>Below market</span>
        <span>Market rate</span>
        <span>Above market</span>
      </div>
    </div>
  )
}

function ResultCard({
  roleLabel, locationLabel, userSalary, result, diff, pct, isExample,
}: {
  roleLabel: string; locationLabel: string; userSalary: number
  result: { p25: number; p50: number; p75: number; p90: number }
  diff: number; pct: number; isExample?: boolean
}) {
  const status: 'underpaid' | 'at_market' | 'above_market' =
    pct < -5 ? 'underpaid' : pct > 10 ? 'above_market' : 'at_market'

  return (
    <div style={{
      background: 'rgba(255,255,255,0.06)',
      border: `1px solid ${status === 'underpaid' ? 'rgba(239,68,68,0.3)' : status === 'above_market' ? 'rgba(52,211,153,0.3)' : 'rgba(234,179,8,0.3)'}`,
      borderRadius: 16, padding: '24px 20px',
    }}>
      {isExample && (
        <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', letterSpacing: '0.1em', marginBottom: 12 }}>EXAMPLE RESULT</div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>{roleLabel}</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>{locationLabel}</div>
        </div>
        <StatusBadge status={status} />
      </div>

      <SpectrumBar pct={pct} p25={result.p25} p90={result.p90} userSalary={userSalary} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
        {[
          { label: 'Your salary', val: fmt(userSalary), muted: false },
          { label: 'Market median', val: fmt(result.p50), muted: true },
          { label: 'Top 25%', val: fmt(result.p75), muted: true },
        ].map(row => (
          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span style={{ color: '#94a3b8' }}>{row.label}</span>
            <span style={{ fontWeight: 700, color: row.muted ? '#cbd5e1' : '#fff' }}>{row.val}</span>
          </div>
        ))}
      </div>

      {status === 'underpaid' && (
        <div style={{ padding: '10px 14px', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 12, color: '#f87171', fontWeight: 600 }}>Money left on the table: </span>
          <span style={{ fontSize: 12, color: '#fca5a5', fontWeight: 700 }}>{fmt(Math.abs(diff))}/year</span>
        </div>
      )}
      {status === 'at_market' && (
        <div style={{ padding: '10px 14px', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 12, color: '#34d399', fontWeight: 600 }}>You&apos;re at market rate. Negotiate for the top of range.</span>
        </div>
      )}
      {status === 'above_market' && (
        <div style={{ padding: '10px 14px', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 12, color: '#34d399', fontWeight: 600 }}>You&apos;re above market. Here&apos;s how to protect it.</span>
        </div>
      )}

      {!isExample && (
        <Link
          href="/signup"
          onClick={() => track('signup_click')}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            width: '100%', height: 50, fontSize: 14, fontWeight: 700,
            background: '#ea580c', color: '#fff',
            borderRadius: 11, textDecoration: 'none',
          }}
        >
          Save my results + get negotiation tips <ArrowRight size={14} />
        </Link>
      )}
    </div>
  )
}

export default function HeroCheckWidget() {
  const [role, setRole] = useState('')
  const [location, setLocation] = useState('')
  const [roleError, setRoleError] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CompResult | null>(null)
  const [apiError, setApiError] = useState(false)
  const [salary, setSalary] = useState('')
  const [comparison, setComparison] = useState<null | { diff: number; pct: number; userSalary: number }>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      inputRef.current?.focus()
    }
    // Scroll observer to hide Crisp chat on hero
    function onScroll() {
      if (window.scrollY < 200) {
        document.body.classList.add('hero-visible')
      } else {
        document.body.classList.remove('hero-visible')
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  async function handleStep1() {
    if (!role.trim()) {
      setRoleError('Please enter your job title to continue.')
      inputRef.current?.focus()
      return
    }
    setRoleError('')
    setApiError(false)
    track('step1_submit')
    setLoading(true)
    try {
      const res = await fetch('/api/comp-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: role.trim(), location: location.trim() || 'United States', experience: '', companySize: '', industry: '' }),
      })
      const data = await res.json()
      if (data.p50) {
        setResult(data)
      } else {
        setApiError(true)
      }
    } catch {
      setApiError(true)
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
    track('result_state_' + (pct < -5 ? 'below' : pct > 10 ? 'above' : 'at'))
    setComparison({ diff, pct, userSalary })
  }

  return (
    <div style={{ maxWidth: 460, width: '100%', margin: '0 auto' }}>

      {!result ? (
        /* ── Step 1 ── */
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 16, padding: '28px 24px',
        }}>
          <style>{`
            @keyframes spin { to { transform: rotate(360deg) } }
            #hero-role::placeholder, #hero-location::placeholder, #hero-salary::placeholder { color: #94a3b8 !important; }
          `}</style>
          <div style={{ marginBottom: 14 }}>
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

          {/* Job title chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
            {CHIPS.map(chip => (
              <button
                key={chip}
                onClick={() => { setRole(chip); track('chip_click'); setTimeout(handleStep1, 50) }}
                style={{
                  fontSize: 12, padding: '5px 10px', borderRadius: 20,
                  background: 'rgba(255,255,255,0.08)', color: '#94a3b8',
                  border: '1px solid rgba(255,255,255,0.12)',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.15)'; (e.target as HTMLButtonElement).style.color = '#e2e8f0' }}
                onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'; (e.target as HTMLButtonElement).style.color = '#94a3b8' }}
              >
                {chip}
              </button>
            ))}
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
                Checking market data for you…
              </>
            ) : (
              <>Check my market value <ArrowRight size={15} /></>
            )}
          </button>

          {apiError && (
            <p role="alert" style={{ margin: '10px 0 0', fontSize: 13, color: '#f87171', textAlign: 'center' }}>
              Couldn&apos;t fetch market data — please try again.
            </p>
          )}

          <p style={{ margin: '12px 0 0', fontSize: 12, color: '#94a3b8', textAlign: 'center' }}>
            Free · No account required · We don&apos;t store your salary
          </p>

          {/* Example preview — rebuilt */}
          <div style={{ marginTop: 20 }}>
            <ResultCard
              roleLabel="Senior Product Manager"
              locationLabel="Austin, TX"
              userSalary={148000}
              result={{ p25: 145000, p50: 178000, p75: 210000, p90: 225000 }}
              diff={-30000}
              pct={-17}
              isExample
            />
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
        /* ── Step 3: Result ── */
        <ResultCard
          roleLabel={role}
          locationLabel={location || 'United States'}
          userSalary={comparison.userSalary}
          result={result}
          diff={comparison.diff}
          pct={comparison.pct}
        />
      )}
    </div>
  )
}
