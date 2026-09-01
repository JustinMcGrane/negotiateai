import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Project Manager Resume: Examples & Tips That Get Interviews | Hayven',
  description: 'Write a project manager resume that gets callbacks. Real examples, the right metrics to include, and how to structure your PM experience to stand out.',
  alternates: { canonical: 'https://gethayven.com/blog/project-manager-resume' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Project Manager Resume: Examples & Tips That Get Interviews',
  description: 'Write a project manager resume that gets callbacks.',
  url: 'https://gethayven.com/blog/project-manager-resume',
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
          Project manager resume: examples and tips that get interviews
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, borderLeft: '3px solid #e2e8f0', paddingLeft: 20, margin: 0 }}>
          Hiring managers see hundreds of PM resumes that all say the same thing. Here&apos;s how to write one that proves your impact — with the numbers, certifications, and structure that actually open doors.
        </p>
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
        <p style={{ marginBottom: 24 }}>Project management is one of the broadest disciplines in business — which makes it one of the hardest to write a resume for. Every PM claims they &ldquo;delivered projects on time and on budget.&rdquo; The resumes that get interviews are the ones that prove it with scope, scale, and specific outcomes that a hiring manager can compare against the role they&apos;re filling.</p>
        <p style={{ marginBottom: 24 }}>Here&apos;s exactly how to structure your PM resume, which metrics matter most, and what separates a forgettable resume from one that gets a callback.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The right structure for a PM resume</h2>
        <p style={{ marginBottom: 24 }}>One page if you have under 10 years of experience. Two pages is acceptable for senior PMs with portfolio breadth. The order:</p>
        <ol style={{ paddingLeft: 24, marginBottom: 24 }}>
          <li style={{ marginBottom: 10 }}><strong>Contact info</strong> — name, email, LinkedIn, phone</li>
          <li style={{ marginBottom: 10 }}><strong>Summary</strong> — 2–3 lines covering methodology, project scale, and top outcome</li>
          <li style={{ marginBottom: 10 }}><strong>Experience</strong> — reverse chronological with budget, team size, and delivery metrics</li>
          <li style={{ marginBottom: 10 }}><strong>Skills</strong> — methodologies, tools, and domains</li>
          <li style={{ marginBottom: 10 }}><strong>Certifications</strong> — PMP, PMI-ACP, CSM, PRINCE2 if you hold them</li>
          <li style={{ marginBottom: 10 }}><strong>Education</strong> — degree and institution only</li>
        </ol>
        <p style={{ marginBottom: 24 }}>Unlike engineering resumes, PM resumes lead with a summary because context is essential — a PM who runs 2-week agile sprints for a 5-person product team is a completely different profile than one managing $20M infrastructure rollouts across three regions.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>How to write your summary</h2>
        <p style={{ marginBottom: 24 }}>Two to three sentences max. Hit: methodology, project scale/budget, team size, and your signature outcome.</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#0f172a' }}>Example:</p>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#475569', lineHeight: 1.75 }}>
            &ldquo;PMP-certified project manager with 7 years delivering $5M–$25M technology and infrastructure projects across financial services. Experienced in Agile, Scrum, and waterfall environments with teams of 8–40. Known for closing scope creep early — average 12% under-budget delivery across 14 enterprise projects.&rdquo;
          </p>
        </div>
        <p style={{ marginBottom: 24 }}>That summary tells a hiring manager your certification, deal size, team scale, methodology range, and your most defensible differentiator — before they read a single bullet.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The metrics that actually matter to PM hiring managers</h2>
        <p style={{ marginBottom: 16 }}>Every bullet in your experience section should include at least one of these:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 10 }}><strong>Budget managed</strong> — The single most important scale signal. Always include it.</li>
          <li style={{ marginBottom: 10 }}><strong>Team size</strong> — Contractors, cross-functional members, vendors — who did you actually coordinate?</li>
          <li style={{ marginBottom: 10 }}><strong>On-time delivery rate</strong> — If you have a strong track record, state it directly.</li>
          <li style={{ marginBottom: 10 }}><strong>Scope or budget variance</strong> — &ldquo;Delivered 8% under budget&rdquo; is highly specific and credible.</li>
          <li style={{ marginBottom: 10 }}><strong>Number of concurrent projects</strong> — Shows capacity and organizational skill.</li>
          <li style={{ marginBottom: 10 }}><strong>Business outcome</strong> — Revenue enabled, cost saved, launch date hit, compliance deadline met.</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>How to write your experience bullets</h2>
        <p style={{ marginBottom: 24 }}>Action verb + what you managed + measurable result. Every single time.</p>
        <p style={{ marginBottom: 16 }}>Examples:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 12 }}>✅ <em>Led ERP migration for 4 business units across 3 regions, delivering on schedule with $340K in budget savings against a $4.2M project plan</em></li>
          <li style={{ marginBottom: 12 }}>✅ <em>Managed simultaneous delivery of 6 cross-functional initiatives with teams of 8–22, maintaining 94% on-time milestone rate over 18 months</em></li>
          <li style={{ marginBottom: 12 }}>✅ <em>Reduced scope creep incidents by 35% by implementing structured change control process adopted across 3 program teams</em></li>
          <li style={{ marginBottom: 12 }}>❌ <em>Successfully managed multiple projects and delivered on time</em></li>
          <li style={{ marginBottom: 12 }}>❌ <em>Worked with stakeholders to ensure project success</em></li>
        </ul>
        <p style={{ marginBottom: 24 }}>If you can&apos;t share exact budget figures due to confidentiality, use ranges: &ldquo;managed a $3M–$5M program budget.&rdquo; Never leave a bullet without scale if you can help it.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Skills and certifications for PMs</h2>
        <p style={{ marginBottom: 24 }}>List methodologies, tools, and domain knowledge. Hiring managers scan these fast:</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0f172a' }}>Methodologies:</p>
          <p style={{ margin: '0 0 16px', color: '#475569' }}>Agile, Scrum, Kanban, Waterfall, PRINCE2, SAFe, Lean, Hybrid</p>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0f172a' }}>Tools:</p>
          <p style={{ margin: '0 0 16px', color: '#475569' }}>JIRA, MS Project, Asana, Monday.com, Smartsheet, Confluence, Notion, Wrike</p>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0f172a' }}>Certifications:</p>
          <p style={{ margin: 0, color: '#475569' }}>PMP, PMI-ACP, CSM (Certified ScrumMaster), CAPM, PRINCE2 Practitioner</p>
        </div>
        <p style={{ marginBottom: 24 }}>If you hold a PMP, put it after your name in the header: &ldquo;Jane Smith, PMP.&rdquo; It&apos;s the most recognized PM credential and signals immediately that you&apos;ve cleared a high bar.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Common mistakes that kill PM resumes</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 12 }}><strong>No budget figures</strong> — This is the #1 red flag. Scale is everything in PM hiring. A hiring manager filling a $10M program role needs to know you&apos;ve worked at that scale.</li>
          <li style={{ marginBottom: 12 }}><strong>Listing responsibilities instead of outcomes</strong> — &ldquo;Managed project timelines&rdquo; is a job description, not an achievement. What was the result?</li>
          <li style={{ marginBottom: 12 }}><strong>Vague methodology claims</strong> — &ldquo;Familiar with Agile&rdquo; is weak. &ldquo;Led 2-week Scrum sprints for a 14-person engineering team for 2 years&rdquo; is specific.</li>
          <li style={{ marginBottom: 12 }}><strong>No stakeholder management examples</strong> — PM roles are fundamentally about influence without authority. Show that you&apos;ve navigated competing priorities across exec stakeholders.</li>
          <li style={{ marginBottom: 12 }}><strong>Missing certifications section</strong> — PMP, CSM, and PRINCE2 are table-stakes filters at many companies. If you have them, they deserve their own section.</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Get your resume scored</h2>
        <p style={{ marginBottom: 24 }}>Before you apply anywhere, run your resume through Hayven&apos;s <Link href="/resume-builder/project-manager" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Project Manager Resume Analyzer</Link>. It checks ATS compatibility, keyword coverage, impact language, and structure — then gives you a prioritized fix list. Most users improve their score significantly in under 30 minutes.</p>
        <p style={{ marginBottom: 24 }}>Once your resume is strong, make sure the offer reflects what PMs at your scope and level actually earn. Hayven&apos;s <Link href="/compensation-analyzer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Compensation Analyzer</Link> gives you market rate data by role, level, and city.</p>
      </div>

      <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Get your resume scored for free</div>
        <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>Hayven&apos;s Resume Analyzer gives you ATS score, section-by-section feedback, and a prioritized fix list — in under 60 seconds.</div>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>Try Free Today - No Credit Card Required</Link>
      </div>
    </article>
  )
}
