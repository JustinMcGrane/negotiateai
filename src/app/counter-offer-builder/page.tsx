import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Counter Offer Letter Builder — Write a Winning Counter Offer | Hayven',
  description: 'Build a professional counter offer letter in minutes. Our AI counter offer builder helps you negotiate confidently with the right words, tone, and strategy.',
  alternates: { canonical: 'https://gethayven.com/counter-offer-builder' },
  openGraph: {
    title: 'Counter Offer Letter Builder | Hayven',
    description: 'Build a professional counter offer letter in minutes with AI.',
    url: 'https://gethayven.com/counter-offer-builder',
  },
  twitter: { card: 'summary_large_image', title: 'Counter Offer Letter Builder | Hayven', description: 'Build a professional counter offer letter in minutes with AI.' },
}

const features = [
  { title: 'Professional tone', desc: 'Confident without being aggressive — the exact tone that gets results.' },
  { title: 'Data-backed asks', desc: 'Back your counter with real market data so your request feels justified.' },
  { title: 'Multiple scenarios', desc: 'Counter on base salary, equity, signing bonus, PTO, and more.' },
  { title: 'Email-ready output', desc: 'Copy and paste directly into your email — no editing needed.' },
]

const steps = [
  { n: '1', title: 'Enter your offer details', desc: 'Paste in the offer you received — salary, equity, start date, and any other terms.' },
  { n: '2', title: 'Tell us your target', desc: 'What do you want? More base? Equity? A signing bonus? We\'ll build your case.' },
  { n: '3', title: 'Get your counter offer letter', desc: 'Receive a polished, professional letter you can send within minutes.' },
]

export default function CounterOfferBuilderPage() {
  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #EBF5FB 0%, #f0f9ff 100%)', padding: '72px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#4A90D9', background: '#dbeafe', padding: '4px 12px', borderRadius: 20, letterSpacing: '0.06em' }}>COUNTER OFFER BUILDER</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', margin: '20px 0 20px' }}>
            Write a counter offer that gets you more money
          </h1>
          <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.7, marginBottom: 36, maxWidth: 560, margin: '0 auto 36px' }}>
            Most people accept the first offer. The ones who counter earn $5,000–$20,000 more — and Hayven helps you do it in minutes, professionally.
          </p>
          <Link href="/signup" style={{
            display: 'inline-block', background: '#2D6EA8', color: '#fff',
            padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700,
            textDecoration: 'none', boxShadow: '0 4px 14px rgba(45,110,168,0.3)',
          }}>
            Build My Counter Offer — Free
          </Link>
          <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 12 }}>No credit card required</p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#fff', padding: '48px 24px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 64, flexWrap: 'wrap', textAlign: 'center' }}>
          {[{ v: '85%', l: 'of people who counter get more' }, { v: '$11K', l: 'average increase from countering' }, { v: '3 min', l: 'to build your counter offer' }].map(s => (
            <div key={s.l}>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#2D6EA8' }}>{s.v}</div>
              <div style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '72px 24px', maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48 }}>How it works</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {steps.map(s => (
            <div key={s.n} style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#EBF5FB', color: '#2D6EA8', fontWeight: 800, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.n}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{s.title}</div>
                <div style={{ color: '#475569', lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ background: '#f8fafc', padding: '72px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48 }}>What makes a great counter offer</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {features.map(f => (
              <div key={f.title} style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{f.title}</div>
                <div style={{ color: '#475569', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Article content for SEO */}
      <section style={{ padding: '72px 24px', maxWidth: 740, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24 }}>How to write a counter offer letter</h2>
        <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
          <p style={{ marginBottom: 20 }}>A counter offer letter is your formal response to a job offer — it states that you're interested in the role, but you'd like to negotiate the terms. Done right, it's one of the highest-leverage moves in your career. Done poorly, it can feel awkward or cost you the offer.</p>
          <p style={{ marginBottom: 20 }}>The most effective counter offer letters share a few things in common: they express genuine enthusiasm for the role, they anchor to market data rather than personal need, and they make a specific ask rather than a vague request for "more."</p>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: '32px 0 12px' }}>What to include in your counter offer</h3>
          <ul style={{ paddingLeft: 24, marginBottom: 20 }}>
            <li style={{ marginBottom: 12 }}><strong>A clear statement of interest</strong> — Confirm you want the job. This reduces the risk of the employer withdrawing.</li>
            <li style={{ marginBottom: 12 }}><strong>Your specific ask</strong> — Name the number. "I was hoping for $95,000" is better than "I was hoping for a bit more."</li>
            <li style={{ marginBottom: 12 }}><strong>Market justification</strong> — Reference salary data: "Based on market data for this role in [city], the range is $90K–$105K."</li>
            <li style={{ marginBottom: 12 }}><strong>Your value prop</strong> — Briefly restate what you bring to the table.</li>
            <li style={{ marginBottom: 12 }}><strong>An open door</strong> — Signal that you're flexible and want to find a solution that works for both sides.</li>
          </ul>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: '32px 0 12px' }}>When to counter vs. accept</h3>
          <p style={{ marginBottom: 20 }}>Counter when the offer is below market, below your expectations, or when you have competing offers. Accept when the offer is already at or above market and negotiating would risk goodwill on a relationship that matters. When in doubt, counter — the worst realistic outcome is they say no and hold the offer.</p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#EBF5FB', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Ready to counter?</h2>
        <p style={{ fontSize: 18, color: '#475569', marginBottom: 32 }}>Build your counter offer letter in minutes — free to start.</p>
        <Link href="/signup" style={{
          display: 'inline-block', background: '#2D6EA8', color: '#fff',
          padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700,
          textDecoration: 'none',
        }}>
          Build My Counter Offer — Free
        </Link>
      </section>
    </main>
  )
}
