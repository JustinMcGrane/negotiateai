import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Salary Negotiation Email Template (Copy & Paste) | Hayven',
  description: 'Copy-paste salary negotiation email templates that actually work. Scripts for counter-offers, follow-ups, and closing the deal.',
}

const tag = 'Salary negotiation'
const readTime = '5 min read'

export default function Article() {
  return (
    <article>
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#4A90D9', background: '#EBF5FB', padding: '4px 10px', borderRadius: 20 }}>{tag}</span>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>{readTime}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: 20 }}>
          Salary negotiation email templates you can copy and paste
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, borderLeft: '3px solid #e2e8f0', paddingLeft: 20, margin: 0 }}>
          Negotiating by email gives you time to think. Here are templates for every scenario — counter-offers, follow-ups, and accepting on your terms.
        </p>
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
        <p style={{ marginBottom: 24 }}>Email negotiation has one big advantage over phone: you control the pacing. You can draft, revise, and send when you&apos;re ready. These templates are designed to be direct without being aggressive, and confident without being entitled.</p>
        <p style={{ marginBottom: 24 }}>Customize the bracketed sections with your specific details. The structure and tone matter more than the exact words.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Template 1: Counter-offer on base salary</h2>
        <p style={{ marginBottom: 16 }}>Use this when you want to counter a specific number:</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24, fontFamily: 'monospace', fontSize: 14, lineHeight: 1.8 }}>
          <p style={{ margin: '0 0 12px', fontWeight: 600, fontFamily: 'inherit' }}>Subject: Re: [Company] Offer</p>
          <p style={{ margin: '0 0 12px', fontFamily: 'inherit' }}>Hi [Name],</p>
          <p style={{ margin: '0 0 12px', fontFamily: 'inherit' }}>Thank you for the offer — I&apos;m genuinely excited about the role and the team at [Company].</p>
          <p style={{ margin: '0 0 12px', fontFamily: 'inherit' }}>I&apos;ve reviewed the full package and wanted to discuss the base salary. Based on my research into market rates for [role] in [location], and given my [X years of experience / specific skill], I was expecting something closer to $[your number]. Is there flexibility to get there?</p>
          <p style={{ margin: 0, fontFamily: 'inherit' }}>I&apos;m very enthusiastic about this opportunity and confident we can find a number that works for both of us. Happy to talk through it whenever is convenient.<br /><br />[Your name]</p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Template 2: Negotiating when they can&apos;t move on base</h2>
        <p style={{ marginBottom: 16 }}>Use this when they say base is fixed but the conversation is still open:</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24, fontFamily: 'monospace', fontSize: 14, lineHeight: 1.8 }}>
          <p style={{ margin: '0 0 12px', fontFamily: 'inherit' }}>Hi [Name],</p>
          <p style={{ margin: '0 0 12px', fontFamily: 'inherit' }}>I appreciate you looking into the base salary. I understand if that number is fixed.</p>
          <p style={{ margin: '0 0 12px', fontFamily: 'inherit' }}>Given that, I&apos;d love to explore whether there&apos;s flexibility on the signing bonus or equity. A one-time signing bonus of $[amount] would go a long way toward bridging the gap. Would that be possible?</p>
          <p style={{ margin: 0, fontFamily: 'inherit' }}>I&apos;m excited to join the team and want to make this work.<br /><br />[Your name]</p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Template 3: Competing offer leverage</h2>
        <p style={{ marginBottom: 16 }}>Use this carefully — only if you actually have another offer:</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24, fontFamily: 'monospace', fontSize: 14, lineHeight: 1.8 }}>
          <p style={{ margin: '0 0 12px', fontFamily: 'inherit' }}>Hi [Name],</p>
          <p style={{ margin: '0 0 12px', fontFamily: 'inherit' }}>I want to be transparent with you — I&apos;ve received another offer at $[amount]. [Company] is still my first choice, and I&apos;d prefer not to make this a bidding war.</p>
          <p style={{ margin: '0 0 12px', fontFamily: 'inherit' }}>If you&apos;re able to come to $[target], I&apos;m ready to sign immediately. I&apos;m genuinely excited about the team and the work here.</p>
          <p style={{ margin: 0, fontFamily: 'inherit' }}>Let me know what you&apos;re able to do.<br /><br />[Your name]</p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Template 4: Accepting the offer</h2>
        <p style={{ marginBottom: 16 }}>Once you&apos;ve landed on a number, accept clearly and in writing:</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24, fontFamily: 'monospace', fontSize: 14, lineHeight: 1.8 }}>
          <p style={{ margin: '0 0 12px', fontFamily: 'inherit' }}>Hi [Name],</p>
          <p style={{ margin: '0 0 12px', fontFamily: 'inherit' }}>I&apos;m happy to accept the offer at $[final salary] with a start date of [date]. I&apos;m looking forward to joining the team.</p>
          <p style={{ margin: '0 0 12px', fontFamily: 'inherit' }}>Please send over the formal offer letter when ready and let me know if there&apos;s anything you need from me in the meantime.</p>
          <p style={{ margin: 0, fontFamily: 'inherit' }}>Thank you again for working with me on this.<br /><br />[Your name]</p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>What makes these templates work</h2>
        <p style={{ marginBottom: 24 }}>Each template follows the same principles: express genuine enthusiasm first, make a specific ask backed by a reason, and leave the door open for continued conversation. The tone is collaborative, not adversarial. You&apos;re not demanding — you&apos;re problem-solving together.</p>
        <p style={{ marginBottom: 24 }}>The biggest mistake people make in negotiation emails is being vague. &ldquo;I was hoping for a bit more&rdquo; gives the employer nothing to work with. A specific number with a reason gives them something to take to their manager.</p>
      </div>

      <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Get a personalized counter-offer script</div>
        <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>Hayven writes your counter-offer email based on your specific offer, role, and market data — ready to send in minutes.</div>
        <Link href="/counter-offer-builder" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#141414', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Write my counter-offer →</Link>
      </div>
    </article>
  )
}
