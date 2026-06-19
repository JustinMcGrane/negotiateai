'use client'
import { useState } from 'react'
import { ToolPage } from '@/components/negotiate/ToolPage'

function fmt(n: number) { return '$' + Math.round(n).toLocaleString() }

export default function CostCalculator() {
  const [form, setForm] = useState({ currentOffer: '', marketRate: '', raisePercent: '3', years: '10' })
  const [result, setResult] = useState<{ gap: number; offerTotal: number; marketTotal: number; yearlyData: { year: number; offer: number; market: number }[] } | null>(null)

  const inp: React.CSSProperties = { height: 40, border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, padding: '0 12px', fontSize: 13, background: '#fff', width: '100%' }
  const lbl: React.CSSProperties = { fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }

  function calculate(e: React.FormEvent) {
    e.preventDefault()
    const offer = parseFloat(form.currentOffer)
    const market = parseFloat(form.marketRate)
    const raise = parseFloat(form.raisePercent) / 100
    const yrs = parseInt(form.years)

    let offerTotal = 0, marketTotal = 0
    const yearlyData = []
    for (let i = 1; i <= yrs; i++) {
      const o = offer * Math.pow(1 + raise, i - 1)
      const m = market * Math.pow(1 + raise, i - 1)
      offerTotal += o
      marketTotal += m
      yearlyData.push({ year: i, offer: o, market: m })
    }
    setResult({ gap: marketTotal - offerTotal, offerTotal, marketTotal, yearlyData })
  }

  const maxVal = result ? Math.max(...result.yearlyData.map((d) => d.market)) : 1

  return (
    <ToolPage title="Cost of not negotiating" desc="See the compounding dollar gap over 5–20 years of accepting less than market rate.">
      <form onSubmit={calculate}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14, marginBottom: 20 }}>
          <div><div style={lbl}>CURRENT OFFER ($)</div><input type="number" style={inp} placeholder="120000" value={form.currentOffer} onChange={(e) => setForm({ ...form, currentOffer: e.target.value })} required /></div>
          <div><div style={lbl}>MARKET RATE ($)</div><input type="number" style={inp} placeholder="140000" value={form.marketRate} onChange={(e) => setForm({ ...form, marketRate: e.target.value })} required /></div>
          <div><div style={lbl}>ANNUAL RAISE %</div><input type="number" style={inp} placeholder="3" step="0.5" value={form.raisePercent} onChange={(e) => setForm({ ...form, raisePercent: e.target.value })} /></div>
          <div>
            <div style={lbl}>YEARS TO MODEL</div>
            <select style={inp} value={form.years} onChange={(e) => setForm({ ...form, years: e.target.value })}>
              {['5', '10', '15', '20'].map((y) => <option key={y} value={y}>{y} years</option>)}
            </select>
          </div>
        </div>
        <button type="submit" style={{ height: 38, padding: '0 20px', background: '#141414', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13 }}>
          Calculate cost →
        </button>
      </form>

      {result && (
        <div style={{ marginTop: 32 }} className="animate-slide-up">
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8 }}>TOTAL EARNINGS GAP OVER {form.years} YEARS</div>
            <div style={{ fontSize: 48, fontWeight: 500, color: 'var(--color-danger)', letterSpacing: '-0.02em' }}>{fmt(result.gap)}</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 6 }}>
              This is how much more you&apos;d earn by negotiating to market rate, compounded over {form.years} years at {form.raisePercent}% annual raises.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            <div style={{ flex: 1, background: 'var(--color-background-secondary)', borderRadius: 8, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 500 }}>{fmt(result.offerTotal)}</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 3 }}>Total at current offer</div>
            </div>
            <div style={{ flex: 1, background: 'var(--color-background-secondary)', borderRadius: 8, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 500, color: 'var(--color-success)' }}>{fmt(result.marketTotal)}</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 3 }}>Total at market rate</div>
            </div>
          </div>

          <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 10 }}>YEAR-BY-YEAR COMPARISON</div>
          <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 120 }}>
            {result.yearlyData.map((d) => (
              <div key={d.year} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1, height: `${(d.market / maxVal) * 100}%` }}>
                  <div style={{ background: '#141414', height: `${(d.offer / d.market) * 100}%`, borderRadius: '2px 2px 0 0', minHeight: 2 }} />
                  <div style={{ background: 'var(--color-background-secondary)', height: `${((d.market - d.offer) / d.market) * 100}%`, borderRadius: 0 }} />
                </div>
                <div style={{ fontSize: 9, color: 'var(--color-text-tertiary)' }}>Y{d.year}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--color-text-secondary)' }}>
              <div style={{ width: 10, height: 10, background: '#141414', borderRadius: 2 }} /> At offer
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--color-text-secondary)' }}>
              <div style={{ width: 10, height: 10, background: 'var(--color-background-secondary)', border: '1px solid #ccc', borderRadius: 2 }} /> Gap (lost earnings)
            </div>
          </div>

          <div style={{ marginTop: 24, padding: '14px 16px', background: 'var(--color-background-secondary)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Build your negotiation script now.</div>
            <a href="/tools/playbook" style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', textDecoration: 'none' }}>Get negotiation playbook →</a>
          </div>
        </div>
      )}
    </ToolPage>
  )
}
