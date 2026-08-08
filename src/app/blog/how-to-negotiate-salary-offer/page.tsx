import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Negotiate a Salary Offer | Hayven',
  description: 'Got a salary offer? Here\'s exactly how to negotiate it — what to say, how much to ask for, and how to handle the most common pushback.',
}

const tag = 'Salary negotiation'
const readTime = '7 min read'

export default function Article() {
  return (
    <article>
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#4A90D9', background: '#EBF5FB', padding: '4px 10px', borderRadius: 20 }}>{tag}</span>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>{readTime}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: 20 }}>
          How to negotiate a salary offer
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, borderLeft: '3px solid #e2e8f0', paddingLeft: 20, margin: 0 }}>
          Receiving a salary offer is not the end of the conversation — it&apos;s the beginning. Here&apos;s how to negotiate it the right way.
        </p>
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
        <p style={{ marginBottom: 24 }}>When a company makes you a salary offer, they&apos;re not giving you their best number. They&apos;re giving you their opening number — the one designed to leave room for negotiation. Most candidates don&apos;t know this, so they accept it and move on. The ones who do negotiate almost always get more.</p>
        <p style={{ marginBottom: 24 }}>Here&apos;s exactly how to negotiate a salary offer from the moment it arrives to the moment you sign.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Don&apos;t respond immediately</h2>
        <p style={{ marginBottom: 24 }}>Whether the offer comes by phone or email, your first move is to buy time. Thank them enthusiastically and ask for 24–48 hours to review. This is standard practice and no company will penalize you for it.</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#0f172a' }}>&ldquo;Thank you so much — I&apos;m really excited about this. I&apos;d love to take a day to review everything carefully. Can I get back to you by [date]?&rdquo;</p>
        </div>
        <p style={{ marginBottom: 24 }}>Use that time to research, prepare your counter, and think clearly. Never negotiate in the moment — emotions run high and you&apos;ll make worse decisions.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Evaluate the full offer — not just base salary</h2>
        <p style={{ marginBottom: 24 }}>Before you counter, understand the complete value of what you&apos;re being offered. Base salary is just one component. Bonus structure, equity, 401k match, health insurance, PTO, and remote flexibility all have real dollar value.</p>
        <p style={{ marginBottom: 24 }}>Use Hayven&apos;s <Link href="/tools/offer-evaluator" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Offer Evaluator</Link> to score your complete package and understand exactly where it stands relative to market. This tells you what to push on and what to let go.</p>
        <p style={{ marginBottom: 24 }}>For a deeper guide on evaluating every component of an offer, read <Link href="/blog/how-to-evaluate-a-job-offer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>how to evaluate a job offer beyond the base salary</Link>.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Know your market rate</h2>
        <p style={{ marginBottom: 24 }}>Your counter needs to be grounded in data, not just what feels fair. Check Levels.fyi, Glassdoor, and LinkedIn Salary for your specific role, level, and location. Target the 75th percentile — that&apos;s what strong performers make and it&apos;s a defensible ask.</p>
        <p style={{ marginBottom: 24 }}>Hayven&apos;s <Link href="/tools/comp-analyzer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Compensation Analyzer</Link> gives you a precise market rate so your counter is backed by evidence, not instinct.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Make your counter</h2>
        <p style={{ marginBottom: 24 }}>Counter by phone when possible — it&apos;s faster and more personal. Lead with genuine enthusiasm, then make your ask clearly and confidently.</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#0f172a' }}>&ldquo;I&apos;ve had a chance to look everything over and I&apos;m really excited about the role. Based on my research and experience, I was hoping we could get to $[your number]. Is there flexibility there?&rdquo;</p>
        </div>
        <p style={{ marginBottom: 24 }}>A few rules: give a specific number not a range, counter higher than your actual target, and never apologize for asking.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Handle the pushback</h2>
        <p style={{ marginBottom: 24 }}>The most common response is some version of &ldquo;that&apos;s above our range&rdquo; or &ldquo;we don&apos;t have flexibility on base.&rdquo; Don&apos;t fold immediately. Ask what they can do, and if base truly is fixed, pivot to other components.</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#0f172a' }}>&ldquo;I understand. If base is fixed, could we look at a signing bonus to bridge the gap? Something in the range of $[amount] would make this an easy decision.&rdquo;</p>
        </div>
        <p style={{ marginBottom: 24 }}>For a full breakdown of signing bonus negotiation, read <Link href="/blog/how-to-negotiate-signing-bonus" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>how to negotiate a signing bonus</Link>.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>If you want a ready-to-send counter-offer email</h2>
        <p style={{ marginBottom: 24 }}>Prefer to negotiate by email? Hayven&apos;s <Link href="/tools/counter-offer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Counter-Offer Builder</Link> generates a personalized, professional counter-offer email based on your specific situation — ready to send in minutes.</p>
        <p style={{ marginBottom: 24 }}>You can also find copy-paste templates in our <Link href="/blog/salary-negotiation-email-template" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>salary negotiation email template guide</Link>.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Practice before the real conversation</h2>
        <p style={{ marginBottom: 24 }}>The biggest obstacle to negotiating a salary offer isn&apos;t knowledge — it&apos;s the anxiety of the moment. The silence after you name your number. The recruiter&apos;s hesitation. These are where most people cave.</p>
        <p style={{ marginBottom: 24 }}>Hayven&apos;s <Link href="/tools/simulator" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Negotiation Simulator</Link> lets you practice the entire conversation against a realistic AI coach and get scored feedback. By the time you&apos;re on the real call, it will feel familiar.</p>
      </div>

      <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Build your counter-offer in minutes</div>
        <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>Hayven generates a personalized counter-offer based on your role, location, and market data — so you always have a number backed by evidence.</div>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#141414', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Start free →</Link>
      </div>
    </article>
  )
}
