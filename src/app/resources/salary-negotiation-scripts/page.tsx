import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Salary Negotiation Scripts — Word-for-Word Examples | Hayven',
  description: 'Real, word-for-word salary negotiation scripts for job offers, raise requests, counter-offers, and handling objections. Copy, adapt, and use.',
  alternates: { canonical: 'https://gethayven.com/resources/salary-negotiation-scripts' },
  openGraph: {
    title: 'Salary Negotiation Scripts | Hayven',
    description: 'Word-for-word salary negotiation scripts for every scenario.',
    url: 'https://gethayven.com/resources/salary-negotiation-scripts',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Salary Negotiation Scripts — Word-for-Word Examples',
  description: 'Real, word-for-word salary negotiation scripts for job offers, raise requests, counter-offers, and handling objections.',
  url: 'https://gethayven.com/resources/salary-negotiation-scripts',
  publisher: { '@type': 'Organization', name: 'Hayven', url: 'https://gethayven.com' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gethayven.com' },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://gethayven.com/resources' },
    { '@type': 'ListItem', position: 3, name: 'Salary Negotiation Scripts', item: 'https://gethayven.com/resources/salary-negotiation-scripts' },
  ],
}

const scripts = [
  {
    title: 'Countering a new job offer (phone)',
    context: 'Use when you\'ve just received a job offer and want to counter by phone.',
    script: `"Thank you so much for this offer — I'm genuinely excited about the role and the team. I do want to talk about the base salary. I've done market research for [title] in [location], and I'm seeing the 75th percentile at around $[X]. Given my [specific background/skill], I'd like to come in at $[Y]. Is there flexibility to get there?"`,
    notes: 'After you name your number, stop talking. Let the silence work for you.',
  },
  {
    title: 'Countering via email',
    context: 'Use when you prefer to negotiate in writing or when the recruiter has communicated primarily by email.',
    script: `Subject: Re: Offer — [Your Name]

Hi [Recruiter],

Thank you for the offer — I'm excited about joining [Company] and I'm confident I can make an immediate impact.

I'd like to discuss the base salary. Based on my research for [title] at my level in [location], the market range is $[X]–$[Y], with the 75th percentile at approximately $[Z]. My current expectation is $[ask].

Is there flexibility to get closer to that number? I'm very motivated to make this work and want to get to yes together.

[Your name]`,
    notes: 'Keep it professional and collaborative. Never mention competing offers unless you actually have one.',
  },
  {
    title: 'Asking your manager for a raise (in-person)',
    context: 'Use in a dedicated 1:1 after you\'ve already requested a meeting specifically to discuss compensation.',
    script: `"Over the past year, I've [specific accomplishment 1], [specific accomplishment 2], and taken on [new responsibility]. I've also been researching market rates. For a [title] at my level in [location], the 75th percentile is around $[X] — I'm currently at $[Y], which puts me below that range. I'd like to get to $[Z]. What would it take to make that happen?"`,
    notes: 'Name one specific number, not a range. Then wait for their response before saying anything else.',
  },
  {
    title: 'Responding to "the budget isn\'t there"',
    context: 'When your manager or recruiter says budget is constrained.',
    script: `"I understand, and I appreciate you being transparent. Can we agree on a specific number and a timeline to get there? I want to make sure we're aligned on the goal, even if the timing needs to shift. If we can get to $[X] by [date/quarter], that works for me — but I'd like to have that commitment."`,
    notes: 'Get any commitment in writing via a follow-up email.',
  },
  {
    title: 'Asking about the salary range before the offer',
    context: 'When a recruiter asks for your salary expectations early in the process.',
    script: `"I want to make sure we're in the right range before either of us invests more time. Based on my research for this type of role in [location], I'm targeting $[X]–$[Y]. Is that aligned with what you have budgeted?"`,
    notes: 'You\'re giving a range here because it\'s early in the process — frame it as a range check, not a final ask.',
  },
  {
    title: 'Handling "we\'ve given you our best offer"',
    context: 'When a recruiter or hiring manager says the offer is final.',
    script: `"I appreciate that, and I want to make this work. My research shows the market rate for this scope at the 75th percentile is $[X]. I understand there may be constraints — is there any flexibility in other components, like signing bonus or equity, that could help bridge the gap?"`,
    notes: 'If base is truly firm, negotiate signing bonus, equity, start date, title, or remote flexibility.',
  },
]

export default function SalaryNegotiationScriptsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Nav */}
      <header style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 18, color: '#0f172a', textDecoration: 'none' }}>Hayven</Link>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/login" style={{ fontSize: 14, color: '#64748b', textDecoration: 'none' }}>Sign in</Link>
          <Link href="/signup" style={{ fontSize: 14, fontWeight: 700, background: '#0f172a', color: '#fff', padding: '8px 18px', borderRadius: 8, textDecoration: 'none' }}>Get started free</Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: '#0f172a', padding: '60px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          {/* Breadcrumb */}
          <nav style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>
            <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <Link href="/salary-negotiation" style={{ color: '#64748b', textDecoration: 'none' }}>Salary Negotiation</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <span style={{ color: '#94a3b8' }}>Scripts</span>
          </nav>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#7AB8E8', letterSpacing: '0.1em', background: 'rgba(122,184,232,0.15)', padding: '4px 12px', borderRadius: 20 }}>RESOURCE</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.03em', margin: '16px 0 16px' }}>
            Salary negotiation scripts
          </h1>
          <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.75, maxWidth: 560, margin: '0 auto' }}>
            Word-for-word scripts for every salary negotiation scenario. Copy, adapt to your situation, and use.
          </p>
        </div>
      </section>

      {/* Scripts */}
      <main style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 48 }}>
          The difference between a successful salary negotiation and a failed one is usually not your qualifications — it&apos;s your words. These scripts give you language that is professional, specific, and grounded in market data. Adapt each one to your situation before using it.
        </p>

        {scripts.map(({ title, context, script, notes }, i) => (
          <section key={i} style={{ marginBottom: 48, paddingBottom: 48, borderBottom: '1px solid #f1f5f9' }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 10 }}>
              {i + 1}. {title}
            </h2>
            <p style={{ fontSize: 14, color: '#64748b', fontStyle: 'italic', marginBottom: 16, lineHeight: 1.65 }}>
              <strong>When to use:</strong> {context}
            </p>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '22px 26px', marginBottom: 12 }}>
              <pre style={{ fontSize: 14, color: '#0f172a', lineHeight: 1.85, margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'system-ui, -apple-system, sans-serif', fontStyle: 'italic' }}>
                {script}
              </pre>
            </div>
            <p style={{ fontSize: 13, color: '#64748b', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: '10px 14px', margin: 0 }}>
              💡 {notes}
            </p>
          </section>
        ))}

        {/* Related links */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>Related resources</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link href="/resources/salary-negotiation-email" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>→ Salary negotiation email templates</Link>
            <Link href="/salary-negotiation" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>→ Complete salary negotiation guide</Link>
            <Link href="/how-to-ask-for-a-raise" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>→ How to ask for a raise</Link>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #1d4ed8 100%)', borderRadius: 14, padding: '36px 32px', textAlign: 'center' }}>
          <p style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 10 }}>Practice with Sarah before the real conversation</p>
          <p style={{ fontSize: 14, color: '#c7d2fe', lineHeight: 1.7, marginBottom: 24 }}>
            Sarah, Hayven&apos;s AI career coach, will build scripts tailored to your specific situation and roleplay the negotiation with you.
          </p>
          <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#1e1b4b', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 800, textDecoration: 'none' }}>
            Try Sarah free <ArrowRight size={14} />
          </Link>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '28px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/" style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', textDecoration: 'none' }}>Hayven</Link>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link href="/salary-negotiation" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>Salary Negotiation</Link>
            <Link href="/how-to-ask-for-a-raise" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>Ask for a Raise</Link>
            <Link href="/ai-career-coach" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>AI Career Coach</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
