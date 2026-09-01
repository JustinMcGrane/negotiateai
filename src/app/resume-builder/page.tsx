import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Resume Builder — Build a Resume That Gets Interviews | Hayven',
  description: 'Build a job-winning resume with AI. Hayven\'s resume builder analyzes your experience, suggests improvements, and tailors your resume for each role — in minutes.',
  alternates: { canonical: 'https://gethayven.com/resume-builder' },
  openGraph: {
    title: 'AI Resume Builder | Hayven',
    description: 'Build a job-winning resume with AI in minutes.',
    url: 'https://gethayven.com/resume-builder',
  },
  twitter: { card: 'summary_large_image', title: 'AI Resume Builder | Hayven', description: 'Build a job-winning resume with AI in minutes.' },
}

const tips = [
  { title: 'Quantify your impact', desc: 'Numbers stand out. "Increased revenue by 34%" beats "improved revenue" every time.' },
  { title: 'ATS optimization', desc: 'Most resumes are screened by software before a human sees them. We make sure yours passes.' },
  { title: 'Tailor for each role', desc: 'A generic resume gets generic results. Hayven rewrites yours for the specific job description.' },
  { title: 'Strong action verbs', desc: 'Led, built, launched, reduced — verbs that signal ownership and impact.' },
  { title: 'Clean formatting', desc: 'Recruiters spend 6 seconds on a resume. Ours are scannable, clean, and memorable.' },
  { title: 'Keyword matching', desc: 'We match your resume to the keywords in the job description — what ATS systems look for.' },
]

export default function ResumeBuilderPage() {
  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #EBF5FB 0%, #f0f9ff 100%)', padding: '72px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#4A90D9', background: '#dbeafe', padding: '4px 12px', borderRadius: 20, letterSpacing: '0.06em' }}>AI RESUME BUILDER</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', margin: '20px 0 20px' }}>
            A resume that gets you in the room
          </h1>
          <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.7, marginBottom: 36, maxWidth: 560, margin: '0 auto 36px' }}>
            Your resume is the first negotiation. Hayven's AI helps you present your experience powerfully — with the right keywords, the right format, and the right framing for every role you apply to.
          </p>
          <Link href="/signup" style={{
            display: 'inline-block', background: '#2D6EA8', color: '#fff',
            padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700,
            textDecoration: 'none', boxShadow: '0 4px 14px rgba(45,110,168,0.3)',
          }}>
            Build My Resume — Free
          </Link>
          <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 12 }}>No credit card required</p>
        </div>
      </section>

      {/* Tips / features */}
      <section style={{ padding: '72px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48 }}>What makes a resume stand out in 2025</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {tips.map(t => (
              <div key={t.title} style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{t.title}</div>
                <div style={{ color: '#475569', fontSize: 14, lineHeight: 1.6 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Article */}
      <section style={{ padding: '72px 24px', maxWidth: 740, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24 }}>How to write a resume that gets interviews</h2>
        <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
          <p style={{ marginBottom: 20 }}>Recruiters spend an average of 6–10 seconds on a resume before deciding whether to read further. That means your resume has to communicate your value instantly — in the first third of the page, before they scroll. Most resumes fail at this. They bury the most impressive work in dense paragraphs or describe responsibilities instead of accomplishments.</p>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: '32px 0 12px' }}>Accomplishments vs. responsibilities</h3>
          <p style={{ marginBottom: 20 }}>The most common resume mistake is describing what you were supposed to do rather than what you actually achieved. "Responsible for managing a team of 5 engineers" tells a recruiter nothing about how good you are. "Led a team of 5 engineers to deliver a platform that reduced customer churn by 18%" tells them everything.</p>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: '32px 0 12px' }}>ATS: why your resume might not be reaching humans</h3>
          <p style={{ marginBottom: 20 }}>Most companies use Applicant Tracking Systems (ATS) to filter resumes before a human reviews them. ATS software looks for specific keywords from the job description. If your resume doesn't contain those keywords, it gets filtered out automatically — no matter how qualified you are. Tailoring your resume for each application isn't optional anymore; it's table stakes.</p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#EBF5FB', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Your resume, optimized for every application</h2>
        <p style={{ fontSize: 18, color: '#475569', marginBottom: 32 }}>Build a resume that gets past ATS and impresses recruiters — free to start.</p>
        <Link href="/signup" style={{
          display: 'inline-block', background: '#2D6EA8', color: '#fff',
          padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700,
          textDecoration: 'none',
        }}>
          Build My Resume — Free
        </Link>
      </section>
    </main>
  )
}
