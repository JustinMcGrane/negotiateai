'use client'
import { useState, useRef, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Send, Briefcase, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

type Message = { role: 'user' | 'assistant'; content: string }

const SIGNUP_AFTER = 14 // hard fallback — Sarah should mention signup naturally before this

const DEFAULT_INTRO = `Hi! I'm Sarah, your career coach. Quick question — do you know if you're being paid what you're worth? Tell me your role and what you're making and I'll tell you right now.`

const STARTERS = [
  'How do I negotiate my salary?',
  'Am I being underpaid?',
  'How do I get more interviews?',
  'I just got a job offer — what do I do?',
]

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString()
}

function buildWorthContext(title: string, location: string, salary: string, median: string, gap: string) {
  const salaryNum = Number(salary)
  const medianNum = Number(median)
  const gapNum = Number(gap)
  if (!title || !salaryNum || !medianNum) return null

  const locationStr = location ? ` in ${location}` : ''
  const gapStr = gapNum > 0
    ? ` That's a **${fmt(gapNum)}/year gap** — you're being underpaid.`
    : ` You're actually being paid at or above market rate.`

  return {
    intro: `Hey! I just looked at your numbers — you're a **${title}**${locationStr} making **${fmt(salaryNum)}**, and the market median for your role is **${fmt(medianNum)}**.${gapStr}

I want to help you close that gap. First question: are you thinking about negotiating your current salary, or are you open to finding a new role that pays you what you're worth?`,
    systemContext: `The user just came from the salary checker tool. Here is their data:
- Job title: ${title}
- Location: ${location || 'not specified'}
- Current salary: ${fmt(salaryNum)}
- Market median: ${fmt(medianNum)}
- Gap: ${gapNum > 0 ? fmt(gapNum) + ' underpaid' : 'at or above market'}

Start the conversation knowing this context. Do not ask them what their salary is — you already know it. Focus immediately on actionable next steps to help them close the gap or improve their position.`,
  }
}

function renderContent(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />')
}

function SarahChat() {
  const searchParams = useSearchParams()
  const worthContext = buildWorthContext(
    searchParams.get('title') ?? '',
    searchParams.get('location') ?? '',
    searchParams.get('salary') ?? '',
    searchParams.get('median') ?? '',
    searchParams.get('gap') ?? '',
  )
  const intro = worthContext?.intro ?? DEFAULT_INTRO

  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: intro }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [userMessageCount, setUserMessageCount] = useState(0)
  const [showSignup, setShowSignup] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send(text?: string) {
    const content = (text ?? input).trim()
    if (!content || loading) return

    const userMsg: Message = { role: 'user', content }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    const newCount = userMessageCount + 1
    setUserMessageCount(newCount)

    try {
      const res = await fetch('/api/recruiter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          ...(worthContext?.systemContext ? { contextNote: worthContext.systemContext } : {}),
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I ran into an issue. Try again in a moment." }])
        return
      }

      let replyContent = data.content
      // Strip assessment tags for cleaner display
      replyContent = replyContent.replace(/\[ASSESSMENT_COMPLETE\][\s\S]*?\[\/ASSESSMENT_COMPLETE\]/, '').trim()

      setMessages(prev => [...prev, { role: 'assistant', content: replyContent }])

      if (newCount >= SIGNUP_AFTER) {
        setShowSignup(true)
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Something went wrong. Please try again." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '16px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Image src="/logo-light.svg" alt="Hayven" width={110} height={30} style={{ objectFit: 'contain' }} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 22, height: 22, borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Briefcase size={11} color="#fff" />
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Sarah · Personalized Career Coach</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: messages.length === 1 ? '0 16px' : '24px 16px', maxWidth: 720, width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16, justifyContent: messages.length === 1 ? 'flex-end' : 'flex-start', paddingBottom: 24 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: 10 }}>
            {msg.role === 'assistant' && (
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 4,
              }}>
                <Briefcase size={13} color="#fff" />
              </div>
            )}
            <div
              style={{
                maxWidth: '78%',
                background: msg.role === 'user' ? '#667eea' : 'rgba(255,255,255,0.06)',
                color: '#fff',
                borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                padding: '12px 16px', fontSize: 14, lineHeight: 1.65,
                border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}
              dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }}
            />
          </div>
        ))}

        {/* Starter prompts */}
        {messages.length === 1 && (
          <div style={{ paddingLeft: 38, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {STARTERS.map(s => (
              <button key={s} onClick={() => send(s)} style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 20, padding: '7px 14px', fontSize: 13, color: 'rgba(255,255,255,0.8)',
                cursor: 'pointer',
              }}>
                {s}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Briefcase size={13} color="#fff" />
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '18px 18px 18px 4px', padding: '12px 16px', fontSize: 14, color: 'rgba(255,255,255,0.4)',
            }}>
              Sarah is thinking…
            </div>
          </div>
        )}

        {/* Signup prompt after 5 messages */}
        {showSignup && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(102,126,234,0.15) 0%, rgba(118,75,162,0.15) 100%)',
            border: '1px solid rgba(102,126,234,0.3)',
            borderRadius: 16, padding: '24px 20px', marginTop: 8,
          }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
              Sarah can keep helping you — sign up free to continue.
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 20, lineHeight: 1.6 }}>
              She&apos;ll remember everything from this conversation and coach you all the way to your next offer.
            </div>
            <Link href="/signup?method=google" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              background: '#fff', color: '#0f172a', textDecoration: 'none',
              borderRadius: 10, padding: '12px 20px',
              fontSize: 14, fontWeight: 600, marginBottom: 10,
            }}>
              <svg width="16" height="16" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.96l3.007 2.332C4.672 5.163 6.656 3.58 9 3.58z"/>
              </svg>
              Continue with Google
            </Link>
            <Link href="/signup" style={{
              display: 'block', textAlign: 'center',
              fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
            }}>
              or sign up with email
            </Link>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '16px', maxWidth: 720, width: '100%', margin: '0 auto' }}>
        <div style={{
          display: 'flex', gap: 8,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 12, padding: '8px 12px',
        }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder="Ask Sarah anything…"
            rows={1}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontSize: 14, color: '#fff', resize: 'none', lineHeight: 1.5, paddingTop: 4,
            }}
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff', border: 'none', borderRadius: 8,
              width: 36, height: 36, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: !input.trim() || loading ? 0.4 : 1, flexShrink: 0,
            }}
          >
            <Send size={15} />
          </button>
        </div>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: 8 }}>
          Hayven · <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>Privacy</Link>
        </p>
      </div>
    </div>
  )
}

export default function SarahPage() {
  return (
    <Suspense>
      <SarahChat />
    </Suspense>
  )
}
