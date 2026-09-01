import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Software Engineer Resume: Examples & Tips That Get Interviews | Hayven',
  description: 'A software engineer resume that gets interviews. See what to include, what to cut, and how to structure it — with examples for every level.',
}


const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Software Engineer Resume: Examples & Tips',
  description: 'A software engineer resume that gets interviews.',
  url: 'https://gethayven.com/blog/software-engineer-resume',
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
          <span style={{ fontSize: 12, color: '#94a3b8' }}>8 min read</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: 20 }}>
          Software engineer resume: examples and tips that get interviews
        </h1>
        <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.75, borderLeft: '3px solid #e2e8f0', paddingLeft: 20, margin: 0 }}>
          Most software engineer resumes get filtered out before a human reads them. Here&apos;s exactly how to structure yours to pass ATS screening and impress hiring managers.
        </p>
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
        <p style={{ marginBottom: 24 }}>Software engineering is one of the most competitive hiring markets in the world. Hundreds of people apply for the same role, and most resumes look nearly identical. The difference between getting an interview and getting filtered out often comes down to a few structural choices — not your actual qualifications.</p>
        <p style={{ marginBottom: 24 }}>This guide covers exactly how to structure a software engineer resume, what to include, what to cut, and how to make your impact impossible to ignore.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>The right structure</h2>
        <p style={{ marginBottom: 24 }}>Keep it to one page if you have under 10 years of experience. Two pages is acceptable for senior engineers with extensive open source contributions or publications. The order should be:</p>
        <ol style={{ paddingLeft: 24, marginBottom: 24 }}>
          <li style={{ marginBottom: 10 }}><strong>Contact info</strong> — name, email, LinkedIn, GitHub, portfolio (if relevant)</li>
          <li style={{ marginBottom: 10 }}><strong>Skills</strong> — languages, frameworks, tools, cloud platforms</li>
          <li style={{ marginBottom: 10 }}><strong>Experience</strong> — reverse chronological, with impact-focused bullet points</li>
          <li style={{ marginBottom: 10 }}><strong>Projects</strong> — especially if early career or pivoting</li>
          <li style={{ marginBottom: 10 }}><strong>Education</strong> — degree, institution, graduation year (no GPA unless it&apos;s exceptional)</li>
        </ol>
        <p style={{ marginBottom: 24 }}>Notice skills come before experience. Recruiters and ATS systems scan for keywords first. Putting your tech stack near the top increases the chance your resume gets flagged as a match.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>How to write your skills section</h2>
        <p style={{ marginBottom: 24 }}>Don&apos;t rate your skills (e.g. &ldquo;Python ⭐⭐⭐⭐&rdquo;). It looks amateurish and tells the reader nothing useful. Instead, organize by category:</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0f172a' }}>Languages:</p>
          <p style={{ margin: '0 0 16px', color: '#475569' }}>Python, TypeScript, Go, SQL</p>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0f172a' }}>Frameworks & Libraries:</p>
          <p style={{ margin: '0 0 16px', color: '#475569' }}>React, Next.js, FastAPI, Node.js</p>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0f172a' }}>Infrastructure & Tools:</p>
          <p style={{ margin: 0, color: '#475569' }}>AWS, Docker, Kubernetes, GitHub Actions, Postgres</p>
        </div>
        <p style={{ marginBottom: 24 }}>Only list things you can actually talk about in an interview. If a recruiter calls you about Python and you haven&apos;t used it in three years, that conversation goes badly.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>How to write your experience bullets</h2>
        <p style={{ marginBottom: 24 }}>This is where most resumes lose interviews. Generic bullets like &ldquo;Worked on backend services&rdquo; or &ldquo;Collaborated with cross-functional teams&rdquo; tell a recruiter nothing. Every bullet should follow this structure:</p>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#0f172a' }}><strong>Action verb</strong> + <strong>what you built/did</strong> + <strong>measurable result</strong></p>
        </div>

        <p style={{ marginBottom: 16 }}>Examples:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 12 }}>✅ <em>Reduced API response time by 40% by migrating from REST to GraphQL, cutting p99 latency from 800ms to 480ms</em></li>
          <li style={{ marginBottom: 12 }}>✅ <em>Built a real-time data pipeline processing 2M events/day using Kafka and Python, replacing a batch process that ran every 6 hours</em></li>
          <li style={{ marginBottom: 12 }}>❌ <em>Worked on improving API performance</em></li>
          <li style={{ marginBottom: 12 }}>❌ <em>Helped with data pipeline development</em></li>
        </ul>
        <p style={{ marginBottom: 24 }}>If you don&apos;t have exact numbers, estimate. &ldquo;Reduced build time by approximately 30%&rdquo; is far stronger than no number at all.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>What to include in your projects section</h2>
        <p style={{ marginBottom: 24 }}>Projects matter most for early-career engineers, bootcamp grads, and career changers. For each project include:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 10 }}>Project name and a one-line description of what it does</li>
          <li style={{ marginBottom: 10 }}>Tech stack used</li>
          <li style={{ marginBottom: 10 }}>Link to GitHub or live demo</li>
          <li style={{ marginBottom: 10 }}>One metric if possible (users, requests/day, stars, etc.)</li>
        </ul>
        <p style={{ marginBottom: 24 }}>Don&apos;t list tutorial projects or anything you can&apos;t explain in depth. Quality over quantity — two strong projects beat five weak ones.</p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Common mistakes that kill software engineer resumes</h2>
        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
          <li style={{ marginBottom: 12 }}><strong>Objective statements</strong> — Nobody reads them. Use that space for an extra bullet point.</li>
          <li style={{ marginBottom: 12 }}><strong>Listing every technology you&apos;ve ever touched</strong> — It dilutes the signal. Stick to what you actually use.</li>
          <li style={{ marginBottom: 12 }}><strong>No GitHub link</strong> — For engineers, this is like a designer not having a portfolio.</li>
          <li style={{ marginBottom: 12 }}><strong>Vague impact</strong> — &ldquo;Improved performance&rdquo; means nothing. Always add a number.</li>
          <li style={{ marginBottom: 12 }}><strong>Fancy formatting</strong> — Tables, columns, and icons break ATS parsing. Clean, simple formatting wins.</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48 }}>Get your resume scored</h2>
        <p style={{ marginBottom: 24 }}>Once your resume is drafted, run it through Hayven&apos;s <Link href="/resume-builder/software-engineer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Software Engineer Resume Analyzer</Link>. It scores your resume on ATS compatibility, impact language, keyword coverage, and structure — then gives you a prioritized list of fixes. Most users improve their score significantly in under 30 minutes.</p>
        <p style={{ marginBottom: 24 }}>Once your resume is in good shape, the next step is making sure the offer reflects your market value. Hayven&apos;s <Link href="/compensation-analyzer" style={{ color: '#4169E1', textDecoration: 'none', fontWeight: 600 }}>Compensation Analyzer</Link> shows you exactly what software engineers at your level and city are making right now.</p>
      </div>

      <div style={{ marginTop: 64, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '32px 28px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Get your resume scored for free</div>
        <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>Hayven&apos;s Resume Analyzer gives you ATS score, section-by-section feedback, and a prioritized fix list — in under 60 seconds.</div>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 3px 10px rgba(239,68,68,0.3)' }}>Try Free Today - No Credit Card Required</Link>
      </div>
    </article>
  )
}
