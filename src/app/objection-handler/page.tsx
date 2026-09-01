import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Salary Negotiation Objection Handler — Counter Every Pushback | Hayven',
  description: 'Handle any salary negotiation objection with confidence. Our AI objection handler gives you the exact words to respond when they say "that\'s above our budget" or "we can\'t go higher."',
  alternates: { canonical: 'https://gethayven.com/objection-handler' },
  openGraph: {
    title: 'Salary Negotiation Objection Handler | Hayven',
    description: 'Handle any salary negotiation objection with confidence.',
    url: 'https://gethayven.com/objection-handler',
  },
  twitter: { card: 'summary_large_image', title: 'Salary Negotiation Objection Handler | Hayven', description: 'Handle any salary negotiation objection with confidence.' },
}

const objections = [
  { q: '"That\'s above our budget."', a: 'Acknowledge the constraint, then redirect to your value and explore flexibility on other terms.' },
  { q: '"We can\'t go higher on base."', a: 'Ask about signing bonus, equity, remote work, or additional PTO — often budget for base ≠ budget overall.' },
  { q: '"We gave you our best offer."', a: 'Thank them for that, then calmly ask whether there\'s any flexibility at all — most companies expect a counter.' },
  { q: '"Your current salary is lower than our range."', a: 'Redirect from your current salary to your market value and the value you\'ll bring to the role.' },
  { q: '"We have other candidates at this level."', a: 'Acknowledge the competition, then reinforce why you\'re the right fit specifically.' },
  { q: '"We need an answer by tomorrow."', a: 'Artificial deadlines are usually negotiable — politely ask for the time you need to make a good decision.' },
]

export default function ObjectionHandlerPage() {
  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #EBF5FB 0%, #f0f9ff 100%)', padding: '72px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#4A90D9', background: '#dbeafe', padding: '4px 12px', borderRadius: 20, letterSpacing: '0.06em' }}>OBJECTION HANDLER</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', margin: '20px 0 20px' }}>
            Know exactly what to say when they push back
          </h1>
          <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.7, marginBottom: 36, maxWidth: 560, margin: '0 auto 36px' }}>
            "We can't go higher." "That's above our budget." Most people cave at the first pushback. Hayven gives you the exact response for every objection — so you never leave money on the table.
          </p>
          <Link href="/signup" style={{
            display: 'inline-block', background: '#2D6EA8', color: '#fff',
            padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700,
            textDecoration: 'none', boxShadow: '0 4px 14px rgba(45,110,168,0.3)',
          }}>
            Handle Any Objection — Free
          </Link>
          <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 12 }}>No credit card required</p>
        </div>
      </section>

      {/* Common objections */}
      <section style={{ padding: '72px 24px', maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48 }}>Common objections — and how to handle them</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {objections.map(o => (
            <div key={o.q} style={{ background: '#f8fafc', borderRadius: 12, padding: 28, border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#0f172a', marginBottom: 10 }}>{o.q}</div>
              <div style={{ color: '#475569', fontSize: 15, lineHeight: 1.65 }}>{o.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Article */}
      <section style={{ padding: '48px 24px 72px', maxWidth: 740, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24 }}>Why most people cave at the first objection</h2>
        <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
          <p style={{ marginBottom: 20 }}>Salary negotiation objections are designed to feel final — but they almost never are. When a recruiter says "that's above our budget," they're testing whether you'll hold your position. In most cases, the company has more room than they're showing. The negotiators who understand this walk away with thousands more than those who don't.</p>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: '32px 0 12px' }}>The silence technique</h3>
          <p style={{ marginBottom: 20 }}>After stating your counter, stop talking. Silence is uncomfortable, and the first person to break it usually concedes. Let the objection land, pause, and respond calmly. Rushing to fill silence signals anxiety — and anxiety signals weakness in a negotiation.</p>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: '32px 0 12px' }}>Reframe from need to value</h3>
          <p style={{ marginBottom: 20 }}>The biggest mistake in handling objections is making your case about your needs ("I need more because of my rent"). Instead, anchor to market value and the value you bring: "Based on my research, the market range for this role in this city is $X–$Y. Given my background in Z, I'm targeting the upper end of that range." This reframe changes the conversation from personal to professional.</p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#EBF5FB', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Never be caught off guard again</h2>
        <p style={{ fontSize: 18, color: '#475569', marginBottom: 32 }}>Get AI-powered responses for any objection you face — free to start.</p>
        <Link href="/signup" style={{
          display: 'inline-block', background: '#2D6EA8', color: '#fff',
          padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700,
          textDecoration: 'none',
        }}>
          Handle Any Objection — Free
        </Link>
      </section>
    </main>
  )
}
