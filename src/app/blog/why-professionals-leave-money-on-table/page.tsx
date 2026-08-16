import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Why most professionals never negotiate their salary | Hayven',
  description: 'Research shows most professionals never negotiate their salary. Here\'s the psychology behind it — and how to overcome it.',
}

const tag = 'Career intelligence'
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
          Why most professionals never negotiate their salary
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, borderLeft: '3px solid #e2e8f0', paddingLeft: 20, margin: 0 }}>
          Most people know they should negotiate. Most still don&apos;t. Here&apos;s the psychology behind it — and how to overcome it.
        </p>
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
        <p style={{ marginBottom: 24 }}>According to a Salary.com survey, only 37% of workers always negotiate their salary, while 18% never do. And even among those who do negotiate, many leave money on the table by anchoring too low or accepting the first counter.</p>
        <p style={{ marginBottom: 24 }}>This isn&apos;t a knowledge problem. Most people know they should negotiate. It&apos;s a psychology problem.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The fear of seeming greedy</h2>
        <p style={{ marginBottom: 24 }}>The most common reason people give for not negotiating: they don&apos;t want to seem ungrateful or difficult. This fear is largely unfounded. Most hiring managers expect candidates to negotiate, and a professional, well-reasoned counter rarely damages a relationship. What it almost always does is get a response.</p>
        <p style={{ marginBottom: 24 }}>The reality is that companies build negotiation room into their initial offers. When you accept without negotiating, you&apos;re not protecting the relationship — you&apos;re just leaving money the company already budgeted for you on the table.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The anchoring effect</h2>
        <p style={{ marginBottom: 24 }}>When the recruiter names a number first, it anchors the entire conversation. Most candidates then negotiate around that number rather than the market rate. This is one of the most expensive mistakes in compensation negotiation. Before any salary conversation, know your market rate at the 50th and 75th percentile — and anchor to that, not to whatever the recruiter said first.</p>
        <p style={{ marginBottom: 24 }}>If a recruiter asks what you&apos;re currently making, you don&apos;t have to answer. <Link href="/blog/what-to-say-when-recruiter-asks-current-salary" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Here&apos;s exactly what to say instead</Link> — and why deflecting protects your leverage.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The compounding cost you don&apos;t see</h2>
        <p style={{ marginBottom: 24 }}>The true cost of not negotiating isn&apos;t just this year&apos;s salary. It&apos;s every raise, promotion, and job change that uses your current number as a baseline. A $10,000 gap compounded over a career — with annual raises applied to a lower starting point — adds up to far more than most people realise. Not negotiating once is rarely a single event. It&apos;s a pattern.</p>
        <p style={{ marginBottom: 24 }}>Use Hayven&apos;s <Link href="/tools/cost-calculator" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Cost of Not Negotiating calculator</Link> to see the exact dollar amount you&apos;re leaving behind over 5, 10, and 20 years based on your current salary gap.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The preparation gap</h2>
        <p style={{ marginBottom: 24 }}>Most people walk into salary conversations unprepared. They don&apos;t know their market rate. They haven&apos;t practiced what to say. They don&apos;t have a target number or a plan for getting there. When the moment arrives, anxiety takes over and they accept the first offer.</p>
        <p style={{ marginBottom: 24 }}>The fix is straightforward: prepare. Know your number. Know what you&apos;ll say. Practice it until the silence after your ask doesn&apos;t feel threatening.</p>
        <p style={{ marginBottom: 24 }}>Start by finding your actual market rate — not a Glassdoor range, but a precise number based on your role, level, and location. Hayven&apos;s <Link href="/tools/comp-analyzer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Compensation Analyzer</Link> gives you that number so you walk in knowing exactly where you stand.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The risk is smaller than you think</h2>
        <p style={{ marginBottom: 24 }}>Offers rarely get pulled because a candidate negotiated professionally. Companies expect it. What happens far more often is that candidates who don&apos;t negotiate leave real money behind — and never know it.</p>
        <p style={{ marginBottom: 24 }}>The risk of negotiating is almost always smaller than the cost of not negotiating.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>How to actually start negotiating</h2>
        <p style={{ marginBottom: 24 }}>If you&apos;ve never negotiated before, the hardest part is knowing what to say in the moment. The good news is there are only a handful of scenarios — and each one has a proven response.</p>
        <p style={{ marginBottom: 24 }}>When you get an offer, the first step is to evaluate it fully before responding. Don&apos;t just look at base salary. Look at equity, bonus structure, benefits, and total compensation. <Link href="/blog/how-to-evaluate-a-job-offer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Here&apos;s how to evaluate a job offer properly</Link> before you decide what to counter.</p>
        <p style={{ marginBottom: 24 }}>Once you have a number in mind, <Link href="/blog/how-to-negotiate-salary-after-job-offer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>here&apos;s how to negotiate salary after a job offer</Link> — including what to say, when to say it, and how to handle the most common pushback.</p>
        <p style={{ marginBottom: 24 }}>And if you want to practice before the real conversation, Hayven&apos;s <Link href="/tools/simulator" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Negotiation Simulator</Link> lets you roleplay the entire negotiation and get scored feedback — so you walk in knowing exactly what to do when things get uncomfortable.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The one thing that changes everything</h2>
        <p style={{ marginBottom: 24 }}>The biggest shift isn&apos;t tactical — it&apos;s mental. Most people treat a job offer like a take-it-or-leave-it situation. It isn&apos;t. It&apos;s the opening move in a conversation that both sides expect to have.</p>
        <p style={{ marginBottom: 24 }}>When you understand that, the fear drops. You&apos;re not being difficult. You&apos;re participating in a normal professional exchange. And once you do it once, you&apos;ll never go back to accepting first offers.</p>
      </div>

      <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>See how much not negotiating costs you</div>
        <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>Use the cost of not negotiating calculator to see the compounding gap over your career.</div>
        <Link href="/upgrade" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>✦ Try 7 days for $4.99</Link>
      </div>
    </article>
  )
}
