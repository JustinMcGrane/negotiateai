import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Ask for a Raise Email Templates — Copy & Use | Hayven',
  description: 'Professional raise request email templates for every situation. Request a meeting, make your case, follow up after rejection, and document a verbal agreement. Copy and use.',
  alternates: { canonical: 'https://gethayven.com/resources/ask-for-a-raise-email' },
  openGraph: {
    title: 'Ask for a Raise Email Templates | Hayven',
    description: 'Copy-and-use email templates for raise requests, follow-ups, and handling rejection.',
    url: 'https://gethayven.com/resources/ask-for-a-raise-email',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Ask for a Raise Email Templates — Copy & Use',
  description: 'Professional raise request email templates for requesting a meeting, making your case, and following up.',
  url: 'https://gethayven.com/resources/ask-for-a-raise-email',
  publisher: { '@type': 'Organization', name: 'Hayven', url: 'https://gethayven.com' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gethayven.com' },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://gethayven.com/resources' },
    { '@type': 'ListItem', position: 3, name: 'Ask for a Raise Email', item: 'https://gethayven.com/resources/ask-for-a-raise-email' },
  ],
}

const templates = [
  {
    title: 'Request a meeting to discuss a raise',
    context: 'The first email — requesting a dedicated conversation. Do not ask for the raise itself in this email. Just request the meeting.',
    template: `Subject: Compensation discussion — [Your Name]

Hi [Manager Name],

I'd like to find 30 minutes to talk about my compensation. I've been doing some market research and I have some thoughts I'd like to share — can we put something on the calendar this week or next?

Thank you,
[Your Name]`,
    note: 'Giving your manager advance notice signals professionalism and gives them time to prepare. Avoid surprising them in a regular 1:1.',
  },
  {
    title: 'Full raise request by email',
    context: 'Use when you\'re making the raise request in writing rather than in person. Best suited when your manager prefers written communication or works remotely.',
    template: `Subject: Raise request — [Your Name]

Hi [Manager Name],

I'd like to formally request a compensation review. I've been reflecting on my contributions over the past year and have done some research on market rates. I want to share both.

Over the past 12 months, I've:
- [Specific accomplishment 1 — include a number or outcome]
- [Specific accomplishment 2]
- [Specific accomplishment 3]
- Taken on [new responsibility not originally in my role]

I've also researched market compensation for [title] at my level in [location]. Based on data from [sources], the 75th percentile is around $[X]. My current base of $[Y] is below that range.

I'd like to discuss getting to $[specific ask]. I believe this reflects both my contributions and a fair market rate.

Could we schedule time to discuss? I'm happy to provide any additional context in that conversation.

Thank you,
[Your Name]`,
    note: 'Lead with your accomplishments, then the market data, then your specific ask. One number, not a range.',
  },
  {
    title: 'Follow-up after a verbal raise conversation',
    context: 'Send within 24 hours of any verbal raise conversation — whether it went well or not. This documents what was agreed and prevents "I don\'t remember what we said."',
    template: `Subject: Follow-up from our compensation conversation

Hi [Manager Name],

Thank you for making time to discuss this today. I want to make sure we're aligned on next steps.

As I understood our conversation:
- [Summary of what was agreed — e.g., "You'll bring this to HR for review" / "We'll revisit in Q2" / "A raise to $X is approved effective [date]"]
- [Any next steps — e.g., "You'll follow up by [date]"]

Please let me know if I've missed anything or if there's anything you need from me in the meantime.

[Your Name]`,
    note: 'This email is critical. A verbal "we\'ll revisit this" without a written follow-up often goes nowhere. Document everything.',
  },
  {
    title: 'Follow-up after no response',
    context: 'When you\'ve had a raise conversation or sent a raise request and haven\'t heard back after 1–2 weeks.',
    template: `Subject: Following up — compensation discussion

Hi [Manager Name],

I wanted to follow up on our conversation from [date / recent 1:1] about my compensation. I don't want to let this fall through the cracks — I think the case is strong and I'd like to keep the momentum.

Is there anything you need from me to move this forward? Happy to provide more detail on my accomplishments or the market data.

Thank you,
[Your Name]`,
    note: 'Keep it professional and forward-looking. Don\'t express frustration — just reopen the conversation.',
  },
  {
    title: 'After receiving a "not now" response',
    context: 'When your manager or HR says the timing isn\'t right or the budget isn\'t available.',
    template: `Subject: Re: Compensation discussion

Hi [Manager Name],

Thank you for being transparent about the timing. I understand there are real constraints.

To make sure we stay aligned, can we agree on a specific number and a timeline? I'd like to have a clear goal to work toward together. If we can get to $[X] by [quarter/date], that works for me — but I want to make sure we both have that commitment.

I'll also follow up in [timeframe — e.g., 60 days] to check in on where things stand.

Thank you,
[Your Name]`,
    note: 'Don\'t accept "not now" without a date and a number attached to it. Vague commitments rarely materialize.',
  },
]

export default function AskForARaiseEmailPage() {
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
      <section style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)', padding: '60px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <nav style={{ fontSize: 13, color: '#6ee7b7', marginBottom: 20 }}>
            <Link href="/" style={{ color: '#6ee7b7', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <Link href="/how-to-ask-for-a-raise" style={{ color: '#6ee7b7', textDecoration: 'none' }}>How to Ask for a Raise</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <span style={{ color: '#a7f3d0' }}>Email Templates</span>
          </nav>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#6ee7b7', letterSpacing: '0.1em', background: 'rgba(110,231,183,0.15)', padding: '4px 12px', borderRadius: 20 }}>RESOURCE</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.03em', margin: '16px 0 16px' }}>
            Ask for a raise email templates
          </h1>
          <p style={{ fontSize: 16, color: '#a7f3d0', lineHeight: 1.75, maxWidth: 560, margin: '0 auto' }}>
            Copy-and-use email templates for every stage of asking for a raise — from requesting the meeting to following up after rejection.
          </p>
        </div>
      </section>

      <main style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 16 }}>
          Email is useful at multiple stages of the raise process: to request a meeting, to follow up in writing, and to document verbal agreements. These templates cover each scenario. Replace all [bracketed placeholders] before sending.
        </p>
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: '16px 20px', marginBottom: 48 }}>
          <p style={{ fontSize: 14, color: '#92400e', margin: 0, lineHeight: 1.65 }}>
            <strong>Best practice:</strong> An in-person or video conversation is usually more effective than a cold email raise request. Use the &ldquo;request a meeting&rdquo; template first, then have the conversation in person, and send a follow-up email to document what was agreed.
          </p>
        </div>

        {templates.map(({ title, context, template, note }, i) => (
          <section key={i} style={{ marginBottom: 48, paddingBottom: 48, borderBottom: '1px solid #f1f5f9' }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 10 }}>
              {i + 1}. {title}
            </h2>
            <p style={{ fontSize: 14, color: '#64748b', fontStyle: 'italic', marginBottom: 16 }}>
              <strong>When to use:</strong> {context}
            </p>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '22px 26px', marginBottom: 12 }}>
              <pre style={{ fontSize: 13, color: '#0f172a', lineHeight: 1.85, margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                {template}
              </pre>
            </div>
            <p style={{ fontSize: 13, color: '#64748b', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: '10px 14px', margin: 0 }}>
              💡 {note}
            </p>
          </section>
        ))}

        {/* Related links */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>Related resources</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link href="/how-to-ask-for-a-raise" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>→ Complete guide: how to ask for a raise</Link>
            <Link href="/resources/salary-negotiation-email" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>→ Salary negotiation email templates (for job offers)</Link>
            <Link href="/resources/salary-negotiation-scripts" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>→ Phone/in-person negotiation scripts</Link>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)', borderRadius: 14, padding: '36px 32px', textAlign: 'center' }}>
          <p style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 10 }}>Build your raise request with Sarah</p>
          <p style={{ fontSize: 14, color: '#a7f3d0', lineHeight: 1.7, marginBottom: 24 }}>
            Sarah, Hayven&apos;s AI career coach, generates a personalized raise request email based on your specific accomplishments, role, and market data.
          </p>
          <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#064e3b', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 800, textDecoration: 'none' }}>
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
