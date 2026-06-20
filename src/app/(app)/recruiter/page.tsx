'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Briefcase, Sparkles, Lock } from 'lucide-react'
import Link from 'next/link'

type Message = { role: 'user' | 'assistant'; content: string }

const FREE_LIMIT = 20

const SARAH_INTRO = `Hi! I'm Sarah, your personal AI recruiter.

I've spent 12 years placing talent at companies like Google, Meta, Stripe, and hundreds of top startups. I know what hiring managers look for, what red flags kill candidacies, and exactly how to position you to land the role — and the offer — you deserve.

What are you working on today?`

export default function RecruiterPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: SARAH_INTRO },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [used, setUsed] = useState(0)
  const [limitReached, setLimitReached] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send() {
    if (!input.trim() || loading || limitReached) return
    const userMsg: Message = { role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/recruiter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      })
      const data = await res.json()

      if (res.status === 429) {
        setLimitReached(true)
        setUsed(FREE_LIMIT)
        return
      }

      if (data.used !== undefined) setUsed(data.used)
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
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
                fontSize: 10, background: '#10b981', color: '#fff',
                borderRadius: 4, padding: '2px 6px', fontWeight: 600,
              }}>AI RECRUITER</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', margin: 0 }}>
              12 years · Google, Meta, Stripe · 2,400+ placements
            </p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            {used > 0 && !limitReached && (
              <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>
                {remaining} message{remaining !== 1 ? 's' : ''} left this month
              </span>
            )}
            <Sparkles size={16} color="#f59e0b" />
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
          }}>
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
            <div style={{
              maxWidth: '75%',
              background: msg.role === 'user' ? '#141414' : 'var(--color-background-secondary)',
              color: msg.role === 'user' ? '#fff' : 'var(--color-text-primary)',
              borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              padding: '12px 16px',
              fontSize: 14,
              lineHeight: 1.6,
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
        <div ref={bottomRef} />
      </div>

      {limitReached ? (
        <div style={{
          padding: '20px 0 24px',
          borderTop: '0.5px solid var(--color-border-tertiary)',
        }}>
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
                  Upgrade to Pro for unlimited access to Sarah
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
              placeholder="Ask Sarah anything about your job search…"
              rows={1}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontSize: 14, color: 'var(--color-text-primary)', resize: 'none',
                lineHeight: 1.5, paddingTop: 4,
              }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              style={{
                background: '#141414', color: '#fff', border: 'none',
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
            Sarah uses real market data and AI to give you recruiter-grade career advice.
          </p>
        </div>
      )}
    </div>
  )
}
