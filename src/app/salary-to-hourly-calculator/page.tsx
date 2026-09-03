'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

const COMMON_SALARIES = [50000, 60000, 70000, 75000, 80000, 90000, 100000, 110000, 120000, 130000, 150000, 175000, 200000]
const COMMON_HOURLY = [15, 16, 17, 18, 20, 22, 23, 25, 28, 30, 32, 35, 40, 45, 50, 60, 75, 100]

export default function SalaryToHourlyCalculator() {
  const [salary, setSalary] = useState('')
  const [hoursPerWeek, setHoursPerWeek] = useState('40')
  const [weeksPerYear, setWeeksPerYear] = useState('52')
  const [result, setResult] = useState<null | {
    hourly: number
    daily: number
    weekly: number
    monthly: number
    annual: number
  }>(null)

  function calculate(annualOverride?: number) {
    const annual = annualOverride ?? parseFloat(salary.replace(/,/g, ''))
    const hours = parseFloat(hoursPerWeek)
    const weeks = parseFloat(weeksPerYear)
    if (!annual || !hours || !weeks) return

    const totalHours = hours * weeks
    setResult({
      hourly: annual / totalHours,
      daily: annual / (weeks * 5),
      weekly: annual / weeks,
      monthly: annual / 12,
      annual,
    })
    if (annualOverride !== undefined) setSalary(annualOverride.toLocaleString())
  }

  function fmt(n: number, decimals = 2) {
    return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  }

  function fmtK(n: number) {
    if (n >= 1000) return `$${(n / 1000).toFixed(0)}k`
    return `$${n}`
  }

  const schema = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Salary to Hourly Calculator', url: 'https://gethayven.com/salary-to-hourly-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, description: 'Free salary to hourly rate calculator. Convert annual salary to hourly, daily, weekly, and monthly pay.' }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <style>{`
        @media (max-width: 768px) {
          .sh-hero { padding: 48px 20px 56px !important; }
          .sh-section { padding: 64px 20px !important; }
          .sh-results { grid-template-columns: 1fr 1fr !important; }
          .sh-table { font-size: 13px !important; }
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
      <section className="sh-hero" style={{ background: '#0f172a', padding: '72px 40px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#7AB8E8', letterSpacing: '0.12em', marginBottom: 16 }}>FREE TOOL</div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20 }}>
            Salary to Hourly Calculator
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
            Convert any annual salary to an hourly rate instantly. See how much $100k a year is per hour, plus your daily, weekly, and monthly pay breakdown.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="sh-section" style={{ padding: '64px 40px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20, padding: '40px 36px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

            {/* Annual salary input */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Annual salary</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 15 }}>$</span>
                <input
                  type="number"
                  value={salary}
                  onChange={e => setSalary(e.target.value)}
                  placeholder="100000"
                  style={{ width: '100%', padding: '12px 14px 12px 28px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Quick select */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>Quick select</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {COMMON_SALARIES.map(s => (
                  <button key={s} onClick={() => calculate(s)} style={{
                    padding: '5px 10px', borderRadius: 6, border: '1px solid #e2e8f0',
                    background: parseFloat(salary.replace(/,/g, '')) === s ? '#0f172a' : '#f8fafc',
                    color: parseFloat(salary.replace(/,/g, '')) === s ? '#fff' : '#64748b',
                    fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  }}>{fmtK(s)}</button>
                ))}
              </div>
            </div>

            {/* Hours per week */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Hours per week</label>
                <input
                  type="number"
                  value={hoursPerWeek}
                  onChange={e => setHoursPerWeek(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Weeks per year</label>
                <input
                  type="number"
                  value={weeksPerYear}
                  onChange={e => setWeeksPerYear(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <button onClick={() => calculate()} style={{
              width: '100%', height: 52, background: '#0f172a', color: '#fff',
              border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer',
            }}>
              Calculate hourly rate
            </button>

            {/* Results */}
            {result && (
              <div style={{ marginTop: 32, borderTop: '1px solid #f1f5f9', paddingTop: 28 }}>
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 14, padding: '24px', marginBottom: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#16a34a', marginBottom: 8 }}>
                    {fmt(result.annual, 0)}/year is
                  </div>
                  <div style={{ fontSize: 48, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em' }}>
                    {fmt(result.hourly)}<span style={{ fontSize: 18, fontWeight: 400, color: '#94a3b8' }}>/hr</span>
                  </div>
                </div>
                <div className="sh-results" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  {[
                    { label: 'Daily', value: fmt(result.daily) },
                    { label: 'Weekly', value: fmt(result.weekly, 0) },
                    { label: 'Monthly', value: fmt(result.monthly, 0) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ background: '#f8fafc', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
                      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>{label}</div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>{value}</div>
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
              <div style={{ fontSize: 13, color: '#94a3b8' }}>Sarah will benchmark your pay against your market in minutes.</div>
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

      {/* Common salary table */}
      <section className="sh-section" style={{ padding: '80px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 8 }}>
            Annual salary to hourly rate chart
          </h2>
          <p style={{ fontSize: 15, color: '#64748b', marginBottom: 32 }}>Based on 40 hours per week, 52 weeks per year.</p>
          <div style={{ overflowX: 'auto' }}>
            <table className="sh-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  {['Annual Salary', 'Hourly Rate', 'Monthly', 'Weekly', 'Daily'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: '#374151', fontSize: 13 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMMON_SALARIES.map((s, i) => {
                  const hourly = s / (40 * 52)
                  const monthly = s / 12
                  const weekly = s / 52
                  const daily = s / (52 * 5)
                  return (
                    <tr key={s} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>{fmt(s, 0)}</td>
                      <td style={{ padding: '12px 16px', fontWeight: 700, color: '#16a34a' }}>{fmt(hourly)}/hr</td>
                      <td style={{ padding: '12px 16px', color: '#374151' }}>{fmt(monthly, 0)}</td>
                      <td style={{ padding: '12px 16px', color: '#374151' }}>{fmt(weekly, 0)}</td>
                      <td style={{ padding: '12px 16px', color: '#374151' }}>{fmt(daily)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Hourly to annual table */}
      <section className="sh-section" style={{ padding: '80px 40px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 8 }}>
            Hourly to annual salary chart
          </h2>
          <p style={{ fontSize: 15, color: '#64748b', marginBottom: 32 }}>Based on 40 hours per week, 52 weeks per year.</p>
          <div style={{ overflowX: 'auto' }}>
            <table className="sh-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#fff', borderBottom: '2px solid #e2e8f0' }}>
                  {['Hourly Rate', 'Annual Salary', 'Monthly', 'Weekly', 'Daily'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: '#374151', fontSize: 13 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMMON_HOURLY.map((h, i) => {
                  const annual = h * 40 * 52
                  const monthly = annual / 12
                  const weekly = annual / 52
                  const daily = h * 8
                  return (
                    <tr key={h} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>${h}/hr</td>
                      <td style={{ padding: '12px 16px', fontWeight: 700, color: '#16a34a' }}>{(annual).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}</td>
                      <td style={{ padding: '12px 16px', color: '#374151' }}>{monthly.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}</td>
                      <td style={{ padding: '12px 16px', color: '#374151' }}>{weekly.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}</td>
                      <td style={{ padding: '12px 16px', color: '#374151' }}>{daily.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sh-section" style={{ padding: '80px 40px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 40 }}>
            Salary to hourly FAQ
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {[
              { q: '100k a year is how much an hour?', a: '$100,000 a year is $48.08 per hour, based on a standard 40-hour work week and 52 weeks per year. That works out to $8,333 per month, $1,923 per week, and $384.62 per day.' },
              { q: '120k a year is how much an hour?', a: '$120,000 a year is $57.69 per hour, based on 40 hours per week. Monthly that\'s $10,000, weekly $2,308, and daily $461.54.' },
              { q: 'How do I convert annual salary to hourly?', a: 'Divide your annual salary by the number of hours you work per year. For a standard 40-hour week: Annual salary ÷ 2,080 = hourly rate. For example, $75,000 ÷ 2,080 = $36.06/hour.' },
              { q: 'What is a good hourly rate?', a: 'The median hourly wage in the US is around $22–$24/hour ($45,000–$50,000 annually). A "good" hourly rate depends heavily on your role, experience, and location. In tech and finance, $50–$100+/hour is common for mid-to-senior roles.' },
              { q: 'How many hours a year is a full-time job?', a: 'A standard full-time job is 2,080 hours per year (40 hours/week × 52 weeks). If you take 2 weeks of vacation, that\'s 2,000 hours. Use 2,080 for the standard calculation.' },
              { q: '45 an hour is how much a year?', a: '$45 an hour is $93,600 per year based on a 40-hour work week and 52 weeks per year. That works out to $7,800 per month, $1,800 per week, and $360 per day.' },
              { q: '45000 a year is how much an hour?', a: '$45,000 a year is $21.63 per hour based on a standard 40-hour work week. Monthly that\'s $3,750, weekly $865, and daily $173.' },
            ].map(({ q, a }) => (
              <div key={q} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: 28 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{q}</div>
                <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.8 }}>{a}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.8, marginTop: 40 }}>
            This salary to hourly calculator converts any annual salary to an hourly wage. Whether you want to know how much $100k a year is hourly, how much $120k a year is per hour, or any other annual salary to hourly conversion, enter your salary above for an instant breakdown. Also works as an hourly to annual salary calculator — just use our raise calculator for the reverse.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: '80px 40px', background: '#0f172a', textAlign: 'center' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: 16 }}>
            Find out if your salary is fair
          </h2>
          <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.7, marginBottom: 32 }}>
            Knowing your hourly rate is one thing. Knowing if you&apos;re being underpaid is another. Sarah will benchmark your salary against your market and tell you exactly what to do about it.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', marginBottom: 32 }}>
            {['Market rate benchmarking for your role and city', 'Personalized negotiation strategy', 'Scripts to ask for more money', 'Offer and counter-offer analysis'].map(f => (
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
          { '@type': 'Question', name: '100k a year is how much an hour?', acceptedAnswer: { '@type': 'Answer', text: '$100,000 a year is $48.08 per hour based on a 40-hour work week and 52 weeks per year.' } },
          { '@type': 'Question', name: '120k a year is how much an hour?', acceptedAnswer: { '@type': 'Answer', text: '$120,000 a year is $57.69 per hour based on a 40-hour work week and 52 weeks per year.' } },
          { '@type': 'Question', name: 'How do I convert annual salary to hourly?', acceptedAnswer: { '@type': 'Answer', text: 'Divide your annual salary by 2,080 (40 hours × 52 weeks) to get your hourly rate.' } },
        ],
      })}} />
    </>
  )
}
