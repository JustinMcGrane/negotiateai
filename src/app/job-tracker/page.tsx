import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Job Application Tracker — Track Every Application in One Place | Hayven',
  description: 'Stop losing track of where you applied. Hayven\'s job application tracker keeps every application, interview, and offer organized so you can follow up at the right time.',
  alternates: { canonical: 'https://gethayven.com/job-tracker' },
  openGraph: {
    title: 'Job Application Tracker | Hayven',
    description: 'Track every job application, interview, and offer in one place.',
    url: 'https://gethayven.com/job-tracker',
  },
  twitter: { card: 'summary_large_image', title: 'Job Application Tracker | Hayven', description: 'Track every job application, interview, and offer in one place.' },
}

const stages = ['Applied', 'Phone Screen', 'Interview', 'Final Round', 'Offer', 'Negotiating', 'Accepted / Rejected']

const features = [
  { title: 'All applications in one view', desc: 'See every company, role, and status at a glance without digging through emails.' },
  { title: 'Follow-up reminders', desc: 'Never let an application go cold. Get reminded when it\'s time to follow up.' },
  { title: 'Interview notes', desc: 'Log what you learned in each interview so you\'re prepared for the next round.' },
  { title: 'Offer comparison', desc: 'When offers come in, compare them side by side — salary, equity, benefits, and more.' },
  { title: 'Salary targets', desc: 'Set your target for each role so you know when an offer meets your bar.' },
  { title: 'Timeline view', desc: 'See your entire job search as a timeline — how long each process is taking.' },
]

export default function JobTrackerPage() {
  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #EBF5FB 0%, #f0f9ff 100%)', padding: '72px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#4A90D9', background: '#dbeafe', padding: '4px 12px', borderRadius: 20, letterSpacing: '0.06em' }}>JOB APPLICATION TRACKER</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', margin: '20px 0 20px' }}>
            Stop losing track of your job search
          </h1>
          <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.7, marginBottom: 36, maxWidth: 560, margin: '0 auto 36px' }}>
            Spreadsheets get messy. Emails pile up. Hayven keeps every application organized from first contact to signed offer — so you can focus on landing the job, not tracking it.
          </p>
          <Link href="/signup" style={{
            display: 'inline-block', background: '#2D6EA8', color: '#fff',
            padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700,
            textDecoration: 'none', boxShadow: '0 4px 14px rgba(45,110,168,0.3)',
          }}>
            Track My Applications — Free
          </Link>
          <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 12 }}>No credit card required</p>
        </div>
      </section>

      {/* Pipeline stages */}
      <section style={{ background: '#fff', padding: '56px 24px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 32 }}>Track every stage of the process</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {stages.map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ background: '#EBF5FB', color: '#2D6EA8', fontWeight: 600, fontSize: 13, padding: '6px 14px', borderRadius: 20 }}>{s}</span>
                {i < stages.length - 1 && <span style={{ color: '#cbd5e1', fontSize: 18 }}>→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '72px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48 }}>Everything you need to run your job search</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {features.map(f => (
              <div key={f.title} style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{f.title}</div>
                <div style={{ color: '#475569', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Article */}
      <section style={{ padding: '72px 24px', maxWidth: 740, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24 }}>How to organize your job search</h2>
        <div style={{ fontSize: 16, lineHeight: 1.85, color: '#334155' }}>
          <p style={{ marginBottom: 20 }}>The average job search takes 3–6 months. During that time, you might apply to 50–100 companies, have 20–30 conversations, and juggle multiple interview processes simultaneously. Without a system, things fall through the cracks — you miss a follow-up deadline, forget what you discussed with a recruiter, or fail to send a thank-you note after a final round.</p>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: '32px 0 12px' }}>The follow-up problem</h3>
          <p style={{ marginBottom: 20 }}>Most candidates apply and wait. The ones who get hired follow up. A well-timed follow-up email — 5–7 days after applying, or 24 hours after an interview — signals professionalism and genuine interest. A tracker with built-in reminders makes this automatic.</p>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: '32px 0 12px' }}>When you have multiple offers</h3>
          <p style={{ marginBottom: 20 }}>The best negotiation position is having competing offers. A tracker helps you time your processes so offers arrive together — giving you real leverage when it's time to negotiate. When you can say "I have another offer at $120K," you're not bluffing — and the tracker shows you exactly where every process stands.</p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#EBF5FB', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Your job search, organized</h2>
        <p style={{ fontSize: 18, color: '#475569', marginBottom: 32 }}>Start tracking your applications for free — no spreadsheet required.</p>
        <Link href="/signup" style={{
          display: 'inline-block', background: '#2D6EA8', color: '#fff',
          padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700,
          textDecoration: 'none',
        }}>
          Track My Applications — Free
        </Link>
      </section>
    </main>
  )
}
