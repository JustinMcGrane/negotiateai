import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Negotiate Salary After a Job Offer | Hayven',
  description: 'Got an offer? Here\'s exactly how to negotiate salary after a job offer — what to say, when to say it, and how much to ask for.',
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
          How to negotiate salary after a job offer
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, borderLeft: '3px solid #e2e8f0', paddingLeft: 20, margin: 0 }}>
          Most people accept the first number they&apos;re given. That&apos;s a mistake that compounds for years. Here&apos;s how to handle the negotiation the right way.
        </p>
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
        <p style={{ marginBottom: 24 }}>You just got a job offer. Your instinct is to say yes immediately — you&apos;re excited, relieved, and you don&apos;t want to seem greedy. But that instinct is costing you money. Studies consistently show that failing to negotiate your starting salary can cost you $500,000 or more over the course of your career.</p>
        <p style={{ marginBottom: 24 }}>The good news: negotiating after an offer is actually the easiest time to negotiate. You have maximum leverage because they&apos;ve already decided they want you.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Step 1: Don&apos;t respond immediately</h2>
        <p style={{ marginBottom: 24 }}>When you receive an offer — whether by phone or email — your first move is to buy time. Thank them genuinely, express enthusiasm, and ask for time to review. This is completely normal and expected.</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#0f172a' }}>&ldquo;Thank you so much — I&apos;m really excited about this opportunity. I&apos;d love to take a day or two to review the full details. Can I get back to you by [specific date]?&rdquo;</p>
        </div>
        <p style={{ marginBottom: 24 }}>Never negotiate on the spot. You need time to research, prepare your counter, and think clearly.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Step 2: Research your market rate</h2>
        <p style={{ marginBottom: 24 }}>Before you counter, you need a number backed by data — not just what feels fair. Check Levels.fyi, Glassdoor, LinkedIn Salary, and Payscale for your specific role, level, and location. Don&apos;t average the results — aim for the 75th percentile. That&apos;s your target.</p>
        <p style={{ marginBottom: 24 }}>If the offer is below market, that&apos;s your leverage. If it&apos;s at or above market, you can still negotiate — but focus on other components like signing bonus, equity, or remote flexibility instead of base salary.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Step 3: Make your counter</h2>
        <p style={{ marginBottom: 16 }}>Counter by phone if possible — it&apos;s faster and more personal. Email works too. Here&apos;s a script that works:</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#0f172a' }}>&ldquo;I&apos;ve had a chance to review the offer and I&apos;m really excited about the role and the team. Based on my research and experience, I was expecting something closer to [your number]. Is there flexibility to get there?&rdquo;</p>
        </div>
        <p style={{ marginBottom: 24 }}>A few rules: always counter higher than your target (leave room to land where you want), give a specific number not a range, and never apologize for negotiating.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Step 4: Negotiate the full package</h2>
        <p style={{ marginBottom: 24 }}>If they can&apos;t move on base salary, shift to other components. Signing bonus, extra vacation days, remote work flexibility, an earlier performance review, and equity are all negotiable — and sometimes easier to get than base pay because they don&apos;t affect your ongoing salary budget.</p>
        <p style={{ marginBottom: 24 }}>A $10,000 signing bonus isn&apos;t as good as $10,000 more in base salary (since base compounds), but it&apos;s far better than nothing. Always ask.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>What if they say no?</h2>
        <p style={{ marginBottom: 24 }}>In most cases they won&apos;t. But if they genuinely can&apos;t move, ask what it would take to get to your number — an earlier review, a performance bonus, something else. If the answer is truly nothing, you now have to decide if the offer is worth taking. That&apos;s a separate question from whether you should negotiate. You should always negotiate.</p>
        <p style={{ marginBottom: 24 }}>No reasonable employer will rescind an offer because you asked politely. If they do, you just learned something important about how they treat employees.</p>
      </div>

      <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Build your counter-offer in minutes</div>
        <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>Hayven generates a personalized counter-offer based on your role, location, and market data — so you always have a number backed by evidence.</div>
        <Link href="/counter-offer-builder" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#141414', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Build my counter-offer →</Link>
      </div>
    </article>
  )
}
