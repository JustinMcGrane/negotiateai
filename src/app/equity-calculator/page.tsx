import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Startup Equity Calculator — What Is Your Equity Actually Worth? | Hayven',
  description: 'Calculate the real value of your startup equity. Our equity calculator factors in dilution, exit scenarios, and vesting to show you what your options are actually worth.',
  alternates: { canonical: 'https://gethayven.com/equity-calculator' },
  openGraph: {
    title: 'Startup Equity Calculator | Hayven',
    description: 'Calculate the real value of your startup equity with dilution and exit scenarios.',
    url: 'https://gethayven.com/equity-calculator',
  },
  twitter: { card: 'summary_large_image', title: 'Startup Equity Calculator | Hayven', description: 'Calculate the real value of your startup equity.' },
}

const inputs = [
  { label: 'Number of options/shares', desc: 'How many shares or options you\'re being granted.' },
  { label: 'Strike price', desc: 'The price you\'d pay to exercise your options.' },
  { label: 'Latest valuation / last round price', desc: 'Used to estimate current paper value.' },
  { label: 'Expected exit multiple', desc: 'What you think the company could be worth at exit (1x, 5x, 10x, etc).' },
  { label: 'Dilution estimate', desc: 'Future funding rounds will dilute your stake — we factor this in.' },
]

export default function EquityCalculatorPage() {
  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #EBF5FB 0%, #f0f9ff 100%)', padding: '72px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#4A90D9', background: '#dbeafe', padding: '4px 12px', borderRadius: 20, letterSpacing: '0.06em' }}>EQUITY CALCULATOR</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', margin: '20px 0 20px' }}>
            What is your startup equity actually worth?
          </h1>
          <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.7, marginBottom: 36, maxWidth: 560, margin: '0 auto 36px' }}>
            Most equity offers look great on paper. Our calculator cuts through the hype — factoring in dilution, vesting, strike price, and realistic exit scenarios to give you the real number.
          </p>
          <Link href="/signup" style={{
            display: 'inline-block', background: '#2D6EA8', color: '#fff',
            padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700,
            textDecoration: 'none', boxShadow: '0 4px 14px rgba(45,110,168,0.3)',
          }}>
            Calculate My Equity — Free
          </Link>
          <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 12 }}>No credit card required</p>
        </div>
      </section>

      {/* What we calculate */}
      <section style={{ padding: '72px 24px', maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48 }}>What goes into the calculation</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {inputs.map(i => (
            <div key={i.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: '#f8fafc', borderRadius: 10, padding: '20px 24px', border: '1px solid #e2e8f0' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2D6EA8', marginTop: 8, flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{i.label}</div>
                <div style={{ color: '#475569', fontSize: 14, lineHeight: 1.6 }}>{i.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Article content */}
      <section style={{ padding: '48px 24px 72px', maxWidth: 740, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24 }}>Understanding startup equity</h2>
        <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
          <p style={{ marginBottom: 20 }}>Equity compensation is one of the most misunderstood parts of a job offer. A grant of 10,000 shares sounds impressive — but without context, it means nothing. What matters is your percentage of the company, the current valuation, expected dilution, and what a realistic exit looks like.</p>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: '32px 0 12px' }}>ISOs vs RSUs vs Options</h3>
          <p style={{ marginBottom: 20 }}>Incentive Stock Options (ISOs) let you buy shares at a set price. RSUs (Restricted Stock Units) are granted outright and vest over time. NSOs (Non-Qualified Stock Options) are similar to ISOs but with different tax treatment. Each has different tax implications at vesting, exercise, and sale — our calculator accounts for these differences.</p>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: '32px 0 12px' }}>The dilution problem</h3>
          <p style={{ marginBottom: 20 }}>Every time a startup raises a new funding round, existing shareholders get diluted. A 1% stake today could be 0.3% by the time the company exits — if it ever does. Most equity calculators ignore this. Ours factors in realistic dilution so you see what you're likely to end up with, not just what you start with.</p>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: '32px 0 12px' }}>How to negotiate equity</h3>
          <p style={{ marginBottom: 20 }}>Equity is negotiable just like salary. If the cash is below market, push for more equity. If the equity percentage seems low, ask what the total shares outstanding are. Always ask about the most recent 409A valuation and the liquidation preferences — they determine whether common shareholders (you) get anything in a modest exit.</p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#EBF5FB', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Know what you're really getting</h2>
        <p style={{ fontSize: 18, color: '#475569', marginBottom: 32 }}>Run your equity through our calculator before you sign anything.</p>
        <Link href="/signup" style={{
          display: 'inline-block', background: '#2D6EA8', color: '#fff',
          padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700,
          textDecoration: 'none',
        }}>
          Calculate My Equity — Free
        </Link>
      </section>
    </main>
  )
}
