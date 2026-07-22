import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'What your equity is actually worth: a realistic guide | Hayven',
  description: 'Most startup equity is worth less than the paper it\'s written on. Here\'s how to assess your equity honestly and ask the right questions.',
}

const tag = 'Equity & compensation'
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
          What your equity is actually worth: a realistic guide
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, borderLeft: '3px solid #e2e8f0', paddingLeft: 20, margin: 0 }}>
          Most startup equity is worth less than the paper it&apos;s written on. Here&apos;s how to assess it honestly — and how to use it in your negotiation.
        </p>
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
        <p style={{ marginBottom: 24 }}>Startup equity is one of the most misunderstood components of compensation. Founders use it to offset lower base salaries. Candidates accept it as though it&apos;s real money. And most of the time, it turns out to be worth nothing.</p>
        <p style={{ marginBottom: 24 }}>That&apos;s not cynicism — it&apos;s math. About 75% of VC-backed startups don&apos;t return the capital invested, which means most equity granted to employees also returns nothing.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The equity calculator startup companies don&apos;t want you to use</h2>
        <p style={{ marginBottom: 24 }}>When you receive an equity grant, the company will tell you two numbers: the number of shares (or options) and the current valuation. What they won&apos;t tell you is what that grant represents as a percentage of the company — or what that percentage is worth after the inevitable dilution from future funding rounds.</p>
        <p style={{ marginBottom: 24 }}>A 0.5% stake at a $20M valuation sounds like $100,000. But after Series B, C, and D dilution, that 0.5% is likely 0.15%. And the preferred liquidation preferences from investors mean common stockholders (employees) often get zero even in a modest exit.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>ISOs vs NSOs vs RSUs: what&apos;s the difference</h2>
        <p style={{ marginBottom: 24 }}><strong>ISOs (Incentive Stock Options):</strong> Common at early-stage companies. You have the right to buy shares at a set price (the strike price). If the company exits above that price, you profit. Tax treatment is favorable if you hold long enough.</p>
        <p style={{ marginBottom: 24 }}><strong>NSOs (Non-qualified Stock Options):</strong> Similar to ISOs but with worse tax treatment. The spread between strike price and fair market value at exercise is taxed as ordinary income.</p>
        <p style={{ marginBottom: 24 }}><strong>RSUs (Restricted Stock Units):</strong> Common at later-stage and public companies. You receive actual shares (not options) that vest over time. No exercise needed. You pay income tax when they vest. Generally safer and more predictable than options.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The 5 questions to ask about any equity grant</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 12 }}><strong>What percentage of the fully diluted cap table does this represent?</strong> Don&apos;t let them give you a share count without context.</li>
          <li style={{ marginBottom: 12 }}><strong>What is the current 409A valuation?</strong> This is the fair market value of common stock, which is often much lower than the company&apos;s stated valuation.</li>
          <li style={{ marginBottom: 12 }}><strong>How much has the company raised, and what are the liquidation preferences?</strong> Preferred investors get paid first. You need to know how much they&apos;ve put in.</li>
          <li style={{ marginBottom: 12 }}><strong>What does the company need to exit at for employees to see meaningful returns?</strong> This is the honest question that most people never ask.</li>
          <li style={{ marginBottom: 12 }}><strong>What is the post-termination exercise window?</strong> Some companies give you only 90 days to exercise after leaving. This can cost you significant tax advantages or make the options unexercisable.</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>When to negotiate equity vs. base</h2>
        <p style={{ marginBottom: 24 }}>If you&apos;re joining a pre-Series A startup, equity is speculative — treat it that way. Negotiate for the best base you can get and treat equity as a lottery ticket. If you&apos;re joining a Series C+ company with a clear path to IPO, equity becomes more meaningful and worth fighting for. At public companies, RSUs are cash equivalents and should be treated as such in your total comp calculation.</p>
      </div>

      <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Model your equity across scenarios</div>
        <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>Use Hayven&apos;s equity calculator to see conservative, base, and optimistic exit values for any grant.</div>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#141414', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Calculate equity value →</Link>
      </div>
    </article>
  )
}
