'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import s from './raise-calculator.module.css'

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gethayven.com' },
    { '@type': 'ListItem', position: 2, name: 'Raise Calculator', item: 'https://gethayven.com/raise-calculator' },
  ],
}

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

  const schema = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Raise Calculator', url: 'https://gethayven.com/raise-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Windows, macOS, iOS, Android', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, description: 'Free salary raise calculator. Calculate your new salary after a percent or dollar raise.' }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Nav */}
      <header className={s.nav}>
        <Link href="/" className={s.navBrand}>Hayven</Link>
        <div className={s.navActions}>
          <Link href="/login" className={s.signIn}>Sign in</Link>
          <Link href="/signup" className={s.getStarted}>Get Started Free</Link>
        </div>
      </header>

      {/* Hero */}
      <section className={s.hero}>
        <div className={s.heroInner}>
          <div className={s.heroBadge}>FREE TOOL</div>
          <h1 className={s.heroTitle}>Pay Raise Calculator</h1>
          <p className={s.heroDesc}>
            Free salary increase calculator. Enter your current salary and raise percentage or dollar amount to instantly see your new salary, monthly increase, and weekly increase. Works as a pay increase calculator for both annual salary and hourly wage.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className={s.calcSection}>
        <div className={s.calcInner}>
          <div className={s.calcCard}>

            {/* Pay type toggle */}
            <div className={s.fieldGroup}>
              <label className={s.label}>Pay type</label>
              <div className={s.toggleRow}>
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
            <div className={s.fieldGroup}>
              <label className={s.label}>
                Current {payType === 'annual' ? 'annual salary' : 'hourly wage'}
              </label>
              <div className={s.inputWrap}>
                <span className={s.prefix}>$</span>
                <input
                  type="number"
                  value={currentSalary}
                  onChange={e => setCurrentSalary(e.target.value)}
                  placeholder={payType === 'annual' ? '75000' : '35'}
                  className={s.input}
                />
              </div>
            </div>

            {/* Hours per week (hourly only) */}
            {payType === 'hourly' && (
              <div className={s.fieldGroup}>
                <label className={s.label}>Hours per week</label>
                <input
                  type="number"
                  value={hoursPerWeek}
                  onChange={e => setHoursPerWeek(e.target.value)}
                  placeholder="40"
                  className={s.inputPlain}
                />
              </div>
            )}

            {/* Raise type toggle */}
            <div className={s.fieldGroup}>
              <label className={s.label}>Raise type</label>
              <div className={s.toggleRow}>
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
            <div className={s.fieldGroupLg}>
              <label className={s.label}>
                {raiseType === 'percent' ? 'Raise percentage' : 'Raise amount'}
              </label>
              <div className={s.inputWrap}>
                <span className={s.prefix}>{raiseType === 'percent' ? '%' : '$'}</span>
                <input
                  type="number"
                  value={raiseValue}
                  onChange={e => setRaiseValue(e.target.value)}
                  placeholder={raiseType === 'percent' ? '5' : '5000'}
                  className={s.input}
                />
              </div>
            </div>

            <button onClick={calculate} className={s.calcBtn}>
              Calculate my raise
            </button>

            {/* Results */}
            {result && (
              <div className={s.resultsDivider}>
                <div className={s.resultHighlight}>
                  <div className={s.resultHighlightLabel}>Your new salary</div>
                  <div className={s.resultHighlightValue}>{fmt(result.newSalary)}</div>
                  <div className={s.resultHighlightSub}>
                    +{result.raisePercent % 1 === 0 ? result.raisePercent.toFixed(0) : result.raisePercent.toFixed(1)}% raise · +{fmt(result.raiseAmount)}/year
                  </div>
                </div>
                <div className={s.resultsGrid}>
                  <div className={s.resultCard}>
                    <div className={s.resultCardLabel}>Monthly increase</div>
                    <div className={s.resultCardValue}>{fmtD(result.monthlyIncrease)}</div>
                  </div>
                  <div className={s.resultCard}>
                    <div className={s.resultCardLabel}>Weekly increase</div>
                    <div className={s.resultCardValue}>{fmtD(result.weeklyIncrease)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className={s.ctaBox}>
            <div>
              <div className={s.ctaBoxTitle}>Want to negotiate a bigger raise?</div>
              <div className={s.ctaBoxDesc}>Sarah will build you a personalized raise strategy and scripts.</div>
            </div>
            <Link href="/signup" className={s.ctaBoxBtn}>
              Get Started Free <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* What is a good raise */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <h2 className={s.sectionTitle}>What is a good raise percentage?</h2>
          <p className={s.sectionDesc}>
            The average raise in the US is <strong>3–5% per year</strong>, typically tied to cost-of-living adjustments. But average isn&apos;t the goal — here&apos;s how raises actually break down:
          </p>
          <div className={s.raiseGrid}>
            {[
              { range: '1–3%', label: 'Cost of living adjustment', desc: 'Keeps pace with inflation. Effectively flat in real terms.', color: '#ef4444' },
              { range: '3–5%', label: 'Standard merit raise', desc: 'Typical for solid performers. The baseline most employers offer.', color: '#f59e0b' },
              { range: '5–10%', label: 'Strong performance raise', desc: 'For top performers or after a promotion. Requires negotiation in most cases.', color: '#22c55e' },
              { range: '10–20%+', label: 'Significant raise or promotion', desc: 'Usually tied to a title change, new responsibilities, or a competing offer.', color: '#4A90D9' },
            ].map(({ range, label, desc, color }) => (
              <div key={range} className={s.raiseRow}>
                <div className={s.raiseRange} style={{ color }}>{range}</div>
                <div>
                  <div className={s.raiseLabel}>{label}</div>
                  <div className={s.raiseDesc}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <p className={s.sectionDescBottom}>
            If you have a competing offer, market data showing you&apos;re underpaid, or a track record of strong performance, you have leverage to ask for 10–20% or more. That&apos;s where negotiation — and tools like Hayven — make a real difference.
          </p>
        </div>
      </section>

      {/* How to ask for a raise */}
      <section className={s.sectionAlt}>
        <div className={s.sectionInner}>
          <h2 className={s.sectionTitle}>How to ask for a raise</h2>
          <p className={s.sectionDesc}>
            Knowing your number is step one. Getting it is step two. Here&apos;s what actually works:
          </p>
          <div className={s.stepList}>
            {[
              { step: '01', title: 'Know your market rate', body: 'Research what people in your role, city, and experience level are earning. If you\'re below market, that\'s your strongest argument — not your tenure.' },
              { step: '02', title: 'Document your impact', body: 'Managers approve raises for results, not effort. Write down specific wins: revenue generated, costs saved, projects delivered. Put numbers on everything.' },
              { step: '03', title: 'Pick the right moment', body: 'After a win, during annual review prep, or when you have a competing offer. Never right after a company-wide setback or your manager is under pressure.' },
              { step: '04', title: 'Ask for a specific number', body: 'Don\'t say "I was hoping for something more." Say "Based on market data and my contributions, I\'m looking for a raise to $X." Vague requests get vague answers.' },
              { step: '05', title: 'Be ready to negotiate', body: 'They may counter lower. Know your walk-away number in advance. If they can\'t meet your salary ask, negotiate signing bonus, extra PTO, or remote flexibility.' },
            ].map(({ step, title, body }) => (
              <div key={step} className={s.stepRow}>
                <div className={s.stepNum}>{step}</div>
                <div>
                  <div className={s.stepTitle}>{title}</div>
                  <div className={s.stepBody}>{body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <h2 className={s.faqTitle}>Raise calculator FAQ</h2>
          <div className={s.faqList}>
            {[
              { q: 'How do I calculate a percentage raise?', a: 'Multiply your current salary by the raise percentage divided by 100. For example, a 5% raise on a $70,000 salary is $70,000 × 0.05 = $3,500. Your new salary would be $73,500.' },
              { q: 'What is the average raise increase per year?', a: 'The average annual raise in the US is 3–5%. However, top performers and employees who negotiate typically receive 5–10%. Employees who switch jobs typically see 10–20% salary increases.' },
              { q: 'How do I calculate my hourly raise?', a: 'Use our calculator above and select "Hourly wage." Enter your current hourly rate, hours per week, and your raise percentage or dollar amount. The calculator will show your new annual equivalent salary and how much more you\'ll earn each week.' },
              { q: 'Is a 10% raise good?', a: 'Yes — a 10% raise is well above average and typically requires either a promotion, a competing offer, or strong negotiation. The average raise is 3–5%. If you\'re asking for 10%, come prepared with market data and documented performance results.' },
              { q: 'How do I negotiate a raise?', a: 'Start with market research to know what your role pays in your city. Document specific achievements with numbers. Pick a good time — after a win or during review season. Ask for a specific number and be prepared to negotiate on base salary, bonus, or other benefits.' },
            ].map(({ q, a }) => (
              <div key={q} className={s.faqItem}>
                <div className={s.faqQ}>{q}</div>
                <div className={s.faqA}>{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO text */}
      <section className={s.seoSection}>
        <p className={s.seoText}>This free salary raise calculator — also called a pay raise calculator, salary increase calculator, or pay increase calculator — helps you quickly calculate your new annual salary after any raise. Whether you received a percentage raise or a flat dollar amount, enter your current salary and raise details above to see your updated pay, monthly increase, and weekly difference. Our annual raise calculator works for both salaried employees and hourly workers.</p>
      </section>

      {/* Bottom CTA */}
      <section className={s.bottomCta}>
        <div className={s.bottomCtaInner}>
          <h2 className={s.bottomCtaTitle}>Now negotiate it with Sarah</h2>
          <p className={s.bottomCtaDesc}>
            You know your number. Sarah will give you the exact script to ask for it — personalized to your role, company, and situation.
          </p>
          <div className={s.featureList}>
            {['Personalized raise request script', 'Market rate benchmarking for your role', 'Objection handling if they push back', 'Counter-offer strategy'].map(f => (
              <div key={f} className={s.featureItem}>
                <CheckCircle size={15} color="#7AB8E8" />
                {f}
              </div>
            ))}
          </div>
          <Link href="/signup" className={s.bottomCtaBtn}>
            Get Started Free <ArrowRight size={14} />
          </Link>
          <div className={s.bottomCtaNote}>Free to start · Cancel anytime.</div>
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
