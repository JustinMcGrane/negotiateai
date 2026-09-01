import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Salary Negotiation Simulator — Practice Until You\'re Ready | Hayven',
  description: 'Practice salary negotiation with an AI recruiter before the real conversation. Our negotiation simulator gives you realistic scenarios so you never freeze under pressure.',
  alternates: { canonical: 'https://gethayven.com/negotiation-simulator' },
  openGraph: {
    title: 'Salary Negotiation Simulator | Hayven',
    description: 'Practice salary negotiation with an AI recruiter before the real conversation.',
    url: 'https://gethayven.com/negotiation-simulator',
  },
  twitter: { card: 'summary_large_image', title: 'Salary Negotiation Simulator | Hayven', description: 'Practice salary negotiation with an AI recruiter.' },
}

const scenarios = [
  { title: 'First offer conversation', desc: 'The recruiter just gave you an offer. How do you respond in the moment without accepting on the spot?' },
  { title: 'Counter offer pushback', desc: 'You countered and they pushed back. What do you say next?' },
  { title: 'The salary history question', desc: '"What are you currently making?" — how to answer without anchoring low.' },
  { title: 'Competing offer leverage', desc: 'You have another offer. How do you use it without burning the relationship?' },
  { title: 'The final round close', desc: 'It\'s down to you and one other candidate. How do you negotiate from this position?' },
]

export default function NegotiationSimulatorPage() {
  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a' }}>
      <section style={{ background: 'linear-gradient(135deg, #EBF5FB 0%, #f0f9ff 100%)', padding: '72px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#4A90D9', background: '#dbeafe', padding: '4px 12px', borderRadius: 20, letterSpacing: '0.06em' }}>NEGOTIATION SIMULATOR</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', margin: '20px 0 20px' }}>
            Practice negotiating before the real conversation
          </h1>
          <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.7, marginBottom: 36, maxWidth: 560, margin: '0 auto 36px' }}>
            Most people freeze when it's time to negotiate because they've never practiced. Hayven's AI simulator puts you in realistic scenarios so the real conversation feels easy.
          </p>
          <Link href="/signup" style={{
            display: 'inline-block', background: '#2D6EA8', color: '#fff',
            padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700,
            textDecoration: 'none', boxShadow: '0 4px 14px rgba(45,110,168,0.3)',
          }}>
            Start Practicing — Free
          </Link>
          <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 12 }}>No credit card required</p>
        </div>
      </section>

      <section style={{ padding: '72px 24px', maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48 }}>Scenarios you'll practice</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {scenarios.map((s, i) => (
            <div key={s.title} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', background: '#f8fafc', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#EBF5FB', color: '#2D6EA8', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{s.title}</div>
                <div style={{ color: '#475569', fontSize: 14, lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '48px 24px 72px', maxWidth: 740, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24 }}>Why practice matters in salary negotiation</h2>
        <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
          <p style={{ marginBottom: 20 }}>Salary negotiation is a skill, and like any skill, it gets better with practice. The problem is most people only negotiate their salary a handful of times in their career — which means they never get good at it. That costs them tens of thousands of dollars over a lifetime of work.</p>
          <p style={{ marginBottom: 20 }}>The solution is deliberate practice before the real stakes are on the line. Just like athletes train before the game, practicing negotiation scenarios helps you internalize the right responses so they come naturally when it matters. After a few simulated sessions, the real conversation feels familiar instead of terrifying.</p>
        </div>
      </section>

      <section style={{ background: '#EBF5FB', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Practice makes perfect — and profitable</h2>
        <p style={{ fontSize: 18, color: '#475569', marginBottom: 32 }}>Run through realistic negotiation scenarios before your next offer conversation.</p>
        <Link href="/signup" style={{
          display: 'inline-block', background: '#2D6EA8', color: '#fff',
          padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700,
          textDecoration: 'none',
        }}>
          Start Practicing — Free
        </Link>
      </section>
    </main>
  )
}
