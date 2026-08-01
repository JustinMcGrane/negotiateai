'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type Result = {
  message: string
  underpaid_by: number
  market_median: number
  market_range: { min: number; max: number }
  percentile: number
}

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString()
}

export default function WorthPage() {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch('/api/worth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, location, salary: Number(salary.replace(/[^0-9]/g, '')) }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Failed')
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const isUnder = (result?.underpaid_by ?? 0) > 0

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, Inter, sans-serif' }}>

      {/* Header */}
      <header style={{
        background: '#fff', borderBottom: '1px solid #e2e8f0',
        padding: '0 24px', height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', textDecoration: 'none' }}>Hayven</Link>
        <Link href="/signup" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none', fontWeight: 500 }}>
          Sign up free →
        </Link>
      </header>

      <main style={{ maxWidth: 520, margin: '0 auto', padding: '48px 20px 80px' }}>

        {/* Sarah intro */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 32 }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #4169E1, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, color: '#fff', fontWeight: 700,
          }}>S</div>
          <div style={{
            background: '#fff', border: '1px solid #e2e8f0',
            borderRadius: '4px 16px 16px 16px',
            padding: '14px 18px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Sarah · AI Career Coach</div>
            <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.65 }}>
              Hi! I&apos;m Sarah. Tell me your role and what you&apos;re currently making — I&apos;ll tell you exactly where you stand in the market and whether you&apos;re leaving money on the table.
            </div>
          </div>
        </div>

        {/* Form */}
        {!result && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Job title</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Senior Product Manager"
                required
                style={{
                  width: '100%', padding: '11px 14px', fontSize: 14,
                  border: '1px solid #e2e8f0', borderRadius: 10,
                  background: '#fff', color: '#0f172a', outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Location <span style={{ fontWeight: 400, color: '#94a3b8' }}>(optional)</span></label>
              <input
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA"
                style={{
                  width: '100%', padding: '11px 14px', fontSize: 14,
                  border: '1px solid #e2e8f0', borderRadius: 10,
                  background: '#fff', color: '#0f172a', outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Current salary</label>
              <input
                value={salary}
                onChange={e => setSalary(e.target.value)}
                placeholder="e.g. 120,000"
                required
                style={{
                  width: '100%', padding: '11px 14px', fontSize: 14,
                  border: '1px solid #e2e8f0', borderRadius: 10,
                  background: '#fff', color: '#0f172a', outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 4, padding: '13px 0', background: '#141414', color: '#fff',
                border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
            >
              {loading ? 'Sarah is analyzing...' : <><span>Check my market value</span> <ArrowRight size={14} /></>}
            </button>
          </form>
        )}

        {error && (
          <div style={{ marginTop: 16, padding: '12px 16px', background: '#fef2f2', borderRadius: 10, fontSize: 13, color: '#dc2626' }}>
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Sarah's message */}
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #4169E1, #6366f1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, color: '#fff', fontWeight: 700,
              }}>S</div>
              <div style={{
                background: '#fff', border: '1px solid #e2e8f0',
                borderRadius: '4px 16px 16px 16px',
                padding: '14px 18px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                flex: 1,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>Sarah · AI Career Coach</div>
                <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.7 }}>{result.message}</div>
              </div>
            </div>

            {/* Numbers card */}
            <div style={{
              background: '#fff', border: '1px solid #e2e8f0',
              borderRadius: 14, padding: '20px 20px 16px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              marginLeft: 58,
            }}>
              {/* Range bar */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ position: 'relative', height: 8, borderRadius: 99, background: '#f1f5f9', marginBottom: 10, overflow: 'visible' }}>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: 99, background: 'linear-gradient(to right, #fca5a5, #fde68a 45%, #6ee7b7)' }} />
                  <div style={{
                    position: 'absolute', top: '50%', left: `${Math.min(95, Math.max(5, result.percentile))}%`,
                    transform: 'translate(-50%, -50%)',
                    width: 16, height: 16,
                    background: '#fff', border: '3px solid #0f172a',
                    borderRadius: '50%', boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    zIndex: 1,
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 600, color: '#cbd5e1', letterSpacing: '0.06em' }}>
                  <span>BELOW MARKET</span>
                  <span>MARKET RATE</span>
                  <span>ABOVE MARKET</span>
                </div>
              </div>

              {/* Stats */}
              {[
                { label: 'Your current salary', value: fmt(Number(salary.replace(/[^0-9]/g, ''))), color: isUnder ? '#ef4444' : '#10b981' },
                { label: 'Market median', value: fmt(result.market_median), color: '#0f172a' },
                { label: 'Market range (25th–75th)', value: `${fmt(result.market_range.min)} – ${fmt(result.market_range.max)}`, color: '#64748b' },
              ].map((row, i, arr) => (
                <div key={row.label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '9px 0',
                  borderBottom: i < arr.length - 1 ? '1px solid #f1f5f9' : 'none',
                }}>
                  <span style={{ fontSize: 13, color: '#64748b' }}>{row.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: row.color }}>{row.value}</span>
                </div>
              ))}

              {/* Gap callout */}
              {isUnder && (
                <div style={{
                  marginTop: 14, background: '#fef2f2', borderRadius: 10, padding: '12px 14px',
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#b91c1c', letterSpacing: '0.08em', marginBottom: 3 }}>MONEY LEFT ON THE TABLE</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#dc2626', letterSpacing: '-0.02em' }}>{fmt(result.underpaid_by)} / year</div>
                </div>
              )}
            </div>

            {/* Signup CTA */}
            <div style={{
              marginLeft: 58,
              background: '#0f172a', borderRadius: 14,
              padding: '20px 20px',
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
                Ready to do something about it?
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 16 }}>
                Talk to Sarah in full — she&apos;ll build you a negotiation strategy, prep you for the conversation, and help you get what you&apos;re worth.
              </div>
              <Link href="/signup" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                background: '#4169E1', color: '#fff',
                borderRadius: 9, padding: '12px 0',
                fontSize: 14, fontWeight: 700, textDecoration: 'none',
              }}>
                Get started free <ArrowRight size={14} />
              </Link>
              <div style={{ textAlign: 'center', marginTop: 10, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
                No credit card required
              </div>
            </div>

            {/* Try again */}
            <button
              onClick={() => { setResult(null); setTitle(''); setSalary(''); setLocation('') }}
              style={{ background: 'none', border: 'none', fontSize: 13, color: '#94a3b8', cursor: 'pointer', textAlign: 'center', marginTop: 4 }}
            >
              ← Check a different role
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
