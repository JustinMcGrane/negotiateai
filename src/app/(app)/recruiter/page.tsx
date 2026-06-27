'use client'
import { useState, useRef, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Send, Briefcase, Sparkles, Brain, ChevronDown, ChevronUp, ArrowRight, TrendingUp, Clock, Lock } from 'lucide-react'
import Link from 'next/link'

type Message = { role: 'user' | 'assistant'; content: string }
type Assessment = {
  currentSalary: number
  currentTitle: string
  targetTitle: string
  targetSalary: number
  timeline: string
}

const CHECKIN_INTRO = `Welcome back — it's great to hear from you again.

A lot can shift in a few months. Let's catch up on where things stand. Tell me what's changed since we last spoke — new role, offer on the table, or just a general update — and I'll reassess your market position and tell you what's moved.`

const ASSESSMENT_INTRO = `Hi, I'm Sarah — your AI recruiter.

I've spent 12 years placing candidates at Google, Meta, Stripe, and hundreds of top startups. Before we dive in, I want to run a quick salary assessment for you — it takes about 5 minutes and I'll show you exactly where you stand in the market and what you could realistically be earning.

To get started: what's your current job title and roughly how many years of experience do you have?`

const PRO_INTRO = `Hi — good to connect. I'm Sarah.

I've got your profile pulled up and I'm ready to dig in. I can run mock interviews, coach you through a negotiation, tear apart your resume line by line, or just help you figure out your next move.

I'll remember everything we talk about, so you never have to repeat yourself.

What's the most pressing thing on your plate right now?`

const PRO_STARTERS = [
  { label: 'Mock interview', prompt: 'Run me through a mock interview for my target role. Ask me the questions and give me feedback on my answers.' },
  { label: 'Negotiate my offer', prompt: 'I have an offer I want to negotiate. Walk me through it like you\'re my coach — roleplay as the recruiter and push back on my counter.' },
  { label: 'Review my resume', prompt: 'I want you to review my resume. I\'ll paste it here and I want honest, line-by-line feedback.' },
  { label: 'Build my strategy', prompt: 'Help me build a job search strategy. I want a real plan — target companies, timeline, and what to prioritize.' },
  { label: 'I just got rejected', prompt: 'I just got rejected from a role I really wanted. Help me process it and figure out what to do next.' },
  { label: 'Career pivot', prompt: 'I\'m thinking about pivoting careers. Help me figure out if it makes sense and how to position myself.' },
]

function fmt(n: number) {
  if (n >= 1000) return `$${Math.round(n / 1000)}k`
  return `$${n}`
}

function RecruiterInner() {
  const searchParams = useSearchParams()
  const isCheckin = searchParams.get('checkin') === 'true'

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isPro, setIsPro] = useState(false)
  const [memory, setMemory] = useState<Record<string, string>>({})
  const [showMemory, setShowMemory] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function init() {
      try {
        const res = await fetch('/api/sarah-memory')
        const data = await res.json()
        setMemory(data.memory ?? {})
      } catch {}
      const intro = isCheckin ? CHECKIN_INTRO : ASSESSMENT_INTRO
      setMessages([{ role: 'assistant', content: intro }])
      setInitialized(true)
      // Mark check-in started
      if (isCheckin) {
        fetch('/api/checkin', { method: 'POST' }).catch(() => {})
      }
    }
    init()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, assessment])

  async function send(text?: string) {
    const content = (text ?? input).trim()
    if (!content || loading || assessment) return
    const userMsg: Message = { role: 'user', content }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const allMessages = [...messages, userMsg]
      const res = await fetch('/api/recruiter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: allMessages }),
      })
      const data = await res.json()

      if (!res.ok || !data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
        return
      }

      if (data.isPro && !isPro) {
        setIsPro(true)
        fetch('/api/sarah-memory').then(r => r.json()).then(d => setMemory(d.memory ?? {}))
        if (messages.length === 1) {
          setMessages([
            { role: 'assistant', content: PRO_INTRO },
            userMsg,
            { role: 'assistant', content: data.content },
          ])
          return
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.content }])

      if (data.assessment) {
        setAssessment(data.assessment)
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  function renderContent(text: string) {
    if (!text) return ''
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />')
  }

  const memoryEntries = Object.entries(memory).filter(([, v]) => v)
  const memoryLabels: Record<string, string> = {
    targetRole: 'Target role', currentRole: 'Current role', targetCompany: 'Target company',
    salaryTarget: 'Salary target', interviewStage: 'Interview stage',
    goals: 'Goals', background: 'Background', challenges: 'Challenges',
  }

  if (!initialized) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
      {/* Header */}
      <div style={{ padding: '24px 0 16px', borderBottom: '0.5px solid var(--color-border-tertiary)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Briefcase size={20} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <h1 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Sarah</h1>
              <span style={{
                fontSize: 10,
                background: isPro ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#10b981',
                color: '#fff', borderRadius: 4, padding: '2px 6px', fontWeight: 600,
              }}>
                {isPro ? 'PRO COACH' : assessment ? 'ASSESSMENT COMPLETE' : 'SALARY ASSESSMENT'}
              </span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', margin: 0 }}>
              12 years · Google, Meta, Stripe · 2,400+ placements
            </p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            {isPro && memoryEntries.length > 0 && (
              <button
                onClick={() => setShowMemory(v => !v)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  background: 'rgba(102,126,234,0.1)', border: '1px solid rgba(102,126,234,0.2)',
                  borderRadius: 6, padding: '4px 10px', cursor: 'pointer',
                  fontSize: 11, color: '#667eea', fontWeight: 500,
                }}
              >
                <Brain size={12} />
                Context
                {showMemory ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
              </button>
            )}
            <Sparkles size={16} color="#f59e0b" />
          </div>
        </div>

        {isPro && showMemory && memoryEntries.length > 0 && (
          <div style={{
            marginTop: 12, background: 'rgba(102,126,234,0.06)',
            border: '1px solid rgba(102,126,234,0.15)',
            borderRadius: 8, padding: '12px 16px',
            display: 'flex', flexWrap: 'wrap', gap: '8px 24px',
          }}>
            {memoryEntries.map(([key, value]) => (
              <div key={key}>
                <span style={{ fontSize: 10, color: '#667eea', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {memoryLabels[key] ?? key}
                </span>
                <p style={{ margin: '1px 0 0', fontSize: 12, color: 'var(--color-text-primary)' }}>{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            {msg.role === 'assistant' && (
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginRight: 8, marginTop: 4,
              }}>
                <Briefcase size={13} color="#fff" />
              </div>
            )}
            <div
              style={{
                maxWidth: '75%',
                background: msg.role === 'user' ? '#141414' : 'var(--color-background-secondary)',
                color: msg.role === 'user' ? '#fff' : 'var(--color-text-primary)',
                borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                padding: '12px 16px', fontSize: 14, lineHeight: 1.6,
                border: msg.role === 'assistant' ? '0.5px solid var(--color-border-tertiary)' : 'none',
              }}
              dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }}
            />
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Briefcase size={13} color="#fff" />
            </div>
            <div style={{
              background: 'var(--color-background-secondary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: '18px 18px 18px 4px', padding: '12px 16px', fontSize: 14,
            }}>
              <span style={{ opacity: 0.5 }}>Sarah is thinking…</span>
            </div>
          </div>
        )}

        {/* Pro starters */}
        {isPro && messages.length === 1 && !loading && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingLeft: 36 }}>
            {PRO_STARTERS.map(s => (
              <button key={s.label} onClick={() => send(s.prompt)} style={{
                background: 'var(--color-background-secondary)',
                border: '0.5px solid var(--color-border-tertiary)',
                borderRadius: 20, padding: '7px 14px', fontSize: 12, cursor: 'pointer',
                color: 'var(--color-text-primary)',
              }}>
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* Assessment results + upgrade screen */}
        {assessment && !isPro && (
          <div style={{ marginTop: 8 }}>
            {/* Salary cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div style={{
                background: 'var(--color-background-secondary)',
                border: '0.5px solid var(--color-border-tertiary)',
                borderRadius: 12, padding: '18px 20px',
              }}>
                <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', margin: '0 0 4px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Your current market value</p>
                <p style={{ fontSize: 11, color: 'var(--color-text-secondary)', margin: '0 0 8px' }}>{assessment.currentTitle}</p>
                <p style={{ fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>{fmt(assessment.currentSalary)}</p>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                border: '1px solid rgba(102,126,234,0.3)',
                borderRadius: 12, padding: '18px 20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <TrendingUp size={12} color="#667eea" />
                  <p style={{ fontSize: 11, color: '#667eea', margin: 0, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>With NegotiateAI</p>
                </div>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', margin: '0 0 8px' }}>{assessment.targetTitle}</p>
                <p style={{ fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: '-0.02em', color: '#fff' }}>{fmt(assessment.targetSalary)}</p>
              </div>
            </div>

            {/* Timeline */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: 10, padding: '12px 16px', marginBottom: 20,
            }}>
              <Clock size={15} color="#10b981" style={{ flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: 13, color: 'var(--color-text-primary)' }}>
                <strong>Timeline:</strong> Most people in your position reach {assessment.targetTitle} in <strong>{assessment.timeline}</strong> with the right tools and preparation.
              </p>
            </div>

            {/* Upgrade CTA */}
            <div style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              border: '1px solid rgba(102,126,234,0.3)',
              borderRadius: 16, padding: '28px 28px 24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Lock size={14} color="#667eea" />
                <span style={{ fontSize: 11, color: '#667eea', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Unlock your path to {fmt(assessment.targetSalary)}</span>
              </div>
              <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 700, margin: '0 0 10px', letterSpacing: '-0.01em' }}>
                Your assessment is complete. The work starts now.
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.6, margin: '0 0 24px' }}>
                Sarah has mapped your path to {assessment.targetTitle}. To get you there, you need the right tools — resume coaching, mock interviews, negotiation roleplay, and a strategy built around your specific situation. That is what NegotiateAI is built for.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/upgrade"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff', textDecoration: 'none',
                    borderRadius: 10, padding: '13px 24px',
                    fontSize: 14, fontWeight: 700,
                  }}
                >
                  Start for $49/month <ArrowRight size={15} />
                </Link>
                <Link
                  href="/upgrade"
                  style={{
                    display: 'inline-flex', alignItems: 'center',
                    background: 'transparent',
                    color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                    borderRadius: 10, padding: '13px 20px',
                    fontSize: 13, border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  See all plans
                </Link>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {!assessment && !isPro && (
        <div style={{ padding: '12px 0 24px', flexShrink: 0 }}>
          <div style={{
            display: 'flex', gap: 8,
            background: 'var(--color-background-secondary)',
            border: '0.5px solid var(--color-border-tertiary)',
            borderRadius: 12, padding: '8px 12px',
          }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
              placeholder="Tell Sarah about your current role…"
              rows={1}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontSize: 14, color: 'var(--color-text-primary)', resize: 'none',
                lineHeight: 1.5, paddingTop: 4,
              }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              style={{
                background: '#141414', color: '#fff', border: 'none',
                borderRadius: 8, width: 36, height: 36, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: !input.trim() || loading ? 0.4 : 1, flexShrink: 0,
              }}
            >
              <Send size={15} />
            </button>
          </div>
          <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', textAlign: 'center', marginTop: 8 }}>
            Free salary assessment · Takes about 5 minutes
          </p>
        </div>
      )}

      {isPro && (
        <div style={{ padding: '12px 0 24px', flexShrink: 0 }}>
          <div style={{
            display: 'flex', gap: 8,
            background: 'var(--color-background-secondary)',
            border: '0.5px solid var(--color-border-tertiary)',
            borderRadius: 12, padding: '8px 12px',
          }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
              placeholder="Ask Sarah anything — she remembers your context…"
              rows={1}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontSize: 14, color: 'var(--color-text-primary)', resize: 'none',
                lineHeight: 1.5, paddingTop: 4,
              }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff', border: 'none',
                borderRadius: 8, width: 36, height: 36, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: !input.trim() || loading ? 0.4 : 1, flexShrink: 0,
              }}
            >
              <Send size={15} />
            </button>
          </div>
          <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', textAlign: 'center', marginTop: 8 }}>
            Sarah remembers your context across sessions and coaches you through every stage of your search.
          </p>
        </div>
      )}
    </div>
  )
}

export default function RecruiterPage() {
  return (
    <Suspense fallback={null}>
      <RecruiterInner />
    </Suspense>
  )
}
