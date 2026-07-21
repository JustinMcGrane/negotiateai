import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The 5 recruiter types and how to handle each | Hayven',
  description: 'Not all recruiters negotiate the same way. Learn the 5 recruiter archetypes and the exact strategy for each.',
}

const tag = 'Negotiation strategy'
const readTime = '6 min read'

export default function Article() {
  return (
    <article>
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#2563eb', background: '#eff6ff', padding: '4px 10px', borderRadius: 20 }}>{tag}</span>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>{readTime}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: 20 }}>
          The 5 recruiter types and how to handle each
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, borderLeft: '3px solid #e2e8f0', paddingLeft: 20, margin: 0 }}>
          Not all recruiters are created equal. Your strategy should change depending on who&apos;s across the table.
        </p>
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
        <p style={{ marginBottom: 24 }}>Most salary negotiation advice treats the recruiter as a generic obstacle to overcome. But recruiters are people operating within specific constraints, incentives, and power structures. Understanding which type you&apos;re dealing with changes everything about how you should approach the conversation.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>1. The co-founder or early-stage CEO</h2>
        <p style={{ marginBottom: 24 }}>At early-stage startups, you&apos;re often negotiating directly with the founder. They care deeply about culture fit and mission alignment, and they have flexibility most recruiters don&apos;t — but they&apos;re also personally invested in every hiring decision. The play here is to lead with excitement about the company&apos;s vision, then anchor on equity rather than base. Founders want to make you rich alongside them, not pay you more today.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>2. The band-constrained HR recruiter</h2>
        <p style={{ marginBottom: 24 }}>This is the most common type at Series B/C startups and mid-size companies. They operate within salary bands and genuinely cannot move much on base — but they have latitude on signing bonuses, equity, and perks. When they say &ldquo;that&apos;s at the top of our band,&rdquo; believe them on base. Immediately pivot: &ldquo;Understood. Could we explore a signing bonus to bridge the gap?&rdquo;</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>3. The Fortune 500 policy enforcer</h2>
        <p style={{ marginBottom: 24 }}>Large enterprise companies have the most rigid compensation structures. Base salary moves are rare and require multiple layers of approval. Your leverage here is total compensation — 401k match, RSU grants, healthcare, and deferred compensation often add 30–40% on top of base. Always ask for the total comp breakdown before negotiating. The gap between their base and your target may already be closed by benefits you haven&apos;t accounted for.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>4. The data-driven PE-backed firm</h2>
        <p style={{ marginBottom: 24 }}>Private equity-backed companies are obsessed with numbers and benchmarks. They respond poorly to &ldquo;I feel like I should make more&rdquo; and very well to &ldquo;Levels.fyi shows the 75th percentile for this role in this market is $X.&rdquo; Bring data. Cite specific sources. They will respect it and often move when presented with market evidence they can take back to justify the decision.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>5. The desperate closer</h2>
        <p style={{ marginBottom: 24 }}>Some recruiters are under real pressure to fill a role. They&apos;ll often hint at this with language like &ldquo;I really want to make this work&rdquo; or &ldquo;let me see what I can do.&rdquo; These recruiters have more budget than they&apos;re showing. A single push — &ldquo;If you can get to $X, I&apos;m ready to accept today&rdquo; — will often unlock concessions that weren&apos;t on the table a moment before.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>How to identify which type you&apos;re dealing with</h2>
        <p style={{ marginBottom: 24 }}>A few signals: How quickly did they move through the process? Urgency = desperate closer. Did they mention bands early? Band-constrained. Is this a PE-backed firm on LinkedIn? Data-driven. Fortune 500 with HR in the title? Policy enforcer. Do they own equity in the company? Founder-type.</p>
        <p style={{ marginBottom: 24 }}>Practicing against different recruiter types before your real negotiation dramatically improves your ability to read the room and adapt in real time.</p>
      </div>

      <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Practice against all 5 recruiter types</div>
        <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>Hayven&apos;s simulator includes 5 distinct recruiter personas — from the flexible startup founder to the policy-driven Fortune 500 VP.</div>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#141414', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Start free →</Link>
      </div>
    </article>
  )
}
