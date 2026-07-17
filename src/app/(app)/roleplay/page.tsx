'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, RotateCcw, Briefcase, Search, Users, Lock, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { ROLEPLAY_CHARACTERS } from '@/lib/roleplay-characters'
import type { RoleplayCharacter } from '@/lib/roleplay-characters'

type Message = { role: 'user' | 'assistant'; content: string }

const ICON_MAP: Record<string, React.ReactNode> = {
  briefcase: <Briefcase size={22} />,
  search: <Search size={22} />,
  users: <Users size={22} />,
}

const SARAH_HANDOFF: Record<string, string> = {
  jordan: "I'll step back and bring in Jordan — he's the hiring manager you'll be negotiating with. This is an initial offer call. Treat it like the real thing. Go ahead when you're ready.",
  priya: "I'll hand this off to Priya. She's the recruiter you'll be talking with — she's friendly but she's gathering intel. Don't give up your number first. Go when you're ready.",
  marcus: "I'll step back and bring in Marcus. He's your manager. This is your raise or promotion ask. Come in with your case, not just a request. Go when you're ready.",
}

export default function RoleplayPage() {
  const [stage, setStage] = useState<'gate' | 'roster' | 'setup' | 'chat' | 'debrief'>('gate')
  const [isPro, setIsPro] = useState(false)
  const [character, setCharacter] = useState<RoleplayCharacter | null>(null)
  const [scenario, setScenario] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [turnCount, setTurnCount] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    createClient().auth.getUser().then(async ({ data }) => {
      if (!data.user) return
      const { data: profile } = await createClient().from('profiles').select('plan').eq('id', data.user.id).single()
      if (profile?.plan === 'pro' || profile?.plan === 'elite') {
        setIsPro(true)
        setStage('roster')
      }
    })
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function selectCharacter(c: RoleplayCharacter) {
    setCharacter(c)
    setStage('setup')
  }

  function startRoleplay() {
    if (!character) return
    setMessages([
      { role: 'assistant', content: SARAH_HANDOFF[character.id] ?? `I'll hand this off to ${character.name}. Go ahead when you're ready.` },
    ])
    setTurnCount(0)
    setStage('chat')
  }

  async function send() {
    const content = input.trim()
    if (!content || loading || !character) return
    const userMsg: Message = { role: 'user', content }
    const chatMessages = messages.filter(m => m.role !== 'assistant' || !Object.values(SARAH_HANDOFF).includes(m.content))
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/roleplay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characterId: character.id,
          messages: [...chatMessages, userMsg],
          scenario,
        }),
      })
      const data = await res.json()
      if (data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
        setTurnCount(t => t + 1)
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error — try again.' }])
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setCharacter(null)
    setScenario('')
    setMessages([])
    setTurnCount(0)
    setStage('roster')
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
          <MessageSquare size={28} color="#fff" />
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 12px' }}>Roleplay Practice</h1>
        <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: '0 0 32px' }}>
          Practice with realistic characters — a hiring manager, a recruiter, or your own manager. Each one pushes back like the real thing.
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
            <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#fff' }}>Pro feature</p>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
              Roleplay practice is available on Pro and Elite plans.
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
          Upgrade to Pro
        </Link>
      </div>
    )
  }

  if (stage === 'roster') {
    return (
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px' }}>Roleplay Practice</h1>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: 0 }}>
            Choose who you want to practice with. Sarah will introduce them, then step back.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {ROLEPLAY_CHARACTERS.map(c => (
            <button
              key={c.id}
              onClick={() => selectCharacter(c)}
              style={{
                background: 'var(--color-background-secondary)',
                border: '0.5px solid var(--color-border-tertiary)',
                borderRadius: 12, padding: '24px 20px',
                cursor: 'pointer', textAlign: 'left',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = c.accentColor)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border-tertiary)')}
            >
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: c.bgColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: c.accentColor, marginBottom: 16,
              }}>
                {ICON_MAP[c.icon]}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: c.accentColor, fontWeight: 600, marginBottom: 6 }}>{c.role}</div>
              <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{c.scenario}</div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (stage === 'setup' && character) {
    return (
      <div style={{ maxWidth: 560, margin: '60px auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: character.bgColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: character.accentColor,
          }}>
            {ICON_MAP[character.icon]}
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{character.name}</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{character.role} · {character.scenario}</div>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
            Your scenario (optional)
          </label>
          <textarea
            value={scenario}
            onChange={e => setScenario(e.target.value)}
            placeholder={`e.g. I'm negotiating an offer of $128k for a Senior PM role. My target is $145k. I have a competing offer at $138k.`}
            rows={4}
            style={{
              width: '100%', boxSizing: 'border-box',
              background: 'var(--color-background-secondary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 8, padding: '10px 12px', fontSize: 14,
              color: 'var(--color-text-primary)', outline: 'none', resize: 'none',
            }}
          />
          <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginTop: 6 }}>
            The more context you give, the more realistic the practice.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => setStage('roster')}
            style={{
              background: 'transparent',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 8, padding: '10px 20px',
              fontSize: 14, cursor: 'pointer', color: 'var(--color-text-secondary)',
            }}
          >
            Back
          </button>
          <button
            onClick={startRoleplay}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff', border: 'none', borderRadius: 8,
              padding: '10px 24px', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', flex: 1,
            }}
          >
            Start roleplay
          </button>
        </div>
      </div>
    )
  }

  if (stage === 'chat' && character) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: 700, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ padding: '16px 0', borderBottom: '0.5px solid var(--color-border-tertiary)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: character.bgColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: character.accentColor, flexShrink: 0,
            }}>
              {ICON_MAP[character.icon]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{character.name}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{character.role}</div>
            </div>
            <button
              onClick={reset}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                background: 'transparent', border: '0.5px solid var(--color-border-tertiary)',
                borderRadius: 6, padding: '5px 10px', cursor: 'pointer',
                fontSize: 12, color: 'var(--color-text-secondary)',
              }}
            >
              <RotateCcw size={12} />
              New session
            </button>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.map((msg, i) => {
            const isSarahHandoff = msg.role === 'assistant' && Object.values(SARAH_HANDOFF).includes(msg.content)
            return (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                {msg.role === 'assistant' && (
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                    background: isSarahHandoff ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : character.bgColor,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: isSarahHandoff ? '#fff' : character.accentColor,
                    marginRight: 8, marginTop: 4,
                  }}>
                    {isSarahHandoff ? <Briefcase size={13} color="#fff" /> : ICON_MAP[character.icon]}
                  </div>
                )}
                <div style={{
                  maxWidth: '75%',
                  background: msg.role === 'user' ? '#141414' : 'var(--color-background-secondary)',
                  color: msg.role === 'user' ? '#fff' : 'var(--color-text-primary)',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  padding: '11px 15px', fontSize: 14, lineHeight: 1.6,
                  border: msg.role === 'assistant' ? '0.5px solid var(--color-border-tertiary)' : 'none',
                }}>
                  {isSarahHandoff && (
                    <div style={{ fontSize: 10, color: '#667eea', fontWeight: 600, marginBottom: 4, letterSpacing: '0.04em' }}>SARAH</div>
                  )}
                  {msg.content}
                </div>
              </div>
            )
          })}

          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: character.bgColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: character.accentColor,
              }}>
                {ICON_MAP[character.icon]}
              </div>
              <div style={{
                background: 'var(--color-background-secondary)',
                border: '0.5px solid var(--color-border-tertiary)',
                borderRadius: '18px 18px 18px 4px',
                padding: '11px 15px', fontSize: 14,
              }}>
                <span style={{ opacity: 0.5 }}>{character.name} is thinking…</span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
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
              placeholder={`Respond to ${character.name}…`}
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
            {turnCount} turns · <button onClick={reset} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: 'var(--color-text-tertiary)', padding: 0, textDecoration: 'underline' }}>start over</button>
          </p>
        </div>
      </div>
    )
  }

  return null
}
