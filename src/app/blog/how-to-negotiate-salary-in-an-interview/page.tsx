import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Negotiate Salary in an Interview | Hayven',
  description: 'Salary negotiation starts in the interview — not after the offer. Here\'s exactly what to say when salary comes up during the interview process.',
  alternates: { canonical: 'https://gethayven.com/blog/how-to-negotiate-salary-in-an-interview' },
}

const tag = 'Salary negotiation'
const readTime = '7 min read'


const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Negotiate Salary in an Interview',
  description: 'Exactly what to say when salary comes up during the interview process.',
  url: 'https://gethayven.com/blog/how-to-negotiate-salary-in-an-interview',
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
          How to negotiate salary in an interview
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, borderLeft: '3px solid #e2e8f0', paddingLeft: 20, margin: 0 }}>
          Salary negotiation doesn&apos;t start when you get the offer — it starts the moment salary comes up in the interview. Here&apos;s how to handle it.
        </p>
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
        <p style={{ marginBottom: 24 }}>Most people think salary negotiation happens after the offer. That&apos;s wrong. The salary conversation starts the first time a recruiter or interviewer brings it up — which is often in the very first call. How you handle that moment sets the tone for everything that follows.</p>
        <p style={{ marginBottom: 24 }}>Here&apos;s exactly what to say and do when salary comes up during an interview.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>When they ask your salary expectations early in the process</h2>
        <p style={{ marginBottom: 24 }}>The first salary question usually comes in the initial recruiter screen: &ldquo;What are your salary expectations?&rdquo; or &ldquo;What are you currently making?&rdquo; Both are designed to anchor the negotiation to your current situation rather than your market value.</p>
        <p style={{ marginBottom: 24 }}>Your goal at this stage is to deflect without being evasive. You want to learn about the role and demonstrate your value before locking in a number.</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#0f172a' }}>&ldquo;I want to make sure I understand the full scope of the role before discussing numbers. Could you share the budgeted range for this position?&rdquo;</p>
        </div>
        <p style={{ marginBottom: 24 }}>This is professional, direct, and puts the ball back in their court. Most recruiters will either share the range or accept the deflection and move on.</p>
        <p style={{ marginBottom: 24 }}>For more scripts on handling the current salary question, read <Link href="/blog/what-to-say-when-recruiter-asks-current-salary" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>what to say when a recruiter asks your current salary</Link>.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>If they push for a number</h2>
        <p style={{ marginBottom: 24 }}>Sometimes a recruiter will push back and say they need a number to move forward. In that case, give a range — but put your target at the bottom of the range, not the middle.</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#0f172a' }}>&ldquo;Based on my research and experience, I&apos;m targeting somewhere in the $90,000–$100,000 range. But I&apos;m flexible depending on the full package.&rdquo;</p>
        </div>
        <p style={{ marginBottom: 24 }}>By putting your target at the bottom, even if they come in at the low end of your range, you&apos;re still where you want to be. The &ldquo;flexible depending on the full package&rdquo; line signals you&apos;re open to negotiating other components too.</p>
        <p style={{ marginBottom: 24 }}>Before you give any number, make sure you know your market rate. Hayven&apos;s <Link href="/compensation-analyzer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Compensation Analyzer</Link> gives you a precise number for your role, level, and city so you&apos;re never guessing.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>During the interview itself</h2>
        <p style={{ marginBottom: 24 }}>Salary rarely comes up in the middle of a technical or behavioral interview — that&apos;s handled by recruiting. But if an interviewer brings it up, treat it the same way: deflect to the range question, or if pressed, give the same range you gave recruiting.</p>
        <p style={{ marginBottom: 24 }}>The more important thing happening during the interview is building your leverage. Every example you give of your impact, every problem you solve in a case question, every signal you send that you&apos;re the right person for the role — that&apos;s what gives you negotiating power when the offer comes.</p>
        <p style={{ marginBottom: 24 }}>Companies pay more for candidates they really want. Your job in the interview is to become the person they really want.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>At the end of the interview: ask about the timeline</h2>
        <p style={{ marginBottom: 24 }}>At the close of any interview, ask about next steps and timing. This does two things: it shows you&apos;re engaged and serious, and it gives you information you need to manage competing offers if you have them.</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#0f172a' }}>&ldquo;What does the timeline look like from here? I&apos;m actively interviewing and want to make sure I can give this the consideration it deserves.&rdquo;</p>
        </div>
        <p style={{ marginBottom: 24 }}>Mentioning that you&apos;re actively interviewing is not a bluff — it&apos;s a signal that you have options, which increases your leverage when the offer comes.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>When the offer arrives</h2>
        <p style={{ marginBottom: 24 }}>Everything you did during the interview — deflecting the salary question, demonstrating your value, signaling competing interest — pays off when the offer lands. You&apos;ve protected your leverage and given yourself room to negotiate from a position of strength.</p>
        <p style={{ marginBottom: 24 }}>For a complete guide to what happens next, read <Link href="/blog/how-to-negotiate-salary-after-job-offer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>how to negotiate salary after a job offer</Link>.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Practice before your next interview</h2>
        <p style={{ marginBottom: 24 }}>The salary question catches most people off guard because they haven&apos;t practiced answering it. The first time you say &ldquo;I&apos;d prefer to understand the full scope of the role before discussing numbers&rdquo; out loud should not be in a real interview.</p>
        <p style={{ marginBottom: 24 }}>Hayven&apos;s <Link href="/negotiation-simulator" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Negotiation Simulator</Link> lets you practice salary conversations in a realistic setting and get scored feedback — so you walk into your next interview prepared for whatever they ask.</p>
      </div>

      <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Know your number before the interview</div>
        <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>Hayven shows you your precise market rate so you can answer salary questions with confidence — not a guess.</div>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>Get Started Free</Link>
      </div>
    </article>
  )
}
