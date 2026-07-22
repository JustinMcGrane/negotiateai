import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to negotiate your first SaaS job offer | Hayven',
  description: 'A step-by-step guide to negotiating a SaaS job offer. Learn how to counter, what to ask for, and how to handle common recruiter objections.',
}

const tag = 'Salary negotiation'
const readTime = '5 min read'

export default function Article() {
  return (
    <article>
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#4A90D9', background: '#EBF5FB', padding: '4px 10px', borderRadius: 20 }}>{tag}</span>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>{readTime}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: 20 }}>
          How to negotiate your first SaaS job offer
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, borderLeft: '3px solid #e2e8f0', paddingLeft: 20, margin: 0 }}>
          The tech industry — and SaaS companies specifically — have more compensation flexibility than almost any other sector. Here&apos;s how to use it.
        </p>
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
        <p style={{ marginBottom: 24 }}>You&apos;ve made it through the interview rounds. The offer email has arrived. And for most people, what happens next is the same: a polite thank-you, acceptance, and a quiet resignation to whatever number the company chose to put in the letter.</p>
        <p style={{ marginBottom: 24 }}>This is a mistake. And it&apos;s a mistake that compounds for the rest of your career.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Why SaaS companies have more flexibility than you think</h2>
        <p style={{ marginBottom: 24 }}>SaaS companies operate on high-margin, recurring revenue models. The cost of a bad hire — or worse, losing a great candidate to a competitor over $10,000 in base salary — is enormous compared to the cost of simply paying market rate. Most hiring managers know this. The initial offer is rarely the final offer.</p>
        <p style={{ marginBottom: 24 }}>The number they put in the offer letter is a starting position, not a ceiling. Companies build in room to negotiate precisely because they expect candidates to push back.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The approach that actually works</h2>
        <p style={{ marginBottom: 24 }}>The most effective negotiation strategy isn&apos;t about being aggressive or playing hardball. It&apos;s about coming to the table with data. When you tell a recruiter &ldquo;I&apos;ve researched market rates for this role in this location, and the 75th percentile is $X,&rdquo; you shift the conversation from personal preference to objective data.</p>
        <p style={{ marginBottom: 24 }}>Here&apos;s the exact script that works: &ldquo;I&apos;m really excited about this role and the team. I&apos;ve done some research on market rates for this position in [city], and I was hoping we could discuss getting to [target]. Is that something you have flexibility on?&rdquo;</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>What to negotiate beyond base salary</h2>
        <p style={{ marginBottom: 16 }}>Base salary gets all the attention, but SaaS offers have many levers:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 10 }}><strong>Signing bonus</strong> — Often the easiest concession. Comes out of a different budget line.</li>
          <li style={{ marginBottom: 10 }}><strong>Equity acceleration</strong> — Ask for a shorter cliff or accelerated vesting.</li>
          <li style={{ marginBottom: 10 }}><strong>Remote work flexibility</strong> — Worth $5,000–$15,000/yr in commuting and lifestyle value.</li>
          <li style={{ marginBottom: 10 }}><strong>Start date</strong> — More time = more personal runway or a chance to keep a competing offer warm.</li>
          <li style={{ marginBottom: 10 }}><strong>Performance review timing</strong> — Ask for a 6-month review instead of 12 if they can&apos;t move on base.</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>How to handle the most common objection</h2>
        <p style={{ marginBottom: 24 }}>The most common pushback you&apos;ll hear: &ldquo;This is already at the top of our band.&rdquo;</p>
        <p style={{ marginBottom: 24 }}>This is almost always negotiable. The right response: &ldquo;I appreciate you sharing that. Given my background in [specific skill], I think I&apos;ll be contributing at a senior level from day one. Could we explore a signing bonus or accelerated equity to bridge the gap?&rdquo;</p>
        <p style={{ marginBottom: 24 }}>You&apos;ve acknowledged their constraint, offered a face-saving alternative, and kept the conversation moving without backing down.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Practice before the call</h2>
        <p style={{ marginBottom: 24 }}>The biggest obstacle to negotiating isn&apos;t knowledge — it&apos;s anxiety. The silence after you name a number feels unbearable. The recruiter&apos;s hesitation feels like rejection. These moments are where most negotiations fall apart.</p>
        <p style={{ marginBottom: 24 }}>The only way to get comfortable with discomfort is to practice. Use a negotiation simulator to run through the conversation before it happens. Run it multiple times. By the time you get on the actual call, it will feel familiar.</p>
      </div>

      <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Practice your negotiation before the call</div>
        <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>Use Hayven&apos;s simulator to practice with a realistic AI recruiter. Get a scored debrief and specific feedback.</div>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#141414', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Start free →</Link>
      </div>
    </article>
  )
}
