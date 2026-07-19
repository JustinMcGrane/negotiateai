'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Send, Briefcase, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

type Message = { role: 'user' | 'assistant'; content: string }

const FIRST_STEPS: Record<string, string> = {
  new_job: '/recruiter',
  negotiate: '/tools/offer-evaluator',
  raise: '/tools/raise-builder',
  resume: '/resume',
}

const OPENING_MESSAGE = `Hey! I'm Sarah — I'll be your AI recruiter and career coach on the platform.

Before we get started, I want to learn a bit about you so everything here is actually useful to you. It'll just take a minute.

What's the main thing you're trying to accomplish right now — are you job hunting, negotiating an offer, going for a raise, or something else?`

export default function OnboardingPage() {
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: OPENING_MESSAGE }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)
  const [profile, setProfile] = useState<Record<string, string>>({})
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (!loading) inputRef.current?.focus()
  }, [loading])

  async function send(text?: string) {
    const content = (text ?? input).trim()
    if (!content || loading || complete) return
    const userMsg: Message = { role: 'user', content }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/onboarding-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      })
      const data = await res.json()

      if (!data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
        return
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
      if (data.profile) setProfile(data.profile)
      if (data.complete) setComplete(true)
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  async function finish() {
    if (Object.keys(profile).length > 0) {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          await supabase.from('profiles').upsert({
            id: user.id,
            onboarding_goal: profile.goal,
            onboarding_situation: profile.situation,
            onboarding_experience: profile.experience,
            onboarding_role: profile.role,
            onboarded_at: new Date().toISOString(),
          })
        }
      } catch {}
    }
    const dest = FIRST_STEPS[profile.goal ?? ''] ?? '/dashboard'
    router.push(dest)
  }

  function renderContent(text: string) {
    if (!text) return ''
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-background-secondary)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Top bar */}
      <div style={{
        padding: '20px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: '0.5px solid var(--color-border-tertiary)',
        background: '#fff',
      }}>
        <Image src="/logo.svg" alt="Hayven" width={140} height={42} style={{ objectFit: 'contain' }} priority />
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: 680, width: '100%', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 0 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 8 }}>
              {msg.role === 'assistant' && (
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Briefcase size={14} color="#fff" />
                </div>
              )}
              <div
                style={{
                  maxWidth: '78%',
                  background: msg.role === 'user' ? '#141414' : '#fff',
                  color: msg.role === 'user' ? '#fff' : 'var(--color-text-primary)',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  padding: '12px 16px', fontSize: 14, lineHeight: 1.65,
                  border: msg.role === 'assistant' ? '0.5px solid var(--color-border-tertiary)' : 'none',
                  boxShadow: msg.role === 'assistant' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                }}
                dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }}
              />
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Briefcase size={14} color="#fff" />
              </div>
              <div style={{
                background: '#fff', border: '0.5px solid var(--color-border-tertiary)',
                borderRadius: '18px 18px 18px 4px',
                padding: '12px 18px', display: 'flex', gap: 4, alignItems: 'center',
              }}>
                {[0, 1, 2].map(n => (
                  <div key={n} style={{
                    width: 6, height: 6, borderRadius: '50%', background: '#c4b5fd',
                    animation: 'pulse 1.2s ease-in-out infinite',
                    animationDelay: `${n * 0.2}s`,
                  }} />
                ))}
              </div>
            </div>
          )}

          {complete && !loading && (
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
              <button
                onClick={finish}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: '#141414', color: '#fff', border: 'none',
                  borderRadius: 10, padding: '13px 24px',
                  fontSize: 14, fontWeight: 600, cursor: 'pointer',
                }}
              >
                Let&apos;s get started <ArrowRight size={15} />
              </button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {!complete && (
          <div style={{ padding: '12px 0 28px' }}>
            <div style={{
              display: 'flex', gap: 8, alignItems: 'flex-end',
              background: '#fff',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 14, padding: '10px 12px',
              boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
            }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
                placeholder="Type your reply…"
                rows={1}
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  fontSize: 14, color: 'var(--color-text-primary)', resize: 'none',
                  lineHeight: 1.5, paddingTop: 2, fontFamily: 'inherit',
                }}
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff', border: 'none', borderRadius: 9,
                  width: 34, height: 34, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: !input.trim() || loading ? 0.4 : 1, flexShrink: 0,
                }}
              >
                <Send size={14} />
              </button>
            </div>
            <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)', textAlign: 'center', marginTop: 8 }}>
              Sarah will guide you — this takes about a minute.
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
