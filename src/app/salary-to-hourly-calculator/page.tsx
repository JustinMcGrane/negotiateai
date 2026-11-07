'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import s from './salary-to-hourly-calculator.module.css'

const COMMON_SALARIES = [50000, 60000, 70000, 75000, 80000, 90000, 100000, 110000, 120000, 130000, 150000, 175000, 200000]
const COMMON_HOURLY = [15, 16, 17, 18, 20, 22, 23, 25, 28, 30, 32, 35, 40, 45, 50, 60, 75, 100]

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gethayven.com' },
    { '@type': 'ListItem', position: 2, name: 'Salary to Hourly Calculator', item: 'https://gethayven.com/salary-to-hourly-calculator' },
  ],
}

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

  const schema = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Salary to Hourly Calculator', url: 'https://gethayven.com/salary-to-hourly-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Windows, macOS, iOS, Android', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, description: 'Free salary to hourly rate calculator. Convert annual salary to hourly, daily, weekly, and monthly pay.' }

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
          <h1 className={s.heroTitle}>Salary to Hourly Calculator</h1>
          <p className={s.heroDesc}>
            Convert any annual salary to an hourly rate instantly. See how much $100k a year is per hour, plus your daily, weekly, and monthly pay breakdown.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className={s.calcSection}>
        <div className={s.calcInner}>
          <div className={s.calcCard}>

            {/* Annual salary input */}
            <div className={s.fieldGroup}>
              <label className={s.label}>Annual salary</label>
              <div className={s.inputWrap}>
                <span className={s.prefix}>$</span>
                <input
                  type="number"
                  value={salary}
                  onChange={e => setSalary(e.target.value)}
                  placeholder="100000"
                  className={s.input}
                />
              </div>
            </div>

            {/* Quick select */}
            <div>
              <div className={s.quickLabel}>Quick select</div>
              <div className={s.quickBtns}>
                {COMMON_SALARIES.map(v => (
                  <button key={v} onClick={() => calculate(v)} style={{
                    padding: '5px 10px', borderRadius: 6, border: '1px solid #e2e8f0',
                    background: parseFloat(salary.replace(/,/g, '')) === v ? '#0f172a' : '#f8fafc',
                    color: parseFloat(salary.replace(/,/g, '')) === v ? '#fff' : '#64748b',
                    fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  }}>{fmtK(v)}</button>
                ))}
              </div>
            </div>

            {/* Hours/weeks inputs */}
            <div className={s.inputGrid}>
              <div>
                <label className={s.label}>Hours per week</label>
                <input
                  type="number"
                  value={hoursPerWeek}
                  onChange={e => setHoursPerWeek(e.target.value)}
                  className={s.inputPlain}
                />
              </div>
              <div>
                <label className={s.label}>Weeks per year</label>
                <input
                  type="number"
                  value={weeksPerYear}
                  onChange={e => setWeeksPerYear(e.target.value)}
                  className={s.inputPlain}
                />
              </div>
            </div>

            <button onClick={() => calculate()} className={s.calcBtn}>
              Calculate hourly rate
            </button>

            {/* Results */}
            {result && (
              <div className={s.resultsDivider}>
                <div className={s.resultHighlight}>
                  <div className={s.resultHighlightLabel}>{fmt(result.annual, 0)}/year is</div>
                  <div className={s.resultHighlightValue}>
                    {fmt(result.hourly)}<span className={s.resultHourSuffix}>/hr</span>
                  </div>
                </div>
                <div className={s.resultsGrid}>
                  {[
                    { label: 'Daily', value: fmt(result.daily) },
                    { label: 'Weekly', value: fmt(result.weekly, 0) },
                    { label: 'Monthly', value: fmt(result.monthly, 0) },
                  ].map(({ label, value }) => (
                    <div key={label} className={s.resultCard}>
                      <div className={s.resultCardLabel}>{label}</div>
                      <div className={s.resultCardValue}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className={s.ctaBox}>
            <div>
              <div className={s.ctaBoxTitle}>Is your salary actually fair?</div>
              <div className={s.ctaBoxDesc}>Sarah will benchmark your pay against your market in minutes.</div>
            </div>
            <Link href="/signup" className={s.ctaBoxBtn}>
              Get Started Free <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Common salary table */}
      <section className={s.tableSection}>
        <div className={s.tableInner}>
          <h2 className={s.sectionTitle}>Annual salary to hourly rate chart</h2>
          <p className={s.sectionDesc}>Based on 40 hours per week, 52 weeks per year.</p>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead className={s.thead}>
                <tr>
                  {['Annual Salary', 'Hourly Rate', 'Monthly', 'Weekly', 'Daily'].map(h => (
                    <th key={h} className={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMMON_SALARIES.map(v => {
                  const hourly = v / (40 * 52)
                  const monthly = v / 12
                  const weekly = v / 52
                  const daily = v / (52 * 5)
                  return (
                    <tr key={v} className={s.tr}>
                      <td className={s.tdBold}>{fmt(v, 0)}</td>
                      <td className={s.tdGreen}>{fmt(hourly)}/hr</td>
                      <td className={s.td}>{fmt(monthly, 0)}</td>
                      <td className={s.td}>{fmt(weekly, 0)}</td>
                      <td className={s.td}>{fmt(daily)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Hourly to annual table */}
      <section className={s.tableSectionAlt}>
        <div className={s.tableInner}>
          <h2 className={s.sectionTitle}>Hourly to annual salary chart</h2>
          <p className={s.sectionDesc}>Based on 40 hours per week, 52 weeks per year.</p>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead className={s.theadAlt}>
                <tr>
                  {['Hourly Rate', 'Annual Salary', 'Monthly', 'Weekly', 'Daily'].map(h => (
                    <th key={h} className={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMMON_HOURLY.map(h => {
                  const annual = h * 40 * 52
                  const monthly = annual / 12
                  const weekly = annual / 52
                  const daily = h * 8
                  return (
                    <tr key={h} className={s.tr}>
                      <td className={s.tdBold}>${h}/hr</td>
                      <td className={s.tdGreen}>{(annual).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}</td>
                      <td className={s.td}>{monthly.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}</td>
                      <td className={s.td}>{weekly.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}</td>
                      <td className={s.td}>{daily.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={s.faqSection}>
        <div className={s.faqInner}>
          <h2 className={s.faqTitle}>Salary to hourly FAQ</h2>
          <div className={s.faqList}>
            {[
              { q: '100k a year is how much an hour?', a: '$100,000 a year is $48.08 per hour, based on a standard 40-hour work week and 52 weeks per year. That works out to $8,333 per month, $1,923 per week, and $384.62 per day.' },
              { q: '120k a year is how much an hour?', a: '$120,000 a year is $57.69 per hour, based on 40 hours per week. Monthly that\'s $10,000, weekly $2,308, and daily $461.54.' },
              { q: 'How do I convert annual salary to hourly?', a: 'Divide your annual salary by the number of hours you work per year. For a standard 40-hour week: Annual salary ÷ 2,080 = hourly rate. For example, $75,000 ÷ 2,080 = $36.06/hour.' },
              { q: 'What is a good hourly rate?', a: 'The median hourly wage in the US is around $22–$24/hour ($45,000–$50,000 annually). A "good" hourly rate depends heavily on your role, experience, and location. In tech and finance, $50–$100+/hour is common for mid-to-senior roles.' },
              { q: 'How many hours a year is a full-time job?', a: 'A standard full-time job is 2,080 hours per year (40 hours/week × 52 weeks). If you take 2 weeks of vacation, that\'s 2,000 hours. Use 2,080 for the standard calculation.' },
              { q: '45 an hour is how much a year?', a: '$45 an hour is $93,600 per year based on a 40-hour work week and 52 weeks per year. That works out to $7,800 per month, $1,800 per week, and $360 per day.' },
              { q: '45000 a year is how much an hour?', a: '$45,000 a year is $21.63 per hour based on a standard 40-hour work week. Monthly that\'s $3,750, weekly $865, and daily $173.' },
            ].map(({ q, a }) => (
              <div key={q} className={s.faqItem}>
                <div className={s.faqQ}>{q}</div>
                <div className={s.faqA}>{a}</div>
              </div>
            ))}
          </div>
          <p className={s.faqNote}>
            This salary to hourly calculator converts any annual salary to an hourly wage. Whether you want to know how much $100k a year is hourly, how much $120k a year is per hour, or any other annual salary to hourly conversion, enter your salary above for an instant breakdown. Also works as an hourly to annual salary calculator — just use our raise calculator for the reverse.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className={s.bottomCta}>
        <div className={s.bottomCtaInner}>
          <h2 className={s.bottomCtaTitle}>Find out if your salary is fair</h2>
          <p className={s.bottomCtaDesc}>
            Knowing your hourly rate is one thing. Knowing if you&apos;re being underpaid is another. Sarah will benchmark your salary against your market and tell you exactly what to do about it.
          </p>
          <div className={s.featureList}>
            {['Market rate benchmarking for your role and city', 'Personalized negotiation strategy', 'Scripts to ask for more money', 'Offer and counter-offer analysis'].map(f => (
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
