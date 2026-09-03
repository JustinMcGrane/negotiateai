import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'What to Say When a Recruiter Asks Your Current Salary | Hayven',
  description: 'Recruiters ask your current salary to anchor the offer low. Here\'s exactly what to say to protect your leverage and get a better offer.',
  alternates: { canonical: 'https://gethayven.com/blog/what-to-say-when-recruiter-asks-current-salary' },
}

const tag = 'Salary negotiation'
const readTime = '5 min read'


const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What to Say When a Recruiter Asks Your Current Salary',
  description: 'Exactly what to say to protect your leverage and get a better offer.',
  url: 'https://gethayven.com/blog/what-to-say-when-recruiter-asks-current-salary',
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
          What to say when a recruiter asks your current salary
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, borderLeft: '3px solid #e2e8f0', paddingLeft: 20, margin: 0 }}>
          This question isn&apos;t small talk. How you answer it will shape every number in your offer. Here&apos;s how to handle it.
        </p>
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
        <p style={{ marginBottom: 24 }}>It comes up in almost every early recruiter call: &ldquo;So, what are you currently making?&rdquo; It sounds casual. It isn&apos;t. The recruiter is trying to anchor your offer to your current salary — which may have nothing to do with what you&apos;re worth in the current market.</p>
        <p style={{ marginBottom: 24 }}>If you answer honestly, you hand them a ceiling. If you&apos;re underpaid now, you&apos;ll likely be underpaid in your next role too.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Why recruiters ask this question</h2>
        <p style={{ marginBottom: 24 }}>Recruiters ask for your current salary for one reason: it makes their job easier. If they know you&apos;re making $90,000, they can offer $95,000 and call it a raise. You&apos;ll probably take it. They&apos;ve just saved their company $15,000–$30,000 a year compared to what the market would have required them to pay.</p>
        <p style={{ marginBottom: 24 }}>The question is designed to benefit the employer, not you. In many US states, it&apos;s now illegal for employers to even ask. But even where it&apos;s legal, you have no obligation to answer it directly.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The best response (and why it works)</h2>
        <p style={{ marginBottom: 16 }}>Here&apos;s what to say:</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#0f172a' }}>&ldquo;I&apos;d prefer to focus on what the role is worth and what I&apos;m looking for going forward. Based on my research and experience, I&apos;m targeting [target range]. Does that work with your budget?&rdquo;</p>
        </div>
        <p style={{ marginBottom: 24 }}>This response does three things at once: it deflects the question without lying, it anchors the conversation to market rate instead of your current salary, and it immediately asks a question back — which puts the recruiter on the defensive in the best possible way.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>What if they push back?</h2>
        <p style={{ marginBottom: 24 }}>Some recruiters will push. They&apos;ll say they need the number for their system, or that they can&apos;t move forward without it. Most of the time this isn&apos;t true — it&apos;s a pressure tactic.</p>
        <p style={{ marginBottom: 16 }}>If they press a second time, try this:</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#0f172a' }}>&ldquo;I&apos;m not comfortable sharing that at this stage — I want to make sure we&apos;re evaluating fit before getting into numbers. What I can tell you is that I&apos;m looking for [range]. If that&apos;s in the right territory, I&apos;d love to keep talking.&rdquo;</p>
        </div>
        <p style={{ marginBottom: 24 }}>You&apos;re not being difficult. You&apos;re being professional. Any recruiter who drops you for not revealing your current salary wasn&apos;t going to give you a fair offer anyway.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>How to figure out your target range</h2>
        <p style={{ marginBottom: 24 }}>The only way to confidently name a number is to know what the market actually pays. Look at data from Levels.fyi, Glassdoor, LinkedIn Salary, and Payscale for your specific role and location. Don&apos;t average them — look at the 75th percentile and aim there. Hayven&apos;s <Link href="/compensation-analyzer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Compensation Analyzer</Link> does this automatically — it gives you a precise market rate by role, level, and city so you can name a number with confidence. If you&apos;re currently underpaid, the market data is your leverage.</p>
        <p style={{ marginBottom: 24 }}>Your target range should be specific enough to be credible and wide enough to give you room. A $10,000–$15,000 window is ideal. Lead with the top of your range — you can always come down, but you can rarely go up.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>One thing most people get wrong</h2>
        <p style={{ marginBottom: 24 }}>Most people wait until the offer arrives to think about negotiation. By then, the recruiter has already anchored internally to a number — often based on what they guessed you were making. The salary conversation starts the moment a recruiter reaches out, not when the offer lands.</p>
        <p style={{ marginBottom: 24 }}>Handle this question well and you&apos;ll walk into the offer conversation with your leverage intact. Handle it poorly and you&apos;ll spend the rest of the process fighting uphill. Once the offer does arrive, read <Link href="/blog/how-to-negotiate-salary-after-job-offer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>how to negotiate salary after a job offer</Link> for the exact scripts to use next.</p>
      </div>

      <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Find out what you should actually be earning</div>
        <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>Hayven shows you your real market rate so you can name a number with confidence — not a guess.</div>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>Get Started Free</Link>
      </div>
    </article>
  )
}
