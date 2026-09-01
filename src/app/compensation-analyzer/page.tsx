import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Compensation Analyzer — Is Your Salary Fair? Find Out Now | Hayven',
  description: 'Analyze your compensation against real market data. Find out if you\'re underpaid, what you should be earning, and exactly how to ask for more.',
  alternates: { canonical: 'https://gethayven.com/compensation-analyzer' },
  openGraph: {
    title: 'Compensation Analyzer | Hayven',
    description: 'Find out if you\'re underpaid and what you should be earning.',
    url: 'https://gethayven.com/compensation-analyzer',
  },
  twitter: { card: 'summary_large_image', title: 'Compensation Analyzer | Hayven', description: 'Find out if you\'re underpaid and what you should be earning.' },
}

const dataPoints = [
  { label: 'Job title & level', desc: 'Senior vs. Staff vs. Principal — level matters as much as title.' },
  { label: 'Location', desc: 'Compensation varies dramatically by city and metro area.' },
  { label: 'Industry & company size', desc: 'FAANG pays differently than a Series A startup.' },
  { label: 'Years of experience', desc: 'We map your experience to market ranges accurately.' },
  { label: 'Skills & specialization', desc: 'Certain skills command a premium — we account for yours.' },
]

export default function CompensationAnalyzerPage() {
  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a' }}>
      <section style={{ background: 'linear-gradient(135deg, #EBF5FB 0%, #f0f9ff 100%)', padding: '72px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#4A90D9', background: '#dbeafe', padding: '4px 12px', borderRadius: 20, letterSpacing: '0.06em' }}>COMPENSATION ANALYZER</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', margin: '20px 0 20px' }}>
            Are you being paid what you're worth?
          </h1>
          <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.7, marginBottom: 36, maxWidth: 560, margin: '0 auto 36px' }}>
            Most people have no idea if their salary is fair. Hayven analyzes your compensation against real market data — so you know exactly where you stand and what to do about it.
          </p>
          <Link href="/signup" style={{
            display: 'inline-block', background: '#2D6EA8', color: '#fff',
            padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700,
            textDecoration: 'none', boxShadow: '0 4px 14px rgba(45,110,168,0.3)',
          }}>
            Analyze My Compensation — Free
          </Link>
          <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 12 }}>No credit card required</p>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '48px 24px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 64, flexWrap: 'wrap', textAlign: 'center' }}>
          {[{ v: '$27K', l: 'average salary increase after negotiating' }, { v: '60%', l: 'of professionals are underpaid vs. market' }, { v: '5 min', l: 'to get your full compensation analysis' }].map(s => (
            <div key={s.l}>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#2D6EA8' }}>{s.v}</div>
              <div style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '72px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48 }}>What we look at</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {dataPoints.map(d => (
              <div key={d.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: '#fff', borderRadius: 10, padding: '20px 24px', border: '1px solid #e2e8f0' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2D6EA8', marginTop: 8, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{d.label}</div>
                  <div style={{ color: '#475569', fontSize: 14, lineHeight: 1.6 }}>{d.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 24px', maxWidth: 740, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24 }}>Why knowing your market value matters</h2>
        <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
          <p style={{ marginBottom: 20 }}>Compensation is set by negotiation, not by what you deserve. Companies offer what they think they can get away with — and without market data, you have no leverage to push back. Knowing your market rate changes everything: it gives you a specific, defensible number to anchor your negotiations, and it removes the awkwardness of asking for "more" without justification.</p>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: '32px 0 12px' }}>The compounding cost of being underpaid</h3>
          <p style={{ marginBottom: 20 }}>If you're earning $10,000 below market today, that gap doesn't stay at $10,000. Future raises are typically percentages of your current salary — so being underpaid now means you'll likely be underpaid next year too. Over a 10-year career, a $10K gap can compound into $200,000 or more in lost earnings.</p>
        </div>
      </section>

      <section style={{ background: '#EBF5FB', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Find out where you really stand</h2>
        <p style={{ fontSize: 18, color: '#475569', marginBottom: 32 }}>Get your full compensation analysis in minutes — free to start.</p>
        <Link href="/signup" style={{
          display: 'inline-block', background: '#2D6EA8', color: '#fff',
          padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700,
          textDecoration: 'none',
        }}>
          Analyze My Compensation — Free
        </Link>
      </section>
    </main>
  )
}
