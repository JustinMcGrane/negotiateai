import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Marketing Manager Resume: Examples & Tips That Get Interviews | Hayven',
  description: 'Write a marketing manager resume that gets interviews. Real examples, the right metrics, and how to position your campaigns and results to stand out.',
}

export default function Article() {
  return (
    <article>
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#4A90D9', background: '#EBF5FB', padding: '4px 10px', borderRadius: 20 }}>Resume tips</span>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>7 min read</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: 20 }}>
          Marketing manager resume: examples and tips that get interviews
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, borderLeft: '3px solid #e2e8f0', paddingLeft: 20, margin: 0 }}>
          Marketing hiring managers want to see campaigns, channels, and numbers — not buzzwords. Here&apos;s how to write a resume that shows what you&apos;ve actually driven.
        </p>
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
        <p style={{ marginBottom: 24 }}>Marketing manager is one of the most crowded job titles in the market. The challenge: every candidate claims they &ldquo;drove growth,&rdquo; &ldquo;built brand awareness,&rdquo; and &ldquo;led cross-functional campaigns.&rdquo; The resumes that get callbacks prove it — with channel-specific numbers, budget ownership, and before/after results that tell a clear story.</p>
        <p style={{ marginBottom: 24 }}>Here&apos;s how to build that resume from scratch.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The right structure</h2>
        <p style={{ marginBottom: 24 }}>One page for under 8 years of experience. Two pages is acceptable for senior managers overseeing large teams or budgets. Order:</p>
        <ol style={{ paddingLeft: 24, marginBottom: 24 }}>
          <li style={{ marginBottom: 10 }}><strong>Contact info</strong> — name, email, LinkedIn, portfolio or personal site (if relevant)</li>
          <li style={{ marginBottom: 10 }}><strong>Summary</strong> — 2–3 lines covering your specialty, channels, and a key result</li>
          <li style={{ marginBottom: 10 }}><strong>Experience</strong> — reverse chronological, with campaign metrics and business outcomes</li>
          <li style={{ marginBottom: 10 }}><strong>Skills</strong> — tools, channels, platforms</li>
          <li style={{ marginBottom: 10 }}><strong>Education</strong> — degree and institution only</li>
        </ol>
        <p style={{ marginBottom: 24 }}>Lead with a summary because marketing is broad. A demand gen manager and a brand manager have completely different skill sets — your summary signals which one you are before the hiring manager reads a single bullet.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>How to write your summary</h2>
        <p style={{ marginBottom: 24 }}>Two sentences, maximum. Specialty + channels + one standout metric.</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#0f172a' }}>Example (Demand Gen):</p>
          <p style={{ margin: '0 0 20px', fontStyle: 'italic', color: '#475569', lineHeight: 1.75 }}>
            &ldquo;Demand gen marketing manager with 6 years driving pipeline for B2B SaaS companies through paid search, email, and content. Grew MQL volume 3x in 18 months at [Company] while reducing CAC by 22%.&rdquo;
          </p>
          <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#0f172a' }}>Example (Brand / Content):</p>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#475569', lineHeight: 1.75 }}>
            &ldquo;Brand and content marketing manager with experience building editorial programs from 0 to 50K+ monthly readers. Launched the [Company] blog that became the #1 source of inbound leads within 12 months.&rdquo;
          </p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The metrics that actually matter to marketing hiring managers</h2>
        <p style={{ marginBottom: 16 }}>Every bullet should include at least one of:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 10 }}><strong>Pipeline / revenue influence</strong> — how much revenue did your marketing work contribute?</li>
          <li style={{ marginBottom: 10 }}><strong>MQL / lead volume</strong> — absolute numbers or growth %</li>
          <li style={{ marginBottom: 10 }}><strong>CAC / ROAS / CPL</strong> — efficiency metrics that show you care about ROI, not just spend</li>
          <li style={{ marginBottom: 10 }}><strong>Traffic / audience growth</strong> — for content, SEO, or brand roles</li>
          <li style={{ marginBottom: 10 }}><strong>Conversion rate improvements</strong> — any funnel stage</li>
          <li style={{ marginBottom: 10 }}><strong>Budget ownership</strong> — how much did you manage? Even a rough range signals seniority.</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>How to write your experience bullets</h2>
        <p style={{ marginBottom: 24 }}>Action verb + what you ran + what it produced. No vanity metrics.</p>

        <p style={{ marginBottom: 16 }}>Examples:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 12 }}>✅ <em>Launched a 6-channel demand gen program (paid search, LinkedIn, email, webinars, content, and events) that drove $4.2M in pipeline in Q3 2024</em></li>
          <li style={{ marginBottom: 12 }}>✅ <em>Grew organic search traffic from 8K to 47K monthly sessions in 14 months through a topic cluster SEO strategy targeting 120 commercial keywords</em></li>
          <li style={{ marginBottom: 12 }}>✅ <em>Managed $800K in annual paid media budget across Google and LinkedIn, achieving a 3.4x blended ROAS — up from 1.9x the prior year</em></li>
          <li style={{ marginBottom: 12 }}>❌ <em>Led marketing campaigns that increased brand awareness and engagement</em></li>
          <li style={{ marginBottom: 12 }}>❌ <em>Collaborated with sales team to support pipeline growth</em></li>
        </ul>
        <p style={{ marginBottom: 24 }}>Notice the difference: specific channels, specific numbers, specific timeframes. &ldquo;Increased brand awareness&rdquo; is not a result — it&apos;s a hope.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Skills section for marketing managers</h2>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0f172a' }}>Channels:</p>
          <p style={{ margin: '0 0 16px', color: '#475569' }}>SEO, Paid Search (Google Ads), Paid Social (LinkedIn, Meta), Email Marketing, Content Marketing, Webinars</p>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0f172a' }}>Tools & Platforms:</p>
          <p style={{ margin: '0 0 16px', color: '#475569' }}>HubSpot, Marketo, Salesforce, Google Analytics 4, Semrush, Ahrefs, Canva, Figma</p>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0f172a' }}>Competencies:</p>
          <p style={{ margin: 0, color: '#475569' }}>Demand generation, ABM, campaign management, budget ownership, A/B testing, funnel optimization</p>
        </div>
        <p style={{ marginBottom: 24 }}>Only list tools you can actually discuss. If a hiring manager asks &ldquo;how did you use Marketo in your last role&rdquo; and you stumble, that ends the interview.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Common mistakes that kill marketing manager resumes</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 12 }}><strong>Vanity metrics</strong> — impressions and follower counts don&apos;t impress hiring managers unless you also show pipeline or revenue impact.</li>
          <li style={{ marginBottom: 12 }}><strong>No budget ownership mentioned</strong> — Senior candidates must show they&apos;ve managed real money. Even a rough range helps.</li>
          <li style={{ marginBottom: 12 }}><strong>Generic channel lists</strong> — &ldquo;Social media&rdquo; tells nobody anything. Say which platforms, to what audience, with what results.</li>
          <li style={{ marginBottom: 12 }}><strong>Listing tools without context</strong> — Saying &ldquo;I know HubSpot&rdquo; is not an accomplishment. What did you build with it?</li>
          <li style={{ marginBottom: 12 }}><strong>No cross-functional evidence</strong> — Marketing managers are judged on how well they work with sales, product, and design. A few bullets showing collaboration + outcome stands out.</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Get your resume scored</h2>
        <p style={{ marginBottom: 24 }}>Once you&apos;ve drafted your resume, run it through Hayven&apos;s <Link href="/tools/resume-analyzer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Resume Analyzer</Link>. It checks ATS compatibility, keyword coverage, impact language, and structure — and gives you a prioritized list of fixes. Most users improve their score significantly in under 30 minutes.</p>
        <p style={{ marginBottom: 24 }}>Once you land the offer, don&apos;t leave money on the table. Hayven&apos;s <Link href="/tools/comp-analyzer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Compensation Analyzer</Link> shows you exactly what marketing managers at your level and city are making right now — so you can negotiate with confidence.</p>
      </div>

      <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Get your resume scored for free</div>
        <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>Hayven&apos;s Resume Analyzer gives you ATS score, section-by-section feedback, and a prioritized fix list — in under 60 seconds.</div>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#141414', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Analyze my resume free →</Link>
      </div>
    </article>
  )
}
