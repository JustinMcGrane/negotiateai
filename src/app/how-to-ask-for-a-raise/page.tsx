import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Ask for a Raise (The Complete 2026 Guide) | Hayven',
  description: 'Learn how to ask for a raise at work with scripts that actually work. Covers when to ask, how much to request, documenting your case, the conversation itself, and handling rejection.',
  alternates: { canonical: 'https://gethayven.com/how-to-ask-for-a-raise' },
  openGraph: {
    title: 'How to Ask for a Raise (The Complete 2026 Guide) | Hayven',
    description: 'Step-by-step guide to asking for a raise — when to ask, how much, what to say, and how to handle every response from your manager.',
    url: 'https://gethayven.com/how-to-ask-for-a-raise',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Ask for a Raise: Complete Guide | Hayven',
    description: 'When to ask, how much to request, scripts that work, and how to handle rejection — the complete guide to getting a raise.',
  },
}

const FAQ_ITEMS = [
  {
    q: 'How much of a raise should I ask for?',
    a: 'A 10–20% raise is a reasonable ask if you have strong performance, market data showing you\'re underpaid, or you\'ve taken on significant new responsibilities. A 5–10% raise is more typical for strong annual performance without other leverage. Always anchor to market data — not how much you need or want.',
  },
  {
    q: 'How do you ask for a raise without sounding greedy?',
    a: 'Frame the conversation around market data and your contributions, not personal financial need. "Based on my research and the responsibilities I\'ve taken on since my last review, I believe a salary of $X is appropriate" lands differently than "I need more money." It\'s business, not personal.',
  },
  {
    q: 'What if your manager says no?',
    a: 'Ask what specifically you\'d need to do to earn a raise, get the answer in writing (or as a follow-up email), and set a review date. If the answer is vague or keeps shifting, that\'s important information about whether this job can give you what you need.',
  },
  {
    q: 'Is it better to ask for a raise by email or in person?',
    a: 'Request the meeting by email, have the conversation in person (or video), then follow up with a written summary. In-person lets you read the room; written follow-up creates a record and gives your manager something to take to their own manager.',
  },
  {
    q: 'When is the best time to ask for a raise?',
    a: 'The best moments: right after delivering a major win, before annual review cycles (not during — budgets are often already set), or when you have a competing offer. Avoid times of company-wide stress, layoffs, or budget freezes.',
  },
  {
    q: 'Should I mention other job offers when asking for a raise?',
    a: 'A competing offer is your strongest leverage — but use it carefully. Only mention it if it\'s real and you\'re genuinely willing to leave. Say: "I\'ve received an offer at $X. I prefer to stay here — can we get my comp to that level?" Don\'t bluff.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'How to Ask for a Raise: A Step-by-Step Guide That Actually Works',
      description: 'A comprehensive guide to asking for a raise — timing, documentation, conversation scripts, email templates, and how to handle rejection.',
      url: 'https://gethayven.com/how-to-ask-for-a-raise',
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
    { '@type': 'ListItem', position: 2, name: 'How to Ask for a Raise', item: 'https://gethayven.com/how-to-ask-for-a-raise' },
  ],
}

export default function HowToAskForARaisePage() {
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
            RAISE GUIDE
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: 24 }}>
            How to Ask for a Raise: A Step-by-Step Guide That Actually Works
          </h1>
          <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, marginBottom: 40, maxWidth: 580, margin: '0 auto 40px' }}>
            Asking for a raise is one of the highest-ROI conversations you can have — but most people avoid it or handle it wrong. This guide walks you through every step: when to ask, how to build your case, what to say, and how to respond to every answer.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/raise-request-builder" style={{
              height: 50, display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '0 28px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              color: '#fff',
              borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 3px 10px rgba(239,68,68,0.3)',
            }}>
              Build my raise request <ArrowRight size={15} />
            </Link>
            <Link href="/sarah" style={{
              height: 50, display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '0 28px', background: '#1a4fa0', color: '#fff',
              borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none',
            }}>
              Talk to Sarah (AI coach)
            </Link>
          </div>
          <p style={{ marginTop: 16, fontSize: 13, color: '#94a3b8' }}>Free to start. Pro is $20/month.</p>
        </section>

        {/* When to ask */}
        <section style={{ background: '#f8fafc', padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 20 }}>
              When to ask for a raise
            </h2>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 24 }}>
              Timing can be as important as what you say. The best moments to ask:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
              {[
                { title: 'Right after a major win', body: 'The best time to ask is when your value is freshest in your manager\'s mind — right after you ship a product, close a deal, or solve a hard problem. Your leverage is highest in the moment after a visible success.' },
                { title: 'Before the annual review cycle starts', body: 'Budgets are usually locked before the formal review. If your company does annual reviews in January, raise the conversation in October or November — not in the review itself.' },
                { title: 'When you have market data showing you\'re underpaid', body: 'If your research shows a 15–20% gap between your salary and the market rate for your role, that\'s a concrete business case — not just a personal preference.' },
                { title: 'When you have a competing offer', body: 'A real offer from another company is your strongest leverage. Use it, but only if you\'re genuinely willing to leave. "I have an offer at $X — I prefer to stay here, but I need to close the gap."' },
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

        {/* How much to ask for */}
        <section style={{ padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 20 }}>
              How much of a raise to ask for
            </h2>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 20 }}>
              Your target number should be grounded in market data, not gut feel. Here&apos;s how to find it:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
              {[
                { step: '1', title: 'Research your market rate', body: 'Use Glassdoor, LinkedIn Salary, Levels.fyi, and Payscale to find the market range for your role, level, and city. Look at the 50th and 75th percentile — your target should be at or above the median for your experience.' },
                { step: '2', title: 'Calculate your gap', body: 'Compare your current salary to the market median and 75th percentile. If you\'re below the median, that\'s your business case. Use Hayven\'s Raise Calculator to see exactly how much you\'re leaving on the table.' },
                { step: '3', title: 'Factor in your performance and tenure', body: 'Strong performance and significant new responsibilities justify asking toward the top of the range. For a solid but typical year, targeting the market median is appropriate.' },
                { step: '4', title: 'Ask above your target', body: 'Anchoring above your real goal gives you room to negotiate down without losing ground. If you want 15%, ask for 20%.' },
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
            <p style={{ fontSize: 15, color: '#475569' }}>
              Use <Link href="/raise-calculator" style={{ color: '#4A90D9', textDecoration: 'none', fontWeight: 600 }}>Hayven&apos;s Raise Calculator</Link> to calculate your exact gap and see what a raise would mean for your lifetime earnings.
            </p>
          </div>
        </section>

        {/* Documenting accomplishments */}
        <section style={{ background: '#f8fafc', padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 20 }}>
              Documenting your accomplishments
            </h2>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 24 }}>
              The strongest raise requests combine market data with concrete evidence of your impact. Your manager will likely need to justify the raise to their own manager — give them the ammunition to do it.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 24 }}>
              {[
                { title: 'Quantify everything', body: 'Revenue generated, cost saved, time reduced, projects shipped on time. Numbers stick. "Managed X accounts" is weaker than "grew account revenue by 28%."' },
                { title: 'Show scope expansion', body: 'Have you taken on responsibilities beyond your original role? Managing people, new products, larger clients? This is prime justification for a market-rate correction.' },
                { title: 'Gather external validation', body: 'Positive feedback from clients, stakeholders, or cross-functional partners gives your manager something concrete to cite.' },
                { title: 'Keep a running list', body: 'Don\'t wait until raise season to document your wins. Keep a running "brag document" — a list of every meaningful thing you\'ve done since your last review.' },
              ].map(({ title, body }) => (
                <div key={title} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 20px' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{title}</div>
                  <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.7 }}>{body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The conversation */}
        <section style={{ background: '#0f172a', padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: 20 }}>
              The conversation itself: what to say
            </h2>
            <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.8, marginBottom: 24 }}>
              Request the meeting with a brief, neutral email. In the meeting, follow this structure:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 36 }}>
              {[
                { label: 'Request the meeting', text: '"Hey [manager], I\'d love to find time to discuss my compensation — would you have 30 minutes in the next couple of weeks?"' },
                { label: 'Open the conversation', text: '"I wanted to discuss my salary. I really enjoy my work here and I\'m invested in this team. I\'ve also done some market research and I want to make sure we\'re at the right number."' },
                { label: 'Present your case', text: '"Since my last review, I\'ve done X, Y, and Z [your documented wins]. Based on my research on Glassdoor and LinkedIn, the market rate for this role in [city] is $X–$Y. I\'m currently at [current salary], and I\'d like to bring my comp to $[target]."' },
                { label: 'Wait for the response', text: 'After you\'ve made the ask, stop talking. The silence is uncomfortable — resist the urge to fill it by conceding.' },
              ].map(({ label, text }) => (
                <div key={label} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '20px 24px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#4A90D9', marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
                  <div style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.75, fontStyle: 'italic' }}>{text}</div>
                </div>
              ))}
            </div>
            <Link href="/raise-request-builder" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              color: '#fff',
              padding: '12px 24px', borderRadius: 9,
              fontSize: 14, fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 3px 10px rgba(239,68,68,0.3)',
            }}>
              Build my raise request <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Email scripts */}
        <section style={{ padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 20 }}>
              Email scripts for asking for a raise
            </h2>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 24 }}>
              Some managers prefer email or need a written summary to take to HR. Here are two templates:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 24 }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '24px 28px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#4A90D9', marginBottom: 12, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Requesting the meeting</div>
                <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.9, fontFamily: 'monospace', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '16px 20px' }}>
                  Subject: Compensation discussion — [your name]<br /><br />
                  Hi [Manager],<br /><br />
                  I&apos;d love to schedule 20–30 minutes to discuss my compensation. Could you find time in the next two weeks?<br /><br />
                  [Your name]
                </div>
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '24px 28px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#4A90D9', marginBottom: 12, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Following up after the conversation</div>
                <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.9, fontFamily: 'monospace', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '16px 20px' }}>
                  Subject: Re: Compensation discussion<br /><br />
                  Hi [Manager],<br /><br />
                  Thanks for the time today. To recap what we discussed: I&apos;m requesting a salary adjustment to $[target], based on [2–3 accomplishments] and market data showing a range of $X–$Y for this role in [city].<br /><br />
                  Please let me know next steps — happy to provide any additional context.<br /><br />
                  [Your name]
                </div>
              </div>
            </div>
            <p style={{ fontSize: 15, color: '#475569' }}>
              More detailed scripts: <Link href="/blog/how-to-ask-for-a-raise-scripts-that-work" style={{ color: '#4A90D9', textDecoration: 'none', fontWeight: 600 }}>How to Ask for a Raise: Scripts That Work</Link>
            </p>
          </div>
        </section>

        {/* Handling rejection */}
        <section style={{ background: '#f8fafc', padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 20 }}>
              Handling rejection: what to do when they say no
            </h2>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 20 }}>
              A &quot;no&quot; to your first ask doesn&apos;t have to be final. Here&apos;s how to respond productively:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
              {[
                { step: '1', title: 'Ask why — specifically', body: '"What would it take for me to reach $X here?" Get a specific answer. Vague answers ("timing isn\'t right," "budget is tight") are flags that the real answer is "never."' },
                { step: '2', title: 'Ask for it in writing', body: 'Send a follow-up email: "To recap — you mentioned I could revisit this after [X milestone]. I\'ll plan to follow up in [timeframe]." This creates accountability.' },
                { step: '3', title: 'Negotiate alternatives', body: 'If salary truly can\'t move now, ask about: a signing bonus equivalent paid as a quarterly bonus, additional PTO, remote days, professional development budget, or an accelerated review.' },
                { step: '4', title: 'Decide what the answer means', body: 'A company that can\'t or won\'t pay market rate — and can\'t give you a clear path to get there — is telling you something. That\'s information worth acting on.' },
              ].map(({ step, title, body }) => (
                <div key={step} style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#e2e8f0', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, flexShrink: 0 }}>{step}</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{title}</div>
                    <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.75 }}>{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related tools */}
        <section style={{ padding: '80px 32px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: 32 }}>
              Related tools and guides
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {[
                { label: 'Raise Request Builder', href: '/raise-request-builder', desc: 'Build a personalized raise request with talking points and market data.' },
                { label: 'Raise Calculator', href: '/raise-calculator', desc: 'See what a raise means for your lifetime earnings.' },
                { label: 'Salary Negotiation Guide', href: '/salary-negotiation', desc: 'For new job offers — counter-offer strategies and scripts.' },
                { label: 'AI Career Coach (Sarah)', href: '/sarah', desc: 'Get coached through your raise conversation, personalized to your situation.' },
                { label: 'Scripts That Work', href: '/blog/how-to-ask-for-a-raise-scripts-that-work', desc: 'Detailed scripts for every raise scenario.' },
                { label: 'Salary Calculator', href: '/salary-calculator', desc: 'All Hayven salary tools in one place.' },
                { label: 'Salary Guides by Role', href: '/tools/salaries', desc: 'See p25–p90 salary ranges for your role before your conversation.' },
                { label: 'Paycheck Calculator', href: '/paycheck-calculator', desc: 'See exactly what your raise means for your take-home pay.' },
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
              Ready to ask? Let Sarah help you prepare.
            </h2>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, marginBottom: 36 }}>
              Sarah builds your raise request, gives you the exact words to say, and coaches you through every objection — personalized to your role and situation.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/raise-request-builder" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                color: '#fff',
                padding: '15px 28px', borderRadius: 10,
                fontSize: 15, fontWeight: 700, textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(239,68,68,0.35)',
              }}>
                Build my raise request <ArrowRight size={15} />
              </Link>
              <Link href="/sarah" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#1a4fa0',
                color: '#fff',
                padding: '15px 28px', borderRadius: 10,
                fontSize: 15, fontWeight: 700, textDecoration: 'none',
              }}>
                Talk to Sarah free
              </Link>
            </div>
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
