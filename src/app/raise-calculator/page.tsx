'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function RaiseCalculator() {
  const [currentSalary, setCurrentSalary] = useState('')
  const [raiseType, setRaiseType] = useState<'percent' | 'amount'>('percent')
  const [raiseValue, setRaiseValue] = useState('')
  const [payType, setPayType] = useState<'annual' | 'hourly'>('annual')
  const [hoursPerWeek, setHoursPerWeek] = useState('40')
  const [result, setResult] = useState<null | {
    newSalary: number
    raiseAmount: number
    raisePercent: number
    monthlyIncrease: number
    weeklyIncrease: number
  }>(null)

  function calculate() {
    const salary = parseFloat(currentSalary.replace(/,/g, ''))
    const value = parseFloat(raiseValue.replace(/,/g, ''))
    if (!salary || !value) return

    let annualSalary = salary
    if (payType === 'hourly') {
      annualSalary = salary * parseFloat(hoursPerWeek) * 52
    }

    let raiseAmount: number
    let raisePercent: number

    if (raiseType === 'percent') {
      raisePercent = value
      raiseAmount = annualSalary * (value / 100)
    } else {
      raiseAmount = value
      raisePercent = (value / annualSalary) * 100
    }

    const newSalary = annualSalary + raiseAmount

    setResult({
      newSalary,
      raiseAmount,
      raisePercent,
      monthlyIncrease: raiseAmount / 12,
      weeklyIncrease: raiseAmount / 52,
    })
  }

  function fmt(n: number) {
    return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
  }

  function fmtD(n: number) {
    return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
  }

  const schema = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Raise Calculator', url: 'https://gethayven.com/raise-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, description: 'Free salary raise calculator. Calculate your new salary after a percent or dollar raise.' }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <style>{`
        @media (max-width: 768px) {
          .rc-hero { padding: 48px 20px 56px !important; }
          .rc-grid { grid-template-columns: 1fr !important; }
          .rc-section { padding: 64px 20px !important; }
          .rc-faq-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Nav */}
      <header style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 40px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 18, color: '#0f172a', textDecoration: 'none' }}>Hayven</Link>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/login" style={{ fontSize: 14, color: '#64748b', textDecoration: 'none' }}>Sign in</Link>
          <Link href="/signup" style={{ fontSize: 14, fontWeight: 700, background: '#0f172a', color: '#fff', padding: '8px 18px', borderRadius: 8, textDecoration: 'none' }}>Try Free Today - No Credit Card Required</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="rc-hero" style={{ background: '#0f172a', padding: '72px 40px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#7AB8E8', letterSpacing: '0.12em', marginBottom: 16 }}>FREE TOOL</div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20 }}>
            Pay Raise Calculator
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
            Free salary increase calculator. Enter your current salary and raise percentage or dollar amount to instantly see your new salary, monthly increase, and weekly increase. Works as a pay increase calculator for both annual salary and hourly wage.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="rc-section" style={{ padding: '64px 40px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20, padding: '40px 36px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

            {/* Pay type toggle */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Pay type</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['annual', 'hourly'] as const).map(t => (
                  <button key={t} onClick={() => setPayType(t)} style={{
                    flex: 1, padding: '10px', borderRadius: 8, border: '1.5px solid',
                    borderColor: payType === t ? '#0f172a' : '#e2e8f0',
                    background: payType === t ? '#0f172a' : '#fff',
                    color: payType === t ? '#fff' : '#64748b',
                    fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  }}>{t === 'annual' ? 'Annual salary' : 'Hourly wage'}</button>
                ))}
              </div>
            </div>

            {/* Current salary */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>
                Current {payType === 'annual' ? 'annual salary' : 'hourly wage'}
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 15 }}>$</span>
                <input
                  type="number"
                  value={currentSalary}
                  onChange={e => setCurrentSalary(e.target.value)}
                  placeholder={payType === 'annual' ? '75000' : '35'}
                  style={{ width: '100%', padding: '12px 14px 12px 28px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Hours per week (hourly only) */}
            {payType === 'hourly' && (
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Hours per week</label>
                <input
                  type="number"
                  value={hoursPerWeek}
                  onChange={e => setHoursPerWeek(e.target.value)}
                  placeholder="40"
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            )}

            {/* Raise type toggle */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Raise type</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['percent', 'amount'] as const).map(t => (
                  <button key={t} onClick={() => setRaiseType(t)} style={{
                    flex: 1, padding: '10px', borderRadius: 8, border: '1.5px solid',
                    borderColor: raiseType === t ? '#0f172a' : '#e2e8f0',
                    background: raiseType === t ? '#0f172a' : '#fff',
                    color: raiseType === t ? '#fff' : '#64748b',
                    fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  }}>{t === 'percent' ? 'Percentage %' : 'Dollar amount $'}</button>
                ))}
              </div>
            </div>

            {/* Raise value */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>
                {raiseType === 'percent' ? 'Raise percentage' : 'Raise amount'}
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 15 }}>
                  {raiseType === 'percent' ? '%' : '$'}
                </span>
                <input
                  type="number"
                  value={raiseValue}
                  onChange={e => setRaiseValue(e.target.value)}
                  placeholder={raiseType === 'percent' ? '5' : '5000'}
                  style={{ width: '100%', padding: '12px 14px 12px 28px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <button onClick={calculate} style={{
              width: '100%', height: 52, background: '#0f172a', color: '#fff',
              border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer',
            }}>
              Calculate my raise
            </button>

            {/* Results */}
            {result && (
              <div style={{ marginTop: 32, borderTop: '1px solid #f1f5f9', paddingTop: 28 }}>
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 14, padding: '24px', marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#16a34a', marginBottom: 8 }}>Your new salary</div>
                  <div style={{ fontSize: 42, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em' }}>{fmt(result.newSalary)}</div>
                  <div style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>
                    +{result.raisePercent % 1 === 0 ? result.raisePercent.toFixed(0) : result.raisePercent.toFixed(1)}% raise · +{fmt(result.raiseAmount)}/year
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ background: '#f8fafc', borderRadius: 10, padding: '16px' }}>
                    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Monthly increase</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>{fmtD(result.monthlyIncrease)}</div>
                  </div>
                  <div style={{ background: '#f8fafc', borderRadius: 10, padding: '16px' }}>
                    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Weekly increase</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>{fmtD(result.weeklyIncrease)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div style={{ marginTop: 24, background: '#0f172a', borderRadius: 16, padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Want to negotiate a bigger raise?</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>Sarah will build you a personalized raise strategy and scripts.</div>
            </div>
            <Link href="/signup" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              color: '#fff', padding: '12px 20px', borderRadius: 9,
              fontSize: 14, fontWeight: 700, textDecoration: 'none',
            }}>
              Try Free Today - No Credit Card Required <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* What is a good raise section */}
      <section className="rc-section" style={{ padding: '80px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 16 }}>
            What is a good raise percentage?
          </h2>
          <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 24 }}>
            The average raise in the US is <strong>3–5% per year</strong>, typically tied to cost-of-living adjustments. But average isn't the goal — here's how raises actually break down:
          </p>
          <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
            {[
              { range: '1–3%', label: 'Cost of living adjustment', desc: 'Keeps pace with inflation. Effectively flat in real terms.', color: '#ef4444' },
              { range: '3–5%', label: 'Standard merit raise', desc: 'Typical for solid performers. The baseline most employers offer.', color: '#f59e0b' },
              { range: '5–10%', label: 'Strong performance raise', desc: 'For top performers or after a promotion. Requires negotiation in most cases.', color: '#22c55e' },
              { range: '10–20%+', label: 'Significant raise or promotion', desc: 'Usually tied to a title change, new responsibilities, or a competing offer.', color: '#4A90D9' },
            ].map(({ range, label, desc, color }) => (
              <div key={range} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '16px 20px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 18, fontWeight: 900, color, minWidth: 70 }}>{range}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8 }}>
            If you have a competing offer, market data showing you're underpaid, or a track record of strong performance, you have leverage to ask for 10–20% or more. That's where negotiation — and tools like Hayven — make a real difference.
          </p>
        </div>
      </section>

      {/* How to ask for a raise */}
      <section className="rc-section" style={{ padding: '80px 40px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 16 }}>
            How to ask for a raise
          </h2>
          <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 28 }}>
            Knowing your number is step one. Getting it is step two. Here's what actually works:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { step: '01', title: 'Know your market rate', body: 'Research what people in your role, city, and experience level are earning. If you\'re below market, that\'s your strongest argument — not your tenure.' },
              { step: '02', title: 'Document your impact', body: 'Managers approve raises for results, not effort. Write down specific wins: revenue generated, costs saved, projects delivered. Put numbers on everything.' },
              { step: '03', title: 'Pick the right moment', body: 'After a win, during annual review prep, or when you have a competing offer. Never right after a company-wide setback or your manager is under pressure.' },
              { step: '04', title: 'Ask for a specific number', body: 'Don\'t say "I was hoping for something more." Say "Based on market data and my contributions, I\'m looking for a raise to $X." Vague requests get vague answers.' },
              { step: '05', title: 'Be ready to negotiate', body: 'They may counter lower. Know your walk-away number in advance. If they can\'t meet your salary ask, negotiate signing bonus, extra PTO, or remote flexibility.' },
            ].map(({ step, title, body }) => (
              <div key={step} style={{ display: 'flex', gap: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#cbd5e1', minWidth: 28, paddingTop: 2 }}>{step}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{title}</div>
                  <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>{body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="rc-section" style={{ padding: '80px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 40 }}>
            Raise calculator FAQ
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {[
              { q: 'How do I calculate a percentage raise?', a: 'Multiply your current salary by the raise percentage divided by 100. For example, a 5% raise on a $70,000 salary is $70,000 × 0.05 = $3,500. Your new salary would be $73,500.' },
              { q: 'What is the average raise increase per year?', a: 'The average annual raise in the US is 3–5%. However, top performers and employees who negotiate typically receive 5–10%. Employees who switch jobs typically see 10–20% salary increases.' },
              { q: 'How do I calculate my hourly raise?', a: 'Use our calculator above and select "Hourly wage." Enter your current hourly rate, hours per week, and your raise percentage or dollar amount. The calculator will show your new annual equivalent salary and how much more you\'ll earn each week.' },
              { q: 'Is a 10% raise good?', a: 'Yes — a 10% raise is well above average and typically requires either a promotion, a competing offer, or strong negotiation. The average raise is 3–5%. If you\'re asking for 10%, come prepared with market data and documented performance results.' },
              { q: 'How do I negotiate a raise?', a: 'Start with market research to know what your role pays in your city. Document specific achievements with numbers. Pick a good time — after a win or during review season. Ask for a specific number and be prepared to negotiate on base salary, bonus, or other benefits.' },
            ].map(({ q, a }) => (
              <div key={q} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 28 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{q}</div>
                <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.8 }}>{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO text */}
      <section className="rc-section" style={{ padding: '40px 40px 0', background: '#fff' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', fontSize: 13, color: '#94a3b8', lineHeight: 1.8 }}>
          <p>This free salary raise calculator — also called a pay raise calculator, salary increase calculator, or pay increase calculator — helps you quickly calculate your new annual salary after any raise. Whether you received a percentage raise or a flat dollar amount, enter your current salary and raise details above to see your updated pay, monthly increase, and weekly difference. Our annual raise calculator works for both salaried employees and hourly workers.</p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: '80px 40px', background: '#0f172a', textAlign: 'center' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: 16 }}>
            Now negotiate it with Sarah
          </h2>
          <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.7, marginBottom: 32 }}>
            You know your number. Sarah will give you the exact script to ask for it — personalized to your role, company, and situation.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', marginBottom: 32 }}>
            {['Personalized raise request script', 'Market rate benchmarking for your role', 'Objection handling if they push back', 'Counter-offer strategy'].map(f => (
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
            Try Free Today - No Credit Card Required <ArrowRight size={14} />
          </Link>
          <div style={{ fontSize: 12, color: '#475569', marginTop: 12 }}>Free to start · Cancel anytime.</div>
        </div>
      </section>

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How do I calculate a percentage raise?', acceptedAnswer: { '@type': 'Answer', text: 'Multiply your current salary by the raise percentage divided by 100. For example, a 5% raise on a $70,000 salary is $70,000 × 0.05 = $3,500. Your new salary would be $73,500.' } },
          { '@type': 'Question', name: 'What is the average raise increase per year?', acceptedAnswer: { '@type': 'Answer', text: 'The average annual raise in the US is 3–5%. Top performers and employees who negotiate typically receive 5–10%. Employees who switch jobs typically see 10–20% salary increases.' } },
          { '@type': 'Question', name: 'Is a 10% raise good?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — a 10% raise is well above average and typically requires either a promotion, a competing offer, or strong negotiation.' } },
        ],
      })}} />
    </>
  )
}
