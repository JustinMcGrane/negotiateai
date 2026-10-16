import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Salary Calculator — Find Your Market Rate | Hayven',
  description: 'Find out what your role pays. Enter your job title and location to see your 25th–90th percentile salary range, powered by real market data. Free.',
  alternates: { canonical: 'https://gethayven.com/salary-calculator' },
  openGraph: {
    title: 'Salary Calculator — Find Your Market Rate | Hayven',
    description: 'See what your role pays at the 25th through 90th percentile. Real market data, free.',
    url: 'https://gethayven.com/salary-calculator',
    type: 'website',
    images: [{ url: 'https://gethayven.com/opengraph-image', width: 1200, height: 630, alt: 'Hayven — Salary Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salary Calculator | Hayven',
    description: 'Find your market rate — 25th to 90th percentile salary data for your role and location.',
  },
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Hayven Salary Calculator',
  url: 'https://gethayven.com/salary-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Find out what your role pays. Get your 25th–90th percentile salary range for your job title and location.',
  datePublished: '2024-10-01',
  dateModified: '2025-10-16',
  publisher: {
    '@type': 'Organization',
    name: 'Hayven',
    url: 'https://gethayven.com',
    logo: { '@type': 'ImageObject', url: 'https://gethayven.com/logo.png' },
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I find out what my salary should be?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use Hayven\'s Compensation Analyzer to get your 25th through 90th percentile salary range for your exact job title, location, and experience level. Enter your role details to see real market data. You can also cross-reference Levels.fyi, LinkedIn Salary, and Glassdoor for your specific role.',
      },
    },
    {
      '@type': 'Question',
      name: 'What salary percentile should I negotiate to?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aim for the 75th percentile of market pay for your role, level, and location. The 50th percentile (median) is your floor — going below it means accepting below-average pay. Strong performers and employees who negotiate typically land in the 65th–85th percentile range.',
      },
    },
    {
      '@type': 'Question',
      name: 'Am I underpaid?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You\'re underpaid if your current salary is below the 50th percentile for your role, level, and location — or if it\'s below the market rate for your actual responsibilities and impact. Hayven\'s Compensation Analyzer will show you exactly where you fall in the market range and what you could realistically ask for.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert annual salary to hourly rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Divide your annual salary by 2,080 — the standard number of work hours per year (40 hours per week × 52 weeks). For example, a $75,000 annual salary equals approximately $36.06 per hour. If you work a different schedule, divide your annual salary by your actual annual hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much should I ask for in a raise?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ask for an amount that gets you to the 75th percentile of market pay for your role, level, and location. If you\'re currently below the median, that often means requesting 10–20%. If you\'re already at the median, aiming for the 75th percentile typically means a 5–12% ask. Your specific accomplishments and any new responsibilities you\'ve taken on can justify going higher.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much of a raise should I ask for as a percentage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A 10% raise gets your current salary to 110% of its current level. A 15% raise takes it to 115%. Use this formula: new salary = current salary × (1 + raise percentage / 100). The right percentage to ask for depends entirely on where your current salary sits relative to market rate for your role and location — not on what feels comfortable to ask.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gethayven.com' },
    { '@type': 'ListItem', position: 2, name: 'Salary Calculator', item: 'https://gethayven.com/salary-calculator' },
  ],
}

export default function SalaryCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Nav */}
      <header style={{
        background: '#fff', borderBottom: '1px solid #e5e7eb',
        padding: '0 32px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 18, color: '#0f172a', textDecoration: 'none' }}>Hayven</Link>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/login" style={{ fontSize: 14, color: '#64748b', textDecoration: 'none' }}>Sign in</Link>
          <Link href="/signup" style={{ fontSize: 14, fontWeight: 700, background: '#0f172a', color: '#fff', padding: '8px 18px', borderRadius: 8, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
            Get started free <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', padding: '72px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#7AB8E8', letterSpacing: '0.1em', background: 'rgba(122,184,232,0.15)', padding: '4px 12px', borderRadius: 20 }}>
            SALARY CALCULATOR
          </span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.03em', margin: '20px 0 20px' }}>
            What should you be earning?
          </h1>
          <p style={{ fontSize: 17, color: '#94a3b8', lineHeight: 1.75, maxWidth: 580, margin: '0 auto 36px' }}>
            Get your market salary range — 25th through 90th percentile — for your role, experience level, and location. Powered by real market data. Free with a Hayven account.
          </p>
          <Link href="/signup" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#2563eb', color: '#fff',
            padding: '14px 28px', borderRadius: 9,
            fontSize: 15, fontWeight: 700, textDecoration: 'none',
          }}>
            Check your market rate free <ArrowRight size={15} />
          </Link>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 12 }}>No credit card required</p>
        </div>
      </section>

      {/* Main content */}
      <main style={{ maxWidth: 780, margin: '0 auto', padding: '64px 24px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a' }}>

        {/* What it does */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
            What the salary calculator shows you
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 24 }}>
            Hayven&apos;s Compensation Analyzer is Hayven&apos;s built-in salary calculator. Enter your role, experience, location, company size, and industry to see:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14, marginBottom: 32 }}>
            {[
              { label: '25th percentile', desc: 'The floor of the market range. Earning less than this means you\'re in the bottom quarter of pay for your role.' },
              { label: '50th percentile (median)', desc: 'The midpoint of market pay. This is your minimum target in any negotiation.' },
              { label: '75th percentile', desc: 'The target range for experienced performers. This is what you should be asking for in a salary negotiation.' },
              { label: '90th percentile', desc: 'Top-of-market pay. Achievable with strong performance, specialized skills, or in high-paying markets.' },
              { label: 'AI insight', desc: 'A one-paragraph analysis of the market dynamics for your specific role and location.' },
              { label: 'Negotiation tip', desc: 'A specific recommendation for how to approach your negotiation given the market conditions.' },
            ].map(({ label, desc }) => (
              <div key={label} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '18px 20px' }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{label}</p>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: '20px 24px', marginBottom: 0 }}>
            <p style={{ fontSize: 14, color: '#1e40af', lineHeight: 1.7, margin: 0 }}>
              <strong>How to access:</strong> Sign up for a free Hayven account and use the Compensation Analyzer. It&apos;s free to run your first analysis. The data is AI-generated and reflects market benchmarks for your specific inputs — not hardcoded averages.
            </p>
          </div>
        </section>

        {/* How to use salary data */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
            How to use your salary data
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 16 }}>
            Once you know your market range, here&apos;s how to use it:
          </p>
          <ol style={{ paddingLeft: 24, marginBottom: 40 }}>
            {[
              { label: 'Identify your position in the range', desc: 'If you\'re below the 50th percentile, you have a clear market-data argument for a raise or to counter a low offer. If you\'re at the 75th+, your argument needs to focus on scope, impact, and accomplishments.' },
              { label: 'Set your target ask', desc: 'Your ask should be at or above the 75th percentile. If you\'re already there, argue for the 90th based on specific accomplishments and scope.' },
              { label: 'Cross-reference multiple sources', desc: 'Use Hayven alongside Levels.fyi, LinkedIn Salary, and Glassdoor. Consistency across sources strengthens your case. Outliers may reflect outdated data or different role definitions.' },
              { label: 'Present the data professionally', desc: 'In your negotiation, you\'re not saying "some website says I\'m worth $X." You\'re saying "I\'ve researched market rates across multiple sources and for this role, level, and location, the 75th percentile is $X." Cite the data type (market median, 75th percentile) not the tool name.' },
            ].map(({ label, desc }, i) => (
              <li key={i} style={{ fontSize: 16, color: '#334155', marginBottom: 20, lineHeight: 1.7 }}>
                <strong>{label}</strong> — {desc}
              </li>
            ))}
          </ol>
        </section>

        {/* Additional salary resources */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Salary research sources to use alongside Hayven
          </h2>
          <div style={{ marginBottom: 40 }}>
            {[
              { name: 'Levels.fyi', desc: 'Best source for tech roles at established companies. Shows total compensation (base + bonus + equity) broken down by company and level.', url: 'https://levels.fyi' },
              { name: 'LinkedIn Salary', desc: 'Good broad coverage across industries. Filter by job title, location, and years of experience.', url: 'https://linkedin.com/salary' },
              { name: 'Glassdoor', desc: 'Useful for company-specific compensation data. Best used to verify ranges for a specific employer.', url: 'https://glassdoor.com' },
              { name: 'Bureau of Labor Statistics (BLS)', desc: 'Free government data. Most useful for occupational median wages and broad industry benchmarks.', url: 'https://bls.gov/oes/' },
            ].map(({ name, desc, url }) => (
              <div key={name} style={{ display: 'flex', gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2563eb', flexShrink: 0, marginTop: 8 }} />
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>
                    <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>{name}</a>
                  </p>
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Raise percentage calculator */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Raise percentage calculator
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 20 }}>
            To calculate your new salary after a raise, multiply your current salary by (1 + raise percentage ÷ 100):
          </p>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <p style={{ fontSize: 15, color: '#0f172a', fontWeight: 700, marginBottom: 12 }}>New salary = Current salary × (1 + raise % ÷ 100)</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
              {[
                { raise: '5%', example: '$80,000 → $84,000' },
                { raise: '10%', example: '$80,000 → $88,000' },
                { raise: '15%', example: '$80,000 → $92,000' },
                { raise: '20%', example: '$80,000 → $96,000' },
              ].map(({ raise, example }) => (
                <div key={raise} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '12px 16px' }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#2563eb', marginBottom: 4 }}>{raise} raise</p>
                  <p style={{ fontSize: 13, color: '#334155', margin: 0 }}>{example}</p>
                </div>
              ))}
            </div>
          </div>
          <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7 }}>
            These examples use a $80,000 starting salary. Apply the same formula to your own number. A 10% raise on $120,000 = $132,000. A 15% raise on $65,000 = $74,750. If you want to know what percentage raise you need to reach a specific target salary, use: raise % = (target salary ÷ current salary − 1) × 100.
          </p>
          <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7, marginTop: 12 }}>
            Once you know your target number, read our guide on{' '}
            <Link href="/how-to-ask-for-a-raise" style={{ color: '#2563eb', textDecoration: 'none' }}>how to ask for a raise</Link>
            {' '}to learn how to make the case for it.
          </p>
        </section>

        {/* Annual to hourly converter */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Annual salary to hourly rate converter
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 20 }}>
            To convert an annual salary to an hourly rate, divide by 2,080 — the number of work hours in a standard year (40 hours × 52 weeks):
          </p>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <p style={{ fontSize: 15, color: '#0f172a', fontWeight: 700, marginBottom: 12 }}>Hourly rate = Annual salary ÷ 2,080</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
              {[
                { annual: '$50,000/yr', hourly: '≈ $24.04/hr' },
                { annual: '$75,000/yr', hourly: '≈ $36.06/hr' },
                { annual: '$100,000/yr', hourly: '≈ $48.08/hr' },
                { annual: '$150,000/yr', hourly: '≈ $72.12/hr' },
                { annual: '$200,000/yr', hourly: '≈ $96.15/hr' },
                { annual: '$250,000/yr', hourly: '≈ $120.19/hr' },
              ].map(({ annual, hourly }) => (
                <div key={annual} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '12px 16px' }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{annual}</p>
                  <p style={{ fontSize: 13, color: '#334155', margin: 0 }}>{hourly}</p>
                </div>
              ))}
            </div>
          </div>
          <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7 }}>
            This conversion is useful when comparing a full-time salary offer to a contracting or hourly rate. Note that hourly contractors typically do not receive benefits (health insurance, 401k match, PTO), so a contractor rate needs to be 25–40% higher than the equivalent salaried hourly rate to be comparable.
          </p>
        </section>

        {/* How much should I ask for */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
            How much should I ask for?
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 20 }}>
            The right number to ask for in a salary negotiation depends on where your current pay sits relative to market. Here is how to determine your ask:
          </p>
          <ol style={{ paddingLeft: 24, marginBottom: 24 }}>
            {[
              { label: 'Find your market range', desc: 'Run a compensation analysis for your role, level, and location. You need both the 50th percentile (your floor) and the 75th percentile (your target ask).' },
              { label: 'Compare your current salary', desc: 'If you are below the 50th percentile, any ask up to the 75th percentile is well-supported. If you are at the median, target the 75th. If you are already at the 75th, you need strong accomplishments to justify the 90th.' },
              { label: 'Factor in your accomplishments', desc: 'Strong, specific, quantified wins from the past year — revenue generated, costs reduced, team impact — support a higher ask. The market rate sets a floor; your performance justifies going above it.' },
              { label: 'Name a specific number', desc: 'Pick one number, not a range. Ranges give the other side an anchor at the low end. Your number should be your real target, not a high number you expect to be negotiated down from.' },
            ].map(({ label, desc }, i) => (
              <li key={i} style={{ fontSize: 16, color: '#334155', marginBottom: 16, lineHeight: 1.7 }}>
                <strong>{label}</strong> — {desc}
              </li>
            ))}
          </ol>
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: '18px 22px' }}>
            <p style={{ fontSize: 14, color: '#1e40af', lineHeight: 1.7, margin: 0 }}>
              Ready to find out your number? Use{' '}
              <Link href="/salary-negotiation" style={{ color: '#1e40af' }}>our salary negotiation guide</Link>
              {' '}for step-by-step instructions, or{' '}
              <Link href="/how-to-ask-for-a-raise" style={{ color: '#1e40af' }}>the raise guide</Link>
              {' '}if you are negotiating with your current employer.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 24 }}>
            Salary calculator FAQ
          </h2>
          {[
            {
              q: 'Am I underpaid?',
              a: 'You\'re underpaid if your salary is below the 50th percentile for your role, level, and location. Use Hayven\'s Compensation Analyzer to see your market range and find out exactly where you stand.',
            },
            {
              q: 'How much of a raise should I ask for?',
              a: 'Ask for an amount that gets you to the 75th percentile of market pay for your role. If you\'re below median, that often means a 10–20% increase. If you\'re at median, asking for the 75th percentile is a reasonable target. Your specific accomplishments and scope growth can justify going higher.',
            },
            {
              q: 'Does location affect salary?',
              a: 'Yes, significantly. Salaries for the same role vary dramatically by city and metro area. San Francisco, Seattle, and New York typically pay 30–50% more than the US average for tech roles. Always use location-specific data when building your market rate argument.',
            },
            {
              q: 'How accurate is AI-generated salary data?',
              a: 'AI-generated salary data reflects market benchmarks based on training data and is useful as a starting reference. For maximum accuracy, cross-reference Hayven\'s numbers with Levels.fyi, LinkedIn Salary, and Glassdoor — especially for niche roles or less common locations. Use the combined picture to build a credible market rate argument.',
            },
            {
              q: 'How do I convert annual salary to hourly rate?',
              a: 'Divide your annual salary by 2,080 — the standard number of work hours per year (40 hours per week × 52 weeks). A $75,000 annual salary equals approximately $36.06 per hour. If you work a non-standard schedule, divide by your actual annual hours.',
            },
            {
              q: 'How much should I ask for in a raise?',
              a: 'Ask for a number that gets you to the 75th percentile for your role, level, and location. If you\'re below the 50th percentile, that often means requesting 10–20%. If you\'re at the median, targeting the 75th percentile typically means a 5–12% ask. Your accomplishments and any new responsibilities can justify going higher.',
            },
          ].map(({ q, a }) => (
            <div key={q} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #f1f5f9' }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{q}</p>
              <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.8, margin: 0 }}>{a}</p>
            </div>
          ))}
        </section>

        {/* Related links */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Related guides</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link href="/salary-negotiation" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>
              → How to negotiate salary using market data
            </Link>
            <Link href="/how-to-ask-for-a-raise" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>
              → How to ask for a raise
            </Link>
            <Link href="/compensation-analyzer" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>
              → Compensation Analyzer tool
            </Link>
            <Link href="/ai-career-coach" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>
              → AI career coach — Sarah
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: 16, padding: '40px 36px', textAlign: 'center',
        }}>
          <p style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 12, letterSpacing: '-0.02em' }}>
            Find out what you should be earning
          </p>
          <p style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.7, marginBottom: 28 }}>
            Sign up free and run your first salary analysis in minutes. Get your market range and a personalized strategy for asking for more.
          </p>
          <Link href="/signup" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#2563eb', color: '#fff',
            padding: '13px 26px', borderRadius: 9,
            fontSize: 15, fontWeight: 800, textDecoration: 'none',
          }}>
            Check my market rate free <ArrowRight size={15} />
          </Link>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 12 }}>No credit card required</p>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '32px 24px' }}>
        <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/" style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', textDecoration: 'none' }}>Hayven</Link>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <Link href="/salary-negotiation" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>Salary Negotiation</Link>
            <Link href="/how-to-ask-for-a-raise" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>Ask for a Raise</Link>
            <Link href="/ai-career-coach" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>AI Career Coach</Link>
            <Link href="/raise-calculator" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>Raise Calculator</Link>
          </div>
          <p style={{ fontSize: 12, color: '#94a3b8', width: '100%', marginTop: 8 }}>
            © {new Date().getFullYear()} Hayven. Salary data is AI-generated and for informational purposes only.
          </p>
        </div>
      </footer>
    </>
  )
}
