import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Negotiate a Remote Job Offer | Hayven',
  description: 'Remote job offers come with unique leverage points most candidates miss. Here\'s how to negotiate salary, equipment, and flexibility when the job is remote.',
}

const tag = 'Salary negotiation'
const readTime = '6 min read'

export default function Article() {
  return (
    <article>
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#4A90D9', background: '#EBF5FB', padding: '4px 10px', borderRadius: 20 }}>{tag}</span>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>{readTime}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: 20 }}>
          How to negotiate a remote job offer
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, borderLeft: '3px solid #e2e8f0', paddingLeft: 20, margin: 0 }}>
          Remote roles have more negotiating levers than in-office jobs — and most candidates never pull them. Here&apos;s the full playbook.
        </p>
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
        <p style={{ marginBottom: 24 }}>Remote work changed compensation negotiation in ways most people haven&apos;t caught up to. When location is no longer a constraint, the rules around salary, benefits, and flexibility shift significantly — usually in the candidate&apos;s favor.</p>
        <p style={{ marginBottom: 24 }}>But most candidates approach a remote offer the same way they&apos;d approach an in-office one. They focus only on base salary, accept whatever the company offers on everything else, and leave real money on the table.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The location pay debate — and how to use it</h2>
        <p style={{ marginBottom: 24 }}>Many companies still pay based on where you live. If you&apos;re in Austin or Denver and the company is headquartered in San Francisco, they may offer you a locally-adjusted salary that&apos;s 15–25% lower than what an SF employee doing the same job earns.</p>
        <p style={{ marginBottom: 24 }}>This is negotiable. Here&apos;s how to push back: &ldquo;I noticed the offer reflects a location-based adjustment. Since the role is fully remote and I&apos;ll be collaborating with the same team, taking on the same responsibilities, and delivering the same output as colleagues in higher cost-of-living areas, I&apos;d like to discuss moving to a national pay scale. What does that look like?&rdquo;</p>
        <p style={{ marginBottom: 24 }}>Not every company will move on this. But a meaningful percentage will, especially if they&apos;re competing for talent in a tight market.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>What to negotiate beyond salary</h2>
        <p style={{ marginBottom: 16 }}>Remote offers have several unique levers that in-office offers don&apos;t:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 12 }}><strong>Home office stipend</strong> — Ask for $1,500–$3,000 to set up your workspace. Many companies have this budget and simply don&apos;t offer it proactively.</li>
          <li style={{ marginBottom: 12 }}><strong>Internet reimbursement</strong> — $50–$100/month is standard at remote-first companies. Ask if it isn&apos;t included.</li>
          <li style={{ marginBottom: 12 }}><strong>Co-working space allowance</strong> — If you prefer not to work from home, ask for a WeWork or co-working membership.</li>
          <li style={{ marginBottom: 12 }}><strong>Async flexibility</strong> — Negotiate explicit expectations around core hours and async communication so you can protect your schedule.</li>
          <li style={{ marginBottom: 12 }}><strong>Annual offsites covered</strong> — Ask whether travel to team retreats is fully covered, including flights and accommodation.</li>
          <li style={{ marginBottom: 12 }}><strong>Learning budget</strong> — Remote workers invest more in self-directed learning. Ask for a $1,000–$2,000 annual budget for courses and conferences.</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>How to handle the &ldquo;flexibility is the benefit&rdquo; argument</h2>
        <p style={{ marginBottom: 24 }}>Some recruiters will imply that remote work itself is a benefit — that you should be grateful for the flexibility and therefore accept a lower salary. Push back on this directly.</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#0f172a' }}>&ldquo;I appreciate the flexibility, and I&apos;m excited about working remotely. But I&apos;d like to make sure we&apos;re aligned on compensation separate from the working arrangement — the role and its market rate are what I&apos;m focused on. What&apos;s the range for this position?&rdquo;</p>
        </div>
        <p style={{ marginBottom: 24 }}>Remote work is now standard at most tech and knowledge-work companies. It isn&apos;t a perk — it&apos;s a baseline expectation. Don&apos;t let it be used to discount your market value.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Timing your negotiation</h2>
        <p style={{ marginBottom: 24 }}>The best time to negotiate a remote offer is after you have it in writing and before you sign — the same as any offer. But remote roles often move faster than in-office ones because there&apos;s no physical onboarding to coordinate. Don&apos;t let the pace pressure you into accepting without pushing back.</p>
        <p style={{ marginBottom: 24 }}>Ask for 48–72 hours to review. Use that time to benchmark your offer against market data, identify the two or three things you want to negotiate, and prepare your specific asks with data to back them up.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The script that works for remote negotiation</h2>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#0f172a' }}>&ldquo;Thank you so much for the offer — I&apos;m genuinely excited about this role and the team. I&apos;ve had a chance to review it and do some market research. I was hoping to discuss a few things: the base salary, a home office stipend to set up a proper workspace, and internet reimbursement. Would you be open to exploring those?&rdquo;</p>
        </div>
        <p style={{ marginBottom: 24 }}>Grouping your asks together is more effective than raising them one at a time. It signals that you&apos;ve thought it through, and it gives the recruiter room to say yes to some and no to others — which feels like a win for both sides.</p>
      </div>

      <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Build your counter-offer in minutes</div>
        <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>Hayven&apos;s counter-offer builder creates a ready-to-send email and negotiation script based on your specific offer and market data.</div>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#141414', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Start free →</Link>
      </div>
    </article>
  )
}
