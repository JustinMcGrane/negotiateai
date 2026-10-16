import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Salary Negotiation Email Templates — Copy & Use | Hayven',
  description: 'Ready-to-use salary negotiation email templates. Counter a job offer, ask for a raise by email, respond to a lowball offer, and more. Copy and adapt for your situation.',
  alternates: { canonical: 'https://gethayven.com/resources/salary-negotiation-email' },
  openGraph: {
    title: 'Salary Negotiation Email Templates | Hayven',
    description: 'Copy-and-use email templates for salary negotiation, counter-offers, and raise requests.',
    url: 'https://gethayven.com/resources/salary-negotiation-email',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Salary Negotiation Email Templates — Copy & Use',
  description: 'Ready-to-use salary negotiation email templates for counter-offers, raise requests, and more.',
  url: 'https://gethayven.com/resources/salary-negotiation-email',
  publisher: { '@type': 'Organization', name: 'Hayven', url: 'https://gethayven.com' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gethayven.com' },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://gethayven.com/resources' },
    { '@type': 'ListItem', position: 3, name: 'Salary Negotiation Email', item: 'https://gethayven.com/resources/salary-negotiation-email' },
  ],
}

const templates = [
  {
    title: 'Counter-offer email for a new job',
    context: 'Use after receiving a job offer when you want to negotiate the base salary.',
    template: `Subject: Re: Offer — [Your Name]

Hi [Recruiter/Hiring Manager Name],

Thank you for the offer — I'm genuinely excited about joining [Company] and I'm confident I can contribute significantly to [team/mission].

I'd like to discuss the base salary. I've researched market compensation for [title] in [location] at my level, and I'm seeing the 75th percentile at approximately $[X]. Given my [specific background — e.g., 6 years of relevant experience, expertise in X], I'd like to come in at $[specific ask].

Is there flexibility to get to that number? I'm committed to this opportunity and want to find a path forward together.

Looking forward to your response,
[Your Name]`,
  },
  {
    title: 'Counter-offer when the offer is significantly below market',
    context: 'When the offer is notably below what you expected based on your research.',
    template: `Subject: Re: Offer — [Your Name]

Hi [Name],

Thank you for the offer and for the time you and the team invested in the interview process. I enjoyed meeting everyone and I'm very interested in the role.

I do want to be transparent: the base salary is lower than I expected based on my research. For [title] in [location], I'm seeing a market range of $[X]–$[Y], with the 75th percentile at $[Z]. The offer of $[offer amount] is below that range.

I'd like to ask whether we can revisit the base. My target is $[ask]. If there's flexibility there, I'm ready to move forward.

If base compensation is fixed, I'd also welcome a conversation about whether there's room to adjust the signing bonus or equity to bridge the gap.

Thank you,
[Your Name]`,
  },
  {
    title: 'Raise request email',
    context: 'Use to request a meeting to discuss a raise with your manager.',
    template: `Subject: Compensation discussion — [Your Name]

Hi [Manager Name],

I'd like to find time to talk about my compensation. Over the past year, I've [specific accomplishment 1], [specific accomplishment 2], and taken on [new responsibility]. I've also been doing some research on market rates.

Could we schedule 30 minutes sometime this week or next? I want to share my perspective and discuss a path forward.

Thank you,
[Your Name]`,
  },
  {
    title: 'Follow-up after a raise conversation',
    context: 'Send after a verbal raise conversation to document what was agreed.',
    template: `Subject: Follow-up from our compensation conversation

Hi [Manager Name],

Thank you for the conversation earlier. I wanted to follow up in writing to make sure we're aligned.

As I understood it, we agreed to [specific outcome — e.g., revisit my compensation at the start of Q2 / work toward a base of $X by [date]]. Is that your understanding as well?

I appreciate your support and I'm looking forward to continuing to make an impact on [project/team].

[Your Name]`,
  },
  {
    title: 'Negotiating a signing bonus when base is firm',
    context: 'When the recruiter has confirmed the base is fixed but you want to close the gap.',
    template: `Subject: Re: Offer — Signing bonus question

Hi [Name],

Thank you for confirming the base — I understand the constraints. I do want to find a way to make this work, so I wanted to ask: is there flexibility in the signing bonus?

A one-time bonus of $[X] would help bridge the gap between the base and my market research. I'm committed to this role and want to get to yes — I appreciate your help finding a path.

[Your Name]`,
  },
]

export default function SalaryNegotiationEmailPage() {
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
          <nav style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>
            <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <Link href="/salary-negotiation" style={{ color: '#64748b', textDecoration: 'none' }}>Salary Negotiation</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <span style={{ color: '#94a3b8' }}>Email Templates</span>
          </nav>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#7AB8E8', letterSpacing: '0.1em', background: 'rgba(122,184,232,0.15)', padding: '4px 12px', borderRadius: 20 }}>RESOURCE</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.03em', margin: '16px 0 16px' }}>
            Salary negotiation email templates
          </h1>
          <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.75, maxWidth: 560, margin: '0 auto' }}>
            Ready-to-use email templates for every stage of salary negotiation. Copy, fill in the brackets, and send.
          </p>
        </div>
      </section>

      <main style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 16 }}>
          Email is often a better medium than phone for the initial counter-offer — it gives the employer time to consider, it documents the conversation, and it removes the pressure to respond immediately. These templates are written to be professional, specific, and collaborative in tone.
        </p>
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: '16px 20px', marginBottom: 48 }}>
          <p style={{ fontSize: 14, color: '#92400e', margin: 0, lineHeight: 1.65 }}>
            <strong>How to use these templates:</strong> Replace all [bracketed placeholders] with your actual information before sending. Never send a template with placeholders still in it. Personalize at minimum the name, role, location, and salary numbers.
          </p>
        </div>

        {templates.map(({ title, context, template }, i) => (
          <section key={i} style={{ marginBottom: 48, paddingBottom: 48, borderBottom: '1px solid #f1f5f9' }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 10 }}>
              {i + 1}. {title}
            </h2>
            <p style={{ fontSize: 14, color: '#64748b', fontStyle: 'italic', marginBottom: 16 }}>
              <strong>When to use:</strong> {context}
            </p>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '22px 26px' }}>
              <pre style={{ fontSize: 13, color: '#0f172a', lineHeight: 1.85, margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                {template}
              </pre>
            </div>
          </section>
        ))}

        {/* Related links */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>Related resources</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link href="/resources/salary-negotiation-scripts" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>→ Phone/in-person negotiation scripts</Link>
            <Link href="/resources/ask-for-a-raise-email" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>→ Ask for a raise email templates</Link>
            <Link href="/salary-negotiation" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>→ Complete salary negotiation guide</Link>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #1d4ed8 100%)', borderRadius: 14, padding: '36px 32px', textAlign: 'center' }}>
          <p style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 10 }}>Get a personalized email for your specific situation</p>
          <p style={{ fontSize: 14, color: '#c7d2fe', lineHeight: 1.7, marginBottom: 24 }}>
            Sarah, Hayven&apos;s AI career coach, writes counter-offer emails tailored to your specific role, offer, and market data.
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
