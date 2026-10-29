import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Salary Negotiation: The Complete Guide | Hayven',
  description: 'Learn how to negotiate salary with confidence. Step-by-step guide covering market research, counter-offer strategies, negotiation scripts, email templates, and how to handle pushback.',
  alternates: { canonical: 'https://gethayven.com/salary-negotiation' },
  openGraph: {
    title: 'Salary Negotiation: The Complete Guide | Hayven',
    description: 'Step-by-step guide to negotiating your salary. Market research, counter-offer strategies, negotiation scripts, and email templates.',
    url: 'https://gethayven.com/salary-negotiation',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salary Negotiation: The Complete Guide | Hayven',
    description: 'Learn how to negotiate salary with confidence — market research, counter-offer scripts, email templates, and objection handling.',
  },
}

const FAQ_ITEMS = [
  {
    q: 'When should you negotiate salary?',
    a: 'Negotiate after you have a written offer in hand, not during the first interview. At that point, the employer has already decided they want you — their leverage is lower and yours is higher. For raises, the best time is after a major win, before performance review cycles, or when you have a competing offer.',
  },
  {
    q: 'How much can you realistically negotiate?',
    a: 'For a new job offer, 10–20% above the initial offer is a reasonable range for most roles. For a raise, 5–15% is typical, though higher is possible with a strong case or competing offer. The key is anchoring to market data, not to what feels comfortable to ask.',
  },
  {
    q: 'What if the employer says the offer is final?',
    a: '"The offer is final" is almost never literally true — it\'s a negotiating tactic. Respond by reaffirming your interest, citing your market data, and asking specifically: "Is there any flexibility on the base salary?" If base truly can\'t move, negotiate signing bonus, equity, vacation, or start date.',
  },
  {
    q: 'Should you negotiate salary by email or in person?',
    a: 'Both work. Email gives you time to craft a precise response and creates a paper trail. Phone or video lets you read the reaction and respond in real time. For the initial counter, email is often better — it\'s harder to get caught off guard and you can reference your market data clearly.',
  },
  {
    q: 'What should you say when asked about salary expectations?',
    a: 'Delay as long as possible. Say: "I\'d love to learn more about the role and total comp package first — can you share the range budgeted for this position?" If pressed, give a range anchored above your target, e.g., "Based on my research, I\'m targeting $X–$Y."',
  },
  {
    q: 'Does negotiating salary hurt your chances of getting the offer?',
    a: 'Rarely. A 2024 survey found that fewer than 5% of offers are rescinded because of negotiation. Hiring managers expect candidates to negotiate — it signals that you know your value and are serious about the role. The risk of asking respectfully is almost always lower than the cost of not asking.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Salary Negotiation: The Complete Guide to Getting Paid What You\'re Worth',
      description: 'A comprehensive guide to salary negotiation — from market research to counter-offer scripts and handling objections.',
      url: 'https://gethayven.com/salary-negotiation',
      datePublished: '2026-10-16',
      dateModified: '2026-10-16',
      publisher: {
        '@type': 'Organization',
        name: 'Hayven',
        url: 'https://gethayven.com',
      },
      author: {
        '@type': 'Organization',
        name: 'Hayven',
      },
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

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gethayven.com' },
    { '@type': 'ListItem', position: 2, name: 'Salary Negotiation', item: 'https://gethayven.com/salary-negotiation' },
  ],
}

export default function SalaryNegotiationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div style={{ background: '#fff', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, Inter, sans-serif' }}>

        {/* Header */}
        <header className="tool-landing-header" style={{
          borderBottom: '0.5px solid #e5e7eb', padding: '0 32px', height: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, background: '#fff', zIndex: 50,
        }}>
          <Link href="/" style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', textDecoration: 'none', letterSpacing: '-0.02em' }}>Hayven</Link>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link href="/login" style={{ fontSize: 14, color: '#6b7280', textDecoration: 'none', padding: '7px 14px' }}>Sign in</Link>
            <Link href="/signup" style={{ fontSize: 14, fontWeight: 700, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', textDecoration: 'none', padding: '8px 18px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>Get Started Free <ArrowRight size={14} /></Link>
          </div>
        </header>

        {/* Hero */}
        <section style={{ maxWidth: 760, margin: '0 auto', padding: '72px 32px 80px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, color: '#4A90D9', background: '#EBF5FB', padding: '4px 14px', borderRadius: 20, letterSpacing: '0.08em', marginBottom: 24 }}>
            SALARY NEGOTIATION GUIDE
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: 24 }}>
            Salary Negotiation: The Complete Guide to Getting Paid What You&apos;re Worth
          </h1>
          <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, marginBottom: 40, maxWidth: 580, margin: '0 auto 40px' }}>
            Most people never negotiate — and it costs them hundreds of thousands of dollars over a career. This guide covers everything: when to negotiate, how to research your market rate, what to say, and how to handle every objection.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" style={{
              height: 50, display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '0 28px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              color: '#fff',
              borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 3px 10px rgba(239,68,68,0.3)',
            }}>
              Practice with Sarah (AI Coach) <ArrowRight size={15} />
            </Link>
            <Link href="/worth" style={{
              height: 50, display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '0 28px', background: '#1a4fa0', color: '#fff',
              borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none',
            }}>
              Check my market rate
            </Link>
          </div>
          <p style={{ marginTop: 16, fontSize: 13, color: '#94a3b8' }}>Free to start. Pro is $20/month.</p>
        </section>

        {/* Why negotiate */}
        <section style={{ background: '#f8fafc', padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 20 }}>
              Why salary negotiation matters more than you think
            </h2>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 20 }}>
              The average professional who doesn&apos;t negotiate their first offer leaves $5,000–$10,000 on the table immediately. But the real cost is the compounding effect: every raise, bonus, and future offer is anchored to what you&apos;re making now. Fail to negotiate at 25, and you&apos;re shortchanged for decades.
            </p>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 20 }}>
              Research consistently shows that 70–85% of hiring managers have room to negotiate beyond the first offer. Most simply wait to see if you ask. Yet surveys show that fewer than half of job seekers negotiate at all — largely because they don&apos;t know what to say or fear damaging the relationship.
            </p>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8 }}>
              This guide gives you a complete system: how to research your number, when to bring it up, exactly what to say, and how to handle every response — including the ones designed to make you back down.
            </p>
          </div>
        </section>

        {/* Step-by-step */}
        <section style={{ padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 48 }}>
              How to negotiate salary: step by step
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
              {[
                {
                  step: '1',
                  title: 'Research your market rate before anything else',
                  body: 'Negotiation without data is guessing. Before any conversation, know: what the market pays for your role, level, and city. Use multiple sources — Levels.fyi, Glassdoor, LinkedIn Salary, Payscale — and calibrate for company size and funding stage. Your target number should be in the 75th percentile range, not the median.',
                },
                {
                  step: '2',
                  title: 'Wait for a written offer before negotiating',
                  body: 'Never negotiate in the first interview. You have the most leverage after the employer has decided they want you — that\'s after the written offer arrives. Rushing the negotiation earlier signals desperation and anchors the conversation before you have all the information.',
                },
                {
                  step: '3',
                  title: 'Express enthusiasm, then counter',
                  body: 'Start by affirming you\'re excited about the role. Then state your counter: "I\'m really excited about this opportunity. Based on my research and experience, I was expecting something closer to $X. Is there flexibility to get there?" Keep it direct, positive, and grounded in data — not personal need.',
                },
                {
                  step: '4',
                  title: 'Go higher than your target',
                  body: 'Anchor above your actual goal. If you want $120K, ask for $130K — negotiation almost always involves compromise, and anchoring high gives you room. The employer\'s first offer is their anchor; you need to set a new one.',
                },
                {
                  step: '5',
                  title: 'Negotiate the full package, not just base',
                  body: 'If base salary can\'t move, ask about signing bonus, equity, additional PTO, remote flexibility, or an earlier performance review. Every element of comp is negotiable. A $15,000 signing bonus or an extra week of vacation has real value that doesn\'t show in the base salary line.',
                },
                {
                  step: '6',
                  title: 'Get it in writing',
                  body: 'Once you\'ve agreed, confirm every change in writing before you sign anything. Ask for a revised offer letter or a written email confirming the updated terms. Verbal agreements can evaporate; written ones don\'t.',
                },
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

        {/* When to negotiate */}
        <section style={{ background: '#f8fafc', padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 20 }}>
              When to negotiate salary
            </h2>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 20 }}>
              Timing matters almost as much as what you say. The two main contexts are new job offers and raises at your current job — and each has its own optimal timing.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 32 }}>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '24px 28px' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>New job offers</div>
                <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.75 }}>Negotiate after you have a written offer. At this point they&apos;ve committed — your leverage is at its peak. Never negotiate before an offer is on the table.</div>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '24px 28px' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Raises at your current job</div>
                <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.75 }}>Best timing: right after a major win, when you have market data showing you&apos;re underpaid, or when you have a competing offer. Before annual review cycles works too — after a review, budgets are often locked.</div>
              </div>
            </div>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8 }}>
              See also: <Link href="/how-to-ask-for-a-raise" style={{ color: '#4A90D9', textDecoration: 'none', fontWeight: 600 }}>How to Ask for a Raise: A Step-by-Step Guide</Link>
            </p>
          </div>
        </section>

        {/* Research market rate */}
        <section style={{ padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 20 }}>
              How to research your market rate
            </h2>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 24 }}>
              Your market rate is the number everything else pivots on. Without it, you&apos;re either leaving money on the table or making an ask that sounds out of touch. Here&apos;s how to research it properly:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
              {[
                { title: 'Use multiple sources', body: 'Glassdoor, LinkedIn Salary, Levels.fyi (for tech), Payscale, and Salary.com all have different data sets. Cross-reference at least three.' },
                { title: 'Filter by location, level, and company size', body: 'A Senior Engineer at a seed-stage startup and at Google make vastly different salaries. Filter as specifically as you can.' },
                { title: 'Ask peers in your network', body: 'The most accurate data comes from people doing similar work. Be direct: "I\'m benchmarking my comp — would you be open to sharing your range?" Most people will.' },
                { title: 'Use AI to synthesize your data', body: 'Tools like Hayven\'s Sarah can pull together market data for your specific role, level, city, and company size and tell you your exact percentile — in seconds.' },
              ].map(({ title, body }) => (
                <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <CheckCircle size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.7 }}>{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The negotiation conversation */}
        <section style={{ background: '#0f172a', padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: 20 }}>
              The negotiation conversation: what to say
            </h2>
            <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.8, marginBottom: 24 }}>
              Most people rehearse the ask, but not the response. Here&apos;s a framework for the whole conversation:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 36 }}>
              {[
                { label: 'The opener', text: '"Thank you so much for the offer — I\'m genuinely excited about this role. I did want to discuss the compensation. Based on my research for [role] in [city], and given my background in [X], I was expecting something closer to $[number]. Is there flexibility to get there?"' },
                { label: 'After pushback', text: '"I understand. Can you help me understand what would make someone eligible for the top of the range? I want to make sure we\'re aligned on the value I\'d bring."' },
                { label: 'If base is truly fixed', text: '"I appreciate that. If the base is set, could we look at the signing bonus or equity? I want to find a way to make this work."' },
                { label: 'The close', text: '"This all sounds great. Can you send me a revised offer letter reflecting the updated terms? I\'m ready to move forward once I have that in writing."' },
              ].map(({ label, text }) => (
                <div key={label} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '20px 24px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#4A90D9', marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
                  <div style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.75, fontStyle: 'italic' }}>{text}</div>
                </div>
              ))}
            </div>
            <Link href="/signup" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              color: '#fff',
              padding: '12px 24px', borderRadius: 9,
              fontSize: 14, fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 3px 10px rgba(239,68,68,0.3)',
            }}>
              Practice this with Sarah <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Counter-offer strategies */}
        <section style={{ padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 20 }}>
              Counter-offer strategies that work
            </h2>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 24 }}>
              A counter-offer isn&apos;t just a number — it&apos;s a structured argument. The strongest counters combine a specific ask, a market data justification, and a reaffirmation of your commitment to the role.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              {[
                { title: 'The data anchor', body: 'Lead with market research. "Based on Glassdoor and LinkedIn data for this role in [city], the market median is $X — I\'m targeting $Y." This frames your ask as objective, not personal.' },
                { title: 'The experience premium', body: 'If you have a specific skill or experience they highlighted during interviews, name it. "Given my background in [X], which came up several times as a priority, I believe $Y is appropriate."' },
                { title: 'The competing offer', body: 'The most powerful lever you have. Use it carefully and honestly — never fabricate. "I do have another offer at $X. I prefer this role, but I need to see the comp closer to that range."' },
                { title: 'The package pivot', body: 'When base is fixed: "If the base can\'t move, could we add $10K to the signing bonus and an additional week of PTO?" Reframing the conversation expands what\'s possible.' },
              ].map(({ title, body }) => (
                <div key={title} style={{ background: '#f8fafc', borderRadius: 12, padding: '24px 20px' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{title}</div>
                  <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.75 }}>{body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Negotiating via email */}
        <section style={{ background: '#f8fafc', padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 20 }}>
              Negotiating salary via email
            </h2>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 20 }}>
              Email gives you time to choose your words carefully, reference your market data precisely, and avoid being caught off guard. For initial counters, many candidates prefer email — it gives both sides time to think. Here&apos;s the structure:
            </p>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '28px 32px', marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#4A90D9', marginBottom: 12, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Email template structure</div>
              <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.9 }}>
                <p style={{ marginBottom: 8 }}><strong style={{ color: '#0f172a' }}>Opening:</strong> Thank them and confirm your enthusiasm.</p>
                <p style={{ marginBottom: 8 }}><strong style={{ color: '#0f172a' }}>The ask:</strong> State your counter number and reference your market research.</p>
                <p style={{ marginBottom: 8 }}><strong style={{ color: '#0f172a' }}>Your value:</strong> One sentence on why you&apos;re worth it (specific experience or skill).</p>
                <p style={{ marginBottom: 0 }}><strong style={{ color: '#0f172a' }}>Close:</strong> Reaffirm you&apos;re excited and looking forward to resolving this.</p>
              </div>
            </div>
            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.8 }}>
              See the full template with exact language: <Link href="/blog/salary-negotiation-email-template" style={{ color: '#4A90D9', textDecoration: 'none', fontWeight: 600 }}>Salary Negotiation Email Templates That Work</Link>
            </p>
          </div>
        </section>

        {/* Handling objections */}
        <section style={{ padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 20 }}>
              Handling objections: the most common responses
            </h2>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 28 }}>
              Every negotiation hits the same objections. Know them in advance and you won&apos;t be caught off guard:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { objection: '"That\'s above our budget for this role."', response: '"I understand. Can you help me understand what the range is and what would justify the top of it? I want to make sure we\'re aligned."' },
                { objection: '"We don\'t negotiate — our offers are standard."', response: '"I appreciate that. Could we discuss the signing bonus or equity instead? I want to find a way to make this work."' },
                { objection: '"We can revisit this after 6 months on the job."', response: '"I\'d love to get something in writing about that — can we add a 6-month review with a target range to the offer letter?"' },
                { objection: '"Your current salary is X, so this is already a raise."', response: '"I appreciate that context. I\'m benchmarking against the market rate for this role and level, which puts me at $Y — my current comp doesn\'t change what the market pays."' },
              ].map(({ objection, response }) => (
                <div key={objection} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#dc2626', marginBottom: 8 }}>Objection: {objection}</div>
                  <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.75 }}>Response: <span style={{ fontStyle: 'italic' }}>{response}</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common mistakes */}
        <section style={{ background: '#f8fafc', padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 20 }}>
              Common salary negotiation mistakes
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { title: 'Accepting the first offer immediately', body: 'Taking the first offer signals that you didn\'t research the market and leaves money on the table. Even a brief "let me review the offer and follow up" buys you time to counter.' },
                { title: 'Anchoring to your current salary', body: 'Your current salary is irrelevant to the market rate. Never use it as justification for your ask — use market data instead.' },
                { title: 'Giving a range when asked for a number', body: 'Ranges invite employers to anchor to the bottom. Give a specific number with a brief data justification, not a range.' },
                { title: 'Negotiating against yourself', body: 'Don\'t volunteer concessions before they\'re asked for. Make your ask, then wait. Silence is a negotiating tool.' },
                { title: 'Not following up in writing', body: 'Always confirm agreed terms in writing before signing. "Just to confirm the base is $X, signing bonus $Y, and start date Z..." An email costs nothing; a misunderstanding can cost a lot.' },
              ].map(({ title, body }) => (
                <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fef2f2', border: '1.5px solid #fca5a5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2, fontSize: 11, fontWeight: 800, color: '#dc2626' }}>✕</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.7 }}>{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related resources */}
        <section style={{ padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 32 }}>
              Related guides and tools
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              {[
                { label: 'How to Ask for a Raise', href: '/how-to-ask-for-a-raise', desc: 'Step-by-step guide for getting a raise at your current job.' },
                { label: 'Salary Negotiation Email Templates', href: '/blog/salary-negotiation-email-template', desc: 'Copy-paste email scripts for your counter-offer.' },
                { label: 'How to Negotiate After a Job Offer', href: '/blog/how-to-negotiate-salary-after-job-offer', desc: 'Specific tactics for new job offer negotiations.' },
                { label: 'Salary Guides by Role', href: '/tools/salaries', desc: 'See p25–p90 salary ranges for your specific role and city.' },
                { label: 'Compensation Analyzer', href: '/compensation-analyzer', desc: 'Get your personalized market rate in 30 seconds.' },
                { label: 'AI Career Coach (Sarah)', href: '/sarah', desc: 'Get a personalized negotiation strategy from your AI coach.' },
              ].map(({ label, href, desc }) => (
                <Link key={href} href={href} style={{ display: 'block', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 20px', textDecoration: 'none' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1a4fa0', marginBottom: 6 }}>{label}</div>
                  <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{desc}</div>
                </Link>
              ))}
            </div>
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
              Ready to negotiate? Let Sarah coach you.
            </h2>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, marginBottom: 36 }}>
              Sarah gives you your market rate, writes your counter-offer, and walks you through every objection — personalized to your role and situation.
            </p>
            <Link href="/signup" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              color: '#fff',
              padding: '15px 36px', borderRadius: 10,
              fontSize: 16, fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(239,68,68,0.35)',
            }}>
              Start negotiating free <ArrowRight size={16} />
            </Link>
            <p style={{ marginTop: 14, fontSize: 13, color: '#94a3b8' }}>Free to start. Pro is $20/month. Cancel anytime.</p>
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
