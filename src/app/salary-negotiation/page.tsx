import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Negotiate Salary: Complete Guide & Scripts | Hayven',
  description: 'Learn how to negotiate salary with proven strategies, step-by-step scripts, and expert tactics. Get the salary you deserve — whether negotiating a new offer or a raise.',
  alternates: { canonical: 'https://gethayven.com/salary-negotiation' },
  openGraph: {
    title: 'How to Negotiate Salary: Complete Guide & Scripts | Hayven',
    description: 'Proven salary negotiation strategies, scripts, and tactics for job offers and raises.',
    url: 'https://gethayven.com/salary-negotiation',
    type: 'article',
    images: [{ url: 'https://gethayven.com/opengraph-image', width: 1200, height: 630, alt: 'Hayven — Salary Negotiation Guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Negotiate Salary | Hayven',
    description: 'Proven salary negotiation strategies, scripts, and tactics for job offers and raises.',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Negotiate Salary: Complete Guide & Scripts',
  description: 'Learn how to negotiate salary with proven strategies, step-by-step scripts, and expert tactics.',
  url: 'https://gethayven.com/salary-negotiation',
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
      name: 'How do I negotiate salary for a new job offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Always negotiate. Express enthusiasm for the offer, then counter with a specific number 10–20% above the offer, backed by market data for your role and location. Have your research ready — Levels.fyi, Glassdoor, and LinkedIn Salary are good sources.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a reasonable salary negotiation amount?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a new job offer, countering 10–20% above the initial offer is typical. For an existing role, 5–15% is common depending on performance and time since your last raise. Always anchor to market data, not to how much you need.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you lose a job offer by negotiating salary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rarely. Employers expect negotiation and build room into their initial offers. As long as you are professional, reasonable, and express continued enthusiasm for the role, negotiating almost never costs you an offer.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I negotiate salary without a competing offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use market data as your anchor. Research what the role pays at the 50th–75th percentile for your title, level, and location. Present that data professionally and make your case based on your contributions and market position, not on personal financial need.',
      },
    },
  ],
}

export default function SalaryNegotiationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '72px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#7AB8E8', letterSpacing: '0.1em', background: 'rgba(122,184,232,0.15)', padding: '4px 12px', borderRadius: 20 }}>
            SALARY NEGOTIATION GUIDE
          </span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.03em', margin: '20px 0 20px' }}>
            How to negotiate salary — and actually win
          </h1>
          <p style={{ fontSize: 17, color: '#94a3b8', lineHeight: 1.75, maxWidth: 620, margin: '0 auto 36px' }}>
            Most people leave $10,000–$50,000 on the table every time they accept a job offer without negotiating. This guide covers everything: strategies, scripts, and how to handle every response.
          </p>
          <Link href="/signup" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#2563eb', color: '#fff',
            padding: '14px 28px', borderRadius: 9,
            fontSize: 15, fontWeight: 700, textDecoration: 'none',
          }}>
            Practice with AI coach Sarah <ArrowRight size={15} />
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
              'What is salary negotiation?',
              'Why negotiation is expected — not rude',
              'How to research your market rate',
              'Negotiating a new job offer: step-by-step',
              'Negotiating an existing salary',
              'Salary negotiation scripts you can use',
              'Handling common objections',
              'Most common mistakes',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: 14, color: '#2563eb', marginBottom: 8, lineHeight: 1.5 }}>
                <a href={`#section-${i + 1}`} style={{ color: '#2563eb', textDecoration: 'none' }}>{item}</a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Section 1 */}
        <h2 id="section-1" style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16, marginTop: 0 }}>
          What is salary negotiation?
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 16 }}>
          Salary negotiation is the process of reaching an agreement on your compensation — including base salary, bonus, equity, and benefits — with an employer. It happens when you receive a job offer, during annual reviews, or when you take on more responsibility in your current role.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 40 }}>
          Negotiation is not about being difficult or greedy. It is about ensuring your pay reflects the market value of your skills and experience. Employers budget for negotiation. When you don&apos;t negotiate, you don&apos;t save your employer money — you simply accept less than they were prepared to pay.
        </p>

        {/* Section 2 */}
        <h2 id="section-2" style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Why negotiation is expected — not rude
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 16 }}>
          Studies consistently show that the majority of employers expect candidates to negotiate. Most initial salary offers are not the top of the range — they are a starting point. A hiring manager who extends an offer is not insulted when you counter professionally. They expect it.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 40 }}>
          The only real risk in negotiating is doing it poorly — demanding an unreasonable number without data, issuing ultimatums, or being unprofessional. When you negotiate respectfully with market evidence, the outcome is almost always at least neutral and often significantly better.
        </p>

        {/* Section 3 */}
        <h2 id="section-3" style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
          How to research your market rate
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 16 }}>
          Your negotiation anchor should always be market data, not personal financial need. Here is how to find yours:
        </p>
        <ul style={{ paddingLeft: 24, marginBottom: 24 }}>
          {[
            { label: 'Levels.fyi', desc: 'Best for tech roles at established companies. Shows total compensation including equity.' },
            { label: 'LinkedIn Salary', desc: 'Good broad coverage across industries and locations. Filter by title, location, and years of experience.' },
            { label: 'Glassdoor', desc: 'Useful for company-specific data. Look at reported salaries for your exact target title.' },
            { label: 'Hayven Compensation Analyzer', desc: 'Enter your role, location, and experience to get your 25th–90th percentile range instantly.' },
          ].map(({ label, desc }) => (
            <li key={label} style={{ fontSize: 16, color: '#334155', marginBottom: 12, lineHeight: 1.7 }}>
              <strong>{label}</strong> — {desc}
            </li>
          ))}
        </ul>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 40 }}>
          Your target number should be at or above the 75th percentile for your role and location. The 50th percentile (median) is your floor — going below it means you&apos;re accepting below-average pay. The goal is to negotiate into the upper half of the market range.
        </p>

        {/* Section 4 */}
        <h2 id="section-4" style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Negotiating a new job offer: step-by-step
        </h2>

        <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12, marginTop: 32 }}>Step 1: Express enthusiasm first</h3>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 24 }}>
          Before you counter, confirm that you want the job. This removes any ambiguity and sets a collaborative tone. Something like: <em>&ldquo;I&apos;m really excited about this role — the team and the mission are exactly what I&apos;ve been looking for.&rdquo;</em>
        </p>

        <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12, marginTop: 32 }}>Step 2: Ask for time if needed</h3>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 24 }}>
          You don&apos;t have to respond to an offer on the spot. <em>&ldquo;Thank you — I&apos;d love to take 24 hours to review the full package before responding. Is that okay?&rdquo;</em> Almost every employer will say yes. Use that time to research, think, and prepare your counter.
        </p>

        <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12, marginTop: 32 }}>Step 3: Counter with a specific number</h3>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 24 }}>
          Give one number, not a range. Ranges signal uncertainty and the employer anchors to the low end. Your counter should be 10–20% above the offer and grounded in your market research. Lead with your value, then the market, then your ask.
        </p>

        <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12, marginTop: 32 }}>Step 4: Consider the full package</h3>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 40 }}>
          If the base is firm, negotiate other components: signing bonus, equity, title, remote flexibility, start date, or PTO. Getting a $15,000 signing bonus when base is stuck has the same immediate dollar impact as a $15K salary increase and is often easier for the employer to approve.
        </p>

        {/* Section 5 */}
        <h2 id="section-5" style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Negotiating an existing salary (bargaining for more at your current job)
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334155', marginBottom: 16 }}>
          Negotiating a raise works differently from negotiating a new offer. You need to make a business case, not just present a market number. The elements of a strong raise case:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { title: 'Your market rate', desc: 'Show what the market pays for your role, level, and location. If you\'re below the median, you have an obvious case. If you\'re at market, argue for the upper range.' },
            { title: 'Specific accomplishments', desc: 'List 3–5 measurable wins from the past year. Numbers matter: revenue, growth rates, time saved, team impact. Specificity is credibility.' },
            { title: 'Scope growth', desc: 'If you\'re doing more than your job description — managing people informally, owning new projects, acting as a team lead — that\'s a promotion argument, not just a raise argument.' },
            { title: 'Timing', desc: 'After a major project ships, after a strong review cycle, or during budget planning. Avoid asking right after a miss, layoffs, or a difficult quarter for the company.' },
          ].map(({ title, desc }) => (
            <div key={title} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 22px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{title}</p>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Section 6 */}
        <h2 id="section-6" style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Salary negotiation scripts you can use
        </h2>

        <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12, marginTop: 32 }}>Negotiating a new job offer (phone or email)</h3>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '24px 28px', marginBottom: 32 }}>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: '#0f172a', margin: 0, fontStyle: 'italic' }}>
            &ldquo;Thank you so much for the offer — I&apos;m genuinely excited about this role. I&apos;ve done some research on market compensation for [title] in [location], and I&apos;m seeing a median around $[X] with strong performers in the $[Y] range. Given my [relevant experience/skill], I&apos;d like to come in at $[Z]. Is that something you can work with?&rdquo;
          </p>
        </div>

        <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12, marginTop: 32 }}>Negotiating a raise at your current job</h3>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '24px 28px', marginBottom: 32 }}>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: '#0f172a', margin: 0, fontStyle: 'italic' }}>
            &ldquo;I&apos;d like to talk about my compensation. Over the past year I&apos;ve [accomplishment 1], [accomplishment 2], and taken on [new responsibility]. I&apos;ve also been researching market rates — for a [title] at my level and location, the 75th percentile is around $[X]. I&apos;d like to get to $[Y]. What would it take to make that happen?&rdquo;
          </p>
        </div>

        <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12, marginTop: 32 }}>Counter-offer to a low initial offer</h3>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '24px 28px', marginBottom: 40 }}>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: '#0f172a', margin: 0, fontStyle: 'italic' }}>
            &ldquo;I appreciate the offer. The base is a bit lower than what I was expecting based on my research. I was targeting $[X] — is there flexibility to get closer to that? I&apos;m very motivated to make this work.&rdquo;
          </p>
        </div>

        {/* Section 7 */}
        <h2 id="section-7" style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Handling common objections
        </h2>
        <div style={{ marginBottom: 40 }}>
          {[
            {
              q: '"The budget is set for this role."',
              a: 'Test it. Ask whether the budget is truly fixed across all components, or just base. Signing bonus, equity, and benefits often have different budget pools. If everything is firm, ask what would need to be true to revisit compensation in 6 months.',
            },
            {
              q: '"That\'s above our salary band for this role."',
              a: 'Ask about level. Sometimes a title can be adjusted to fit a higher band, or a promotion timeline can be discussed. If the band is genuinely rigid, negotiate signing bonus or equity to make up the gap.',
            },
            {
              q: '"We\'ve already given you our best offer."',
              a: 'This is a tactic, not a fact. Respond calmly: "I understand, and I want to make this work. Could you help me understand what it would take to get to $[X]? I\'m asking because my research suggests that\'s the right market rate for this scope."',
            },
            {
              q: '"You don\'t have X years of experience."',
              a: 'Redirect to outcomes: "I understand the concern. What I\'d point to is [specific accomplishment] — which shows the impact I can deliver. Market data for the scope of this role, regardless of years, is around $[X]."',
            },
          ].map(({ q, a }) => (
            <div key={q} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #f1f5f9' }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{q}</p>
              <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.8, margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>

        {/* Section 8 */}
        <h2 id="section-8" style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Most common salary negotiation mistakes
        </h2>
        <ul style={{ paddingLeft: 0, listStyle: 'none', marginBottom: 48 }}>
          {[
            'Not negotiating at all — the single most expensive mistake',
            'Giving a salary range instead of a single number',
            'Anchoring to what you need rather than what the market pays',
            'Accepting the first counter without a second ask',
            'Negotiating by email when a call would be more effective',
            'Disclosing your current salary before you have to (avoid this in most jurisdictions)',
            'Making it personal — "I need more because my rent went up" is never the right frame',
          ].map((item) => (
            <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 16, color: '#334155', marginBottom: 14 }}>
              <span style={{ color: '#ef4444', fontWeight: 700, flexShrink: 0, lineHeight: 1.6 }}>✗</span>
              {item}
            </li>
          ))}
        </ul>

        {/* Preparation checklist */}
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 14, padding: '28px 32px', marginBottom: 48 }}>
          <p style={{ fontSize: 16, fontWeight: 800, color: '#15803d', marginBottom: 16 }}>Salary negotiation preparation checklist</p>
          {[
            'Research 50th and 75th percentile pay for your role and location',
            'List 3–5 quantified accomplishments from the past year',
            'Identify your target number (specific, not a range)',
            'Identify your walk-away number',
            'Prepare for the 4 most common objections',
            'Express enthusiasm before countering',
            'Practice out loud at least twice',
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
            <Link href="/how-to-ask-for-a-raise" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>
              → How to ask for a raise at work
            </Link>
            <Link href="/ai-career-coach" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>
              → Meet Sarah — your AI career coach
            </Link>
            <Link href="/compensation-analyzer" style={{ fontSize: 15, color: '#2563eb', textDecoration: 'none' }}>
              → Check your market rate with the Compensation Analyzer
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #1d4ed8 100%)',
          borderRadius: 16, padding: '40px 36px', textAlign: 'center',
        }}>
          <p style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 12, letterSpacing: '-0.02em' }}>
            Ready to practice your negotiation?
          </p>
          <p style={{ fontSize: 15, color: '#c7d2fe', lineHeight: 1.7, marginBottom: 28 }}>
            Sarah, Hayven&apos;s AI career coach, will roleplay the negotiation with you, give you feedback on every response, and help you build the script for your specific offer.
          </p>
          <Link href="/signup" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', color: '#1e1b4b',
            padding: '13px 26px', borderRadius: 9,
            fontSize: 15, fontWeight: 800, textDecoration: 'none',
          }}>
            Try Sarah free <ArrowRight size={15} />
          </Link>
          <p style={{ fontSize: 13, color: '#a5b4fc', marginTop: 12 }}>No credit card required</p>
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
