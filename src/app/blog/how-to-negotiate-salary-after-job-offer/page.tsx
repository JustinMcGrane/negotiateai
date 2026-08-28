import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Negotiate Salary After a Job Offer: Scripts & Steps | Hayven',
  description: 'Got a job offer? Here\'s exactly how to negotiate salary after receiving it — what to say, when to say it, how much to ask for, and how to handle every objection.',
}

export default function Article() {
  return (
    <article>
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#4A90D9', background: '#EBF5FB', padding: '4px 10px', borderRadius: 20 }}>Salary negotiation</span>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>10 min read</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: 20 }}>
          How to negotiate salary after a job offer: scripts and steps that work
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, borderLeft: '3px solid #e2e8f0', paddingLeft: 20, margin: 0 }}>
          Most people accept the first number they&apos;re given. That one decision costs them hundreds of thousands of dollars over their career. Here&apos;s how to handle it the right way.
        </p>
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
        <p style={{ marginBottom: 24 }}>You just got a job offer. Your instinct is to say yes immediately — you&apos;re excited, relieved, and you don&apos;t want to seem greedy or risk losing the offer. But that instinct is costing you money. Failing to negotiate your starting salary can cost you $500,000 or more over the course of your career when you factor in compounding raises, bonuses, and future offers anchored to your current pay.</p>
        <p style={{ marginBottom: 24 }}>The good news: negotiating after receiving an offer is actually the easiest time to negotiate. You have maximum leverage because they&apos;ve already decided they want you. The hard part of the process — making them choose you — is done.</p>
        <p style={{ marginBottom: 24 }}>This guide walks you through every step, with exact scripts for each stage.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Step 1: Don&apos;t respond to the offer immediately</h2>
        <p style={{ marginBottom: 24 }}>When you receive an offer — whether by phone or email — your first move is always to buy time. Negotiating on the spot is a mistake. You need time to research, prepare, and think clearly without the pressure of a live conversation.</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0f172a' }}>If they call you with the offer:</p>
          <p style={{ margin: '0 0 16px', fontStyle: 'italic', color: '#475569', lineHeight: 1.75 }}>&ldquo;This is really exciting — thank you so much. I want to give this the proper consideration it deserves. Can I review the full details and get back to you by [specific date 2–3 days out]?&rdquo;</p>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0f172a' }}>If they email you the offer:</p>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#475569', lineHeight: 1.75 }}>&ldquo;Thank you so much — I&apos;m really excited about this opportunity. I&apos;d love to take a couple of days to review the full package carefully. I&apos;ll get back to you by [date].&rdquo;</p>
        </div>
        <p style={{ marginBottom: 24 }}>This is completely normal and expected. No reasonable employer will think less of you for wanting 48 hours to review a major life decision.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Step 2: Research your market rate</h2>
        <p style={{ marginBottom: 24 }}>Before you counter anything, you need a number backed by data — not just gut feel or what your friend makes. Data turns your counter from a personal preference into a business case, and it&apos;s much harder for a recruiter to push back on.</p>
        <p style={{ marginBottom: 16 }}>The best places to research compensation for your specific role, level, and location:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 10 }}><strong>Levels.fyi</strong> — especially good for tech and engineering roles</li>
          <li style={{ marginBottom: 10 }}><strong>Glassdoor</strong> — broad coverage across industries and roles</li>
          <li style={{ marginBottom: 10 }}><strong>LinkedIn Salary</strong> — useful for mid-market and non-tech roles</li>
          <li style={{ marginBottom: 10 }}><strong>Payscale</strong> — good for detailed role-level breakdowns</li>
          <li style={{ marginBottom: 10 }}><strong>Blind</strong> — candid, anonymous data from actual employees at specific companies</li>
          <li style={{ marginBottom: 10 }}><strong>Hayven&apos;s <Link href="/tools/comp-analyzer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Compensation Analyzer</Link></strong> — gives you a precise market rate by role, level, and city</li>
        </ul>
        <p style={{ marginBottom: 24 }}>Target the <strong>75th percentile</strong> for your role and location. That&apos;s your anchor — the number you lead with. It should be higher than what you&apos;ll ultimately accept, because negotiation always lands somewhere between your ask and their offer.</p>
        <p style={{ marginBottom: 24 }}>If the offer is at or above the 75th percentile, that&apos;s a sign the base is strong. In that case, focus your negotiation on other components — signing bonus, equity, or flexibility — rather than pushing on base.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Step 3: Decide your numbers before you call</h2>
        <p style={{ marginBottom: 24 }}>Before you get on the phone, know three numbers:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 10 }}><strong>Your ask</strong> — higher than market, your opening position</li>
          <li style={{ marginBottom: 10 }}><strong>Your target</strong> — what you actually want to land at</li>
          <li style={{ marginBottom: 10 }}><strong>Your floor</strong> — the minimum you&apos;ll accept before you walk away</li>
        </ul>
        <p style={{ marginBottom: 24 }}>Most people only think about the ask. Knowing your floor ahead of time means you won&apos;t make a decision you regret in the heat of the moment.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Step 4: Make your counter</h2>
        <p style={{ marginBottom: 24 }}>Counter by phone whenever possible — it&apos;s faster, more personal, and harder to ignore than email. Follow up in writing afterward to confirm anything agreed.</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0f172a' }}>Counter-offer script:</p>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#475569', lineHeight: 1.75 }}>&ldquo;I&apos;ve had a chance to review the offer and I&apos;m genuinely excited about the role and the team. Based on my research on market rates for this position in [city], and given my experience with [specific skill or achievement], I was hoping we could discuss getting to [your ask number]. Is there flexibility there?&rdquo;</p>
        </div>
        <p style={{ marginBottom: 16 }}>Critical rules:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 10 }}>Give a <strong>specific number</strong>, never a range. Ranges anchor to the low end — if you say &ldquo;$90,000 to $100,000,&rdquo; they hear $90,000.</li>
          <li style={{ marginBottom: 10 }}>Counter <strong>higher than your target</strong> so you have room to move</li>
          <li style={{ marginBottom: 10 }}>Stay <strong>warm and enthusiastic</strong> — make it clear you want the job, you just want fair pay</li>
          <li style={{ marginBottom: 10 }}>Never apologize for negotiating — it signals that you don&apos;t believe you deserve it</li>
          <li style={{ marginBottom: 10 }}>After stating your number, <strong>stop talking</strong> — let them respond</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Step 5: Negotiate the full package, not just base</h2>
        <p style={{ marginBottom: 24 }}>If they can&apos;t move on base salary, the conversation isn&apos;t over. Shift to other components — they often come from different budget lines and are easier for a hiring manager to approve.</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 12 }}><strong>Signing bonus</strong> — One-time payment, easier to approve than ongoing salary increases. Even $5,000–$10,000 is worth asking for.</li>
          <li style={{ marginBottom: 12 }}><strong>Equity</strong> — More options, a shorter vesting cliff, or acceleration on acquisition</li>
          <li style={{ marginBottom: 12 }}><strong>Extra vacation days</strong> — Often more flexible than salary. 5 extra days is worth roughly 2% of your salary in time.</li>
          <li style={{ marginBottom: 12 }}><strong>Remote work flexibility</strong> — Worth $5,000–$20,000/year in commuting, time, and quality of life</li>
          <li style={{ marginBottom: 12 }}><strong>Earlier performance review</strong> — Ask for a 6-month review with a specific salary target tied to performance milestones</li>
          <li style={{ marginBottom: 12 }}><strong>Professional development budget</strong> — Conferences, courses, certifications — ask for $2,000–$5,000/year</li>
        </ul>
        <p style={{ marginBottom: 24 }}>For a full breakdown of everything worth evaluating in an offer, read <Link href="/blog/how-to-evaluate-a-job-offer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>how to evaluate a job offer beyond base salary</Link>.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>How to handle the most common objections</h2>

        <p style={{ marginBottom: 12, fontWeight: 600, color: '#0f172a' }}>&ldquo;This is already at the top of our band.&rdquo;</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#475569', lineHeight: 1.75 }}>&ldquo;I appreciate you sharing that. Could we explore a signing bonus or equity adjustment to bridge the gap? I&apos;d love to find a way to make this work.&rdquo;</p>
        </div>

        <p style={{ marginBottom: 12, fontWeight: 600, color: '#0f172a' }}>&ldquo;We don&apos;t negotiate salaries.&rdquo;</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#475569', lineHeight: 1.75 }}>&ldquo;I completely understand. Is there flexibility on the signing bonus side, or any other components of the package? I want to find a way to make this work.&rdquo;</p>
        </div>

        <p style={{ marginBottom: 12, fontWeight: 600, color: '#0f172a' }}>&ldquo;We need a decision by Friday.&rdquo;</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#475569', lineHeight: 1.75 }}>&ldquo;I understand, and I want to make this work before then. Can we jump on a quick call today to see if there&apos;s any room to move on [specific item]? I&apos;m excited about the role and just want to make sure we can get to a number that works for both of us.&rdquo;</p>
        </div>

        <p style={{ marginBottom: 12, fontWeight: 600, color: '#0f172a' }}>&ldquo;What&apos;s your current salary?&rdquo;</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#475569', lineHeight: 1.75 }}>&ldquo;I&apos;d prefer to focus on what&apos;s right for this role and the market. Based on my research, I&apos;m targeting [your number] — does that work within your range?&rdquo;</p>
        </div>
        <p style={{ marginBottom: 24 }}>For a complete list of objection responses, use Hayven&apos;s <Link href="/tools/objections" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Objection Handler</Link> — it gives you three ready-to-use responses to any recruiter pushback.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>What if they say no to everything?</h2>
        <p style={{ marginBottom: 24 }}>It&apos;s rare, but it happens. If they genuinely can&apos;t move on anything, ask one final question: &ldquo;What would it take to get to [your target] in the first year?&rdquo; This surfaces a path forward — a performance review timeline, a specific milestone, a promotion track — and shows you&apos;re thinking long term.</p>
        <p style={{ marginBottom: 24 }}>If the answer is truly nothing, you now have to decide if the offer is worth taking on its current terms. That&apos;s a separate decision from whether you should have negotiated. You should always negotiate.</p>
        <p style={{ marginBottom: 24 }}>No reasonable employer rescinds an offer because a candidate politely asked for more. If they do, you just learned something important about how they treat employees — and you dodged a bullet.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>After you reach agreement: get it in writing</h2>
        <p style={{ marginBottom: 24 }}>Once you reach a verbal agreement, send a confirmation email the same day. Don&apos;t assume the offer letter will automatically reflect what was discussed.</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0f172a' }}>Confirmation email:</p>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#475569', lineHeight: 1.75 }}>&ldquo;Hi [Name] — thank you for working through this with me. I&apos;m excited to join the team. Just to confirm what we discussed: base salary of $[X], signing bonus of $[Y] paid on [date], and a start date of [date]. Please let me know if I&apos;ve captured everything correctly. Looking forward to the official offer letter.&rdquo;</p>
        </div>
      </div>

      <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Build your counter-offer in minutes</div>
        <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>Hayven generates a personalized counter-offer based on your role, location, and market data — so you always have a number backed by evidence.</div>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>Try Free Today - No Credit Card Required</Link>
      </div>
    </article>
  )
}
