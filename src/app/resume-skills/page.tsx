'use client'
import Link from 'next/link'
import { useState } from 'react'

const TECH_SKILLS = [
  { category: 'Programming Languages', skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'SQL', 'R', 'C++', 'Go', 'Ruby', 'Swift'] },
  { category: 'Data & Analytics', skills: ['Excel', 'Tableau', 'Power BI', 'Google Analytics', 'Looker', 'Snowflake', 'BigQuery', 'dbt', 'Pandas', 'NumPy'] },
  { category: 'Cloud & DevOps', skills: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Jenkins', 'GitHub Actions', 'Linux'] },
  { category: 'Design & Creative', skills: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Sketch', 'Canva', 'InDesign', 'After Effects', 'Premiere Pro', 'Webflow', 'Framer'] },
  { category: 'Marketing & Growth', skills: ['SEO', 'Google Ads', 'Meta Ads', 'HubSpot', 'Salesforce', 'Marketo', 'Mailchimp', 'A/B Testing', 'Copywriting', 'Content Strategy'] },
  { category: 'Project Management', skills: ['Jira', 'Asana', 'Monday.com', 'Notion', 'Confluence', 'Agile / Scrum', 'Kanban', 'MS Project', 'Smartsheet', 'Trello'] },
]

const SOFT_SKILLS = [
  { skill: 'Communication', desc: 'Clearly convey ideas verbally and in writing to diverse audiences.' },
  { skill: 'Leadership', desc: 'Guide teams toward goals, make decisions, and take ownership of outcomes.' },
  { skill: 'Problem-solving', desc: 'Analyze complex issues and develop practical, effective solutions.' },
  { skill: 'Collaboration', desc: 'Work effectively across teams and functions to achieve shared goals.' },
  { skill: 'Adaptability', desc: 'Thrive in changing environments and embrace new challenges quickly.' },
  { skill: 'Time management', desc: 'Prioritize tasks, meet deadlines, and manage competing demands efficiently.' },
  { skill: 'Critical thinking', desc: 'Evaluate information objectively to make sound judgments and decisions.' },
  { skill: 'Attention to detail', desc: 'Produce high-quality work with accuracy and thoroughness.' },
  { skill: 'Emotional intelligence', desc: 'Understand and manage emotions to build strong working relationships.' },
  { skill: 'Creativity', desc: 'Generate original ideas and find innovative approaches to challenges.' },
]

const COMPUTER_SKILLS = [
  { category: 'Microsoft Office', skills: ['Excel (VLOOKUP, pivot tables, macros)', 'Word', 'PowerPoint', 'Outlook', 'Teams', 'SharePoint'] },
  { category: 'Google Workspace', skills: ['Google Sheets', 'Google Docs', 'Google Slides', 'Gmail', 'Google Meet', 'Google Drive'] },
  { category: 'Communication Tools', skills: ['Slack', 'Zoom', 'Microsoft Teams', 'Notion', 'Loom', 'Asana'] },
  { category: 'CRM & Sales', skills: ['Salesforce', 'HubSpot CRM', 'Pipedrive', 'Zendesk', 'Intercom', 'Gong'] },
]

const FAQS = [
  {
    q: 'What skills should I put on my resume?',
    a: 'Focus on skills that are directly relevant to the job description. Start with hard skills (technical skills specific to the role), then add transferable soft skills. Mirror the language used in the job posting — if they say "data analysis," use that exact phrase rather than a synonym to pass ATS screening.',
  },
  {
    q: 'How many skills should I list on a resume?',
    a: 'Most career experts recommend listing 10–15 skills. Too few looks thin; too many looks like keyword stuffing. Prioritize quality over quantity — list skills you can actually speak to in an interview and rank the most relevant ones first.',
  },
  {
    q: 'What are computer skills for a resume?',
    a: 'Computer skills for a resume include software proficiency (Microsoft Office, Google Workspace), industry tools (Salesforce, HubSpot, Jira), programming languages (Python, SQL, JavaScript), and cloud platforms (AWS, Azure, GCP). Be specific — "Excel (pivot tables, VLOOKUP, macros)" is far stronger than just "Microsoft Office."',
  },
  {
    q: 'What are job skills for a resume?',
    a: 'Job skills fall into two categories: hard skills (technical, teachable abilities like coding, data analysis, or graphic design) and soft skills (interpersonal traits like leadership, communication, or problem-solving). The best resumes blend both — hard skills prove capability, soft skills prove fit.',
  },
  {
    q: 'Where should skills go on a resume?',
    a: 'Create a dedicated "Skills" section near the top of your resume — below your summary and above your work experience. List your most relevant technical skills here. Then reinforce those skills with specific examples in your bullet points under each job. Don\'t just list skills; demonstrate them.',
  },
  {
    q: 'Should I list soft skills on my resume?',
    a: 'Yes, but strategically. Rather than listing generic soft skills like "good communicator," demonstrate them in your work experience bullets. For example, instead of listing "leadership," write "Led a cross-functional team of 8 to deliver a $2M product launch on time and under budget." The action proves the skill.',
  },
]

export default function ResumeSkillsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const s = {
    container: { maxWidth: 860, margin: '0 auto', padding: '0 20px' },
    h2: { fontSize: 26, fontWeight: 800, color: '#0f172a', marginBottom: 8, letterSpacing: '-0.02em' } as React.CSSProperties,
    h3: { fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 12 } as React.CSSProperties,
    p: { fontSize: 16, color: '#475569', lineHeight: 1.7, marginBottom: 16 } as React.CSSProperties,
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <style>{`
        @media (max-width: 640px) {
          .skills-grid { grid-template-columns: 1fr !important; }
          .soft-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Hero */}
      <div style={{ background: '#0f172a', padding: '64px 20px 56px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#60a5fa', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>
            Resume Skills Guide
          </p>
          <h1 style={{ fontSize: 44, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 18 }}>
            Best Skills to Put on a Resume
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 32, maxWidth: 560, margin: '0 auto 32px' }}>
            The complete list of resume skills — technical, soft skills, and computer skills — with tips on which to include and how to list them.
          </p>
          <Link href="/resume-builder" style={{
            display: 'inline-block', background: '#3b82f6', color: '#fff',
            padding: '14px 28px', borderRadius: 10, fontWeight: 700, fontSize: 15,
            textDecoration: 'none',
          }}>
            Get AI Resume Feedback →
          </Link>
        </div>
      </div>

      {/* Intro */}
      <div style={{ ...s.container, paddingTop: 56, paddingBottom: 16 }}>
        <h2 style={s.h2}>What Skills Should You Put on Your Resume?</h2>
        <p style={s.p}>
          The skills section is one of the most scanned parts of a resume — by both applicant tracking systems (ATS) and hiring managers. The right skills signal you're qualified before anyone reads a single bullet point. The wrong skills (or no skills section at all) mean your resume gets filtered out before a human ever sees it.
        </p>
        <p style={s.p}>
          Resume skills fall into three categories: <strong>technical skills</strong> (hard skills specific to your field), <strong>soft skills</strong> (interpersonal and cognitive strengths), and <strong>computer skills</strong> (software and tools you're proficient in). Most resumes need all three — weighted toward technical and computer skills for the specific role.
        </p>
      </div>

      {/* Technical Skills */}
      <div style={{ ...s.container, paddingTop: 40, paddingBottom: 40 }}>
        <h2 style={s.h2}>Technical Skills for a Resume</h2>
        <p style={{ ...s.p, marginBottom: 28 }}>
          Technical skills are the hard skills that prove you can do the job. These vary by industry — here are the most in-demand technical skill categories with specific examples.
        </p>
        <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {TECH_SKILLS.map(cat => (
            <div key={cat.category} style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid #e2e8f0' }}>
              <h3 style={{ ...s.h3, marginBottom: 14 }}>{cat.category}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cat.skills.map(skill => (
                  <span key={skill} style={{ background: '#f1f5f9', borderRadius: 6, padding: '5px 12px', fontSize: 13, color: '#334155', fontWeight: 500 }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div style={{ background: '#fff', padding: '48px 20px' }}>
        <div style={s.container}>
          <h2 style={s.h2}>Soft Skills for a Resume</h2>
          <p style={{ ...s.p, marginBottom: 28 }}>
            Soft skills are increasingly valued — especially at senior levels where technical competency is assumed. List the most relevant ones, then prove them in your work experience bullets.
          </p>
          <div className="soft-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {SOFT_SKILLS.map(item => (
              <div key={item.skill} style={{ display: 'flex', gap: 14, padding: '16px 20px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', flexShrink: 0, marginTop: 7 }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{item.skill}</div>
                  <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Computer Skills */}
      <div style={{ ...s.container, paddingTop: 48, paddingBottom: 48 }}>
        <h2 style={s.h2}>Computer Skills for a Resume</h2>
        <p style={{ ...s.p, marginBottom: 28 }}>
          Computer skills are expected for most office roles. Be specific — naming the exact tool and your proficiency level (e.g., "Excel — advanced: pivot tables, VLOOKUP, macros") is far more credible than a generic "Microsoft Office."
        </p>
        <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {COMPUTER_SKILLS.map(cat => (
            <div key={cat.category} style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid #e2e8f0' }}>
              <h3 style={{ ...s.h3, marginBottom: 14 }}>{cat.category}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cat.skills.map(skill => (
                  <span key={skill} style={{ background: '#eff6ff', borderRadius: 6, padding: '5px 12px', fontSize: 13, color: '#1d4ed8', fontWeight: 500 }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to list skills */}
      <div style={{ background: '#fff', padding: '48px 20px' }}>
        <div style={s.container}>
          <h2 style={s.h2}>How to List Skills on a Resume</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 24 }}>
            {[
              { num: '1', title: 'Match the job description', body: 'Read the posting carefully and mirror the exact skill terms they use. If the job says "data analysis" and you say "analytics," ATS may not make the connection.' },
              { num: '2', title: 'Create a dedicated Skills section', body: 'Place it near the top of your resume — below your summary and above work experience. Group skills by category (Technical Skills, Tools, Languages) for easy scanning.' },
              { num: '3', title: 'Be specific, not vague', body: '"Python (pandas, scikit-learn, FastAPI)" beats "Python." Specificity builds credibility and gives interviewers something concrete to ask about.' },
              { num: '4', title: 'Prove skills in your bullets', body: 'List a skill in your skills section, then demonstrate it in at least one bullet point under a job. "Built ETL pipelines in Python reducing data processing time by 60%" proves Python better than listing it alone.' },
              { num: '5', title: 'Cut filler skills', body: 'Remove skills that every applicant lists and add no signal — "Microsoft Word," "email," "fast learner." Use that space for differentiated, role-specific skills.' },
            ].map(step => (
              <div key={step.num} style={{ display: 'flex', gap: 20, padding: 24, background: '#f8fafc', borderRadius: 14, border: '1px solid #e2e8f0' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#0f172a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 15, flexShrink: 0 }}>
                  {step.num}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{step.title}</div>
                  <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>{step.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: '#0f172a', padding: '56px 20px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: '#fff', marginBottom: 14, letterSpacing: '-0.02em' }}>
            Let AI review your resume skills
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 32 }}>
            Hayven's AI resume reviewer analyzes your skills section, checks for ATS optimization, and tells you exactly what to add, remove, or rewrite.
          </p>
          <Link href="/resume-builder" style={{
            display: 'inline-block', background: '#3b82f6', color: '#fff',
            padding: '16px 36px', borderRadius: 12, fontWeight: 700, fontSize: 16,
            textDecoration: 'none',
          }}>
            Analyze My Resume Free →
          </Link>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ ...s.container, paddingTop: 56, paddingBottom: 64 }}>
        <h2 style={{ ...s.h2, marginBottom: 28 }}>Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', textAlign: 'left', padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, color: '#0f172a' }}
              >
                {faq.q}
                <span style={{ fontSize: 20, color: '#94a3b8', marginLeft: 12, flexShrink: 0 }}>{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 22px 20px', fontSize: 14, color: '#475569', lineHeight: 1.7 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SEO paragraph */}
      <div style={{ background: '#f1f5f9', padding: '40px 20px' }}>
        <div style={{ ...s.container }}>
          <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.8 }}>
            This guide covers the best <strong>skills for a resume</strong> — also called <strong>resume skills</strong>, <strong>job skills for a resume</strong>, <strong>skills for a resume list</strong>, and <strong>skills to put on a resume</strong>. Whether you're looking for <strong>computer skills for a resume</strong>, <strong>technical skills for a resume</strong>, or <strong>soft skills for a resume</strong>, this page covers all categories with real examples. Hayven's AI resume builder can analyze your current skills section and tell you exactly what's missing, what to cut, and how to rewrite it to pass ATS screening and impress hiring managers.
          </p>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map(faq => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }),
        }}
      />
    </div>
  )
}
