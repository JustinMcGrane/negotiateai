import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, UserCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Career Coach — Meet Sarah | Hayven',
  description: 'Meet Sarah, Hayven\'s AI career coach. Get personalized salary negotiation strategies, compensation analysis, resume feedback, and career coaching — available 24/7, starting free.',
  alternates: { canonical: 'https://gethayven.com/ai-career-coach' },
  openGraph: {
    title: 'AI Career Coach — Meet Sarah | Hayven',
    description: 'Personalized salary negotiation, compensation analysis, and career coaching from Sarah — Hayven\'s AI career coach. Start free.',
    url: 'https://gethayven.com/ai-career-coach',
    type: 'website',
    images: [{ url: 'https://gethayven.com/opengraph-image', width: 1200, height: 630, alt: 'Hayven — AI Career Coach' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Career Coach | Hayven',
    description: 'Personalized salary negotiation and career coaching from Sarah, Hayven\'s AI career coach.',
  },
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Hayven — AI Career Coach',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://gethayven.com/ai-career-coach',
  offers: [
    { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Pro', price: '20', priceCurrency: 'USD', billingIncrement: 'P1M' },
  ],
  description: 'Sarah is Hayven\'s AI career coach. She provides personalized salary negotiation strategies, compensation analysis, resume feedback, and career guidance. Sarah is an AI assistant, not a human coach or licensed professional.',
  datePublished: '2024-10-01',
  dateModified: '2025-10-16',
  publisher: {
    '@type': 'Organization',
    name: 'Hayven',
    url: 'https://gethayven.com',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an AI career coach?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An AI career coach is a software system that provides personalized career guidance, resume feedback, salary negotiation strategies, and job search support using artificial intelligence. Unlike a human coach, an AI career coach is available 24/7 and typically costs significantly less. Hayven\'s AI coach is named Sarah.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can AI help me negotiate salary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Hayven\'s AI career coach Sarah helps you understand your market rate, build a negotiation strategy, practice the conversation through roleplay, and handle objections. She also helps build counter-offer emails and raise request scripts tailored to your specific situation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between an AI career coach and a human career coach?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Human career coaches offer lived professional experience, emotional support, and professional accountability. AI career coaches like Sarah offer 24/7 availability, data-driven market analysis, unlimited practice conversations, and a much lower cost. Human coaches typically charge $100–$500/hour; Hayven starts at $0. Sarah is an AI assistant, not a licensed professional.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does Hayven cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hayven has a free plan that includes a salary assessment and one coaching session with Sarah. Pro is $20/month for unlimited coaching and all negotiation tools.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Sarah help me prepare for a salary negotiation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Salary negotiation preparation is one of Sarah\'s primary use cases. She analyzes your market rate, builds a personalized negotiation strategy, writes your counter-offer email or phone script, and roleplays the conversation with you through the Negotiation Simulator. You can practice as many times as you need before the real conversation.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gethayven.com' },
    { '@type': 'ListItem', position: 2, name: 'AI Career Coach', item: 'https://gethayven.com/ai-career-coach' },
  ],
}

export default function AiCareerCoachPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
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
      <section style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', padding: '72px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: '5px 14px', marginBottom: 20,
          }}>
            <UserCircle size={14} color="#a5b4fc" />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#a5b4fc', letterSpacing: '0.08em' }}>AI CAREER COACH</span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 20px' }}>
            Meet Sarah — your AI career coach
          </h1>
          <p style={{ fontSize: 17, color: '#c7d2fe', lineHeight: 1.75, maxWidth: 620, margin: '0 auto 12px' }}>
            Sarah helps you understand your market rate, build your negotiation strategy, and practice until you&apos;re confident. Available 24/7. Starting free.
          </p>
          <p style={{ fontSize: 14, color: '#818cf8', marginBottom: 36 }}>
            Sarah is an AI assistant, not a human coach or licensed professional.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#fff', color: '#1e1b4b',
              padding: '14px 28px', borderRadius: 9,
              fontSize: 15, fontWeight: 800, textDecoration: 'none',
            }}>
              Talk to Sarah free <ArrowRight size={15} />
            </Link>
            <Link href="#how-it-works" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.1)', color: '#e0e7ff',
              padding: '14px 28px', borderRadius: 9,
              fontSize: 15, fontWeight: 600, textDecoration: 'none',
            }}>
              How it works
            </Link>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a' }}>

        {/* What is an AI career coach */}
        <section style={{ marginBottom: 72 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
            What is an AI career coach?
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 16 }}>
            An AI career coach is a software system that provides personalized career guidance using artificial intelligence. It can give you feedback on your resume, help you understand your market rate, build negotiation strategies tailored to your situation, and practice conversations with you in real time.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 16 }}>
            Hayven&apos;s AI career coach is named <strong>Sarah</strong>. Sarah can analyze your compensation situation, help you prepare for salary negotiations, give you scripts and talking points, and coach you through the conversation. She&apos;s available any time you need her and costs far less than a human career coaching engagement.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
            <strong>Important to know:</strong> Sarah is an AI assistant. She provides data-driven guidance and support but is not a licensed career counselor, financial advisor, or human professional. For complex legal or financial decisions, consult qualified professionals.
          </p>
        </section>

        {/* Who Sarah is for */}
        <section style={{ marginBottom: 72 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Who Sarah is for
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 24 }}>
            Sarah is built for professionals who are navigating one of these situations:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14, marginBottom: 16 }}>
            {[
              { label: 'Job seekers', desc: 'Evaluating offers, countering lowball offers, and building negotiation strategy before accepting.' },
              { label: 'Current employees', desc: 'Asking for a raise or promotion, making a case based on market data and accomplishments.' },
              { label: 'Career changers', desc: 'Transitioning to a new role or industry and navigating salary differences.' },
              { label: 'First-time negotiators', desc: 'Never negotiated before and want to practice, prepare, and build confidence before the real conversation.' },
              { label: 'Mid-career professionals', desc: 'Wondering if you\'re underpaid and want a data-backed answer with a clear strategy.' },
              { label: 'Senior professionals', desc: 'Negotiating complex total comp packages including equity, bonuses, and executive benefits.' },
            ].map(({ label, desc }) => (
              <div key={label} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '18px 20px' }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{label}</p>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" style={{ marginBottom: 72 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
            How Sarah works
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 32 }}>
            When you start a session with Sarah, she begins by understanding your current situation — your role, experience, location, current compensation, and what you&apos;re trying to achieve. From there, she can:
          </p>
          <div style={{ marginBottom: 32 }}>
            {[
              { step: '1', title: 'Analyze your market rate', desc: 'Sarah pulls compensation data for your title, level, and location to tell you whether you\'re underpaid and by how much. You see the 25th through 90th percentile range.' },
              { step: '2', title: 'Build your negotiation strategy', desc: 'Based on your situation — new offer, raise request, or promotion push — Sarah builds a personalized strategy: what to say, when to say it, how to handle objections.' },
              { step: '3', title: 'Generate scripts and templates', desc: 'Sarah writes your counter-offer email, raise request talking points, or salary question responses — tailored to your specific role, company, and situation.' },
              { step: '4', title: 'Practice the conversation', desc: 'In the Negotiation Simulator, Sarah plays the role of a hiring manager or your manager. You practice your side of the conversation and get scored feedback on your delivery.' },
              { step: '5', title: 'Refine and follow up', desc: 'After each conversation or negotiation, Sarah helps you debrief: what went well, what to improve, and what to do next.' },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
                <div style={{
                  width: 36, height: 36, background: '#1e1b4b', color: '#fff',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 800, flexShrink: 0,
                }}>
                  {step}
                </div>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{title}</p>
                  <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.7, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What Sarah can do */}
        <section style={{ marginBottom: 72 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 24 }}>
            What Sarah helps with
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
            {[
              'Salary negotiation strategy for job offers',
              'Raise request preparation and scripts',
              'Counter-offer email and phone scripts',
              'Market rate analysis (25th–90th percentile)',
              'Offer evaluation and scoring',
              'Equity analysis and modeling',
              'Handling recruiter pushback and objections',
              'Resume feedback and optimization',
              'Cover letter generation',
              'Interview preparation and coaching',
              'Job search and targeting strategy',
              'Promotion planning and career advancement',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '14px 16px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <CheckCircle size={15} color="#0F6E56" style={{ flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontSize: 14, color: '#334155' }}>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* AI vs human coaching */}
        <section style={{ marginBottom: 72 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
            AI career coaching vs. human career coaching
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 24 }}>
            Both have genuine strengths. Understanding the difference helps you choose the right tool for your situation.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 16 }}>
            <div style={{ background: '#f0f4ff', border: '1px solid #c7d2fe', borderRadius: 14, padding: '24px 26px' }}>
              <p style={{ fontSize: 15, fontWeight: 800, color: '#1e1b4b', marginBottom: 16 }}>Sarah (AI — Hayven)</p>
              {[
                'Available 24/7, any time you need her',
                'Data-driven market salary analysis',
                'Unlimited practice conversations',
                'Writes emails and scripts for you',
                'Free plan available; Pro from $20/mo',
                'No scheduling required',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
                  <CheckCircle size={14} color="#1e1b4b" style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 14, color: '#312e81' }}>{item}</span>
                </div>
              ))}
              <p style={{ fontSize: 12, color: '#6366f1', marginTop: 12, fontStyle: 'italic' }}>Sarah is an AI, not a licensed professional</p>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, padding: '24px 26px' }}>
              <p style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Human career coach</p>
              {[
                'Lived professional experience and judgment',
                'Deeper emotional support and accountability',
                'Strong for major life/career transitions',
                'Can build long-term professional relationship',
                'Typically $100–$500 per hour',
                'Requires scheduling and availability',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
                  <CheckCircle size={14} color="#64748b" style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 14, color: '#475569' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7 }}>
            For most professionals navigating a salary negotiation or raise request, an AI coach provides everything you need at a fraction of the cost. For major career pivots or situations requiring licensed professional advice, a human coach may be more appropriate.
          </p>
        </section>

        {/* Pricing */}
        <section style={{ marginBottom: 72 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 24 }}>
            Pricing — start free
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              {
                name: 'Free',
                price: '$0',
                period: '',
                desc: 'No credit card required',
                features: ['Salary assessment with Sarah', 'See your market rate', 'Get your target role + salary', 'Realistic timeline to get there'],
                cta: 'Get started free',
                ctaHref: '/signup',
                dark: false,
              },
              {
                name: 'Pro',
                price: '$20',
                period: '/mo',
                desc: 'Unlimited coaching & tools',
                features: ['Sarah — unlimited coaching', 'All 10 negotiation tools', 'Resume analyzer + cover letter', 'Counter-offer builder', 'Raise builder + playbook'],
                cta: 'Get Pro',
                ctaHref: '/signup',
                dark: true,
              },
            ].map(({ name, price, period, desc, features, cta, ctaHref, dark }) => (
              <div key={name} style={{
                background: dark ? '#0f172a' : '#fff',
                border: dark ? '2px solid #0f172a' : '1px solid #e2e8f0',
                borderRadius: 14, padding: 28,
              }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: dark ? '#fff' : '#0f172a', marginBottom: 6 }}>{name}</p>
                <p style={{ fontSize: 32, fontWeight: 800, color: dark ? '#fff' : '#0f172a', letterSpacing: '-0.02em', marginBottom: 4 }}>
                  {price}<span style={{ fontSize: 14, fontWeight: 400 }}>{period}</span>
                </p>
                <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 20 }}>{desc}</p>
                {features.map((f) => (
                  <div key={f} style={{ fontSize: 13, color: dark ? '#cbd5e1' : '#475569', padding: '6px 0', borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : '#f1f5f9'}`, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: dark ? '#34d399' : '#10b981', fontWeight: 700 }}>✓</span> {f}
                  </div>
                ))}
                <Link href={ctaHref} style={{
                  display: 'block', marginTop: 20, textAlign: 'center',
                  height: 42, lineHeight: '42px',
                  background: dark ? '#2563eb' : 'transparent',
                  border: dark ? 'none' : '1px solid #d1d5db',
                  borderRadius: 9, fontSize: 14,
                  textDecoration: 'none',
                  color: dark ? '#fff' : '#374151', fontWeight: 700,
                }}>
                  {cta} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 72 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 24 }}>
            Frequently asked questions
          </h2>
          {[
            {
              q: 'Is Sarah a real person?',
              a: 'No. Sarah is an AI assistant built by Hayven. She is not a human recruiter, career coach, or licensed professional. Hayven uses AI to deliver personalized career guidance at scale.',
            },
            {
              q: 'How is this different from ChatGPT?',
              a: 'Sarah is purpose-built for career coaching and salary negotiation. She has dedicated tools for compensation analysis, offer evaluation, counter-offer building, and negotiation simulation — all integrated into a single workflow. General-purpose AI assistants don\'t have access to these tools or market data.',
            },
            {
              q: 'Is my conversation private?',
              a: 'Yes. Your coaching conversations are private and associated with your account only. They are not used for public display or shared with employers.',
            },
            {
              q: 'Do I need to be in a specific country?',
              a: 'Hayven\'s compensation data and coaching is primarily US-focused. Market rate analysis is most accurate for US roles and locations.',
            },
            {
              q: 'Can Sarah help me prepare for a salary negotiation?',
              a: 'Yes. Salary negotiation preparation is one of Sarah\'s primary use cases. She analyzes your market rate, builds a personalized negotiation strategy, writes your counter-offer email or phone script, and roleplays the conversation with you through the Negotiation Simulator. You can practice as many times as you need before the real conversation.',
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
              → How to negotiate salary
            </Link>
            <Link href="/how-to-ask-for-a-raise" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>
              → How to ask for a raise
            </Link>
            <Link href="/compensation-analyzer" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>
              → Compensation Analyzer — check your market rate
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
          borderRadius: 16, padding: '48px 40px', textAlign: 'center',
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'linear-gradient(135deg, #818cf8, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <UserCircle size={26} color="#fff" />
          </div>
          <p style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 12, letterSpacing: '-0.02em' }}>
            Talk to Sarah for free
          </p>
          <p style={{ fontSize: 15, color: '#c7d2fe', lineHeight: 1.7, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
            Start with a free salary check. Sarah will tell you if you&apos;re underpaid, what the market pays for your role, and where to start.
          </p>
          <Link href="/signup" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', color: '#1e1b4b',
            padding: '14px 32px', borderRadius: 9,
            fontSize: 15, fontWeight: 800, textDecoration: 'none',
          }}>
            Get started free <ArrowRight size={15} />
          </Link>
          <p style={{ fontSize: 13, color: '#a5b4fc', marginTop: 14 }}>Free plan available. No credit card required.</p>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '32px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/" style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', textDecoration: 'none' }}>Hayven</Link>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <Link href="/salary-negotiation" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>Salary Negotiation</Link>
            <Link href="/how-to-ask-for-a-raise" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>Ask for a Raise</Link>
            <Link href="/ai-career-coach" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>AI Career Coach</Link>
            <Link href="/salary-calculator" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>Salary Calculator</Link>
          </div>
          <p style={{ fontSize: 12, color: '#94a3b8', width: '100%', marginTop: 8 }}>
            © {new Date().getFullYear()} Hayven. Sarah is an AI assistant, not a licensed professional. AI-generated guidance for informational purposes.
          </p>
        </div>
      </footer>
    </>
  )
}
