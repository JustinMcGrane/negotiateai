import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Marketing Manager Resume: Examples, Templates & Tips (2026) | Hayven',
  description: 'Marketing manager resume examples that get interviews. Learn what metrics to include, how to write bullets that prove ROI, and what hiring managers actually want to see.',
}


const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Marketing Manager Resume: Examples & Tips (2026)',
  description: 'Marketing manager resume examples that get interviews.',
  url: 'https://gethayven.com/blog/marketing-manager-resume',
  publisher: { '@type': 'Organization', name: 'Hayven', url: 'https://gethayven.com' },
  author: { '@type': 'Organization', name: 'Hayven' },
}
export default function Article() {
  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#4A90D9', background: '#EBF5FB', padding: '4px 10px', borderRadius: 20 }}>Resume tips</span>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>12 min read</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: 20 }}>
          Marketing manager resume: examples and tips that get interviews in 2026
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, borderLeft: '3px solid #e2e8f0', paddingLeft: 20, margin: 0 }}>
          Marketing hiring managers want to see campaigns, channels, and numbers — not buzzwords. Here&apos;s how to write a resume that shows what you&apos;ve actually driven, with real examples at every level.
        </p>
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
        <p style={{ marginBottom: 24 }}>Marketing manager is one of the most crowded job titles in the market. The challenge: every candidate claims they &ldquo;drove growth,&rdquo; &ldquo;built brand awareness,&rdquo; and &ldquo;led cross-functional campaigns.&rdquo; The resumes that get callbacks prove it — with channel-specific numbers, budget ownership, and before/after results that tell a clear story.</p>
        <p style={{ marginBottom: 24 }}>This guide covers everything: structure, summary, bullets, skills, common mistakes, and a full resume example you can adapt.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>What hiring managers actually look for</h2>
        <p style={{ marginBottom: 24 }}>Before writing a single bullet, understand what a marketing hiring manager is scanning for in the first 10 seconds:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 10 }}><strong>Your specialty</strong> — demand gen, brand, content, product marketing, growth? Marketing is broad and they need to know immediately if you&apos;re a fit.</li>
          <li style={{ marginBottom: 10 }}><strong>Channels you&apos;ve owned</strong> — paid search, SEO, email, social, events? Owned means you ran it, not assisted.</li>
          <li style={{ marginBottom: 10 }}><strong>Budget you&apos;ve managed</strong> — even a rough range signals seniority and trust.</li>
          <li style={{ marginBottom: 10 }}><strong>Business results, not activity</strong> — pipeline influenced, leads generated, CAC reduced. Not &ldquo;created content&rdquo; or &ldquo;managed campaigns.&rdquo;</li>
          <li style={{ marginBottom: 10 }}><strong>Tools you can use on day one</strong> — HubSpot, Marketo, GA4, Salesforce, Semrush. The specific stack varies by company but they want someone who isn&apos;t starting from zero.</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The right structure</h2>
        <p style={{ marginBottom: 24 }}>One page for under 8 years of experience. Two pages is acceptable for senior managers overseeing large teams or budgets. Order:</p>
        <ol style={{ paddingLeft: 24, marginBottom: 24 }}>
          <li style={{ marginBottom: 10 }}><strong>Contact info</strong> — name, email, LinkedIn, portfolio or personal site if relevant</li>
          <li style={{ marginBottom: 10 }}><strong>Summary</strong> — 2–3 lines covering your specialty, channels, and a key result</li>
          <li style={{ marginBottom: 10 }}><strong>Experience</strong> — reverse chronological, with campaign metrics and business outcomes</li>
          <li style={{ marginBottom: 10 }}><strong>Skills</strong> — tools, channels, platforms</li>
          <li style={{ marginBottom: 10 }}><strong>Education</strong> — degree and institution only</li>
        </ol>
        <p style={{ marginBottom: 24 }}>Lead with a summary because marketing is broad. A demand gen manager and a brand manager have completely different skill sets — your summary signals which one you are before the hiring manager reads a single bullet.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>How to write your summary</h2>
        <p style={{ marginBottom: 24 }}>Two to three sentences maximum. Specialty + channels + one standout metric. Don&apos;t start with &ldquo;I am a results-driven marketing professional.&rdquo; Everyone says that. Say something specific.</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#0f172a' }}>Demand gen example:</p>
          <p style={{ margin: '0 0 20px', fontStyle: 'italic', color: '#475569', lineHeight: 1.75 }}>
            &ldquo;Demand gen marketing manager with 6 years driving pipeline for B2B SaaS companies through paid search, LinkedIn, email, and content. Grew MQL volume 3x in 18 months at [Company] while reducing CAC by 22%. Currently managing $1.2M in annual paid media spend.&rdquo;
          </p>
          <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#0f172a' }}>Brand / content example:</p>
          <p style={{ margin: '0 0 20px', fontStyle: 'italic', color: '#475569', lineHeight: 1.75 }}>
            &ldquo;Brand and content marketing manager with experience building editorial programs from 0 to 50K+ monthly readers. Launched the [Company] blog that became the #1 source of inbound leads within 12 months. Specialist in SEO-driven content strategy and conversion optimization.&rdquo;
          </p>
          <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#0f172a' }}>Product marketing example:</p>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#475569', lineHeight: 1.75 }}>
            &ldquo;Product marketing manager with 5 years launching B2B SaaS products and driving adoption post-launch. Led go-to-market for three product lines generating $8M in first-year ARR. Expert in positioning, competitive analysis, and sales enablement.&rdquo;
          </p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The metrics that actually matter to marketing hiring managers</h2>
        <p style={{ marginBottom: 16 }}>Every bullet should include at least one of these — and ideally two:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 10 }}><strong>Pipeline / revenue influence</strong> — how much revenue did your marketing work contribute?</li>
          <li style={{ marginBottom: 10 }}><strong>MQL / lead volume</strong> — absolute numbers or growth percentage</li>
          <li style={{ marginBottom: 10 }}><strong>CAC / ROAS / CPL</strong> — efficiency metrics that show you care about ROI, not just spend</li>
          <li style={{ marginBottom: 10 }}><strong>Traffic / audience growth</strong> — for content, SEO, or brand roles</li>
          <li style={{ marginBottom: 10 }}><strong>Conversion rate improvements</strong> — any funnel stage</li>
          <li style={{ marginBottom: 10 }}><strong>Budget ownership</strong> — how much did you manage? Even a rough range signals seniority.</li>
          <li style={{ marginBottom: 10 }}><strong>Team size</strong> — if you managed people, include how many</li>
        </ul>
        <p style={{ marginBottom: 24 }}>If you don&apos;t have exact numbers, use ranges or approximations. &ldquo;Approximately $500K in annual budget&rdquo; is better than nothing. Most candidates omit numbers entirely — which is why the ones who include them stand out.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>How to write your experience bullets</h2>
        <p style={{ marginBottom: 24 }}>Action verb + what you ran + what it produced. No vanity metrics. No passive constructions.</p>

        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
          <p style={{ margin: '0 0 12px', fontWeight: 700, color: '#166534' }}>Strong bullets:</p>
          <ul style={{ paddingLeft: 20, margin: 0, color: '#166534' }}>
            <li style={{ marginBottom: 10 }}>Launched a 6-channel demand gen program (paid search, LinkedIn, email, webinars, content, events) that drove $4.2M in pipeline in Q3 2024</li>
            <li style={{ marginBottom: 10 }}>Grew organic search traffic from 8K to 47K monthly sessions in 14 months through a topic cluster SEO strategy targeting 120 commercial keywords</li>
            <li style={{ marginBottom: 10 }}>Managed $800K in annual paid media budget across Google and LinkedIn, achieving 3.4x blended ROAS — up from 1.9x the prior year</li>
            <li style={{ marginBottom: 10 }}>Built and managed a 4-person content team that produced 3 pieces of pillar content per week, increasing inbound MQLs by 67% YoY</li>
            <li style={{ marginBottom: 0 }}>Reduced sales cycle by 18 days by creating a 12-piece nurture sequence targeting mid-funnel leads, increasing SQL conversion rate from 14% to 22%</li>
          </ul>
        </div>

        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 12px', fontWeight: 700, color: '#dc2626' }}>Weak bullets:</p>
          <ul style={{ paddingLeft: 20, margin: 0, color: '#dc2626' }}>
            <li style={{ marginBottom: 10 }}>Led marketing campaigns that increased brand awareness and engagement</li>
            <li style={{ marginBottom: 10 }}>Collaborated with sales team to support pipeline growth</li>
            <li style={{ marginBottom: 10 }}>Managed social media accounts and created content</li>
            <li style={{ marginBottom: 0 }}>Responsible for email marketing and lead generation</li>
          </ul>
        </div>
        <p style={{ marginBottom: 24 }}>The difference: specific channels, specific numbers, specific timeframes. &ldquo;Increased brand awareness&rdquo; is not a result — it&apos;s a hope. &ldquo;Grew organic traffic 8K to 47K in 14 months&rdquo; is a result.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Full marketing manager resume example</h2>
        <p style={{ marginBottom: 20 }}>Here&apos;s a complete resume for a mid-level demand gen marketing manager with 5 years of experience:</p>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '32px', marginBottom: 24, fontFamily: 'Georgia, serif' }}>
          <div style={{ borderBottom: '2px solid #0f172a', paddingBottom: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>Alex Rivera</div>
            <div style={{ fontSize: 13, color: '#64748b' }}>alex@email.com · linkedin.com/in/alexrivera · Austin, TX</div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Summary</div>
            <p style={{ margin: 0, fontSize: 13, color: '#334155', lineHeight: 1.7 }}>
              Demand gen marketing manager with 5 years driving pipeline for B2B SaaS companies through paid search, LinkedIn, email, and content. Grew MQL volume 3x at HubSpot in 18 months while reducing CAC by 22%. Currently managing $800K in annual paid media spend across Google and LinkedIn.
            </p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Experience</div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Senior Marketing Manager — HubSpot</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>2022 – Present</div>
              </div>
              <ul style={{ paddingLeft: 18, margin: '8px 0 0', fontSize: 13, color: '#334155', lineHeight: 1.7 }}>
                <li style={{ marginBottom: 6 }}>Drove $4.2M in pipeline via a 6-channel demand gen program (paid search, LinkedIn, email, webinars, content, events) in FY2024</li>
                <li style={{ marginBottom: 6 }}>Managed $800K in annual paid media budget, achieving 3.4x blended ROAS — up from 1.9x the prior year</li>
                <li style={{ marginBottom: 6 }}>Grew organic traffic from 8K to 47K monthly sessions in 14 months through a topic cluster SEO strategy</li>
                <li style={{ marginBottom: 0 }}>Built and managed a 3-person content team; increased inbound MQLs 67% YoY</li>
              </ul>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Marketing Manager — Zendesk</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>2020 – 2022</div>
              </div>
              <ul style={{ paddingLeft: 18, margin: '8px 0 0', fontSize: 13, color: '#334155', lineHeight: 1.7 }}>
                <li style={{ marginBottom: 6 }}>Launched email nurture program for 45K mid-funnel leads, increasing SQL conversion rate from 14% to 22%</li>
                <li style={{ marginBottom: 6 }}>Reduced CPL by 31% by restructuring Google Ads campaign architecture and negative keyword strategy</li>
                <li style={{ marginBottom: 0 }}>Collaborated with sales to create 8-piece sales enablement library, cited by AEs as top tool for closing enterprise deals</li>
              </ul>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Marketing Coordinator — Intercom</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>2019 – 2020</div>
              </div>
              <ul style={{ paddingLeft: 18, margin: '8px 0 0', fontSize: 13, color: '#334155', lineHeight: 1.7 }}>
                <li style={{ marginBottom: 6 }}>Supported demand gen team with campaign execution across email, paid social, and content distribution</li>
                <li style={{ marginBottom: 0 }}>Managed weekly email sends to 80K subscribers, maintaining 28% open rate and 4.2% CTR</li>
              </ul>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Skills</div>
            <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.7 }}>
              <strong>Channels:</strong> Paid Search (Google Ads), LinkedIn Ads, Meta Ads, Email Marketing, SEO, Content Marketing, Webinars<br />
              <strong>Tools:</strong> HubSpot, Marketo, Salesforce, Google Analytics 4, Semrush, Ahrefs, Looker<br />
              <strong>Competencies:</strong> Demand generation, ABM, campaign management, budget ownership, A/B testing, funnel optimization
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Education</div>
            <div style={{ fontSize: 13, color: '#334155' }}>B.S. Marketing — University of Texas at Austin, 2019</div>
          </div>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Skills section for marketing managers</h2>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0f172a' }}>Channels:</p>
          <p style={{ margin: '0 0 16px', color: '#475569' }}>SEO, Paid Search (Google Ads), Paid Social (LinkedIn, Meta), Email Marketing, Content Marketing, Webinars, Events</p>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0f172a' }}>Tools & Platforms:</p>
          <p style={{ margin: '0 0 16px', color: '#475569' }}>HubSpot, Marketo, Pardot, Salesforce, Google Analytics 4, Semrush, Ahrefs, Canva, Figma, Looker, Tableau</p>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0f172a' }}>Competencies:</p>
          <p style={{ margin: 0, color: '#475569' }}>Demand generation, ABM, campaign management, budget ownership, A/B testing, funnel optimization, sales enablement, go-to-market</p>
        </div>
        <p style={{ marginBottom: 24 }}>Only list tools you can actually discuss in an interview. If a hiring manager asks &ldquo;how did you use Marketo in your last role&rdquo; and you stumble, that ends the conversation.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Marketing manager resume by specialization</h2>
        <p style={{ marginBottom: 16 }}>The bullets and skills you emphasize should shift based on your specialty:</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
          {[
            { role: 'Demand Generation', focus: 'Pipeline influenced, MQL volume, CAC, ROAS, CPL. Show you know how to build a full-funnel program and tie it to revenue.' },
            { role: 'Brand & Content', focus: 'Traffic growth, audience size, share of voice, editorial calendar ownership. Show you can build an audience and convert it.' },
            { role: 'Product Marketing', focus: 'Go-to-market launches, ARR influenced, win/loss analysis, sales enablement created. Show you bridge product and sales.' },
            { role: 'Growth / Performance', focus: 'ROAS, LTV/CAC, conversion rates at every funnel stage, experiment velocity. Show you run a rigorous testing operation.' },
            { role: 'Field / Event', focus: 'Events produced, pipeline from events, attendance, sponsor revenue. Show you run logistics and tie it to business outcomes.' },
          ].map(({ role, focus }) => (
            <div key={role} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '16px 20px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{role}</div>
              <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65 }}>{focus}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Common mistakes that kill marketing manager resumes</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 12 }}><strong>Vanity metrics</strong> — impressions and follower counts don&apos;t impress hiring managers unless you also show pipeline or revenue impact.</li>
          <li style={{ marginBottom: 12 }}><strong>No budget ownership mentioned</strong> — senior candidates must show they&apos;ve managed real money. Even a rough range helps.</li>
          <li style={{ marginBottom: 12 }}><strong>Generic channel lists</strong> — &ldquo;Social media&rdquo; tells nobody anything. Say which platforms, to what audience, with what results.</li>
          <li style={{ marginBottom: 12 }}><strong>Listing tools without context</strong> — saying &ldquo;I know HubSpot&rdquo; is not an accomplishment. What did you build with it?</li>
          <li style={{ marginBottom: 12 }}><strong>No cross-functional evidence</strong> — marketing managers are judged on how well they work with sales, product, and design. Show collaboration with outcomes.</li>
          <li style={{ marginBottom: 12 }}><strong>Objective statement instead of summary</strong> — &ldquo;Seeking a challenging marketing role&rdquo; is useless. Replace it with your specialty and best result.</li>
          <li style={{ marginBottom: 12 }}><strong>Too long</strong> — unless you have 10+ years of directly relevant experience, one page is almost always better.</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>What marketing managers are actually paid</h2>
        <p style={{ marginBottom: 16 }}>Before you send a single application, know your market rate. Marketing manager salaries vary significantly by specialty, company size, and location:</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          {[
            { role: 'Marketing Manager (generalist)', range: '$75,000 – $110,000' },
            { role: 'Demand Gen Manager', range: '$90,000 – $130,000' },
            { role: 'Product Marketing Manager', range: '$100,000 – $145,000' },
            { role: 'Growth Marketing Manager', range: '$95,000 – $140,000' },
            { role: 'Senior Marketing Manager', range: '$115,000 – $160,000' },
          ].map(({ role, range }, i, arr) => (
            <div key={role} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
              <span style={{ fontSize: 14, color: '#334155' }}>{role}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{range}</span>
            </div>
          ))}
        </div>
        <p style={{ marginBottom: 24 }}>These are national medians for the US market. San Francisco, New York, and Seattle typically run 20–35% higher. Check your specific market rate using Hayven&apos;s <Link href="/worth" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>salary checker</Link> before you negotiate any offer.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Frequently asked questions</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>
          {[
            {
              q: 'Should a marketing manager resume be one page or two?',
              a: 'One page for under 8 years of experience. Two pages is acceptable if you have significant leadership experience, large budget ownership, or a long track record of launching major programs. When in doubt, cut it to one — hiring managers spend less than 10 seconds on first scan.',
            },
            {
              q: 'What is the best format for a marketing manager resume?',
              a: 'Reverse chronological is almost always best. Start with your most recent role and work backwards. Functional resumes (organized by skill rather than time) are a red flag for most hiring managers because they obscure your actual work history.',
            },
            {
              q: 'How do I write a marketing manager resume with no metrics?',
              a: 'Everyone has metrics — you just might not have tracked them. Go back to your old roles and estimate: how many emails went out, what was the open rate, how many leads did you generate, what was the budget? Approximations are fine: "approximately $200K in annual spend" is better than nothing. For truly early roles, focus on scope: team size, number of campaigns, channels managed.',
            },
            {
              q: 'What skills should a marketing manager put on their resume?',
              a: 'Focus on channels you\'ve owned (paid search, SEO, email, etc.), tools you use daily (HubSpot, Marketo, GA4, Salesforce), and competencies that signal seniority (budget ownership, demand generation, ABM, sales enablement). Tailor the skills section to each job description — if the job listing mentions specific tools, make sure yours are visible.',
            },
            {
              q: 'How do I tailor my marketing resume to a job description?',
              a: 'Read the job description and identify the top 3-5 requirements. Then make sure your resume\'s summary and first two bullets in your most recent role directly address those requirements. Mirror the language the company uses — if they say "demand generation," use that phrase, not "lead gen." ATS systems match keywords.',
            },
          ].map(({ q, a }) => (
            <div key={q} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{q}</div>
              <div style={{ fontSize: 15, color: '#475569', lineHeight: 1.75 }}>{a}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Get your resume scored and your salary benchmarked</h2>
        <p style={{ marginBottom: 24 }}>Once you&apos;ve drafted your resume, run it through Hayven&apos;s <Link href="/resume-builder/marketing-manager" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Marketing Manager Resume Analyzer</Link>. It checks ATS compatibility, keyword coverage, impact language, and structure — and gives you a prioritized list of fixes. Most users improve their score significantly in under 30 minutes.</p>
        <p style={{ marginBottom: 24 }}>Once you land the offer, don&apos;t leave money on the table. Use Hayven&apos;s <Link href="/worth" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>free salary checker</Link> to see exactly what marketing managers at your level and city are making right now — so you know whether to negotiate and by how much.</p>
      </div>

      <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Find out if your marketing salary is competitive</div>
        <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>Check your market rate in 30 seconds — see how your salary compares to other marketing managers in your city and level.</div>
        <Link href="/worth" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#141414', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Check my market value →</Link>
      </div>
    </article>
  )
}
