import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Why most professionals never negotiate their salary | Hayven',
  description: 'Research shows most professionals never negotiate their salary. Here\'s the psychology behind it — and how to overcome it.',
}

export default function Article() {
  return (
    <article>
      <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 12 }}>Career intelligence · 5 min read</div>
      <h1 style={{ fontSize: 28, fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: 16 }}>Why most professionals never negotiate their salary</h1>
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 32, lineHeight: 1.7 }}>Most people know they should negotiate. Most still don&apos;t. Here&apos;s the psychology behind it — and how to overcome it.</p>

      <div style={{ fontSize: 15, lineHeight: 1.8 }}>
        <p style={{ marginBottom: 20 }}>According to a Salary.com survey, only 37% of workers always negotiate their salary, while 18% never do. And even among those who do negotiate, many leave money on the table by anchoring too low or accepting the first counter.</p>
        <p style={{ marginBottom: 20 }}>This isn&apos;t a knowledge problem. Most people know they should negotiate. It&apos;s a psychology problem.</p>

        <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12, marginTop: 32 }}>The fear of seeming greedy</h2>
        <p style={{ marginBottom: 20 }}>The most common reason people give for not negotiating: they don&apos;t want to seem ungrateful or difficult. This fear is largely unfounded. Most hiring managers expect candidates to negotiate, and a professional, well-reasoned counter rarely damages a relationship. What it almost always does is get a response.</p>

        <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12, marginTop: 32 }}>The anchoring effect</h2>
        <p style={{ marginBottom: 20 }}>When the recruiter names a number first, it anchors the entire conversation. Most candidates then negotiate around that number rather than the market rate. This is one of the most expensive mistakes in compensation negotiation. Before any salary conversation, know your market rate at the 50th and 75th percentile — and anchor to that, not to whatever the recruiter said first.</p>

        <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12, marginTop: 32 }}>The compounding cost you don&apos;t see</h2>
        <p style={{ marginBottom: 20 }}>The true cost of not negotiating isn&apos;t just this year&apos;s salary. It&apos;s every raise, promotion, and job change that uses your current number as a baseline. A $10,000 gap compounded over a career — with annual raises applied to a lower starting point — adds up to far more than most people realise. Not negotiating once is rarely a single event. It&apos;s a pattern.</p>

        <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12, marginTop: 32 }}>The preparation gap</h2>
        <p style={{ marginBottom: 20 }}>Most people walk into salary conversations unprepared. They don&apos;t know their market rate. They haven&apos;t practiced what to say. They don&apos;t have a target number or a plan for getting there. When the moment arrives, anxiety takes over and they accept the first offer.</p>
        <p style={{ marginBottom: 20 }}>The fix is straightforward: prepare. Know your number. Know what you&apos;ll say. Practice it until the silence after your ask doesn&apos;t feel threatening.</p>

        <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12, marginTop: 32 }}>The risk is smaller than you think</h2>
        <p style={{ marginBottom: 20 }}>Offers rarely get pulled because a candidate negotiated professionally. Companies expect it. What happens far more often is that candidates who don&apos;t negotiate leave real money behind — and never know it.</p>
        <p style={{ marginBottom: 20 }}>The risk of negotiating is almost always smaller than the cost of not negotiating.</p>
      </div>

      <div style={{ marginTop: 48, padding: '24px', background: 'var(--color-background-secondary)', borderRadius: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 8 }}>See how much not negotiating costs you</div>
        <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 16 }}>Use the cost of not negotiating calculator to see the compounding gap over your career.</div>
        <Link href="/signup" style={{ display: 'inline-block', background: '#141414', color: '#fff', padding: '8px 18px', borderRadius: 8, fontSize: 13, textDecoration: 'none' }}>Calculate your gap →</Link>
      </div>
    </article>
  )
}
