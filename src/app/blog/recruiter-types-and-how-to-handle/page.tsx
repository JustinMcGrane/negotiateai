import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The 5 recruiter types and how to handle each | NegotiateAI',
  description: 'Not all recruiters negotiate the same way. Learn the 5 recruiter archetypes and the exact strategy for each.',
}

export default function Article() {
  return (
    <article>
      <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 12 }}>Negotiation strategy · 6 min read</div>
      <h1 style={{ fontSize: 28, fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: 16 }}>The 5 recruiter types and how to handle each</h1>
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 32, lineHeight: 1.7 }}>Not all recruiters are created equal. Your strategy should change depending on who&apos;s across the table.</p>

      <div style={{ fontSize: 15, lineHeight: 1.8 }}>
        <p style={{ marginBottom: 20 }}>Most salary negotiation advice treats the recruiter as a generic obstacle to overcome. But recruiters are people operating within specific constraints, incentives, and power structures. Understanding which type you&apos;re dealing with changes everything about how you should approach the conversation.</p>

        <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12, marginTop: 32 }}>1. The co-founder or early-stage CEO</h2>
        <p style={{ marginBottom: 20 }}>At early-stage startups, you&apos;re often negotiating directly with the founder. They care deeply about culture fit and mission alignment, and they have flexibility most recruiters don&apos;t — but they&apos;re also personally invested in every hiring decision. The play here is to lead with excitement about the company&apos;s vision, then anchor on equity rather than base. Founders want to make you rich alongside them, not pay you more today.</p>

        <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12, marginTop: 32 }}>2. The band-constrained HR recruiter</h2>
        <p style={{ marginBottom: 20 }}>This is the most common type at Series B/C startups and mid-size companies. They operate within salary bands and genuinely cannot move much on base — but they have latitude on signing bonuses, equity, and perks. When they say &ldquo;that&apos;s at the top of our band,&rdquo; believe them on base. Immediately pivot: &ldquo;Understood. Could we explore a signing bonus to bridge the gap?&rdquo;</p>

        <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12, marginTop: 32 }}>3. The Fortune 500 policy enforcer</h2>
        <p style={{ marginBottom: 20 }}>Large enterprise companies have the most rigid compensation structures. Base salary moves are rare and require multiple layers of approval. Your leverage here is total compensation — 401k match, RSU grants, healthcare, and deferred compensation often add 30-40% on top of base. Always ask for the total comp breakdown before negotiating. The gap between their base and your target may already be closed by benefits you haven&apos;t accounted for.</p>

        <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12, marginTop: 32 }}>4. The data-driven PE-backed firm</h2>
        <p style={{ marginBottom: 20 }}>Private equity-backed companies are obsessed with numbers and benchmarks. They respond poorly to &ldquo;I feel like I should make more&rdquo; and very well to &ldquo;Levels.fyi shows the 75th percentile for this role in this market is $X.&rdquo; Bring data. Cite specific sources. They will respect it and often move when presented with market evidence they can take back to justify the decision.</p>

        <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12, marginTop: 32 }}>5. The desperate closer</h2>
        <p style={{ marginBottom: 20 }}>Some recruiters are under real pressure to fill a role. They&apos;ll often hint at this with language like &ldquo;I really want to make this work&rdquo; or &ldquo;let me see what I can do.&rdquo; These recruiters have more budget than they&apos;re showing. A single push — &ldquo;If you can get to $X, I&apos;m ready to accept today&rdquo; — will often unlock concessions that weren&apos;t on the table a moment before.</p>

        <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12, marginTop: 32 }}>How to identify which type you&apos;re dealing with</h2>
        <p style={{ marginBottom: 20 }}>A few signals: How quickly did they move through the process? Urgency = desperate closer. Did they mention bands early? Band-constrained. Is this a PE-backed firm on LinkedIn? Data-driven. Fortune 500 with HR in the title? Policy enforcer. Do they own equity in the company? Founder-type.</p>
        <p style={{ marginBottom: 20 }}>Practicing against different recruiter types before your real negotiation dramatically improves your ability to read the room and adapt in real time.</p>
      </div>

      <div style={{ marginTop: 48, padding: '24px', background: 'var(--color-background-secondary)', borderRadius: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 8 }}>Practice against all 5 recruiter types</div>
        <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 16 }}>NegotiateAI&apos;s simulator includes 5 distinct recruiter personas — from the flexible startup founder to the policy-driven Fortune 500 VP.</div>
        <Link href="/signup" style={{ display: 'inline-block', background: '#141414', color: '#fff', padding: '8px 18px', borderRadius: 8, fontSize: 13, textDecoration: 'none' }}>Start free →</Link>
      </div>
    </article>
  )
}
