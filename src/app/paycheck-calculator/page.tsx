'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

// 2024 Federal tax brackets (single)
const FEDERAL_BRACKETS_SINGLE = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
]

// 2024 Federal tax brackets (married filing jointly)
const FEDERAL_BRACKETS_MARRIED = [
  { min: 0, max: 23200, rate: 0.10 },
  { min: 23200, max: 94300, rate: 0.12 },
  { min: 94300, max: 201050, rate: 0.22 },
  { min: 201050, max: 383900, rate: 0.24 },
  { min: 383900, max: 487450, rate: 0.32 },
  { min: 487450, max: 731200, rate: 0.35 },
  { min: 731200, max: Infinity, rate: 0.37 },
]

// State income tax rates (flat rate or effective rate approximation)
const STATE_TAX: Record<string, { rate: number; type: 'flat' | 'brackets'; brackets?: { min: number; max: number; rate: number }[] }> = {
  'Alabama': { rate: 0.05, type: 'flat' },
  'Alaska': { rate: 0, type: 'flat' },
  'Arizona': { rate: 0.025, type: 'flat' },
  'Arkansas': { rate: 0.047, type: 'flat' },
  'California': { rate: 0, type: 'brackets', brackets: [
    { min: 0, max: 10099, rate: 0.01 }, { min: 10099, max: 23942, rate: 0.02 },
    { min: 23942, max: 37788, rate: 0.04 }, { min: 37788, max: 52455, rate: 0.06 },
    { min: 52455, max: 66295, rate: 0.08 }, { min: 66295, max: 338639, rate: 0.093 },
    { min: 338639, max: 406364, rate: 0.103 }, { min: 406364, max: 677275, rate: 0.113 },
    { min: 677275, max: Infinity, rate: 0.123 },
  ]},
  'Colorado': { rate: 0.044, type: 'flat' },
  'Connecticut': { rate: 0, type: 'brackets', brackets: [
    { min: 0, max: 10000, rate: 0.03 }, { min: 10000, max: 50000, rate: 0.05 },
    { min: 50000, max: 100000, rate: 0.055 }, { min: 100000, max: 200000, rate: 0.06 },
    { min: 200000, max: 250000, rate: 0.065 }, { min: 250000, max: 500000, rate: 0.069 },
    { min: 500000, max: Infinity, rate: 0.0699 },
  ]},
  'Delaware': { rate: 0.066, type: 'flat' },
  'Florida': { rate: 0, type: 'flat' },
  'Georgia': { rate: 0.055, type: 'flat' },
  'Hawaii': { rate: 0.11, type: 'flat' },
  'Idaho': { rate: 0.058, type: 'flat' },
  'Illinois': { rate: 0.0495, type: 'flat' },
  'Indiana': { rate: 0.0305, type: 'flat' },
  'Iowa': { rate: 0.06, type: 'flat' },
  'Kansas': { rate: 0.057, type: 'flat' },
  'Kentucky': { rate: 0.045, type: 'flat' },
  'Louisiana': { rate: 0.03, type: 'flat' },
  'Maine': { rate: 0.075, type: 'flat' },
  'Maryland': { rate: 0.0575, type: 'flat' },
  'Massachusetts': { rate: 0.05, type: 'flat' },
  'Michigan': { rate: 0.0425, type: 'flat' },
  'Minnesota': { rate: 0.0985, type: 'flat' },
  'Mississippi': { rate: 0.05, type: 'flat' },
  'Missouri': { rate: 0.048, type: 'flat' },
  'Montana': { rate: 0.059, type: 'flat' },
  'Nebraska': { rate: 0.0664, type: 'flat' },
  'Nevada': { rate: 0, type: 'flat' },
  'New Hampshire': { rate: 0, type: 'flat' },
  'New Jersey': { rate: 0, type: 'brackets', brackets: [
    { min: 0, max: 20000, rate: 0.014 }, { min: 20000, max: 35000, rate: 0.0175 },
    { min: 35000, max: 40000, rate: 0.035 }, { min: 40000, max: 75000, rate: 0.05525 },
    { min: 75000, max: 500000, rate: 0.0637 }, { min: 500000, max: 1000000, rate: 0.0897 },
    { min: 1000000, max: Infinity, rate: 0.1075 },
  ]},
  'New Mexico': { rate: 0.059, type: 'flat' },
  'New York': { rate: 0, type: 'brackets', brackets: [
    { min: 0, max: 17150, rate: 0.04 }, { min: 17150, max: 23600, rate: 0.045 },
    { min: 23600, max: 27900, rate: 0.0525 }, { min: 27900, max: 161550, rate: 0.0585 },
    { min: 161550, max: 323200, rate: 0.0625 }, { min: 323200, max: 2155350, rate: 0.0685 },
    { min: 2155350, max: Infinity, rate: 0.0882 },
  ]},
  'North Carolina': { rate: 0.0475, type: 'flat' },
  'North Dakota': { rate: 0.025, type: 'flat' },
  'Ohio': { rate: 0, type: 'brackets', brackets: [
    { min: 0, max: 25000, rate: 0 }, { min: 25000, max: 44250, rate: 0.02765 },
    { min: 44250, max: 88450, rate: 0.03226 }, { min: 88450, max: 110650, rate: 0.03688 },
    { min: 110650, max: Infinity, rate: 0.03990 },
  ]},
  'Oklahoma': { rate: 0.0475, type: 'flat' },
  'Oregon': { rate: 0.099, type: 'flat' },
  'Pennsylvania': { rate: 0.0307, type: 'flat' },
  'Rhode Island': { rate: 0.0599, type: 'flat' },
  'South Carolina': { rate: 0.065, type: 'flat' },
  'South Dakota': { rate: 0, type: 'flat' },
  'Tennessee': { rate: 0, type: 'flat' },
  'Texas': { rate: 0, type: 'flat' },
  'Utah': { rate: 0.0465, type: 'flat' },
  'Vermont': { rate: 0.0875, type: 'flat' },
  'Virginia': { rate: 0.0575, type: 'flat' },
  'Washington': { rate: 0, type: 'flat' },
  'West Virginia': { rate: 0.065, type: 'flat' },
  'Wisconsin': { rate: 0.0765, type: 'flat' },
  'Wyoming': { rate: 0, type: 'flat' },
}

const STATES = Object.keys(STATE_TAX).sort()
const PAY_PERIODS = [
  { label: 'Annually', value: 1 },
  { label: 'Monthly', value: 12 },
  { label: 'Semi-monthly (24x)', value: 24 },
  { label: 'Bi-weekly (26x)', value: 26 },
  { label: 'Weekly', value: 52 },
]

function calcFederalTax(income: number, married: boolean) {
  const brackets = married ? FEDERAL_BRACKETS_MARRIED : FEDERAL_BRACKETS_SINGLE
  const standardDeduction = married ? 29200 : 14600
  const taxable = Math.max(0, income - standardDeduction)
  let tax = 0
  for (const b of brackets) {
    if (taxable <= b.min) break
    tax += (Math.min(taxable, b.max) - b.min) * b.rate
  }
  return tax
}

function calcStateTax(income: number, state: string) {
  const s = STATE_TAX[state]
  if (!s) return 0
  if (s.type === 'flat') return income * s.rate
  if (!s.brackets) return 0
  let tax = 0
  for (const b of s.brackets) {
    if (income <= b.min) break
    tax += (Math.min(income, b.max) - b.min) * b.rate
  }
  return tax
}

export default function PaycheckCalculator() {
  const [salary, setSalary] = useState('')
  const [state, setState] = useState('California')
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [payPeriod, setPayPeriod] = useState(26)
  const [retirement, setRetirement] = useState('')
  const [result, setResult] = useState<null | {
    gross: number
    federalTax: number
    stateTax: number
    socialSecurity: number
    medicare: number
    retirementDeduction: number
    netAnnual: number
    netPerPeriod: number
    effectiveRate: number
  }>(null)

  function calculate() {
    const annual = parseFloat(salary.replace(/,/g, ''))
    if (!annual) return

    const retirementAmt = Math.min(annual * (parseFloat(retirement || '0') / 100), 23000)
    const taxableIncome = annual - retirementAmt

    const federalTax = calcFederalTax(taxableIncome, filingStatus === 'married')
    const stateTax = calcStateTax(taxableIncome, state)
    const socialSecurity = Math.min(annual * 0.062, 160200 * 0.062)
    const medicare = annual * 0.0145

    const totalDeductions = federalTax + stateTax + socialSecurity + medicare + retirementAmt
    const netAnnual = annual - totalDeductions

    setResult({
      gross: annual,
      federalTax,
      stateTax,
      socialSecurity,
      medicare,
      retirementDeduction: retirementAmt,
      netAnnual,
      netPerPeriod: netAnnual / payPeriod,
      effectiveRate: (totalDeductions / annual) * 100,
    })
  }

  function fmt(n: number, decimals = 0) {
    return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  }

  const periodLabel = PAY_PERIODS.find(p => p.value === payPeriod)?.label ?? ''

  const schema = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Paycheck Calculator', url: 'https://gethayven.com/paycheck-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, description: 'Free paycheck calculator. Calculate take-home pay after federal and state taxes for any pay period.' }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <style>{`
        @media (max-width: 768px) {
          .pc-hero { padding: 48px 20px 56px !important; }
          .pc-section { padding: 64px 20px !important; }
          .pc-breakdown { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Nav */}
      <header style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 40px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 18, color: '#0f172a', textDecoration: 'none' }}>Hayven</Link>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/login" style={{ fontSize: 14, color: '#64748b', textDecoration: 'none' }}>Sign in</Link>
          <Link href="/signup" style={{ fontSize: 14, fontWeight: 700, background: '#0f172a', color: '#fff', padding: '8px 18px', borderRadius: 8, textDecoration: 'none' }}>Get Started Free</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pc-hero" style={{ background: '#0f172a', padding: '72px 40px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#7AB8E8', letterSpacing: '0.12em', marginBottom: 16 }}>FREE TOOL</div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20 }}>
            Paycheck Calculator
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
            Calculate your take-home pay after federal and state taxes. Works for all 50 states — including NC, New York, Ohio, California, Texas, and more.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="pc-section" style={{ padding: '64px 40px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 620, margin: '0 auto' }}>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20, padding: '40px 36px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

            {/* Annual salary */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Annual salary</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 15 }}>$</span>
                <input type="number" value={salary} onChange={e => setSalary(e.target.value)} placeholder="75000"
                  style={{ width: '100%', padding: '12px 14px 12px 28px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>

            {/* State */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>State</label>
              <select value={state} onChange={e => setState(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 15, outline: 'none', background: '#fff', boxSizing: 'border-box' }}>
                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Filing status */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Filing status</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {([['single', 'Single'], ['married', 'Married filing jointly']] as const).map(([val, label]) => (
                  <button key={val} onClick={() => setFilingStatus(val)} style={{
                    flex: 1, padding: '10px', borderRadius: 8, border: '1.5px solid',
                    borderColor: filingStatus === val ? '#0f172a' : '#e2e8f0',
                    background: filingStatus === val ? '#0f172a' : '#fff',
                    color: filingStatus === val ? '#fff' : '#64748b',
                    fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  }}>{label}</button>
                ))}
              </div>
            </div>

            {/* Pay period */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Pay frequency</label>
              <select value={payPeriod} onChange={e => setPayPeriod(Number(e.target.value))}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 15, outline: 'none', background: '#fff', boxSizing: 'border-box' }}>
                {PAY_PERIODS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>

            {/* 401k */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>401(k) contribution % <span style={{ fontWeight: 400, color: '#94a3b8' }}>(optional)</span></label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 15 }}>%</span>
                <input type="number" value={retirement} onChange={e => setRetirement(e.target.value)} placeholder="0" min="0" max="100"
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>

            <button onClick={calculate} style={{
              width: '100%', height: 52, background: '#0f172a', color: '#fff',
              border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer',
            }}>
              Calculate take-home pay
            </button>

            {/* Results */}
            {result && (
              <div style={{ marginTop: 32, borderTop: '1px solid #f1f5f9', paddingTop: 28 }}>
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 14, padding: '24px', marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#16a34a', marginBottom: 4 }}>Your take-home pay ({periodLabel})</div>
                  <div style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em' }}>{fmt(result.netPerPeriod)}</div>
                  <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{fmt(result.netAnnual)}/year · {result.effectiveRate.toFixed(1)}% effective tax rate</div>
                </div>

                {/* Breakdown */}
                <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 12 }}>Annual breakdown</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { label: 'Gross salary', value: result.gross, color: '#0f172a', bold: true },
                    { label: 'Federal income tax', value: -result.federalTax, color: '#ef4444' },
                    { label: `${state} state tax`, value: -result.stateTax, color: '#ef4444' },
                    { label: 'Social Security (6.2%)', value: -result.socialSecurity, color: '#ef4444' },
                    { label: 'Medicare (1.45%)', value: -result.medicare, color: '#ef4444' },
                    ...(result.retirementDeduction > 0 ? [{ label: '401(k) contribution', value: -result.retirementDeduction, color: '#f59e0b' }] : []),
                    { label: 'Take-home pay', value: result.netAnnual, color: '#16a34a', bold: true },
                  ].map(({ label, value, color, bold }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                      <span style={{ fontSize: 13, color: '#475569', fontWeight: bold ? 700 : 400 }}>{label}</span>
                      <span style={{ fontSize: 13, fontWeight: bold ? 800 : 600, color }}>{value < 0 ? `-${fmt(Math.abs(value))}` : fmt(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div style={{ marginTop: 24, background: '#0f172a', borderRadius: 16, padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Is your salary actually fair?</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>Sarah benchmarks your pay against your market and builds your negotiation strategy.</div>
            </div>
            <Link href="/signup" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              color: '#fff', padding: '12px 20px', borderRadius: 9,
              fontSize: 14, fontWeight: 700, textDecoration: 'none',
            }}>
              Get Started Free <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* State tax info */}
      <section className="pc-section" style={{ padding: '80px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 16 }}>
            States with no income tax
          </h2>
          <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.8, marginBottom: 24 }}>
            Nine states have no state income tax, meaning your take-home pay is higher than in other states at the same salary:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
            {['Alaska', 'Florida', 'Nevada', 'New Hampshire', 'South Dakota', 'Tennessee', 'Texas', 'Washington', 'Wyoming'].map(s => (
              <span key={s} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>{s}</span>
            ))}
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>Highest state income tax states</h3>
          <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.8 }}>
            California (up to 13.3%), Hawaii (11%), New Jersey (10.75%), Oregon (9.9%), and Minnesota (9.85%) have the highest state income tax rates. If you live in one of these states, your take-home pay can be significantly lower than in a no-tax state at the same salary.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="pc-section" style={{ padding: '80px 40px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 40 }}>
            Paycheck calculator FAQ
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {[
              { q: 'How is my paycheck calculated?', a: 'Your gross salary is reduced by federal income tax (based on tax brackets and your filing status), state income tax (varies by state), Social Security (6.2% up to $160,200), and Medicare (1.45%). Pre-tax deductions like 401(k) contributions reduce your taxable income before federal and state taxes are applied.' },
              { q: 'What is the NC paycheck calculator?', a: 'North Carolina has a flat 4.75% state income tax rate. Use the calculator above and select "North Carolina" to see your exact take-home pay after federal and NC state taxes.' },
              { q: 'How much is taken out of my paycheck for taxes?', a: 'For most people, total taxes (federal + state + FICA) take 25–35% of gross pay. Federal income tax ranges from 10–37% depending on your income. Social Security takes 6.2% and Medicare takes 1.45% of every paycheck.' },
              { q: 'What is the NYC paycheck calculator?', a: 'New York City residents pay both New York State income tax and an additional NYC local income tax (3.078%–3.876%). The calculator above includes NY state tax. NYC residents should add approximately 3–3.9% on top for the local tax.' },
              { q: 'What is the Ohio paycheck calculator?', a: 'Ohio has a progressive income tax with rates from 0% to 3.99%. The first $25,000 of income is tax-free in Ohio. Use the calculator above and select "Ohio" to see your take-home pay.' },
              { q: 'How do I increase my take-home pay?', a: 'The most effective ways are: contributing to a 401(k) or HSA (reduces taxable income), adjusting your W-4 withholding allowances, or negotiating a higher salary. A higher salary doesn\'t always mean a proportionally lower take-home — the marginal tax rate only applies to income above each bracket threshold.' },
            ].map(({ q, a }) => (
              <div key={q} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: 28 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{q}</div>
                <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.8 }}>{a}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.8, marginTop: 40 }}>
            This free paycheck calculator estimates take-home pay after federal and state taxes for all 50 states. Use it as an NC paycheck calculator, New York salary calculator, NYC paycheck calculator, Ohio paycheck calculator, California paycheck calculator, or any other state. Results are estimates based on 2024 tax rates and standard deductions. Consult a tax professional for advice specific to your situation.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: '80px 40px', background: '#0f172a', textAlign: 'center' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: 16 }}>
            Now negotiate a bigger paycheck
          </h2>
          <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.7, marginBottom: 32 }}>
            You know what you take home. Sarah will tell you what you should be earning — and give you the exact script to ask for it.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', marginBottom: 32 }}>
            {['Market rate benchmarking for your role', 'Personalized raise negotiation strategy', 'Scripts to ask for more money', 'Offer and counter-offer analysis'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#cbd5e1' }}>
                <CheckCircle size={15} color="#7AB8E8" />
                {f}
              </div>
            ))}
          </div>
          <Link href="/signup" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
            color: '#fff', padding: '14px 28px', borderRadius: 10,
            fontSize: 15, fontWeight: 700, textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(239,68,68,0.3)',
          }}>
            Get Started Free <ArrowRight size={14} />
          </Link>
          <div style={{ fontSize: 12, color: '#475569', marginTop: 12 }}>Free to start · Cancel anytime.</div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How is my paycheck calculated?', acceptedAnswer: { '@type': 'Answer', text: 'Your gross salary is reduced by federal income tax, state income tax, Social Security (6.2%), and Medicare (1.45%). Pre-tax deductions like 401(k) reduce your taxable income.' } },
          { '@type': 'Question', name: 'What is the NC paycheck calculator?', acceptedAnswer: { '@type': 'Answer', text: 'North Carolina has a flat 4.75% state income tax rate. Select North Carolina in the calculator above to see your exact take-home pay.' } },
          { '@type': 'Question', name: 'How much is taken out of my paycheck for taxes?', acceptedAnswer: { '@type': 'Answer', text: 'For most people, total taxes take 25–35% of gross pay. Federal income tax is 10–37%, Social Security is 6.2%, and Medicare is 1.45%.' } },
        ],
      })}} />
    </>
  )
}
