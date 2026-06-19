import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Why 75% of professionals leave money on the table | NegotiateAI',
  description: 'Research shows most professionals never negotiate their salary. Here\'s the psychology behind it — and how to overcome it.',
}

export default function Article() {
  return (
    <article>
      <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 12 }}>Career intelligence · 5 min read</div>
      <h1 style={{ fontSize: 28, fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: 16 }}>Why 75% of professionals leave money on the table</h1>
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 32, lineHeight: 1.7 }}>The research is clear: most people don&apos;t negotiate. Here&apos;s the psychology behind it — and how to overcome it.</p>

      <div style={{ fontSize: 15, lineHeight: 1.8 }}>
        <p style={{ marginBottom: 20 }}>According to a Salary.com survey, only 37% of workers always negotiate their salary. 18% never do. And even among those who do negotiate, many leave significant money on the table by anchoring too low or folding at the first sign of pushback.</p>
        <p style={{ marginBottom: 20 }}>This isn&apos;t a knowledge problem. Most people know they should negotiate. It&apos;s a psychology problem.</p>

        <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12, marginTop: 32 }}>The fear of seeming greedy</h2>
        <p style={{ marginBottom: 20 }}>The most common reason people give for not negotiating: they don&apos;t want to seem ungrateful or greedy. This fear is almost entirely unfounded. In a Carnegie Mellon study, 85% of hiring managers said they would not rescind an offer simply because a candidate negotiated. The act of negotiating doesn&apos;t damage relationships — in fact, it often signals confidence that managers respect.</p>

        <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12, marginTop: 32 }}>The anchoring effect</h2>
        <p style={{ marginBottom: 20 }}>When the recruiter names a number first, it anchors the entire conversation. Most candidates then negotiate around that number rather than the market rate. This is one of the most expensive mistakes in compensation negotiation. Before any conversation about salary, you should know your market rate at the 50th and 75th percentile — and anchor to that, not to whatever the recruiter said first.</p>

        <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12, marginTop: 32 }}>The compounding cost you don&apos;t see</h2>
        <p style={{ marginBottom: 20 }}>The true cost of not negotiating isn&apos;t just this year&apos;s salary. It&apos;s every raise, promotion, and job change that uses this number as a baseline. A $10,000 gap at age 30, compounded with 3% annual raises, becomes a $180,000+ gap by age 50. Not negotiating once is rarely a single event — it&apos;s a compounding pattern.</p>

        <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12, marginTop: 32 }}>The preparation gap</h2>
        <p style={{ marginBottom: 20 }}>Most people walk into salary conversations completely unprepared. They don&apos;t know their market rate. They haven&apos;t practiced what to say. They don&apos;t have a target number or a strategy for getting there. When the moment arrives, anxiety takes over and they accept the first offer.</p>
        <p style={{ marginBottom: 20 }}>The fix is mechanical: prepare. Know your number. Write your script. Practice saying it out loud until the silence after doesn&apos;t feel threatening.</p>

        <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12, marginTop: 32 }}>The 9-out-of-10 statistic</h2>
        <p style={{ marginBottom: 20 }}>Here&apos;s the number that should change your behavior: 9 out of 10 counter-offers get a response. Not a rescission. Not anger. A response — meaning the company engages with your ask. You might not get everything you want. But you will get something, and the relationship will be fine.</p>
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
