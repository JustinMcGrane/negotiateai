import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Career Coach — Salary & Career Coaching | Hayven',
  description: 'Meet Sarah, your AI career coach. Get your market salary, negotiation strategy, and career plan — personalized to your role.',
  alternates: { canonical: 'https://gethayven.com/ai-career-coach' },
  openGraph: {
    title: 'AI Career Coach — Salary & Career Coaching | Hayven',
    description: 'Meet Sarah, your AI career coach. Get your market salary, negotiation strategy, and career plan — personalized to your role.',
    url: 'https://gethayven.com/ai-career-coach',
    type: 'website',
  },
}

const FAQ_ITEMS = [
  {
    q: 'What does a career coach do?',
    a: 'A career coach helps you figure out where you are in your career, where you want to go, and how to get there. In practice that means resume feedback, salary benchmarking, interview preparation, offer negotiation, and promotion planning — depending on where you are in your journey. Hayven\'s AI career coach Sarah covers all of these in a single conversation, available any time.',
  },
  {
    q: 'How much does a career coach cost?',
    a: 'A traditional human career coach typically costs $150–$500 per hour, or $1,000–$5,000 for a structured coaching package. Hayven\'s AI career coach starts at $4.99 for a 7-day trial — you get unlimited coaching sessions, your market rate, a personalized career plan, and all 10 negotiation tools. Then $19.99/month after the trial.',
  },
  {
    q: 'Is an AI career coach as good as a human career coach?',
    a: 'For most people, an AI career coach is more practical. It\'s available 24/7, costs a fraction of the price, and draws on far more compensation data than any individual human coach could. Where human coaches have an edge is in personal relationships and nuanced emotional support. Hayven is built to deliver the tactical value — market data, negotiation scripts, offer analysis — that most people actually need from a career coach.',
  },
  {
    q: 'What is AI career coaching?',
    a: 'AI career coaching uses large language models trained on career, compensation, and negotiation data to give you personalized guidance. Instead of scheduling a session with a human coach, you have a real-time conversation — ask anything about your salary, your resume, your job search, or your next move — and get specific, actionable advice instantly.',
  },
  {
    q: 'Can a career coach help me negotiate my salary?',
    a: 'Salary negotiation coaching is one of the highest-value things a career coach does. Knowing your market rate is step one — but actually asking for more, handling pushback, and knowing when to walk away requires a different skill set. Hayven\'s Sarah walks you through exactly what to say, scripts your counter-offer, and helps you practice the conversation before you have it.',
  },
  {
    q: 'How is Hayven different from other career coaching platforms?',
    a: 'Most career coaching platforms offer templates, videos, or human coaching at high cost. Hayven is built around a single AI coach — Sarah — who combines real-time compensation data with personalized coaching in one conversation. You don\'t get a generic salary range from a database; you get a specific number for your role, level, and city, plus a strategy to get there.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Hayven',
      url: 'https://gethayven.com',
      description: 'AI-powered career coaching and salary negotiation platform.',
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

export default function AICareerCoachPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
            <Link href="/upgrade" style={{ fontSize: 14, fontWeight: 700, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', textDecoration: 'none', padding: '8px 18px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>✦ Try 7 days for $4.99 <ArrowRight size={14} /></Link>
          </div>
        </header>

        {/* Hero */}
        <section style={{ maxWidth: 760, margin: '0 auto', padding: '72px 32px 80px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, color: '#4A90D9', background: '#EBF5FB', padding: '4px 14px', borderRadius: 20, letterSpacing: '0.08em', marginBottom: 24 }}>
            AI CAREER COACH
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: 24 }}>
            Your AI Career Coach for Salary, Negotiation, and Career Growth
          </h1>
          <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, marginBottom: 40, maxWidth: 580, margin: '0 auto 40px' }}>
            Meet Sarah — Hayven&apos;s AI career coach. She benchmarks your salary against the market, builds your negotiation strategy, and coaches you through every step of landing the offer you deserve.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/upgrade" style={{
              height: 50, display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '0 28px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              color: '#fff',
              borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 3px 10px rgba(239,68,68,0.3)',
            }}>
              ✦ Try 7 days for $4.99 <ArrowRight size={15} />
            </Link>
            <Link href="/worth" style={{
              height: 50, display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '0 28px', background: '#EBF5FB', color: '#2D6EA8',
              borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none',
            }}>
              Check my market value
            </Link>
          </div>
          <p style={{ marginTop: 16, fontSize: 13, color: '#94a3b8' }}>Then $19.99/month. Cancel anytime.</p>
        </section>

        {/* What does an AI career coach do */}
        <section style={{ background: '#f8fafc', padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 20 }}>
              What does an AI career coach actually do?
            </h2>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 20 }}>
              Career coaching used to mean paying someone $200/hour to tell you to &ldquo;know your worth&rdquo; and &ldquo;network more.&rdquo; Hayven&apos;s AI career coaching is different — it&apos;s specific, data-backed, and available the moment you need it.
            </p>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 20 }}>
              Sarah, Hayven&apos;s AI career coach, pulls from real compensation data across thousands of roles, locations, and experience levels. When you tell her your job title and current salary, she doesn&apos;t give you a generic range — she tells you your exact market percentile, the gap between what you&apos;re making and what you should be making, and what to do about it.
            </p>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8 }}>
              Beyond salary, Sarah coaches you on resume positioning, interview preparation, offer evaluation, and long-term career strategy. She&apos;s not a chatbot with canned responses — she asks about your situation, remembers what you&apos;ve told her, and gives you advice that&apos;s actually relevant to where you are right now.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section style={{ padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 48 }}>
              How Hayven&apos;s AI career coaching works
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
              {[
                { step: '1', title: 'Tell Sarah where you are', body: 'Start a conversation with Sarah and tell her your role, your current salary, and what you\'re working toward — a raise, a new job, or a promotion. She\'ll ask the right follow-up questions to understand your situation fully.' },
                { step: '2', title: 'Get your market rate and gap analysis', body: 'Sarah benchmarks your compensation against real market data for your exact role and location. You\'ll see your current percentile, the market median, the top 25%, and — if you\'re underpaid — exactly how much you\'re leaving on the table each year.' },
                { step: '3', title: 'Build your strategy', body: 'Based on your situation, Sarah builds you a personalized plan: what to say in your negotiation, how to handle objections, what to ask for beyond base salary, and how to time the conversation for maximum impact.' },
              ].map(({ step, title, body }) => (
                <div key={step} style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#0f172a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, flexShrink: 0 }}>{step}</div>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{title}</div>
                    <div style={{ fontSize: 15, color: '#475569', lineHeight: 1.75 }}>{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Salary negotiation coaching */}
        <section style={{ background: '#0f172a', padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: 20 }}>
              Salary negotiation coaching that actually prepares you
            </h2>
            <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.8, marginBottom: 20 }}>
              Most people know they should negotiate — they just don&apos;t know what to say when the recruiter pushes back. That&apos;s where Hayven&apos;s salary negotiation coaching makes the difference.
            </p>
            <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.8, marginBottom: 32 }}>
              Sarah doesn&apos;t just tell you to &ldquo;ask for more.&rdquo; She gives you the exact words, scripts your counter-offer email, prepares you for the three most common recruiter objections, and runs you through a live negotiation simulator so the real conversation feels familiar before you have it.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 36 }}>
              {[
                'Personalized counter-offer script',
                'Objection handler for any recruiter pushback',
                'Negotiation email template',
                'Live practice simulator',
                'Equity and total comp analysis',
                'Signing bonus strategy',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#cbd5e1' }}>
                  <CheckCircle size={15} color="#4A90D9" style={{ flexShrink: 0, marginTop: 2 }} />
                  {item}
                </div>
              ))}
            </div>
            <Link href="/counter-offer-builder" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#4A90D9', color: '#fff',
              padding: '12px 24px', borderRadius: 9,
              fontSize: 14, fontWeight: 700, textDecoration: 'none',
            }}>
              Build my counter-offer <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Promotion coaching */}
        <section style={{ padding: '80px 32px', background: '#f8fafc' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 20 }}>
              Career coaching for promotions and raises
            </h2>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 20 }}>
              Negotiating a new job offer gets most of the attention — but for most professionals, the bigger opportunity is where they already work. Getting promoted or landing a meaningful raise at your current company can add more to your lifetime earnings than any single job switch.
            </p>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 20 }}>
              Sarah coaches you through both. For raises, she helps you build a case from your actual wins — quantified impact, market benchmarks, and timing — and scripts the conversation with your manager. For promotions, she helps you understand what the next level actually requires at your company, identify the gaps, and position yourself to get there.
            </p>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 32 }}>
              The average professional leaves $27,000 on the table by not negotiating their first offer. That number compounds every year through raises, bonuses, and future job offers — all of which are anchored to what you&apos;re making now. The sooner you get your compensation right, the more it pays off.
            </p>
            <Link href="/worth" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#141414', color: '#fff',
              padding: '12px 24px', borderRadius: 9,
              fontSize: 14, fontWeight: 700, textDecoration: 'none',
            }}>
              See my market rate <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* AI vs human */}
        <section style={{ padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 20 }}>
              Is an AI career coach as good as a human one?
            </h2>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 20 }}>
              It depends on what you need. Human career coaches are valuable for long-term relationships, nuanced emotional support, and navigating complex organizational politics where personal judgment matters. If you need someone who knows your industry deeply and can make introductions, a human coach has an edge.
            </p>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 20 }}>
              But for the tactical work — knowing your market rate, building a negotiation strategy, preparing for interviews, writing a stronger resume — an AI career coach is faster, cheaper, and draws on more data than any individual human could. A human coach knows their clients&apos; experiences; Hayven knows compensation data across thousands of roles, companies, and cities.
            </p>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8 }}>
              For most professionals, the question isn&apos;t whether to use an AI career coach instead of a human one — it&apos;s whether to use one at all. Most people get no coaching, leave money on the table, and move through their careers without a clear strategy. Hayven is built to fix that, at a price that makes it accessible to everyone.
            </p>
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
              Sarah will tell you your market rate, where you stand, and exactly what to do next — personalized to your role and situation.
            </p>
            <Link href="/upgrade" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              color: '#fff',
              padding: '15px 36px', borderRadius: 10,
              fontSize: 16, fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(239,68,68,0.35)',
            }}>
              ✦ Try 7 days for $4.99 <ArrowRight size={16} />
            </Link>
            <p style={{ marginTop: 14, fontSize: 13, color: '#94a3b8' }}>Then $19.99/month. Cancel anytime.</p>
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
