import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Salary Calculators: Know Your Worth, Calculate Your Raise | Hayven',
  description: 'Free salary calculators: raise calculator, salary-to-hourly converter, paycheck calculator, and equity calculator. Plus AI-powered market rate analysis with Sarah.',
  alternates: { canonical: 'https://gethayven.com/salary-calculator' },
  openGraph: {
    title: 'Salary Calculators: Know Your Worth, Calculate Your Raise | Hayven',
    description: 'Free salary calculators for raises, hourly rates, paychecks, and equity — plus AI market rate analysis.',
    url: 'https://gethayven.com/salary-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salary Calculators | Hayven',
    description: 'Raise calculator, salary-to-hourly, paycheck calculator, equity calculator — and AI market rate analysis.',
  },
}

const FAQ_ITEMS = [
  {
    q: 'How do I calculate my market rate salary?',
    a: 'Market rate is typically calculated by cross-referencing multiple sources — Glassdoor, LinkedIn Salary, Levels.fyi, and Payscale — filtered for your specific role, level, company size, and city. Hayven\'s Sarah AI coach does this automatically and tells you your exact market percentile.',
  },
  {
    q: 'How do I calculate what raise to ask for?',
    a: 'Start by finding your market rate (see above). Then compare it to your current salary. The gap between your current pay and the market median is your business case. Use the Raise Calculator to see exactly how much to ask for and what it means for your total earnings over time.',
  },
  {
    q: 'How do you convert a salary to an hourly rate?',
    a: 'To convert annual salary to hourly: divide your annual salary by 2,080 (52 weeks × 40 hours). A $104,000 salary = $50/hour. Use the Salary-to-Hourly Calculator for the full calculation including overtime and part-time hours.',
  },
  {
    q: 'How do I calculate my take-home pay?',
    a: 'Your take-home pay (net pay) is your gross salary minus federal and state income taxes, Social Security (6.2%), Medicare (1.45%), and any pre-tax deductions like 401k or health insurance. The exact amount depends on your tax bracket and deductions — use the Paycheck Calculator for an accurate estimate.',
  },
  {
    q: 'How do I calculate the value of equity (stock options or RSUs)?',
    a: 'For RSUs: current share price × number of vested units, minus taxes (typically 22–37% depending on your bracket). For stock options: (current price − strike price) × number of shares, minus taxes. The Equity Calculator walks you through the full calculation including vesting schedules and dilution assumptions.',
  },
  {
    q: 'What salary calculators does Hayven offer?',
    a: 'Hayven offers a Raise Calculator (how much to ask for and lifetime earnings impact), Salary-to-Hourly Calculator (annual ↔ hourly conversion), Paycheck Calculator (gross to net pay), and Equity Calculator (RSUs and stock options value). All are free to use.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Hayven Salary Calculators',
      url: 'https://gethayven.com/salary-calculator',
      description: 'A suite of free salary calculators — raise calculator, salary-to-hourly converter, paycheck calculator, and equity calculator.',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ],
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gethayven.com' },
    { '@type': 'ListItem', position: 2, name: 'Salary Calculator', item: 'https://gethayven.com/salary-calculator' },
  ],
}

const CALCULATORS = [
  {
    title: 'Raise Calculator',
    href: '/raise-calculator',
    badge: 'MOST POPULAR',
    badgeColor: '#ef4444',
    description: 'See exactly how much to ask for — and what getting it means for your lifetime earnings. Enter your current salary and role; get a market-backed target and a year-by-year projection.',
    features: ['Market rate comparison', 'Year-by-year earnings projection', 'Lifetime earnings impact', 'Raise percentage calculator'],
  },
  {
    title: 'Salary-to-Hourly Calculator',
    href: '/salary-to-hourly-calculator',
    badge: null,
    badgeColor: null,
    description: 'Convert any annual salary to an hourly rate, or any hourly rate to an annual salary. Accounts for full-time, part-time, and overtime hours.',
    features: ['Annual → hourly conversion', 'Hourly → annual conversion', 'Part-time and overtime options', 'Weekly and monthly breakdowns'],
  },
  {
    title: 'Paycheck Calculator',
    href: '/paycheck-calculator',
    badge: null,
    badgeColor: null,
    description: 'Calculate your actual take-home pay after federal and state taxes, Social Security, Medicare, and common pre-tax deductions like 401k and health insurance.',
    features: ['Federal and state tax estimates', 'Social Security and Medicare', '401k and pre-tax deduction support', 'Biweekly and monthly pay options'],
  },
  {
    title: 'Equity Calculator',
    href: '/equity-calculator',
    badge: null,
    badgeColor: null,
    description: 'Calculate the real value of your stock options or RSUs — including vesting schedules, dilution assumptions, and after-tax value.',
    features: ['RSU value calculator', 'Stock option (ISO/NSO) valuation', 'Vesting schedule modeling', 'After-tax equity value'],
  },
]

export default function SalaryCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div style={{ background: '#fff', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, Inter, sans-serif' }}>

        {/* Header */}
        <header style={{
          borderBottom: '0.5px solid #e5e7eb', padding: '0 32px', height: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, background: '#fff', zIndex: 50,
        }}>
          <Link href="/" style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', textDecoration: 'none', letterSpacing: '-0.02em' }}>Hayven</Link>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link href="/login" style={{ fontSize: 14, color: '#6b7280', textDecoration: 'none', padding: '7px 14px' }}>Sign in</Link>
            <Link href="/signup" style={{ fontSize: 14, fontWeight: 700, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', textDecoration: 'none', padding: '8px 18px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>Get Started Free <ArrowRight size={14} /></Link>
          </div>
        </header>

        {/* Hero */}
        <section style={{ maxWidth: 760, margin: '0 auto', padding: '72px 32px 80px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, color: '#4A90D9', background: '#EBF5FB', padding: '4px 14px', borderRadius: 20, letterSpacing: '0.08em', marginBottom: 24 }}>
            SALARY CALCULATORS
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: 24 }}>
            Salary Calculators: Know Your Worth, Calculate Your Raise
          </h1>
          <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, marginBottom: 40, maxWidth: 580, margin: '0 auto 40px' }}>
            Free salary calculators for every compensation question — from how much to ask for in your next raise to what your equity is actually worth. Or talk to Sarah for a personalized market rate analysis.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/raise-calculator" style={{
              height: 50, display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '0 28px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              color: '#fff',
              borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 3px 10px rgba(239,68,68,0.3)',
            }}>
              Raise Calculator <ArrowRight size={15} />
            </Link>
            <Link href="/sarah" style={{
              height: 50, display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '0 28px', background: '#1a4fa0', color: '#fff',
              borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none',
            }}>
              Get my market rate (AI)
            </Link>
          </div>
        </section>

        {/* Calculators */}
        <section style={{ background: '#f8fafc', padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 48, textAlign: 'center' }}>
              All Hayven salary calculators
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {CALCULATORS.map(({ title, href, badge, badgeColor, description, features }) => (
                <div key={href} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', margin: 0 }}>{title}</h3>
                    {badge && (
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: badgeColor ?? '#ef4444', padding: '2px 10px', borderRadius: 20, letterSpacing: '0.06em' }}>{badge}</span>
                    )}
                  </div>
                  <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.75, margin: 0 }}>{description}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 8 }}>
                    {features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#64748b' }}>
                        <span style={{ color: '#16a34a', fontWeight: 700 }}>✓</span> {f}
                      </div>
                    ))}
                  </div>
                  <Link href={href} style={{
                    alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: '#0f172a', color: '#fff', textDecoration: 'none',
                    padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 700,
                  }}>
                    Open Calculator <ArrowRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sarah CTA */}
        <section style={{ background: '#0f172a', padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: 20 }}>
              Need a personalized market rate analysis?
            </h2>
            <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.8, marginBottom: 20 }}>
              Our calculators give you the numbers — Sarah gives you the full picture. Tell her your role, level, company, and city, and she&apos;ll pull compensation data across thousands of data points to tell you your exact market percentile and what to do about the gap.
            </p>
            <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.8, marginBottom: 32 }}>
              She also builds your negotiation strategy, writes your counter-offer, and coaches you through the conversation — all in a single chat.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/sarah" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                color: '#fff',
                padding: '12px 24px', borderRadius: 9,
                fontSize: 14, fontWeight: 700, textDecoration: 'none',
                boxShadow: '0 3px 10px rgba(239,68,68,0.3)',
              }}>
                Talk to Sarah free <ArrowRight size={14} />
              </Link>
              <Link href="/salary-negotiation" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
                padding: '12px 24px', borderRadius: 9,
                fontSize: 14, fontWeight: 700, textDecoration: 'none',
              }}>
                Salary negotiation guide
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: '#f8fafc', padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 48, textAlign: 'center' }}>
              Frequently asked questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {FAQ_ITEMS.map(({ q, a }) => (
                <div key={q} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '24px 28px' }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{q}</div>
                  <div style={{ fontSize: 15, color: '#475569', lineHeight: 1.75 }}>{a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '80px 32px', textAlign: 'center' }}>
          <div style={{ maxWidth: 520, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 16 }}>
              Find out what you&apos;re really worth
            </h2>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, marginBottom: 36 }}>
              The calculators show you the numbers. Sarah tells you what to do about them.
            </p>
            <Link href="/signup" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              color: '#fff',
              padding: '15px 36px', borderRadius: 10,
              fontSize: 16, fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(239,68,68,0.35)',
            }}>
              Get Started Free <ArrowRight size={16} />
            </Link>
            <p style={{ marginTop: 14, fontSize: 13, color: '#94a3b8' }}>Free to start. Pro is $20/month. Cancel anytime.</p>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid #e2e8f0', padding: '32px', textAlign: 'center' }}>
          <Link href="/" style={{ fontSize: 13, color: '#94a3b8', textDecoration: 'none' }}>← Back to Hayven</Link>
        </footer>

      </div>
    </>
  )
}
