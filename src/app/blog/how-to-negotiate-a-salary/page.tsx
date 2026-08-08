import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Negotiate a Salary: The Complete Guide | Hayven',
  description: 'Learn how to negotiate a salary the right way — from researching your market rate to making the ask and handling pushback. Step-by-step guide.',
}

const tag = 'Salary negotiation'
const readTime = '8 min read'

export default function Article() {
  return (
    <article>
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#4A90D9', background: '#EBF5FB', padding: '4px 10px', borderRadius: 20 }}>{tag}</span>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>{readTime}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: 20 }}>
          How to negotiate a salary: the complete guide
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, borderLeft: '3px solid #e2e8f0', paddingLeft: 20, margin: 0 }}>
          Most people never negotiate their salary. The ones who do earn significantly more over their careers. Here&apos;s exactly how to do it.
        </p>
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
        <p style={{ marginBottom: 24 }}>Salary negotiation is one of the highest-return activities you can do in your career. A single successful negotiation can add $5,000–$20,000 to your annual income — and because future raises and offers are often based on your current salary, that gap compounds for years.</p>
        <p style={{ marginBottom: 24 }}>Yet most people never do it. They accept the first number offered and move on. This guide will show you exactly how to negotiate a salary — whether you&apos;re starting a new job or asking for a raise at your current one.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Step 1: Know your market rate before anything else</h2>
        <p style={{ marginBottom: 24 }}>You can&apos;t negotiate effectively without knowing what the market pays for your role, level, and location. This is your anchor — the number everything else revolves around.</p>
        <p style={{ marginBottom: 24 }}>Check Levels.fyi, Glassdoor, LinkedIn Salary, and Payscale. Don&apos;t average the results — look at the 75th percentile. That&apos;s what strong performers in your role are making, and that&apos;s what you should be targeting.</p>
        <p style={{ marginBottom: 24 }}>Hayven&apos;s <Link href="/tools/comp-analyzer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Compensation Analyzer</Link> gives you a precise market rate based on your specific role, level, and city — so you go into any negotiation with real data, not a guess.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Step 2: Never give a number first</h2>
        <p style={{ marginBottom: 24 }}>Whoever names a number first loses anchoring power. If a recruiter asks what you&apos;re currently making or what you&apos;re looking for, deflect. Turn it back to them: &ldquo;I&apos;d love to understand the full scope of the role first. What&apos;s the budgeted range for this position?&rdquo;</p>
        <p style={{ marginBottom: 24 }}>If they press you, give a range with your target at the bottom — not the middle. That way even if they come in at the low end of your range, you&apos;re still at your target.</p>
        <p style={{ marginBottom: 24 }}>For exactly what to say when a recruiter asks your current salary, read <Link href="/blog/what-to-say-when-recruiter-asks-current-salary" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>this guide</Link>.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Step 3: Let them make the first offer</h2>
        <p style={{ marginBottom: 24 }}>When an offer comes in, don&apos;t respond immediately. Thank them, express genuine enthusiasm, and ask for 24–48 hours to review. This is completely normal and expected — no company will pull an offer because you asked for time to think.</p>
        <p style={{ marginBottom: 24 }}>Use that time to compare the offer to your market rate research, evaluate the full package, and prepare your counter.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Step 4: Make a specific, confident counter</h2>
        <p style={{ marginBottom: 24 }}>Counter with a specific number, not a range. &ldquo;I was hoping for something closer to $95,000&rdquo; is stronger than &ldquo;I was thinking somewhere between $90,000 and $100,000.&rdquo; Ranges signal flexibility downward — a specific number signals you know your worth.</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#0f172a' }}>&ldquo;Thank you so much for the offer — I&apos;m genuinely excited about this role. Based on my research and experience, I was expecting something closer to $[your number]. Is there flexibility to get there?&rdquo;</p>
        </div>
        <p style={{ marginBottom: 24 }}>Always counter higher than your actual target. Leave room to land where you want. If your target is $90,000, counter at $95,000–$100,000.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Step 5: Negotiate the full package, not just base salary</h2>
        <p style={{ marginBottom: 24 }}>If they can&apos;t move on base, pivot to other components. Signing bonus, extra PTO, remote work flexibility, equity, an earlier performance review — all of these have real monetary value and are often easier to get than base salary increases.</p>
        <p style={{ marginBottom: 24 }}>A $10,000 signing bonus isn&apos;t as good as $10,000 more in base salary since base compounds, but it&apos;s far better than nothing. For a full guide on signing bonuses, read <Link href="/blog/how-to-negotiate-signing-bonus" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>how to negotiate a signing bonus</Link>.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Step 6: Handle pushback without folding</h2>
        <p style={{ marginBottom: 24 }}>When they push back — and they will — stay calm and hold your position. The most common response you&apos;ll get is &ldquo;that&apos;s at the top of our range&rdquo; or &ldquo;we don&apos;t have budget flexibility right now.&rdquo;</p>
        <p style={{ marginBottom: 24 }}>Your response: &ldquo;I understand. Is there flexibility on [signing bonus / equity / start date / PTO]? I want to make this work.&rdquo; This keeps the conversation going without you conceding on base salary immediately.</p>
        <p style={{ marginBottom: 24 }}>If you want to practice handling pushback before the real conversation, Hayven&apos;s <Link href="/tools/simulator" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Negotiation Simulator</Link> lets you roleplay the entire negotiation and get scored feedback.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Step 7: Get it in writing</h2>
        <p style={{ marginBottom: 24 }}>Once you&apos;ve reached an agreement, ask for everything in writing before you give notice at your current job. Verbal agreements don&apos;t hold up. A formal offer letter with the agreed salary, start date, and any other negotiated terms is what you need before you take any action.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The one thing that changes everything</h2>
        <p style={{ marginBottom: 24 }}>Most people fail at salary negotiation not because they lack information — it&apos;s because they haven&apos;t practiced. The silence after you name your number feels unbearable. The recruiter&apos;s hesitation feels like rejection. These are the moments most negotiations fall apart.</p>
        <p style={{ marginBottom: 24 }}>The solution is practice. Run the conversation before it happens. The more familiar it feels, the more confident you&apos;ll be when it matters. Use Hayven&apos;s <Link href="/tools/simulator" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Negotiation Simulator</Link> to practice against a realistic AI coach and get scored feedback before your next real negotiation.</p>
      </div>

      <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Know your number before you negotiate</div>
        <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>Hayven shows you your precise market rate so you walk into every salary conversation with real data behind you.</div>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#141414', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Check my market value →</Link>
      </div>
    </article>
  )
}
