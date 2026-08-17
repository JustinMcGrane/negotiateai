import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Ask for a Raise: Scripts That Actually Work | Hayven',
  description: 'Asking for a raise is uncomfortable — but it doesn\'t have to be awkward. Here are the exact scripts and strategies that get results.',
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
          How to ask for a raise: scripts that actually work
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, borderLeft: '3px solid #e2e8f0', paddingLeft: 20, margin: 0 }}>
          Most people handle this conversation wrong — they ask too vaguely, at the wrong time, without the right data. Here&apos;s how to do it right.
        </p>
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
        <p style={{ marginBottom: 24 }}>Asking for a raise is one of the highest-return conversations you can have in your career. A successful ask can add $10,000–$30,000 a year to your income — money that compounds in every future offer, every future raise, and every future negotiation. And yet most people either never ask or ask in a way that rarely works.</p>
        <p style={{ marginBottom: 24 }}>The difference between a raise that gets approved and one that gets deflected usually isn&apos;t the quality of your work. It&apos;s the quality of your preparation and your delivery.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Before you say anything: the three things you need</h2>
        <p style={{ marginBottom: 16 }}>Walk into this conversation with all three or wait until you have them:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 12 }}><strong>Market data</strong> — What does the market pay for your role, level, and location? Check Levels.fyi, Glassdoor, and LinkedIn Salary. Aim for the 75th percentile as your target, not the median.</li>
          <li style={{ marginBottom: 12 }}><strong>Your wins</strong> — Specific, quantified accomplishments from the past 6–12 months. &ldquo;I shipped the new checkout flow that increased conversion by 8%&rdquo; is evidence. &ldquo;I worked really hard&rdquo; isn&apos;t.</li>
          <li style={{ marginBottom: 12 }}><strong>The right moment</strong> — After a major project ships, after a strong performance review, after you&apos;ve taken on new responsibilities, or during your company&apos;s budget planning cycle. Not right after layoffs or a tough quarter.</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>How to open the conversation</h2>
        <p style={{ marginBottom: 16 }}>Don&apos;t ambush your manager. Set up a dedicated meeting so they can come prepared. Here&apos;s how to request it:</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#0f172a' }}>&ldquo;Hey [name], I&apos;d love to find 30 minutes to talk about my compensation. I&apos;ve been doing some research on market rates and I have some thoughts I&apos;d like to share — can we put something on the calendar?&rdquo;</p>
        </div>
        <p style={{ marginBottom: 24 }}>This gives your manager a heads-up that a compensation conversation is coming. They appreciate the transparency, and it means they won&apos;t be caught off guard. Never surprise your manager with a raise ask — it puts them in a defensive position before you&apos;ve even started.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The script that works</h2>
        <p style={{ marginBottom: 16 }}>In the meeting, lead with your contributions, then the market, then the specific ask:</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#0f172a' }}>&ldquo;Over the past year, I&apos;ve [specific accomplishment], [specific accomplishment], and [specific accomplishment]. I&apos;ve also taken on [new responsibility]. I&apos;ve been researching what the market is paying for roles like mine, and I&apos;m seeing a median of around $[X] for my level and location, with the 75th percentile at $[Y]. I&apos;d like to discuss getting my base to $[Z]. Can we make that happen?&rdquo;</p>
        </div>
        <p style={{ marginBottom: 24 }}>The number you name should be specific — not a range. Ranges signal uncertainty and the manager will anchor to the bottom. A specific number signals confidence and gives them something concrete to work with.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>When they say &ldquo;the budget isn&apos;t there right now&rdquo;</h2>
        <p style={{ marginBottom: 24 }}>This is the most common deflection, and it&apos;s not always an excuse. Budgets are real constraints. The right move is to get a commitment on when and what:</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#0f172a' }}>&ldquo;I understand — I appreciate you being transparent about that. Can we agree on a specific number and a timeline? I want to make sure we&apos;re working toward the same goal. If we can get to $[X] by [quarter/date], that works for me.&rdquo;</p>
        </div>
        <p style={{ marginBottom: 24 }}>Get the commitment in writing — even just a follow-up email summarizing what was agreed. Vague promises about &ldquo;revisiting this later&rdquo; rarely materialize without a deadline and a number attached.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>When they say no</h2>
        <p style={{ marginBottom: 24 }}>A hard no without a path forward is important information. It tells you something about how the company values you relative to the market. Don&apos;t get emotional — get strategic:</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#0f172a' }}>&ldquo;I appreciate your honesty. Can you help me understand what would need to be true — in terms of performance or timeline — for this to be possible? I want to make sure I&apos;m working toward the right things.&rdquo;</p>
        </div>
        <p style={{ marginBottom: 24 }}>If the answer is still vague, you&apos;ve learned something useful: this company isn&apos;t going to pay you market rate. That&apos;s valuable information as you think about your next move.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>One thing most people forget</h2>
        <p style={{ marginBottom: 24 }}>Raises compound. If you get $10,000 more this year, that&apos;s not just $10,000 — it&apos;s a higher base for every future raise, every future offer, and every future comp conversation. The cost of not asking isn&apos;t just this year&apos;s delta. It&apos;s every year that follows.</p>
        <p style={{ marginBottom: 24 }}>Most people dramatically underestimate how much they leave on the table over a career by avoiding this conversation. Even a single successful ask early in your career can be worth $100,000+ in lifetime earnings. Use Hayven&apos;s <Link href="/tools/cost-calculator" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Cost of Not Negotiating calculator</Link> to see the compounding dollar impact over your career.</p>
        <p style={{ marginBottom: 24 }}>If you want a fully built raise request — with your wins, market data, and talking points organized — Hayven&apos;s <Link href="/tools/raise-builder" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Raise Builder</Link> generates a complete raise case in minutes.</p>
      </div>

      <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Know your number before you ask</div>
        <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>Hayven shows you your precise market percentile so you can walk into the raise conversation with real data — not a guess.</div>
        <Link href="/upgrade" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>✦ Try 7 days for $4.99</Link>
      </div>
    </article>
  )
}
