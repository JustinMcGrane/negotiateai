'use client'
import { useState, useRef, useEffect } from 'react'
import { ToolPage } from '@/components/negotiate/ToolPage'
import { Send } from 'lucide-react'

interface Message { role: 'user' | 'assistant'; content: string }

export default function InterviewCoach() {
  const [setup, setSetup] = useState({ role: '', target: '', stage: '' })
  const [started, setStarted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [turn, setTurn] = useState(0)
  const [tips, setTips] = useState<string[]>([])
  const chatRef = useRef<HTMLDivElement>(null)
  const MAX_TURNS = 5

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages, loading])

  const systemPrompt = `You are a recruiter conducting a real interview for a ${setup.role} role. The candidate's target salary range is ${setup.target}. Interview stage: ${setup.stage}.

For the first ${MAX_TURNS - 1} turns, ask realistic salary-related interview questions that recruiters actually ask. Be conversational. After the candidate's ${MAX_TURNS}th response, switch to coach mode: give 3 specific, actionable tips numbered 1-3 for how they handled salary questions in this conversation. Label this section clearly with "COACHING FEEDBACK:" on its own line.

Keep responses to 2-3 sentences. No stage directions. No quotes around your speech.`

  async function start() {
    if (!setup.role || !setup.target || !setup.stage) return
    setStarted(true)
    setLoading(true)
    const res = await fetch('/api/negotiate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [], systemPrompt }),
    })
    const data = await res.json()
    setMessages([{ role: 'assistant', content: data.reply }])
    setTurn(1)
    setLoading(false)
  }

  async function send() {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)

    const apiMessages = next.map((m) => ({ role: m.role, content: m.content }))
    const isLast = turn >= MAX_TURNS

    const res = await fetch('/api/negotiate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: apiMessages, systemPrompt: systemPrompt + (isLast ? '\n\nNow switch to COACHING FEEDBACK mode. Give 3 numbered tips.' : '') }),
    })
    const data = await res.json()
    const reply = data.reply as string
    const withReply = [...next, { role: 'assistant' as const, content: reply }]
    setMessages(withReply)

    if (isLast && reply.includes('COACHING FEEDBACK:')) {
      const parts = reply.split('COACHING FEEDBACK:')
      const tipLines = parts[1]?.match(/\d+\..+/g) || []
      setTips(tipLines.map((t) => t.replace(/^\d+\.\s*/, '')))
    }

    setTurn((t) => t + 1)
    setLoading(false)
  }

  const inp: React.CSSProperties = { height: 40, border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, padding: '0 12px', fontSize: 13, background: '#fff', width: '100%' }
  const lbl: React.CSSProperties = { fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }

  if (!started) return (
    <ToolPage title="Interview salary coach" desc="Practice answering salary questions with an AI interviewer, then get specific coaching feedback.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14, marginBottom: 20 }}>
        <div><div style={lbl}>ROLE</div><input style={inp} placeholder="Product Manager" value={setup.role} onChange={(e) => setSetup({ ...setup, role: e.target.value })} /></div>
        <div><div style={lbl}>TARGET RANGE</div><input style={inp} placeholder="$130K–$150K" value={setup.target} onChange={(e) => setSetup({ ...setup, target: e.target.value })} /></div>
        <div>
          <div style={lbl}>INTERVIEW STAGE</div>
          <select style={inp} value={setup.stage} onChange={(e) => setSetup({ ...setup, stage: e.target.value })}>
            <option value="">Select</option>
            {['Initial recruiter screen', 'Hiring manager interview', 'Final round', 'Post-offer negotiation'].map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>
      <button onClick={start} disabled={!setup.role || !setup.target || !setup.stage} style={{ height: 38, padding: '0 20px', background: '#141414', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, opacity: (!setup.role || !setup.target || !setup.stage) ? 0.4 : 1 }}>
        Start coaching session →
      </button>
    </ToolPage>
  )

  return (
    <div style={{ padding: '24px 32px 80px', maxWidth: 700 }}>
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 18, fontWeight: 500 }}>Interview salary coach</h1>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>Turn {Math.min(turn, MAX_TURNS)} of {MAX_TURNS} · {setup.role} · {setup.stage}</p>
      </div>

      <div ref={chatRef} style={{ minHeight: 300, maxHeight: 480, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16, padding: 16, background: 'var(--color-background-secondary)', borderRadius: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '80%', padding: '10px 14px', borderRadius: 10,
              background: m.role === 'user' ? '#141414' : '#fff',
              color: m.role === 'user' ? '#fff' : 'var(--color-text-primary)',
              fontSize: 13, lineHeight: 1.6,
              border: m.role === 'assistant' ? '0.5px solid var(--color-border-tertiary)' : 'none',
            }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', fontStyle: 'italic' }}>Thinking…</div>}
      </div>

      {tips.length > 0 && (
        <div style={{ marginBottom: 16, border: '0.5px solid rgba(15,110,86,0.3)', borderRadius: 10, padding: 16, background: '#F0FBF7' }}>
          <div style={{ fontSize: 11, color: 'var(--color-success)', marginBottom: 10 }}>COACHING FEEDBACK</div>
          {tips.map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 20, height: 20, background: 'var(--color-success)', color: '#fff', borderRadius: 4, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
              <div style={{ fontSize: 13, lineHeight: 1.6 }}>{tip}</div>
            </div>
          ))}
        </div>
      )}

      {turn <= MAX_TURNS && (
        <div style={{ display: 'flex', gap: 8 }}>
          <input style={{ flex: 1, height: 40, border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, padding: '0 12px', fontSize: 13, background: '#fff' }} placeholder="Your answer…" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); send() } }} disabled={loading} />
          <button onClick={send} disabled={loading || !input.trim()} style={{ width: 40, height: 40, background: '#141414', color: '#fff', border: 'none', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Send size={15} />
          </button>
        </div>
      )}
    </div>
  )
}
