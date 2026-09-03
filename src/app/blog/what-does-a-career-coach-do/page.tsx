import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'What Does a Career Coach Do? | Hayven',
  description: 'A career coach helps you get paid more, land better jobs, and make smarter career moves. Here\'s what they actually do — and how AI is changing the cost.',
  alternates: { canonical: 'https://gethayven.com/blog/what-does-a-career-coach-do' },
}

const tag = 'Career intelligence'
const readTime = '6 min read'


const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What Does a Career Coach Do?',
  description: 'A career coach helps you get paid more, land better jobs, and make smarter career moves.',
  url: 'https://gethayven.com/blog/what-does-a-career-coach-do',
  publisher: { '@type': 'Organization', name: 'Hayven', url: 'https://gethayven.com' },
  author: { '@type': 'Organization', name: 'Hayven' },
}
export default function Article() {
  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#4A90D9', background: '#EBF5FB', padding: '4px 10px', borderRadius: 20 }}>{tag}</span>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>{readTime}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: 20 }}>
          What does a career coach do? (And how to get one free)
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, borderLeft: '3px solid #e2e8f0', paddingLeft: 20, margin: 0 }}>
          A good career coach is like having a recruiter in your corner who tells you the truth. Here&apos;s what they actually do — and why most people can&apos;t afford one.
        </p>
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
        <p style={{ marginBottom: 24 }}>Career coaches charge $100–$500 per hour. The good ones are worth it. But for most people, that price puts real career coaching out of reach — which means they navigate job searches, salary negotiations, and career pivots alone, making avoidable mistakes that cost them far more than a coaching session would have.</p>
        <p style={{ marginBottom: 24 }}>This guide explains what a career coach actually does, when it&apos;s worth paying for one, and how to get the same value for free.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>What a career coach actually does</h2>
        <p style={{ marginBottom: 24 }}>A career coach helps you make better decisions about your professional life. That sounds vague, so here&apos;s what it looks like in practice:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 12 }}><strong>Resume review</strong> — identifying what&apos;s costing you interviews before a human even reads it</li>
          <li style={{ marginBottom: 12 }}><strong>Salary research</strong> — telling you what you should actually be earning, not what you think you should be earning</li>
          <li style={{ marginBottom: 12 }}><strong>Negotiation coaching</strong> — preparing you for the exact conversation you&apos;re about to have, including how to respond to common pushback</li>
          <li style={{ marginBottom: 12 }}><strong>Interview prep</strong> — running mock interviews, giving honest feedback on your answers, helping you tell your story compellingly</li>
          <li style={{ marginBottom: 12 }}><strong>Job search strategy</strong> — helping you target the right roles at the right companies instead of applying everywhere and hearing nothing</li>
          <li style={{ marginBottom: 12 }}><strong>Career pivots</strong> — helping you assess whether a move makes sense and how to position a non-linear background</li>
        </ul>
        <p style={{ marginBottom: 24 }}>The common thread is that a good career coach tells you the truth. Not what you want to hear — what you need to hear to actually move forward.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>What a career coach is not</h2>
        <p style={{ marginBottom: 24 }}>A career coach is not a recruiter. Recruiters work for companies and get paid to fill roles — their incentive is to place you in a job, not necessarily the right job for you. A career coach works for you.</p>
        <p style={{ marginBottom: 24 }}>A career coach is also not a therapist, a life coach, or a motivational speaker. The best ones are practical and direct. They give you specific advice you can act on immediately, not general wisdom about following your passion.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>When is a career coach worth it?</h2>
        <p style={{ marginBottom: 24 }}>A career coach is most valuable at specific inflection points:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 12 }}>You have a job offer and want to negotiate it effectively</li>
          <li style={{ marginBottom: 12 }}>You&apos;ve been job searching for months with no results</li>
          <li style={{ marginBottom: 12 }}>You want to make a career pivot into a new industry or function</li>
          <li style={{ marginBottom: 12 }}>You&apos;re stuck at the same level and don&apos;t know how to get promoted</li>
          <li style={{ marginBottom: 12 }}>You have interviews but keep not getting offers</li>
        </ul>
        <p style={{ marginBottom: 24 }}>In any of these situations, the right advice at the right time can change the outcome significantly. A single successful salary negotiation after a coaching session can pay for months of coaching fees.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Why most people can&apos;t afford one</h2>
        <p style={{ marginBottom: 24 }}>The problem with traditional career coaching is the price. At $150–$500 per hour, a few sessions can easily cost $500–$2,000. That&apos;s a real barrier for most professionals — especially those earlier in their careers who need the help most.</p>
        <p style={{ marginBottom: 24 }}>The irony is that the people who can least afford a career coach are often the ones who would benefit most from one. Someone making $60,000 who successfully negotiates $70,000 has gotten a 17% raise — but they had to pay $500 to get there.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>How to get career coaching without paying $500/hour</h2>
        <p style={{ marginBottom: 24 }}>Hayven built Sarah to solve this problem. Sarah is a personalized AI career coach that does everything a human career coach does — salary research, resume feedback, negotiation coaching, interview prep, job search strategy — available 24/7 at a fraction of the cost.</p>
        <p style={{ marginBottom: 24 }}>Unlike generic AI tools, Sarah is specifically built for career and compensation coaching. She knows what hiring managers actually think, what kills resumes before a human reads them, what&apos;s actually negotiable in an offer, and how to position you to win.</p>
        <p style={{ marginBottom: 24 }}>And because she&apos;s available anytime, you can get coaching the night before an interview, the morning of a negotiation call, or any other moment when you need it most — not just when you can schedule a session.</p>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', padding: '12px 24px', borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: 'none', marginBottom: 24, boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>Get Started Free</Link>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>What Sarah can help you with right now</h2>
        <p style={{ marginBottom: 24 }}>If you have a job offer, Sarah can help you <Link href="/blog/how-to-negotiate-salary-after-job-offer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>negotiate it</Link> — what to counter, how much to ask for, and what to say when they push back.</p>
        <p style={{ marginBottom: 24 }}>If you think you might be underpaid, she can help you figure out your <Link href="/compensation-analyzer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>actual market rate</Link> and build a case for a raise.</p>
        <p style={{ marginBottom: 24 }}>If you&apos;re job searching, she can review your resume, help you target the right roles, and prep you for interviews.</p>
        <p style={{ marginBottom: 24 }}>The best way to understand what a career coach does is to talk to one. <Link href="/signup" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Start a conversation with Sarah</Link> — sign up free and see exactly what you&apos;re leaving on the table.</p>
      </div>

      <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Meet Sarah — your AI career coach</div>
        <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>Sarah is a personalized AI career coach available 24/7. Resume feedback, salary research, negotiation coaching, interview prep — all in one conversation. Try Hayven free.</div>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>Get Started Free</Link>
      </div>
    </article>
  )
}
