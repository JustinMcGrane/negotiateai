'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Briefcase, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

type Message = { role: 'user' | 'assistant'; content: string }

const SIGNUP_AFTER = 5 // show signup prompt after this many user messages

const INTRO = `Hey! I'm Sarah, your personal recruiting assistant.

I help people figure out what they're worth, how to negotiate their salary, and how to land their next role.

What are you working on right now?`

const STARTERS = [
  'How do I negotiate my salary?',
  'Am I being underpaid?',
  'How do I get more interviews?',
  'I just got a job offer — what do I do?',
]

function renderContent(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />')
}

export default function SarahPage() {
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: INTRO }])
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
        body: JSON.stringify({ messages: newMessages }),
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
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Sarah · AI Recruiter</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 16px', maxWidth: 720, width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
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
              Want Sarah to remember all of this?
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 20, lineHeight: 1.6 }}>
              Create a free account and Sarah will track your progress, remember your goals, and coach you all the way to your next offer.
            </div>
            <Link href="/signup" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff', textDecoration: 'none',
              borderRadius: 10, padding: '12px 24px',
              fontSize: 14, fontWeight: 600,
            }}>
              Create your free account <ArrowRight size={14} />
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
