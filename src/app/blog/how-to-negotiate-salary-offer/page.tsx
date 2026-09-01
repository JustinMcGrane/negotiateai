import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Negotiate a Salary Offer: Scripts & Strategy | Hayven',
  description: 'Got a salary offer? Here\'s exactly how to negotiate it — what to say, how much to counter, how to handle pushback, and what to do if they say no.',
}


const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Negotiate a Salary Offer',
  description: 'How to negotiate a salary offer — scripts, strategy, and objection handling.',
  url: 'https://gethayven.com/blog/how-to-negotiate-salary-offer',
  publisher: { '@type': 'Organization', name: 'Hayven', url: 'https://gethayven.com' },
  author: { '@type': 'Organization', name: 'Hayven' },
}
export default function Article() {
  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#4A90D9', background: '#EBF5FB', padding: '4px 10px', borderRadius: 20 }}>Salary negotiation</span>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>11 min read</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: 20 }}>
          How to negotiate a salary offer: scripts, strategy, and what to do when they push back
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, borderLeft: '3px solid #e2e8f0', paddingLeft: 20, margin: 0 }}>
          Receiving a salary offer is not the end of the conversation — it&apos;s the beginning. Here&apos;s how to negotiate it the right way, from the moment the offer arrives to the moment you sign.
        </p>
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
        <p style={{ marginBottom: 24 }}>When a company makes you a salary offer, they&apos;re not giving you their best number. They&apos;re giving you their opening number — the one designed to leave room for negotiation. Most candidates don&apos;t know this, so they accept it and move on. The ones who do negotiate almost always get more. Studies consistently show that 85% of people who negotiate their salary offer receive a higher number, yet most people never ask.</p>
        <p style={{ marginBottom: 24 }}>The reason most people don&apos;t negotiate isn&apos;t that they don&apos;t want more money — it&apos;s that they don&apos;t know exactly what to say, and they&apos;re afraid of what happens if they ask. This guide solves both problems. You&apos;ll know the exact words, the right sequence, and what to do at every step — including when they say no.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Step 1: Don&apos;t respond to the offer immediately</h2>
        <p style={{ marginBottom: 24 }}>Whether the offer comes by phone or email, your first move is always to buy time. Thank them enthusiastically and ask for 24–48 hours to review the full details. This is standard practice — no company will penalize you for it, and any recruiter who pressures you to decide on the spot is using a tactic, not stating a real deadline.</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0f172a' }}>Script — buying time on the phone:</p>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#475569', lineHeight: 1.75 }}>&ldquo;Thank you so much — I&apos;m really excited about this opportunity. I&apos;d love to take a day to review everything carefully and make sure I&apos;m giving this the consideration it deserves. Can I get back to you by [specific date]?&rdquo;</p>
        </div>
        <p style={{ marginBottom: 24 }}>Use that time to research market data, evaluate the full offer, and prepare your counter. Never negotiate in the moment — emotions run high, you have less information, and you&apos;ll almost always leave money on the table.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Step 2: Evaluate the full offer — not just base salary</h2>
        <p style={{ marginBottom: 24 }}>Before you decide what to counter, you need to understand the complete value of what you&apos;re being offered. Base salary is just one component of your total compensation, and it&apos;s often not the most flexible one. A comprehensive offer evaluation covers:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 10 }}><strong>Base salary</strong> — the fixed annual number</li>
          <li style={{ marginBottom: 10 }}><strong>Bonus</strong> — target bonus percentage and how consistently it gets paid out</li>
          <li style={{ marginBottom: 10 }}><strong>Equity</strong> — stock options or RSUs, vesting schedule, and current company valuation</li>
          <li style={{ marginBottom: 10 }}><strong>Signing bonus</strong> — often one-time and easier to negotiate than base</li>
          <li style={{ marginBottom: 10 }}><strong>Benefits</strong> — health insurance quality, 401k match, PTO</li>
          <li style={{ marginBottom: 10 }}><strong>Remote flexibility</strong> — worth $5,000–$20,000/year in commuting costs and time</li>
          <li style={{ marginBottom: 10 }}><strong>Title</strong> — affects future earning potential and negotiating power</li>
          <li style={{ marginBottom: 10 }}><strong>Start date and review timing</strong> — an earlier performance review can lock in a raise sooner</li>
        </ul>
        <p style={{ marginBottom: 24 }}>Understanding where the offer is strong and where it&apos;s weak tells you what to push on and what to let go. A strong bonus structure might offset a lower base. Weak equity at a well-funded company is a bigger problem than it looks. For a deeper guide on evaluating every component, read <Link href="/blog/how-to-evaluate-a-job-offer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>how to evaluate a job offer beyond the base salary</Link>.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Step 3: Know your market rate before you counter</h2>
        <p style={{ marginBottom: 24 }}>Your counter needs to be grounded in data, not just what feels fair. A number backed by market research is a business case. A number based on what you want is just a preference — and it&apos;s much easier for a recruiter to dismiss.</p>
        <p style={{ marginBottom: 16 }}>The best sources for compensation data:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 10 }}><strong>Levels.fyi</strong> — best for engineering, product, and design at larger tech companies</li>
          <li style={{ marginBottom: 10 }}><strong>Glassdoor</strong> — good for sales, marketing, and operations roles</li>
          <li style={{ marginBottom: 10 }}><strong>LinkedIn Salary</strong> — useful for mid-market and non-tech roles</li>
          <li style={{ marginBottom: 10 }}><strong>Blind</strong> — candid, employee-submitted data by company</li>
          <li style={{ marginBottom: 10 }}><strong>Hayven&apos;s <Link href="/worth" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Compensation Analyzer</Link></strong> — gives you a precise market rate for your exact role, level, and city</li>
        </ul>
        <p style={{ marginBottom: 24 }}>Target the <strong>75th percentile</strong> as your anchor. This is what strong performers at your level make, and it&apos;s a defensible ask. You&apos;ll also counter higher than this number to leave room to meet in the middle — more on that below.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Step 4: Decide how much to counter</h2>
        <p style={{ marginBottom: 24 }}>This is where most people make mistakes. They either counter too low (leaving money on the table) or too high (seeming out of touch). Here&apos;s a practical framework:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 12 }}><strong>If the offer is 10–15% below market:</strong> Counter at the 75th percentile. You&apos;re asking for market rate, which is hard to argue with.</li>
          <li style={{ marginBottom: 12 }}><strong>If the offer is at or above market:</strong> Counter 5–10% above the offer anyway — you can always come down, but you can&apos;t go up once you&apos;ve named a number.</li>
          <li style={{ marginBottom: 12 }}><strong>If the offer is significantly below market (20%+):</strong> Counter at market rate and be prepared for a longer conversation. If they can&apos;t get close, this may not be the right role at the right time.</li>
        </ul>
        <p style={{ marginBottom: 24 }}>Always give a <strong>specific number</strong>, not a range. If you say &ldquo;somewhere between $120K and $130K,&rdquo; they will hear $120K. Say $128,000 — the specificity signals that you&apos;ve done your research.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Step 5: Make your counter-offer</h2>
        <p style={{ marginBottom: 24 }}>Counter by phone when possible — it&apos;s faster, more personal, and gives you more room to read the conversation. Follow up any verbal agreement with a confirmation email the same day.</p>
        <p style={{ marginBottom: 16 }}>Lead with genuine enthusiasm. Make it clear you want the role — you&apos;re not threatening to walk, you just want fair compensation. Then make your ask clearly and confidently.</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0f172a' }}>Counter-offer script:</p>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#475569', lineHeight: 1.75 }}>&ldquo;I&apos;ve had a chance to look everything over and I&apos;m genuinely excited about this role and the team — I can see myself here long term. I&apos;ve also done some research on market rates for this position in [city], and based on my experience with [specific skill or achievement], I was hoping we could get to [your number]. Is there flexibility there?&rdquo;</p>
        </div>
        <p style={{ marginBottom: 16 }}>Three rules that matter:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 10 }}>Never apologize for negotiating — it signals weakness and makes the recruiter feel they need to reassure you rather than move</li>
          <li style={{ marginBottom: 10 }}>After you name your number, stop talking. Silence feels uncomfortable, but filling it with qualifiers undercuts your ask</li>
          <li style={{ marginBottom: 10 }}>Don&apos;t negotiate against yourself — wait for their response before adjusting your position</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Step 6: Handle pushback without caving</h2>
        <p style={{ marginBottom: 24 }}>Pushback is not rejection. It&apos;s a normal part of the negotiation. The most common responses and how to handle each:</p>

        <p style={{ marginBottom: 12, fontWeight: 600, color: '#0f172a' }}>&ldquo;That&apos;s above our band.&rdquo;</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#475569', lineHeight: 1.75 }}>&ldquo;I appreciate you sharing that. Based on my research, [your number] is in line with market for this role and location — I think I&apos;ll be contributing at a senior level from day one. Is there any flexibility on the band, or could we explore a signing bonus to bridge the gap?&rdquo;</p>
        </div>

        <p style={{ marginBottom: 12, fontWeight: 600, color: '#0f172a' }}>&ldquo;We can&apos;t move on base salary.&rdquo;</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#475569', lineHeight: 1.75 }}>&ldquo;I understand. If base is fixed, could we look at other components? A signing bonus in the range of $[amount], an earlier performance review, or additional equity would all help make this work. What&apos;s possible on those?&rdquo;</p>
        </div>

        <p style={{ marginBottom: 12, fontWeight: 600, color: '#0f172a' }}>&ldquo;This is our best offer.&rdquo;</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#475569', lineHeight: 1.75 }}>&ldquo;I hear you, and I want to make this work. I&apos;m really excited about the role. Is there anything at all that can be done on the package — even a small signing bonus or a 6-month review instead of 12? I want to say yes.&rdquo;</p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>What to negotiate beyond base salary</h2>
        <p style={{ marginBottom: 24 }}>When base salary is genuinely fixed, shift the conversation to other levers. Companies often have more flexibility here because these line items come out of different budgets:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 12 }}><strong>Signing bonus</strong> — one-time cost, comes out of a separate budget. Ask for $5K–$25K depending on your level. Even if they counter lower, you&apos;ve gotten something. Read <Link href="/blog/how-to-negotiate-signing-bonus" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>how to negotiate a signing bonus</Link> for the full playbook.</li>
          <li style={{ marginBottom: 12 }}><strong>Equity</strong> — ask for more shares, a shorter vesting cliff, or accelerated vesting on acquisition. At early-stage or high-growth companies, this can be worth more than base salary over time.</li>
          <li style={{ marginBottom: 12 }}><strong>Earlier performance review</strong> — if they can&apos;t move base now, ask for a 6-month review with a specific salary target tied to hitting milestones. Get it in writing.</li>
          <li style={{ marginBottom: 12 }}><strong>Remote flexibility</strong> — if not already fully remote, ask for 3–4 days WFH. Worth thousands per year in commuting costs and time.</li>
          <li style={{ marginBottom: 12 }}><strong>Title adjustment</strong> — costs the company nothing but affects your future negotiating power at the next job.</li>
          <li style={{ marginBottom: 12 }}><strong>Professional development budget</strong> — ask for $2,000–$5,000/year for courses, conferences, and certifications.</li>
          <li style={{ marginBottom: 12 }}><strong>Start date</strong> — more time gives you personal runway, the ability to keep a competing offer alive, or simply a smoother transition.</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>What to do if they say no entirely</h2>
        <p style={{ marginBottom: 24 }}>If you&apos;ve pushed on base, explored every alternative lever, and they genuinely can&apos;t move — you have three options:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 12 }}><strong>Accept and set a plan.</strong> If you want the role and the gap is small, take it — but establish a clear expectation with your manager about compensation at your first review. Document it.</li>
          <li style={{ marginBottom: 12 }}><strong>Decline and keep looking.</strong> If the offer is significantly below market and they can&apos;t close the gap, accepting puts you in a worse starting position for every future raise and job offer. Sometimes no is the right answer.</li>
          <li style={{ marginBottom: 12 }}><strong>Ask for time.</strong> If you&apos;re waiting on another offer, it&apos;s reasonable to ask for a few more days. &ldquo;I&apos;m very interested — I just have one other process wrapping up. Can I give you a final answer by [date]?&rdquo; Most companies will give you 3–5 days.</li>
        </ul>
        <p style={{ marginBottom: 24 }}>What you should never do: accept an offer you&apos;re unhappy with and immediately start looking for your next job. It burns goodwill, wastes the company&apos;s onboarding investment, and doesn&apos;t solve the underlying problem.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Get everything in writing</h2>
        <p style={{ marginBottom: 24 }}>Once you reach a verbal agreement, send a follow-up email the same day confirming the exact terms: base salary, signing bonus amount and payment date, equity details, start date, and any other agreements you reached. Don&apos;t assume verbal commitments will appear in the offer letter automatically.</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0f172a' }}>Confirmation email template:</p>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#475569', lineHeight: 1.75 }}>&ldquo;Hi [Name] — thanks so much for working through this with me. I&apos;m really excited to join. Just to confirm what we discussed: base salary of $[X], signing bonus of $[Y] paid on [date], [Z] RSUs vesting over 4 years with a 1-year cliff, and a start date of [date]. Please let me know if I&apos;ve captured everything correctly.&rdquo;</p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Practice before the real conversation</h2>
        <p style={{ marginBottom: 24 }}>The biggest obstacle to negotiating a salary offer isn&apos;t knowledge — it&apos;s the anxiety of the live moment. The silence after you name your number. The recruiter&apos;s hesitation. The fear that you&apos;ve asked for too much. These are the moments where most people cave, even when they know better.</p>
        <p style={{ marginBottom: 24 }}>The only fix is repetition. The more you&apos;ve said the words out loud, the more natural they feel when it counts. Hayven&apos;s <Link href="/signup" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Negotiation Simulator</Link> lets you run the entire conversation against a realistic AI recruiter and get scored feedback on your responses. Run it 3–4 times before your actual call and the real thing will feel familiar.</p>
      </div>

      <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Build your counter-offer in minutes</div>
        <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>Hayven generates a personalized counter-offer script and email based on your role, location, and market data — so your ask is always backed by evidence, not instinct.</div>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>Try Free Today - No Credit Card Required</Link>
      </div>
    </article>
  )
}
