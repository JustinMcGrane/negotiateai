'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'What is Hayven and how does it work?',
    a: 'Hayven is an AI-powered career and salary negotiation platform. You get a personalized career coach (Sarah), 10 negotiation tools, a resume analyzer, job search, and cover letter generator — all in one place. Start a conversation with Sarah, tell her where you are in your job search, and she\'ll guide you from there.',
  },
  {
    q: 'How much more money can I negotiate?',
    a: 'It depends on your role and situation, but the average professional leaves $27,000 on the table by not negotiating their first offer. Most Hayven users who negotiate report getting between $5,000 and $25,000 more than the initial offer — often in a single conversation.',
  },
  {
    q: 'Does Sarah actually remember me?',
    a: 'On the Elite plan, yes — Sarah remembers your goals, your situation, and everything you\'ve discussed across every session. On the free and Pro plans, each conversation starts fresh, but you can catch Sarah up quickly.',
  },
  {
    q: 'How is Hayven different from just Googling salary data?',
    a: 'Salary data on Google gives you a range. Hayven tells you your specific market rate for your exact role, level, and city — and then helps you use that number to actually negotiate. Knowing your worth and successfully asking for it are two very different things.',
  },
  {
    q: 'Will negotiating hurt my chances of getting the job?',
    a: 'Almost never. Employers expect candidates to negotiate — it\'s a normal part of the hiring process. In fact, negotiating often signals confidence and professionalism. Hayven\'s negotiation coaching teaches you exactly how to ask in a way that strengthens the relationship rather than risks the offer.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section style={{ padding: '96px 40px', background: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', textAlign: 'center', marginBottom: 56 }}>
          Frequently asked questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', lineHeight: 1.4 }}>{faq.q}</span>
                <ChevronDown
                  size={18}
                  color="#94a3b8"
                  style={{ flexShrink: 0, marginLeft: 16, transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                />
              </button>
              {open === i && (
                <div style={{ padding: '0 24px 20px', fontSize: 15, color: '#475569', lineHeight: 1.75 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
