'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Briefcase, Sparkles, Lock, ChevronDown, ChevronUp, Brain } from 'lucide-react'
import Link from 'next/link'

type Message = { role: 'user' | 'assistant'; content: string }

const FREE_LIMIT = 20

const FREE_INTRO = `Hey! I'm Sarah, your personal recruiting assistant, here to help you accomplish your goals and help you navigate the platform to get as much out of it as possible!

What are you working on right now?`

const PRO_INTRO = `Hey! I'm Sarah, your personal recruiting assistant, here to help you accomplish your goals and help you navigate the platform to get as much out of it as possible!

I've got your profile pulled up and I'm ready to dig in. I can run mock interviews, coach you through a negotiation, review your resume, or help you figure out your next move. I'll remember everything we talk about so you never have to repeat yourself.

What's the most pressing thing on your plate right now?`

const FREE_STARTERS = [
  'How do I negotiate my salary?',
  'What do recruiters look for in a resume?',
  'How do I get more interviews?',
  'Should I apply if I don\'t meet all the requirements?',
]

const PRO_STARTERS = [
  { label: 'Mock interview', prompt: 'Run me through a mock interview for my target role. Ask me the questions and give me feedback on my answers.' },
  { label: 'Negotiate my offer', prompt: 'I have an offer I want to negotiate. Walk me through it like you\'re my coach — roleplay as the recruiter and push back on my counter.' },
  { label: 'Review my resume', prompt: 'I want you to review my resume. I\'ll paste it here and I want honest, line-by-line feedback.' },
  { label: 'Build my strategy', prompt: 'Help me build a job search strategy. I want a real plan — target companies, timeline, and what to prioritize.' },
  { label: 'I just got rejected', prompt: 'I just got rejected from a role I really wanted. Help me process it and figure out what to do next.' },
  { label: 'Career pivot', prompt: 'I\'m thinking about pivoting careers. Help me figure out if it makes sense and how to position myself.' },
]

export default function RecruiterPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [used, setUsed] = useState(0)
  const [limitReached, setLimitReached] = useState(false)
  const [isPro, setIsPro] = useState(false)
  const [memory, setMemory] = useState<Record<string, string>>({})
  const [showMemory, setShowMemory] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function init() {
      try {
        const res = await fetch('/api/sarah-memory')
        const data = await res.json()
        setMemory(data.memory ?? {})
        const proUser = data.isPro === true
        setIsPro(proUser)
        setMessages([{ role: 'assistant', content: proUser ? PRO_INTRO : FREE_INTRO }])
      } catch {
        setMessages([{ role: 'assistant', content: FREE_INTRO }])
      }
      setInitialized(true)
    }
    init()
  }, [])

  useEffect(() => {
    if (!initialized) return
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, initialized])

  async function send(text?: string) {
    const content = (text ?? input).trim()
    if (!content || loading || limitReached) return
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

      if (res.status === 429) {
        setLimitReached(true)
        setUsed(FREE_LIMIT)
        return
      }

      if (data.used !== undefined) setUsed(data.used)

      if (data.isPro && !isPro) {
        setIsPro(true)
        // Refresh memory
        fetch('/api/sarah-memory').then(r => r.json()).then(d => setMemory(d.memory ?? {}))
        // Replace intro with Pro intro if first exchange
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
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${msg}` }])
    } finally {
      setLoading(false)
    }
  }

  function renderContent(text: string) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />')
  }

  const remaining = Math.max(0, FREE_LIMIT - used)
  const memoryEntries = Object.entries(memory).filter(([, v]) => v)
  const memoryLabels: Record<string, string> = {
    targetRole: 'Target role',
    currentRole: 'Current role',
    targetCompany: 'Target company',
    salaryTarget: 'Salary target',
    interviewStage: 'Interview stage',
    goals: 'Goals',
    background: 'Background',
    challenges: 'Challenges',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
      {/* Header */}
      <div style={{ padding: '24px 0 16px', borderBottom: '0.5px solid var(--color-border-tertiary)' }}>
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
                {isPro ? 'PRO COACH' : 'AI RECRUITER'}
              </span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', margin: 0 }}>
              Your personal recruiting assistant
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
            {used > 0 && !limitReached && !isPro && (
              <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>
                {remaining} left this month
              </span>
            )}
            <Sparkles size={16} color="#f59e0b" />
          </div>
        </div>

        {/* Memory panel */}
        {isPro && showMemory && memoryEntries.length > 0 && (
          <div style={{
            marginTop: 12,
            background: 'rgba(102,126,234,0.06)',
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
        {!initialized && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Briefcase size={13} color="#fff" />
            </div>
            <div style={{
              background: 'var(--color-background-secondary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: '18px 18px 18px 4px',
              padding: '12px 16px', width: 220, height: 44,
              opacity: 0.5,
            }} />
          </div>
        )}
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
              borderRadius: '18px 18px 18px 4px',
              padding: '12px 16px', fontSize: 14,
            }}>
              <span style={{ opacity: 0.5 }}>Sarah is thinking…</span>
            </div>
          </div>
        )}

        {/* Pro starter prompts — show after intro if no messages sent yet */}
        {isPro && messages.length === 1 && !loading && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingLeft: 36 }}>
            {PRO_STARTERS.map(s => (
              <button
                key={s.label}
                onClick={() => send(s.prompt)}
                style={{
                  background: 'var(--color-background-secondary)',
                  border: '0.5px solid var(--color-border-tertiary)',
                  borderRadius: 20, padding: '7px 14px',
                  fontSize: 12, cursor: 'pointer',
                  color: 'var(--color-text-primary)',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* Free starter prompts */}
        {!isPro && messages.length === 1 && !loading && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingLeft: 36 }}>
            {FREE_STARTERS.map(s => (
              <button
                key={s}
                onClick={() => send(s)}
                style={{
                  background: 'var(--color-background-secondary)',
                  border: '0.5px solid var(--color-border-tertiary)',
                  borderRadius: 20, padding: '7px 14px',
                  fontSize: 12, cursor: 'pointer',
                  color: 'var(--color-text-primary)',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input / Limit */}
      {limitReached ? (
        <div style={{ padding: '20px 0 24px', borderTop: '0.5px solid var(--color-border-tertiary)' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            border: '1px solid rgba(102,126,234,0.3)',
            borderRadius: 12, padding: '20px 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(102,126,234,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Lock size={16} color="#667eea" />
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#fff' }}>
                  You've used all {FREE_LIMIT} free messages this month
                </p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                  Upgrade to Pro for unlimited coaching with Sarah
                </p>
              </div>
            </div>
            <Link href="/account/billing" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff', textDecoration: 'none',
              borderRadius: 8, padding: '10px 20px',
              fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              Upgrade to Pro
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ padding: '12px 0 24px' }}>
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
              placeholder={isPro ? 'Ask Sarah anything — she remembers your context…' : 'Ask Sarah anything about your job search…'}
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
                background: isPro ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#141414',
                color: '#fff', border: 'none',
                borderRadius: 8, width: 36, height: 36, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: !input.trim() || loading ? 0.4 : 1,
                flexShrink: 0,
              }}
            >
              <Send size={15} />
            </button>
          </div>
          <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', textAlign: 'center', marginTop: 8 }}>
            {isPro
              ? 'Sarah remembers your context across sessions and coaches you through every stage of your search.'
              : 'Sarah is here to help you accomplish your goals and get the most out of the platform.'}
          </p>
        </div>
      )}
    </div>
  )
}
