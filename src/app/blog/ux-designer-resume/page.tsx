import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'UX Designer Resume: Examples & Tips That Get Interviews | Hayven',
  description: 'Write a UX designer resume that gets callbacks. Real examples, how to frame your portfolio, the right metrics to include, and what separates strong UX resumes from weak ones.',
  alternates: { canonical: 'https://gethayven.com/blog/ux-designer-resume' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'UX Designer Resume: Examples & Tips That Get Interviews',
  description: 'Write a UX designer resume that gets callbacks.',
  url: 'https://gethayven.com/blog/ux-designer-resume',
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
          <span style={{ fontSize: 12, color: '#94a3b8' }}>7 min read</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: 20 }}>
          UX designer resume: examples and tips that get interviews
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, borderLeft: '3px solid #e2e8f0', paddingLeft: 20, margin: 0 }}>
          Your portfolio does the showing — your resume does the telling. Here&apos;s how to write a UX resume that proves your process, quantifies your impact, and positions your work so a hiring manager immediately understands your value.
        </p>
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
        <p style={{ marginBottom: 24 }}>UX design is one of the few fields where most candidates know their portfolio matters more than their resume — and then put almost no effort into the resume as a result. That&apos;s a mistake. The resume is what gets you past the first screen. The portfolio is what closes the interview. Both have to work.</p>
        <p style={{ marginBottom: 24 }}>Here&apos;s how to structure your UX designer resume, what metrics prove impact, and how to frame your process in a way that resonates with both design hiring managers and non-design stakeholders who may be reviewing your application.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The right structure for a UX designer resume</h2>
        <p style={{ marginBottom: 24 }}>One page for under 8 years of experience. Two pages is acceptable for senior or principal designers with complex multi-product histories. Order:</p>
        <ol style={{ paddingLeft: 24, marginBottom: 24 }}>
          <li style={{ marginBottom: 10 }}><strong>Contact info</strong> — name, email, LinkedIn, and portfolio URL (this is non-negotiable — without it, you&apos;re screened out)</li>
          <li style={{ marginBottom: 10 }}><strong>Summary</strong> — 2–3 lines covering product type, user scale, research depth, and your design philosophy in one phrase</li>
          <li style={{ marginBottom: 10 }}><strong>Experience</strong> — reverse chronological with product type, user impact, and process context</li>
          <li style={{ marginBottom: 10 }}><strong>Skills</strong> — tools, methods, and specializations</li>
          <li style={{ marginBottom: 10 }}><strong>Education</strong> — degree and institution; bootcamp is fine to include if it&apos;s recent and relevant</li>
        </ol>
        <p style={{ marginBottom: 24 }}>Unlike engineering resumes, UX resumes lead with a summary because context is essential. A UX designer at a B2B SaaS company designing for enterprise workflows is a completely different profile than one at a consumer app designing for millions of casual users. Establish that context before the hiring manager reads a single bullet.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>How to write your summary</h2>
        <p style={{ marginBottom: 24 }}>Name your product type, user scale, research approach, and one signature strength.</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#0f172a' }}>Example:</p>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#475569', lineHeight: 1.75 }}>
            &ldquo;Product designer with 5 years designing B2B SaaS tools for 200K+ enterprise users in HR and workforce management. Specialize in complex data-dense workflows where clarity and discoverability drive adoption. Led end-to-end design from generative research through to production across 3 core product areas.&rdquo;
          </p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The metrics that matter most to UX hiring managers</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 10 }}><strong>Conversion or task completion rate</strong> — The gold standard for UX impact. If your redesign improved checkout conversion by 18%, that&apos;s a business-level credential.</li>
          <li style={{ marginBottom: 10 }}><strong>Drop-off or error rate reduction</strong> — Especially meaningful for onboarding, activation, and form-heavy flows.</li>
          <li style={{ marginBottom: 10 }}><strong>User scale</strong> — &ldquo;Designing for 1.2M monthly active users&rdquo; signals the stakes and complexity of your decisions.</li>
          <li style={{ marginBottom: 10 }}><strong>Research breadth</strong> — Number of user interviews, usability sessions, or survey respondents. Shows rigor, not just taste.</li>
          <li style={{ marginBottom: 10 }}><strong>Shipping velocity</strong> — Features shipped per quarter, or design cycles reduced, signal operational effectiveness alongside quality.</li>
          <li style={{ marginBottom: 10 }}><strong>CSAT or NPS delta</strong> — If your work tied directly to a satisfaction improvement, include it.</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>How to write your experience bullets</h2>
        <p style={{ marginBottom: 24 }}>The formula: what you designed + context of the problem + measurable outcome. Show process and impact, not just deliverables.</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 12 }}>✅ <em>Redesigned the onboarding flow for a B2B HR platform (200K users) based on 22 user interviews and session recording analysis; reduced time-to-first-value from 9 days to 3.5 days, improving 30-day activation by 31%</em></li>
          <li style={{ marginBottom: 12 }}>✅ <em>Led end-to-end design for a new analytics dashboard shipped to 45K enterprise accounts; task completion rate in usability testing improved from 58% to 91% between v1 and launch</em></li>
          <li style={{ marginBottom: 12 }}>✅ <em>Created and maintained a design system of 140+ components used across 4 product teams; reduced design-to-dev handoff time by 35% and eliminated a recurring category of QA bugs</em></li>
          <li style={{ marginBottom: 12 }}>❌ <em>Designed user interfaces and collaborated with product and engineering teams</em></li>
          <li style={{ marginBottom: 12 }}>❌ <em>Conducted user research to inform design decisions and improve the product</em></li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Skills section for UX designers</h2>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0f172a' }}>Design Tools:</p>
          <p style={{ margin: '0 0 16px', color: '#475569' }}>Figma, Sketch, Adobe XD, Principle, Framer, InVision, Zeplin, Storybook</p>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0f172a' }}>Research Methods:</p>
          <p style={{ margin: '0 0 16px', color: '#475569' }}>User interviews, usability testing, card sorting, tree testing, A/B testing, surveys, heuristic evaluation, journey mapping</p>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0f172a' }}>Specializations:</p>
          <p style={{ margin: 0, color: '#475569' }}>Design systems, accessibility (WCAG 2.1), mobile (iOS/Android HIG), data visualization, interaction design, information architecture</p>
        </div>
        <p style={{ marginBottom: 24 }}>If you have accessibility or design systems experience, highlight it prominently — both are hiring signals at senior levels and in enterprise product companies.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Common mistakes that kill UX designer resumes</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 12 }}><strong>No portfolio link</strong> — The single most common reason UX resumes get filtered out. It must be in your header, not buried in a footnote.</li>
          <li style={{ marginBottom: 12 }}><strong>Portfolio link that doesn&apos;t work</strong> — Test your link before you apply. A 404 on your portfolio page is an immediate rejection.</li>
          <li style={{ marginBottom: 12 }}><strong>Describing deliverables instead of decisions</strong> — &ldquo;Designed wireframes and prototypes&rdquo; tells nobody anything. What problem were you solving? What tradeoffs did you make? What was the result?</li>
          <li style={{ marginBottom: 12 }}><strong>No research signal</strong> — Listing only visual design skills with no research mentions suggests you deliver screens, not solutions. Even one strong research bullet changes that perception.</li>
          <li style={{ marginBottom: 12 }}><strong>Fancy resume design that breaks ATS</strong> — The irony of UX designers: heavily formatted resumes (tables, columns, icons) often fail ATS parsing. Keep the resume clean and save the visual creativity for your portfolio.</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Get your resume scored</h2>
        <p style={{ marginBottom: 24 }}>Before you apply anywhere, run your resume through Hayven&apos;s <Link href="/resume-builder/ux-designer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>UX Designer Resume Analyzer</Link>. It checks ATS compatibility, impact language, keyword coverage for UX-specific terms, and structure — then gives you a prioritized fix list in under 60 seconds.</p>
        <p style={{ marginBottom: 24 }}>Once your resume is strong, make sure the offer reflects what UX designers at your level and company type actually earn. Hayven&apos;s <Link href="/compensation-analyzer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Compensation Analyzer</Link> shows you market rate data by role, city, and experience level so you can walk into any negotiation with a defensible number.</p>
      </div>

      <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Get your resume scored for free</div>
        <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>Hayven&apos;s Resume Analyzer gives you ATS score, section-by-section feedback, and a prioritized fix list — in under 60 seconds.</div>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>Get Started Free</Link>
      </div>
    </article>
  )
}
