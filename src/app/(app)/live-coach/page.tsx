'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Phone, PhoneOff, Lock, Zap } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Message = { role: 'user' | 'assistant'; content: string }

interface SessionContext {
  company: string
  targetRange: string
  walkAway: string
  currentOffers: string
  strategySummary: string
  leveragePoints: string
}

export default function LiveCoachPage() {
  const [stage, setStage] = useState<'gate' | 'setup' | 'live' | 'ended'>('gate')
  const [isElite, setIsElite] = useState(false)
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [context, setContext] = useState<SessionContext>({
    company: '',
    targetRange: '',
    walkAway: '',
    currentOffers: '',
    strategySummary: '',
    leveragePoints: '',
  })
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    createClient().auth.getUser().then(async ({ data }) => {
      if (!data.user) return
      const { data: profile } = await createClient().from('profiles').select('plan').eq('id', data.user.id).single()
      if (profile?.plan === 'elite') {
        setIsElite(true)
        setStage('setup')
      }
    })
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function startSession() {
    if (!context.company || !context.targetRange) return
    setMessages([{
      role: 'assistant',
      content: `Live session started. I'm watching the context bar — tell me what they say and I'll give you your next move. Go.`,
    }])
    setStage('live')
  }

  async function send() {
    const content = input.trim()
    if (!content || loading) return
    const userMsg: Message = { role: 'user', content }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const allMessages = [...messages, userMsg]
      const res = await fetch('/api/live-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: allMessages, context }),
      })
      const data = await res.json()
      if (data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error — check your signal and try again.' }])
    } finally {
      setLoading(false)
    }
  }

  function renderContent(text: string) {
    // Bold SAY: and DO: prefixes
    return text
      .replace(/^(SAY:)/m, '<strong style="color:#667eea">SAY:</strong>')
      .replace(/^(DO:)/m, '<strong style="color:#f59e0b">DO:</strong>')
      .replace(/\n/g, '<br />')
  }

  if (stage === 'gate') {
    return (
      <div style={{ maxWidth: 560, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px',
        }}>
          <Zap size={28} color="#fff" />
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 12px' }}>Live Call Coaching</h1>
        <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: '0 0 32px' }}>
          Sarah coaches you in real time during your actual negotiation call. You type what they say, she tells you exactly what to say next.
        </p>
        <div style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          border: '1px solid rgba(102,126,234,0.3)',
          borderRadius: 12, padding: '24px',
          display: 'flex', alignItems: 'flex-start', gap: 16, textAlign: 'left', marginBottom: 24,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: 'rgba(102,126,234,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Lock size={16} color="#667eea" />
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#fff' }}>Elite feature</p>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
              Live coaching is available on the Elite plan. Upgrade to unlock real-time guidance during your calls.
            </p>
          </div>
        </div>
        <Link href="/account/billing" style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff', textDecoration: 'none',
          borderRadius: 8, padding: '12px 28px',
          fontSize: 14, fontWeight: 600,
        }}>
          Upgrade to Elite
        </Link>
      </div>
    )
  }

  if (stage === 'setup') {
    return (
      <div style={{ maxWidth: 560, margin: '60px auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={20} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Live Call Coaching</h1>
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', margin: 0 }}>Set your context before the call starts</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
              Company / Opportunity *
            </label>
            <input
              value={context.company}
              onChange={e => setContext(c => ({ ...c, company: e.target.value }))}
              placeholder="e.g. Acme Corp — Senior PM role"
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'var(--color-background-secondary)',
                border: '0.5px solid var(--color-border-tertiary)',
                borderRadius: 8, padding: '10px 12px', fontSize: 14,
                color: 'var(--color-text-primary)', outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
              Your target range *
            </label>
            <input
              value={context.targetRange}
              onChange={e => setContext(c => ({ ...c, targetRange: e.target.value }))}
              placeholder="e.g. $145k–$160k base"
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'var(--color-background-secondary)',
                border: '0.5px solid var(--color-border-tertiary)',
                borderRadius: 8, padding: '10px 12px', fontSize: 14,
                color: 'var(--color-text-primary)', outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
              Walk-away point
            </label>
            <input
              value={context.walkAway}
              onChange={e => setContext(c => ({ ...c, walkAway: e.target.value }))}
              placeholder="e.g. $130k minimum"
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'var(--color-background-secondary)',
                border: '0.5px solid var(--color-border-tertiary)',
                borderRadius: 8, padding: '10px 12px', fontSize: 14,
                color: 'var(--color-text-primary)', outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
              Offer(s) on the table
            </label>
            <input
              value={context.currentOffers}
              onChange={e => setContext(c => ({ ...c, currentOffers: e.target.value }))}
              placeholder="e.g. Acme offered $128k, competing offer at $141k"
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'var(--color-background-secondary)',
                border: '0.5px solid var(--color-border-tertiary)',
                borderRadius: 8, padding: '10px 12px', fontSize: 14,
                color: 'var(--color-text-primary)', outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
              Your leverage points
            </label>
            <input
              value={context.leveragePoints}
              onChange={e => setContext(c => ({ ...c, leveragePoints: e.target.value }))}
              placeholder="e.g. competing offer, specialized skill, returning from $185k role"
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'var(--color-background-secondary)',
                border: '0.5px solid var(--color-border-tertiary)',
                borderRadius: 8, padding: '10px 12px', fontSize: 14,
                color: 'var(--color-text-primary)', outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
              Strategy / notes
            </label>
            <textarea
              value={context.strategySummary}
              onChange={e => setContext(c => ({ ...c, strategySummary: e.target.value }))}
              placeholder="e.g. anchor high, hold on base before trading to equity, don't accept same day"
              rows={3}
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'var(--color-background-secondary)',
                border: '0.5px solid var(--color-border-tertiary)',
                borderRadius: 8, padding: '10px 12px', fontSize: 14,
                color: 'var(--color-text-primary)', outline: 'none', resize: 'none',
              }}
            />
          </div>

          <button
            onClick={startSession}
            disabled={!context.company || !context.targetRange}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff', border: 'none', borderRadius: 8,
              padding: '12px 24px', fontSize: 14, fontWeight: 600,
              cursor: !context.company || !context.targetRange ? 'not-allowed' : 'pointer',
              opacity: !context.company || !context.targetRange ? 0.5 : 1,
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            <Phone size={16} />
            Start live session
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: 700, margin: '0 auto', padding: '0 24px' }}>
      {/* Pinned context bar */}
      <div style={{
        padding: '12px 16px',
        background: '#0f0f1a',
        borderBottom: '1px solid rgba(102,126,234,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: '#ef4444',
            boxShadow: '0 0 0 2px rgba(239,68,68,0.3)', flexShrink: 0,
          }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {context.company}
          </span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>·</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>
            target {context.targetRange}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', letterSpacing: '0.05em' }}>LIVE</span>
          {stage === 'live' && (
            <button
              onClick={() => setStage('ended')}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 6, padding: '4px 10px', cursor: 'pointer',
                fontSize: 11, color: '#ef4444', fontWeight: 600,
              }}
            >
              <PhoneOff size={12} />
              End call
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((msg, i) => (
          <div key={i}>
            {msg.role === 'user' ? (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ maxWidth: '80%' }}>
                  <div style={{ fontSize: 10, color: 'var(--color-text-tertiary)', marginBottom: 4, textAlign: 'right' }}>
                    They said
                  </div>
                  <div style={{
                    background: 'var(--color-background-secondary)',
                    border: '0.5px solid var(--color-border-tertiary)',
                    borderRadius: '12px 12px 4px 12px',
                    padding: '10px 14px', fontSize: 14, lineHeight: 1.5,
                    color: 'var(--color-text-primary)',
                  }}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ maxWidth: '80%' }}>
                  <div style={{ fontSize: 10, color: '#667eea', marginBottom: 4, fontWeight: 600 }}>
                    Sarah
                  </div>
                  <div
                    style={{
                      background: 'rgba(102,126,234,0.08)',
                      border: '1px solid rgba(102,126,234,0.2)',
                      borderRadius: '12px 12px 12px 4px',
                      padding: '10px 14px', fontSize: 14, lineHeight: 1.5,
                      color: 'var(--color-text-primary)', fontWeight: 500,
                    }}
                    dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              background: 'rgba(102,126,234,0.08)',
              border: '1px solid rgba(102,126,234,0.2)',
              borderRadius: '12px 12px 12px 4px',
              padding: '10px 14px', fontSize: 14,
            }}>
              <span style={{ opacity: 0.5 }}>Sarah is thinking…</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input or Ended state */}
      {stage === 'ended' ? (
        <div style={{ padding: '16px 0 24px', borderTop: '0.5px solid var(--color-border-tertiary)' }}>
          <div style={{
            background: 'var(--color-background-secondary)',
            border: '0.5px solid var(--color-border-tertiary)',
            borderRadius: 12, padding: '20px 24px', textAlign: 'center',
          }}>
            <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: 14 }}>Call ended</p>
            <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--color-text-secondary)' }}>
              Head to the simulator for a full debrief on what worked and what to sharpen.
            </p>
            <Link href="/tools/simulator" style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff', textDecoration: 'none',
              borderRadius: 8, padding: '10px 20px',
              fontSize: 13, fontWeight: 600,
            }}>
              Get your debrief
            </Link>
          </div>
        </div>
      ) : (
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
              placeholder="What did they just say?"
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
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
            Type what they say. Sarah gives you your next move only.
          </p>
        </div>
      )}
    </div>
  )
}
