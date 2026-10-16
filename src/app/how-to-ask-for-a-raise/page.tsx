import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Ask for a Raise: Step-by-Step Guide & Scripts | Hayven',
  description: 'Learn exactly how to ask for a raise at work — when to ask, how to prepare your case, scripts that work, and how to handle every response from your manager.',
  alternates: { canonical: 'https://gethayven.com/how-to-ask-for-a-raise' },
  openGraph: {
    title: 'How to Ask for a Raise: Step-by-Step Guide & Scripts | Hayven',
    description: 'When to ask, how to prepare, raise request scripts, and how to handle rejection.',
    url: 'https://gethayven.com/how-to-ask-for-a-raise',
    type: 'article',
    images: [{ url: 'https://gethayven.com/opengraph-image', width: 1200, height: 630, alt: 'Hayven — How to Ask for a Raise' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Ask for a Raise | Hayven',
    description: 'When to ask, how to prepare, raise request scripts, and how to handle rejection.',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Ask for a Raise: Step-by-Step Guide & Scripts',
  description: 'Learn exactly how to ask for a raise at work — when to ask, how to prepare, and scripts that work.',
  url: 'https://gethayven.com/how-to-ask-for-a-raise',
  datePublished: '2024-10-01',
  dateModified: '2025-10-16',
  author: { '@type': 'Organization', name: 'Hayven', url: 'https://gethayven.com' },
  image: 'https://gethayven.com/opengraph-image',
  publisher: {
    '@type': 'Organization',
    name: 'Hayven',
    url: 'https://gethayven.com',
    logo: { '@type': 'ImageObject', url: 'https://gethayven.com/logo.png' },
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I ask for a raise at work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Request a dedicated meeting with your manager — don\'t ambush them. In the meeting, present your case in three parts: your specific accomplishments from the past year, your market data showing what the role pays at the 75th percentile, and your specific number ask. Be direct and professional.',
      },
    },
    {
      '@type': 'Question',
      name: 'When is the best time to ask for a raise?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The best time to ask for a raise is: right after completing a major project or milestone, during your company\'s budget planning cycle (usually Q4), after taking on significant new responsibilities, or following a strong performance review. Avoid asking during layoffs, poor earnings, or right after a miss.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do I say when asking for a raise?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Be specific and data-driven: "Over the past year, I\'ve [accomplishment], [accomplishment], and taken on [new responsibility]. I\'ve researched market rates, and for this role and level in [location], the 75th percentile is around $[X]. I\'d like to discuss getting to $[Y]. What would it take to make that happen?"',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you ask for a raise successfully?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The keys to a successful raise ask: have market data as your anchor, present specific quantified accomplishments (not just effort), name a specific number (not a range), give your manager notice rather than surprising them, and be prepared to handle the most common objections professionally.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much of a raise should I ask for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ask for an amount that gets you to the 75th percentile of market pay for your role, level, and location. If you\'re currently below the 50th percentile, that often means requesting a 10–20% increase. If you\'re at the median, targeting the 75th percentile typically means a 5–12% ask. Your specific accomplishments and scope growth can justify going higher.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if my manager says no to my raise request?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A "no" is rarely permanent. Ask for a specific number and a timeline: "Can we agree on what it would take to get to $X and when we could revisit this?" Document the conversation in a follow-up email. If budget is truly the constraint, negotiate a one-time bonus or equity grant. If the answer remains no with no path forward, that is valuable information about whether to stay.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I ask for a raise in person or by email?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Request a dedicated meeting in person or by video call — do not ambush your manager in a regular 1:1 or send a cold raise request email without warning. The conversation is almost always more effective face-to-face because you can read the room, respond to objections, and build rapport. Follow up in writing after the meeting to document what was agreed.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gethayven.com' },
    { '@type': 'ListItem', position: 2, name: 'How to Ask for a Raise', item: 'https://gethayven.com/how-to-ask-for-a-raise' },
  ],
}

export default function HowToAskForARaisePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
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
      <section style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)', padding: '72px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#6ee7b7', letterSpacing: '0.1em', background: 'rgba(110,231,183,0.15)', padding: '4px 12px', borderRadius: 20 }}>
            RAISE REQUEST GUIDE
          </span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.03em', margin: '20px 0 20px' }}>
            How to ask for a raise — and get one
          </h1>
          <p style={{ fontSize: 17, color: '#a7f3d0', lineHeight: 1.75, maxWidth: 620, margin: '0 auto 36px' }}>
            A raise conversation is one of the highest-ROI conversations you can have. A 10% increase compounding over 10 years changes your career earnings by hundreds of thousands of dollars. Here&apos;s how to prepare and win it.
          </p>
          <Link href="/signup" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', color: '#064e3b',
            padding: '14px 28px', borderRadius: 9,
            fontSize: 15, fontWeight: 700, textDecoration: 'none',
          }}>
            Build your raise case with Sarah <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Main content */}
      <main style={{ maxWidth: 780, margin: '0 auto', padding: '64px 24px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a' }}>

        {/* TOC */}
        <nav style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '24px 28px', marginBottom: 56 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#64748b', letterSpacing: '0.06em', marginBottom: 14 }}>IN THIS GUIDE</p>
          <ol style={{ paddingLeft: 20, margin: 0 }}>
            {[
              'When to ask for a raise',
              'How to prepare your case',
              'How to document your accomplishments',
              'How to set your target number',
              'How to request the meeting',
              'The raise request conversation: what to say',
              'Email template: how to ask for a raise by email',
              'How to handle rejection',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: 14, color: '#2563eb', marginBottom: 8 }}>
                <a href={`#raise-section-${i + 1}`} style={{ color: '#2563eb', textDecoration: 'none' }}>{item}</a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Section 1 */}
        <h2 id="raise-section-1" style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16, marginTop: 0 }}>
          When to ask for a raise
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 24 }}>
          Timing matters. The same ask, made at different times, can produce very different results. Here are the moments that give your raise request the best chance:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14, marginBottom: 24 }}>
          {[
            { label: 'After a major win', desc: 'Just shipped something important? Your leverage is highest when your value is most visible.' },
            { label: 'After taking on new scope', desc: 'If you\'re managing more, building more, or responsible for more than your job description, that\'s a raise argument.' },
            { label: 'During budget planning', desc: 'Most companies plan compensation in Q4. Asking in September–November means you\'re in the room when decisions are made.' },
            { label: 'After a strong review', desc: 'A strong performance review is explicit evidence of your value. Use it immediately.' },
            { label: 'When you have market data', desc: 'If you\'ve recently researched and discovered you\'re significantly below market, that data is a legitimate trigger regardless of timing.' },
          ].map(({ label, desc }) => (
            <div key={label} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '18px 20px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#15803d', marginBottom: 6 }}>{label}</p>
              <p style={{ fontSize: 13, color: '#166534', lineHeight: 1.65, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 40 }}>
          <strong>When not to ask:</strong> right after company layoffs, a difficult earnings announcement, or a period where you made a significant mistake. These aren&apos;t permanent disqualifiers — just the wrong moment.
        </p>

        {/* Section 2 */}
        <h2 id="raise-section-2" style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
          How to prepare your case
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 16 }}>
          A raise is a business decision, not a personal favor. Your manager needs to justify it to their manager and to HR. Give them the material to do that. Your case needs three elements:
        </p>
        <ol style={{ paddingLeft: 24, marginBottom: 40 }}>
          {[
            { label: 'Your accomplishments', desc: 'Specific, quantified wins from the past 12 months. Not activities — outcomes. Revenue generated, costs saved, time reduced, quality improved. Three to five strong examples is better than a long list of vague contributions.' },
            { label: 'Your market rate', desc: 'What does the market pay for your role, level, and location? Use Levels.fyi, LinkedIn Salary, and Glassdoor. Hayven\'s Compensation Analyzer will give you your 25th–90th percentile range. Target the 75th percentile as your ask.' },
            { label: 'Your specific number', desc: 'A single number, not a range. "I\'m asking for $X" is stronger than "I\'m hoping for somewhere in the $X–$Y range." Ranges give your manager an easy anchor point at the bottom.' },
          ].map(({ label, desc }, i) => (
            <li key={i} style={{ fontSize: 16, color: '#334155', marginBottom: 20, lineHeight: 1.7 }}>
              <strong>{label}</strong> — {desc}
            </li>
          ))}
        </ol>

        {/* Section 3 */}
        <h2 id="raise-section-3" style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
          How to document your accomplishments
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 16 }}>
          Most people struggle here because they haven&apos;t tracked their work. Here&apos;s how to reconstruct it:
        </p>
        <ul style={{ paddingLeft: 24, marginBottom: 24 }}>
          {[
            'Review your last 12 months of email for projects you shipped, problems you solved, and praise you received',
            'Look at JIRA/Notion/Asana for completed work and ownership',
            'Ask yourself: what would have gone wrong or not happened if I wasn\'t here?',
            'Convert activities to outcomes: "I led the rebrand" → "I led the rebrand which reduced churn by 12%"',
            'Include scope growth: any responsibilities you took on that weren\'t in your original job description',
          ].map((item) => (
            <li key={item} style={{ fontSize: 15, color: '#334155', marginBottom: 12, lineHeight: 1.7 }}>{item}</li>
          ))}
        </ul>
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: '18px 22px', marginBottom: 40 }}>
          <p style={{ fontSize: 14, color: '#92400e', lineHeight: 1.7, margin: 0 }}>
            <strong>Pro tip:</strong> Start a running document called &ldquo;wins log&rdquo; and add to it monthly. When raise season comes, you&apos;ll have everything ready. Hayven&apos;s Raise Builder can help you organize and articulate your accomplishments.
          </p>
        </div>

        {/* Section 4 */}
        <h2 id="raise-section-4" style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
          How to set your target number
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 16 }}>
          Your ask should be anchored to market data, not to how much you want or need. Here&apos;s how to arrive at the right number:
        </p>
        <ol style={{ paddingLeft: 24, marginBottom: 40 }}>
          <li style={{ fontSize: 16, color: '#334155', marginBottom: 16, lineHeight: 1.7 }}>
            Find the <strong>50th percentile</strong> for your role, level, and location. This is your floor — going below it means you&apos;re accepting below-average pay.
          </li>
          <li style={{ fontSize: 16, color: '#334155', marginBottom: 16, lineHeight: 1.7 }}>
            Find the <strong>75th percentile</strong>. This is your ask. If you&apos;re already at the 75th percentile, argue for the 90th based on your specific accomplishments and scope growth.
          </li>
          <li style={{ fontSize: 16, color: '#334155', marginBottom: 16, lineHeight: 1.7 }}>
            Set a <strong>walk-away point</strong> — the minimum increase that would feel like real progress. If you&apos;d accept a 5% increase but are asking for 12%, knowing your floor helps you negotiate without either caving immediately or holding out for too much.
          </li>
        </ol>

        {/* Section 5 */}
        <h2 id="raise-section-5" style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
          How to request the meeting
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 16 }}>
          Never ambush your manager with a compensation conversation. Request a dedicated meeting so they can come prepared. Here&apos;s what to say:
        </p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '24px 28px', marginBottom: 40 }}>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: '#0f172a', margin: 0, fontStyle: 'italic' }}>
            &ldquo;Hey [name], I&apos;d love to find 30 minutes to talk about my compensation. I&apos;ve been doing some market research and I have some thoughts I&apos;d like to share. Can we find time this week or next?&rdquo;
          </p>
        </div>

        {/* Section 6 */}
        <h2 id="raise-section-6" style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
          The raise request conversation: what to say
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 16 }}>
          In the meeting, follow this structure:
        </p>
        <div style={{ marginBottom: 40 }}>
          {[
            { step: '1. Open with your contributions', script: '"Over the past year, I\'ve [accomplishment 1], [accomplishment 2], and [accomplishment 3]. I\'ve also taken on [new responsibility] that wasn\'t in my original scope."' },
            { step: '2. Present market data', script: '"I\'ve been researching what the market pays for this role at my level and location. The 75th percentile is around $[X] — I\'m currently at $[Y], which puts me below that."' },
            { step: '3. Make your specific ask', script: '"I\'d like to get to $[Z]. Is that something we can make happen?"' },
            { step: '4. Stop talking', script: 'After you name your number, be quiet. The silence is intentional. Don\'t soften it, don\'t add qualifiers, don\'t talk yourself down. Let your manager respond.' },
          ].map(({ step, script }) => (
            <div key={step} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #f1f5f9' }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{step}</p>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '16px 20px' }}>
                <p style={{ fontSize: 14, color: '#0f172a', margin: 0, fontStyle: 'italic', lineHeight: 1.7 }}>{script}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section 7 */}
        <h2 id="raise-section-7" style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Email template: how to ask for a raise by email
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 16 }}>
          An in-person or phone conversation is usually more effective than email for raise requests — it&apos;s harder to say no when you&apos;re present. But if email is more appropriate in your situation, here&apos;s a template:
        </p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '24px 28px', marginBottom: 40, fontFamily: 'monospace' }}>
          <p style={{ fontSize: 14, color: '#0f172a', lineHeight: 1.85, margin: 0 }}>
            Subject: Compensation discussion — [Your Name]<br /><br />
            Hi [Manager],<br /><br />
            I&apos;d like to discuss my compensation. Over the past year, I&apos;ve [accomplishment 1], [accomplishment 2], and [accomplishment 3]. I&apos;ve also [scope growth].<br /><br />
            I&apos;ve been researching market rates for [role] at my level in [location]. Based on that research — using LinkedIn Salary, Glassdoor, and Hayven — the 75th percentile is around $[X]. My current base of $[Y] is below that range.<br /><br />
            I&apos;d like to get to $[Z]. Could we find 30 minutes to discuss?<br /><br />
            Thank you,<br />
            [Your Name]
          </p>
        </div>

        {/* Section 8 */}
        <h2 id="raise-section-8" style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
          How to handle rejection
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 24 }}>
          A &ldquo;no&rdquo; to your raise request is rarely permanent. How you respond determines whether it becomes a permanent no or a deferred yes:
        </p>
        {[
          {
            response: '"The budget isn\'t there right now."',
            handle: 'Ask for a timeline and a commitment: "I understand — can we agree on a specific number and a date to revisit this? I want to make sure we\'re working toward the same goal."',
          },
          {
            response: '"You\'re already at the top of your band."',
            handle: 'Discuss promotion: "That\'s helpful to know. What would it take to move to the next level? I\'d like to create a plan to get there." If a promotion isn\'t feasible, negotiate a one-time bonus or equity in lieu of base.',
          },
          {
            response: '"Your performance hasn\'t been at that level."',
            handle: 'Treat this as critical feedback, not a dismissal. Ask: "Can you help me understand specifically what I need to do differently? I\'d like to set clear goals and revisit this in 90 days."',
          },
        ].map(({ response, handle }) => (
          <div key={response} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #f1f5f9' }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{response}</p>
            <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.8, margin: 0 }}>{handle}</p>
          </div>
        ))}
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 48 }}>
          Whatever the outcome, <strong>follow up in writing</strong>. Send an email summarizing what was agreed, what the timeline is, and what the next steps are. This creates accountability and ensures there&apos;s no ambiguity later.
        </p>

        {/* Preparation checklist */}
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 14, padding: '28px 32px', marginBottom: 48 }}>
          <p style={{ fontSize: 16, fontWeight: 800, color: '#15803d', marginBottom: 16 }}>Raise request preparation checklist</p>
          {[
            'Document 3–5 specific, quantified accomplishments from the past year',
            'Research your 50th and 75th percentile market rate',
            'Choose your specific ask number (not a range)',
            'Know your walk-away floor',
            'Request a dedicated meeting — don\'t ambush in a 1:1',
            'Prepare for "the budget isn\'t there" objection',
            'Send a follow-up email with agreed next steps after the meeting',
          ].map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
              <CheckCircle size={16} color="#15803d" style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontSize: 15, color: '#166534' }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Related links */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Related guides</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link href="/salary-negotiation" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>
              → How to negotiate salary for a new job offer
            </Link>
            <Link href="/ai-career-coach" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>
              → Meet Sarah — AI career coach that builds your raise case
            </Link>
            <Link href="/resources/ask-for-a-raise-email" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>
              → Raise request email templates — copy and use
            </Link>
            <Link href="/compensation-analyzer" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>
              → Check your market rate
            </Link>
            <Link href="/blog/how-to-ask-for-a-raise-scripts-that-work" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>
              → Raise scripts that actually work (blog post)
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
          borderRadius: 16, padding: '40px 36px', textAlign: 'center',
        }}>
          <p style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 12, letterSpacing: '-0.02em' }}>
            Build your raise case with Sarah
          </p>
          <p style={{ fontSize: 15, color: '#a7f3d0', lineHeight: 1.7, marginBottom: 28 }}>
            Sarah, Hayven&apos;s AI career coach, will help you document your accomplishments, find your market rate, build your raise request script, and roleplay the conversation until you&apos;re ready.
          </p>
          <Link href="/signup" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', color: '#064e3b',
            padding: '13px 26px', borderRadius: 9,
            fontSize: 15, fontWeight: 800, textDecoration: 'none',
          }}>
            Try Sarah free <ArrowRight size={15} />
          </Link>
          <p style={{ fontSize: 13, color: '#6ee7b7', marginTop: 12 }}>No credit card required</p>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '32px 24px' }}>
        <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/" style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', textDecoration: 'none' }}>Hayven</Link>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <Link href="/salary-negotiation" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>Salary Negotiation</Link>
            <Link href="/how-to-ask-for-a-raise" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>Ask for a Raise</Link>
            <Link href="/ai-career-coach" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>AI Career Coach</Link>
            <Link href="/salary-calculator" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>Salary Calculator</Link>
          </div>
          <p style={{ fontSize: 12, color: '#94a3b8', width: '100%', marginTop: 8 }}>
            © {new Date().getFullYear()} Hayven. AI-generated guidance for informational purposes.
          </p>
        </div>
      </footer>
    </>
  )
}
