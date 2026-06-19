import type { Metadata } from 'next'
import Link from 'next/link'
import { BrandMark } from '@/components/negotiate/BrandMark'
import {
  TrendingUp, BookOpen, Play, BarChart2, FileSearch,
  Calculator, DollarSign, Mail, Shield, PenLine, MessageSquare,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'NegotiateAI — The compensation platform that pays for itself',
  description: 'Know your market rate, build your negotiation strategy, and practice until you\'re ready. AI-powered compensation intelligence for professionals.',
  openGraph: {
    title: 'NegotiateAI — The compensation platform that pays for itself',
    description: 'Know your market rate. Build your strategy. Practice until you\'re ready.',
    url: 'https://negotiateai.com',
    type: 'website',
  },
}

const tools = [
  { pillar: 'Intelligence', color: '#0F6E56', bg: '#E8F5F0', icon: TrendingUp, name: 'Compensation analyzer', desc: 'See your market rate at the 25th, 50th, 75th, and 90th percentile for your role and location.' },
  { pillar: 'Intelligence', color: '#0F6E56', bg: '#E8F5F0', icon: FileSearch, name: 'Offer evaluator', desc: 'Score any job offer 0–100 and get a breakdown of exactly what to negotiate.' },
  { pillar: 'Intelligence', color: '#0F6E56', bg: '#E8F5F0', icon: Calculator, name: 'Equity calculator', desc: 'Model your equity value across conservative, base, and optimistic exit scenarios.' },
  { pillar: 'Intelligence', color: '#0F6E56', bg: '#E8F5F0', icon: DollarSign, name: 'Cost of not negotiating', desc: 'See the compounding dollar gap over 5–20 years of accepting less than market rate.' },
  { pillar: 'Strategy', color: '#854F0B', bg: '#FEF3E2', icon: BookOpen, name: 'Negotiation playbook', desc: 'Get a personalized 5-step negotiation plan with exact language to use.' },
  { pillar: 'Strategy', color: '#854F0B', bg: '#FEF3E2', icon: Mail, name: 'Counter-offer builder', desc: 'Generate a ready-to-send email and phone script for your specific counter-offer.' },
  { pillar: 'Strategy', color: '#854F0B', bg: '#FEF3E2', icon: Shield, name: 'Objection handler', desc: 'Get three responses to any pushback — Assertive, Collaborative, or Reframe.' },
  { pillar: 'Strategy', color: '#854F0B', bg: '#FEF3E2', icon: PenLine, name: 'Raise request builder', desc: 'Build a compelling raise request email and talking points from your accomplishments.' },
  { pillar: 'Practice', color: '#141414', bg: '#f0f0f0', icon: Play, name: 'Negotiation simulator', desc: 'Practice a live negotiation with one of 5 AI recruiters. Get a scored debrief after.' },
  { pillar: 'Practice', color: '#141414', bg: '#f0f0f0', icon: MessageSquare, name: 'Interview salary coach', desc: 'Get real-time coaching on how to answer salary questions in any interview stage.' },
]

const testimonials = [
  { name: 'Priya Sharma', role: 'Senior Software Engineer', quote: 'I negotiated $18K more on my base salary using the counter-offer builder. The exact scripts made it so much easier to push back confidently.' },
  { name: 'Marcus Johnson', role: 'Product Manager', quote: 'The simulator felt eerily realistic. I practiced against the "band-constrained" recruiter persona three times before my actual call. Got $12K more and a signing bonus.' },
  { name: 'Elena Vasquez', role: 'Data Scientist', quote: 'I had no idea how undercompensated I was. The compensation analyzer showed I was at the 31st percentile. Six months later, I\'m at the 74th.' },
]

const articles = [
  { slug: 'how-to-negotiate-saas-job-offer', title: 'How to negotiate your first SaaS job offer', excerpt: 'The tech industry has more comp flexibility than almost any other sector. Here\'s how to use it.' },
  { slug: 'recruiter-types-and-how-to-handle', title: 'The 5 recruiter types and how to handle each', excerpt: 'Not all recruiters are created equal. Your strategy should change depending on who\'s across the table.' },
  { slug: 'why-professionals-leave-money-on-table', title: 'Why 75% of professionals leave money on the table', excerpt: 'The research is clear: most people don\'t negotiate. Here\'s the psychology behind it — and how to overcome it.' },
  { slug: 'what-your-equity-is-actually-worth', title: 'What your equity is actually worth: a realistic guide', excerpt: 'Most startup equity is worth less than the paper it\'s written on. Here\'s how to assess it honestly.' },
]

export default function LandingPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Topbar */}
      <header style={{
        borderBottom: '0.5px solid var(--color-border-tertiary)',
        padding: '0 24px', height: 52, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', position: 'sticky', top: 0, background: '#fff', zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <BrandMark />
          <span style={{ fontSize: 13, fontWeight: 500 }}>NegotiateAI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/login" style={{ fontSize: 13, color: 'var(--color-text-secondary)', textDecoration: 'none', padding: '6px 12px' }}>
            Sign in
          </Link>
          <Link href="/signup" style={{
            fontSize: 13, background: '#141414', color: '#fff',
            textDecoration: 'none', padding: '6px 14px', borderRadius: 8,
          }}>
            Start free →
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '80px 24px 64px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 500, lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 20 }}>
          The compensation platform<br />that pays for itself
        </h1>
        <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 32, maxWidth: 520, margin: '0 auto 32px' }}>
          Know your market rate. Build your strategy. Practice until you&apos;re ready. Everything you need to negotiate more money — in one place.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/signup" style={{
            height: 38, display: 'inline-flex', alignItems: 'center', padding: '0 20px',
            background: '#141414', color: '#fff', borderRadius: 8, fontSize: 13, textDecoration: 'none',
          }}>
            Start free →
          </Link>
          <Link href="#how-it-works" style={{
            height: 38, display: 'inline-flex', alignItems: 'center', padding: '0 20px',
            background: 'transparent', color: 'var(--color-text-primary)',
            border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, fontSize: 13, textDecoration: 'none',
          }}>
            See how it works
          </Link>
        </div>

        <div style={{ display: 'flex', gap: 32, justifyContent: 'center', marginTop: 56, flexWrap: 'wrap' }}>
          {[
            { stat: '$5K+', label: 'average negotiation gain' },
            { stat: '75%', label: 'of professionals never negotiate' },
            { stat: '9 out of 10', label: 'counter-offers get a response' },
          ].map((s) => (
            <div key={s.stat} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.02em' }}>{s.stat}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ background: 'var(--color-background-secondary)', padding: '64px 24px' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <h2 style={{ fontSize: 22, fontWeight: 500, textAlign: 'center', marginBottom: 40, letterSpacing: '-0.02em' }}>
            Three pillars of compensation intelligence
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {[
              { icon: TrendingUp, color: '#0F6E56', bg: '#E8F5F0', title: 'Intelligence', desc: 'Know exactly what you\'re worth. See your market rate at every percentile, model equity scenarios, and calculate the long-term cost of underearning.' },
              { icon: BookOpen, color: '#854F0B', bg: '#FEF3E2', title: 'Strategy', desc: 'Know exactly what to say. Get a personalized playbook, ready-to-send scripts, and rebuttals to every recruiter objection.' },
              { icon: Play, color: '#141414', bg: '#f0f0f0', title: 'Practice', desc: 'Simulate the conversation before it happens. Practice against realistic AI recruiters and get a scored debrief with specific feedback.' },
            ].map((p) => (
              <div key={p.title} style={{ background: '#fff', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, padding: 24 }}>
                <div style={{ width: 36, height: 36, background: p.bg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <p.icon size={18} color={p.color} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool preview grid */}
      <section style={{ maxWidth: 840, margin: '0 auto', padding: '64px 24px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 500, marginBottom: 8, letterSpacing: '-0.02em' }}>10 tools. One platform.</h2>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 32 }}>Everything from market data to mock negotiations, in one place.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
          {tools.map((t) => (
            <div key={t.name} style={{
              background: '#fff', border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 12, padding: 16, display: 'flex', alignItems: 'flex-start', gap: 12,
            }}>
              <div style={{ width: 36, height: 36, background: t.bg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <t.icon size={16} color={t.color} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 3 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={{ background: 'var(--color-background-secondary)', padding: '64px 24px' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <h2 style={{ fontSize: 22, fontWeight: 500, textAlign: 'center', marginBottom: 8, letterSpacing: '-0.02em' }}>Simple pricing</h2>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', textAlign: 'center', marginBottom: 40 }}>Start free. Upgrade when it pays off.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <div style={{ background: '#fff', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Free</div>
              <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 4 }}>$0</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 20 }}>Forever free</div>
              {['1 use per tool', '1 practice simulation', 'Basic results'].map((f) => (
                <div key={f} style={{ fontSize: 12, color: 'var(--color-text-secondary)', padding: '4px 0', borderBottom: '0.5px solid var(--color-border-tertiary)' }}>✓ {f}</div>
              ))}
              <Link href="/signup" style={{ display: 'block', marginTop: 20, textAlign: 'center', height: 38, lineHeight: '38px', background: 'transparent', color: 'var(--color-text-primary)', border: '0.5px solid var(--color-border-primary)', borderRadius: 8, fontSize: 13, textDecoration: 'none' }}>
                Get started
              </Link>
            </div>

            <div style={{ background: '#fff', border: '2px solid #141414', borderRadius: 12, padding: 24, position: 'relative' }}>
              <div style={{ position: 'absolute', top: -10, left: 20, background: '#141414', color: '#fff', fontSize: 11, padding: '2px 8px', borderRadius: 4 }}>Most popular</div>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Pro</div>
              <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 4 }}>$29<span style={{ fontSize: 14, fontWeight: 400 }}>/mo</span></div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 20 }}>or $249/yr (save $99)</div>
              {['Unlimited access to all 10 tools', 'Full session history', 'PDF export', 'Progress tracking'].map((f) => (
                <div key={f} style={{ fontSize: 12, color: 'var(--color-text-secondary)', padding: '4px 0', borderBottom: '0.5px solid var(--color-border-tertiary)' }}>✓ {f}</div>
              ))}
              <Link href="/signup" style={{ display: 'block', marginTop: 20, textAlign: 'center', height: 38, lineHeight: '38px', background: '#141414', color: '#fff', borderRadius: 8, fontSize: 13, textDecoration: 'none' }}>
                Start Pro →
              </Link>
            </div>

            <div style={{ background: '#fff', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>One-time report</div>
              <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 4 }}>$49</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 20 }}>One-time, no subscription</div>
              {['Full compensation audit', 'PDF report delivered', 'All Intelligence tools once', 'One practice simulation'].map((f) => (
                <div key={f} style={{ fontSize: 12, color: 'var(--color-text-secondary)', padding: '4px 0', borderBottom: '0.5px solid var(--color-border-tertiary)' }}>✓ {f}</div>
              ))}
              <Link href="/signup" style={{ display: 'block', marginTop: 20, textAlign: 'center', height: 38, lineHeight: '38px', background: 'transparent', color: 'var(--color-text-primary)', border: '0.5px solid var(--color-border-primary)', borderRadius: 8, fontSize: 13, textDecoration: 'none' }}>
                Buy report
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ maxWidth: 840, margin: '0 auto', padding: '64px 24px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 500, marginBottom: 32, letterSpacing: '-0.02em' }}>People are making more money</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ background: 'var(--color-background-secondary)', borderRadius: 12, padding: 24 }}>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>&ldquo;{t.quote}&rdquo;</p>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section style={{ background: 'var(--color-background-secondary)', padding: '64px 24px' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <h2 style={{ fontSize: 22, fontWeight: 500, marginBottom: 32, letterSpacing: '-0.02em' }}>Negotiation guides</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {articles.map((a) => (
              <Link key={a.slug} href={`/blog/${a.slug}`} style={{ background: '#fff', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, padding: 20, textDecoration: 'none', display: 'block' }}>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, color: 'var(--color-text-primary)' }}>{a.title}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{a.excerpt}</div>
                <div style={{ marginTop: 12, fontSize: 12, color: 'var(--color-text-tertiary)' }}>Read article →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '0.5px solid var(--color-border-tertiary)', padding: '32px 24px' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <BrandMark size={20} />
              <span style={{ fontSize: 13, fontWeight: 500 }}>NegotiateAI</span>
            </div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {['/login', '/signup', '/blog/how-to-negotiate-saas-job-offer'].map((href) => (
                <Link key={href} href={href} style={{ fontSize: 12, color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
                  {href === '/login' ? 'Sign in' : href === '/signup' ? 'Sign up' : 'Blog'}
                </Link>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 24, fontSize: 11, color: 'var(--color-text-tertiary)', maxWidth: 560 }}>
            NegotiateAI provides AI-generated guidance for informational purposes. Results may vary. Not a substitute for professional advice. © {new Date().getFullYear()} NegotiateAI.
          </div>
        </div>
      </footer>
    </div>
  )
}
