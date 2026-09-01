import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Job Offer Evaluator — Should You Accept, Negotiate, or Walk Away? | Hayven',
  description: 'Evaluate any job offer in minutes. Our AI offer evaluator analyzes salary, equity, benefits, and growth to tell you exactly what to negotiate and what to accept.',
  alternates: { canonical: 'https://gethayven.com/offer-evaluator' },
  openGraph: {
    title: 'Job Offer Evaluator | Hayven',
    description: 'Analyze your job offer and know exactly what to negotiate.',
    url: 'https://gethayven.com/offer-evaluator',
  },
  twitter: { card: 'summary_large_image', title: 'Job Offer Evaluator | Hayven', description: 'Analyze your job offer and know exactly what to negotiate.' },
}

const dimensions = [
  { title: 'Base salary vs. market', desc: 'Is the offer above, at, or below market for your role, level, and location?' },
  { title: 'Equity value', desc: 'What are the options or RSUs realistically worth after dilution and vesting?' },
  { title: 'Total compensation', desc: 'Salary + bonus + equity + benefits combined into one comparable number.' },
  { title: 'Benefits & perks', desc: 'Health insurance quality, 401k match, PTO, remote flexibility — all scored.' },
  { title: 'Growth trajectory', desc: 'Is this a step forward in your career, or a lateral move dressed up as a promotion?' },
  { title: 'Negotiation potential', desc: 'Which terms are most likely to move, and by how much?' },
]

export default function OfferEvaluatorPage() {
  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #EBF5FB 0%, #f0f9ff 100%)', padding: '72px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#4A90D9', background: '#dbeafe', padding: '4px 12px', borderRadius: 20, letterSpacing: '0.06em' }}>OFFER EVALUATOR</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', margin: '20px 0 20px' }}>
            Should you accept, negotiate, or walk away?
          </h1>
          <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.7, marginBottom: 36, maxWidth: 560, margin: '0 auto 36px' }}>
            A job offer is more than a number. Hayven evaluates every dimension — salary, equity, benefits, and growth — and tells you exactly what's worth negotiating and what to leave alone.
          </p>
          <Link href="/signup" style={{
            display: 'inline-block', background: '#2D6EA8', color: '#fff',
            padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700,
            textDecoration: 'none', boxShadow: '0 4px 14px rgba(45,110,168,0.3)',
          }}>
            Evaluate My Offer — Free
          </Link>
          <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 12 }}>No credit card required</p>
        </div>
      </section>

      {/* What we evaluate */}
      <section style={{ padding: '72px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48 }}>What we evaluate</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {dimensions.map(d => (
              <div key={d.title} style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{d.title}</div>
                <div style={{ color: '#475569', fontSize: 14, lineHeight: 1.6 }}>{d.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Article */}
      <section style={{ padding: '72px 24px', maxWidth: 740, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24 }}>How to evaluate a job offer properly</h2>
        <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
          <p style={{ marginBottom: 20 }}>Most candidates evaluate job offers emotionally — excited about the company, worried about looking greedy, or just relieved to have an offer. That's how you end up underpaid. A proper offer evaluation is systematic: you compare each component to market benchmarks, calculate total compensation, and decide what to negotiate before responding.</p>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: '32px 0 12px' }}>Total compensation vs. base salary</h3>
          <p style={{ marginBottom: 20 }}>Base salary is what shows up in your bank account every two weeks, but it's rarely the whole story. A $120K base with a $20K bonus, 0.1% equity in a Series B company, and full health coverage could be worth far more than a $140K base with no bonus and no equity. Always evaluate total compensation.</p>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: '32px 0 12px' }}>The questions to ask before deciding</h3>
          <ul style={{ paddingLeft: 24, marginBottom: 20 }}>
            <li style={{ marginBottom: 10 }}>What is the typical salary range for this role at this company level?</li>
            <li style={{ marginBottom: 10 }}>How does this compare to what I'd earn at a peer company?</li>
            <li style={{ marginBottom: 10 }}>What is the equity worth in a realistic exit scenario?</li>
            <li style={{ marginBottom: 10 }}>What does career growth look like — when would I expect to be promoted?</li>
            <li style={{ marginBottom: 10 }}>Is there a signing bonus, and is it negotiable?</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#EBF5FB', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Don't sign without knowing what you have</h2>
        <p style={{ fontSize: 18, color: '#475569', marginBottom: 32 }}>Evaluate your offer before you respond — free to start.</p>
        <Link href="/signup" style={{
          display: 'inline-block', background: '#2D6EA8', color: '#fff',
          padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700,
          textDecoration: 'none',
        }}>
          Evaluate My Offer — Free
        </Link>
      </section>
    </main>
  )
}
