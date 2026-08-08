import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Evaluate a Job Offer (Beyond the Base Salary) | Hayven',
  description: 'Base salary is just one number. Here\'s how to evaluate the full value of a job offer — and what to negotiate before you sign.',
}

const tag = 'Salary negotiation'
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
          How to evaluate a job offer (beyond the base salary)
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, borderLeft: '3px solid #e2e8f0', paddingLeft: 20, margin: 0 }}>
          The number on the offer letter is just the start. Here&apos;s a complete framework for evaluating what a job actually pays — and what to push back on.
        </p>
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
        <p style={{ marginBottom: 24 }}>Most candidates make their decision based on base salary. That&apos;s understandable — it&apos;s the most visible number and the easiest to compare. But base salary is often a small fraction of the real value (or cost) of a job offer. Making a decision without evaluating the full picture is how people end up in roles that pay less than they thought — or pass on offers that were actually exceptional.</p>
        <p style={{ marginBottom: 24 }}>Here&apos;s a complete framework for evaluating every dimension of an offer before you respond.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Start with total compensation, not base</h2>
        <p style={{ marginBottom: 16 }}>Total compensation (TC) includes every form of pay you receive. For most tech and knowledge-work roles, that means:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 12 }}><strong>Base salary</strong> — The fixed annual amount, paid every paycheck.</li>
          <li style={{ marginBottom: 12 }}><strong>Annual bonus</strong> — Usually expressed as a percentage of base (10–20% is common). Ask what the target bonus is, what percentage of employees actually hit it, and whether there&apos;s a cap.</li>
          <li style={{ marginBottom: 12 }}><strong>Equity / RSUs</strong> — Restricted stock units that vest over time. Ask for the total grant value, the vesting schedule (4 years with a 1-year cliff is standard), and whether there are refresh grants after vesting.</li>
          <li style={{ marginBottom: 12 }}><strong>Sign-on bonus</strong> — One-time payment, often with a clawback if you leave within 1–2 years. Useful for replacing unvested equity you&apos;re leaving behind.</li>
        </ul>
        <p style={{ marginBottom: 24 }}>A useful mental model: annualize everything. If you get a $200,000 base, a $20,000 target bonus, and a $100,000 RSU grant vesting over 4 years, your annualized TC is $245,000. That&apos;s a very different number than the $200,000 on the offer letter.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Benefits: the hidden value (and cost)</h2>
        <p style={{ marginBottom: 16 }}>Benefits can be worth $20,000–$40,000 a year in real money — or almost nothing. Here&apos;s what to evaluate:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 12 }}><strong>Health insurance</strong> — What&apos;s the monthly premium for you? For a family? What are the deductibles and out-of-pocket maximums? A low premium with a high deductible is worse than it looks. Premium-free family coverage is worth $15,000–$25,000/year in pre-tax dollars.</li>
          <li style={{ marginBottom: 12 }}><strong>401(k) match</strong> — A 4% match on a $150,000 salary is $6,000 of free money annually. The vesting schedule matters too — some companies vest immediately, others over 3–4 years.</li>
          <li style={{ marginBottom: 12 }}><strong>HSA contribution</strong> — Some employers contribute to your Health Savings Account. $1,000–$2,000/year is common at generous companies.</li>
          <li style={{ marginBottom: 12 }}><strong>PTO</strong> — How many days? Is PTO accrued or unlimited? &ldquo;Unlimited PTO&rdquo; often means less taken in practice. Ask what the average employee actually takes.</li>
          <li style={{ marginBottom: 12 }}><strong>Parental leave</strong> — 12–20 weeks for primary caregivers is a meaningful number. Some companies offer less. This matters more than people realize until they need it.</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Equity: ask these questions before you get excited</h2>
        <p style={{ marginBottom: 24 }}>Startup equity especially deserves scrutiny. A $500,000 equity grant sounds great — but the details determine whether it&apos;s meaningful or worthless.</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 12 }}><strong>What percentage of the company does this represent?</strong> 0.1% of a $1B company is $1M. 0.1% of a $20M company is $20,000. The dollar value means nothing without the percentage and the valuation.</li>
          <li style={{ marginBottom: 12 }}><strong>What is the current 409A valuation (strike price)?</strong> Options are only valuable if the company exits above your strike price. If the company is already valued at $2B and your options strike at $1.50, you need a significant exit to see real value.</li>
          <li style={{ marginBottom: 12 }}><strong>What is the preference stack?</strong> Investors with liquidation preferences get paid before employees. In a modest exit, employees can end up with almost nothing even if the company &ldquo;sold for $X.&rdquo;</li>
          <li style={{ marginBottom: 12 }}><strong>How long do you have to exercise after leaving?</strong> Some companies give you 30–90 days. Others give 5–10 years. A long exercise window is significantly more valuable.</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Non-financial factors that affect value</h2>
        <p style={{ marginBottom: 24 }}>These don&apos;t show up in the offer letter but affect the real value of the job:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 12 }}><strong>Career trajectory</strong> — Will this role make you more valuable in 2–3 years? The best jobs accelerate your career in ways that show up in every future offer.</li>
          <li style={{ marginBottom: 12 }}><strong>Manager quality</strong> — A great manager is worth more than a $10,000 raise. A bad manager will make you miserable and slow your growth regardless of comp.</li>
          <li style={{ marginBottom: 12 }}><strong>Commute / remote flexibility</strong> — A 2-hour daily commute is worth roughly $20,000–$30,000 in time annually at most professional salaries. Remote work eliminates this cost.</li>
          <li style={{ marginBottom: 12 }}><strong>Company trajectory</strong> — Are they growing or contracting? Is the business model sound? Compensation at a company in decline can disappear fast.</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>How to compare two offers</h2>
        <p style={{ marginBottom: 24 }}>Build a simple spreadsheet. Put both offers side by side with these rows: base salary, target bonus (%), RSU annual value, sign-on (annualized), health premium cost (subtracted), 401k match, and total. Then add a subjective score from 1–10 for role quality, manager, and trajectory. You&apos;ll often find that the offer that seemed lower is actually competitive once you run the numbers.</p>
        <p style={{ marginBottom: 24 }}>If one offer clearly wins on comp and you prefer the other for other reasons, use the better offer as leverage — most companies will move if they know they&apos;re competing.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>What to negotiate</h2>
        <p style={{ marginBottom: 24 }}>Everything on the offer is negotiable — but pick your top two or three and lead with those. Trying to negotiate everything signals a difficult-to-work-with candidate. Negotiating the most important things signals a confident, prepared one.</p>
        <p style={{ marginBottom: 24 }}>If base is non-negotiable (some companies have fixed bands), ask for a higher sign-on, accelerated vesting, or more equity. There&apos;s almost always something they can move on — you just need to ask. For a full guide on signing bonuses specifically, read <Link href="/blog/how-to-negotiate-signing-bonus" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>how to negotiate a signing bonus</Link>.</p>
        <p style={{ marginBottom: 24 }}>Once you know what you want to push on, read <Link href="/blog/how-to-negotiate-salary-after-job-offer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>how to negotiate salary after a job offer</Link> for the exact scripts to use in the conversation.</p>
      </div>

      <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>See how your offer stacks up</div>
        <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>Hayven benchmarks your offer against real market data so you know exactly where you stand — and what to push back on.</div>
        <Link href="/worth" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#141414', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Check my market value →</Link>
      </div>
    </article>
  )
}
