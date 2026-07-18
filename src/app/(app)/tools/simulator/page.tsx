'use client'
import { useState, useRef, useEffect } from 'react'
import { PERSONAS } from '@/lib/personas'
import type { Persona } from '@/lib/personas'
import { Send, RotateCcw } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Message { role: 'user' | 'assistant' | 'system'; content: string }
interface Debrief {
  overallScore: number; confidenceScore: number; tacticsScore: number
  outcome: string; strengths: string[]; improvements: string[]; emailDraft: string
}

function scoreColor(s: number) {
  if (s >= 75) return 'var(--color-success)'
  if (s >= 55) return 'var(--color-warning)'
  return 'var(--color-danger)'
}

export default function Simulator() {
  const [stage, setStage] = useState<'setup' | 'chat' | 'debrief'>('setup')
  const [offerText, setOfferText] = useState('')
  const [parseLoading, setParseLoading] = useState(false)
  const [form, setForm] = useState({ role: '', offer: '', target: '', leverage: '' })
  const [persona, setPersona] = useState<Persona | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [turn, setTurn] = useState(0)
  const [chatLoading, setChatLoading] = useState(false)
  const [debrief, setDebrief] = useState<Debrief | null>(null)
  const [debriefLoading, setDebriefLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null))
  }, [])
  const [copied, setCopied] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  const MAX_TURNS = 6

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages, chatLoading])

  async function parseOffer() {
    if (!offerText.trim()) return
    setParseLoading(true)
    try {
      const res = await fetch('/api/parse-offer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: offerText }) })
      const data = await res.json()
      setForm((f) => ({
        role: data.role || f.role,
        offer: data.baseSalary ? String(data.baseSalary) : f.offer,
        target: f.target,
        leverage: f.leverage,
      }))
    } catch {}
    setParseLoading(false)
  }

  async function startSimulation() {
    if (!persona || !form.role || !form.offer || !form.target) return
    const systemPrompt = `${persona.systemPrompt}

The candidate is applying for: ${form.role}
The initial offer is: $${form.offer}
The candidate's target is: $${form.target}
${form.leverage ? `Candidate's leverage: ${form.leverage}` : ''}

Open the negotiation by extending the offer warmly and stating the base salary. Keep it to 2-3 sentences.`

    const openMsg: Message = { role: 'system', content: `Simulation started with ${persona.name} (${persona.company})` }
    setMessages([openMsg])
    setTurn(0)
    setStage('chat')
    setChatLoading(true)

    const res = await fetch('/api/negotiate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [], systemPrompt }),
    })
    const data = await res.json()
    setMessages([openMsg, { role: 'assistant', content: data.reply }])
    setTurn(1)
    setChatLoading(false)
  }

  async function sendMessage() {
    if (!input.trim() || chatLoading) return
    const userMsg: Message = { role: 'user', content: input }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    const newTurn = turn + 1

    if (newTurn >= MAX_TURNS) {
      await endSimulation(next)
      return
    }

    setChatLoading(true)
    const systemPrompt = `${persona!.systemPrompt}

Role: ${form.role}. Initial offer: $${form.offer}. Candidate target: $${form.target}.
This is turn ${newTurn} of ${MAX_TURNS}. ${newTurn === MAX_TURNS - 1 ? 'This is nearly the end — make a final decision or clear counteroffer.' : ''}`

    const apiMessages = next
      .filter((m) => m.role !== 'system')
      .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))

    const res = await fetch('/api/negotiate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: apiMessages, systemPrompt }),
    })
    const data = await res.json()
    const withReply = [...next, { role: 'assistant' as const, content: data.reply }]
    setMessages(withReply)
    setTurn(newTurn)
    setChatLoading(false)

    if (newTurn >= MAX_TURNS) await endSimulation(withReply)
  }

  async function endSimulation(msgs: Message[]) {
    setDebriefLoading(true)
    setStage('debrief')
    const transcript = msgs
      .filter((m) => m.role !== 'system')
      .map((m) => `${m.role === 'assistant' ? persona?.name : 'Candidate'}: ${m.content}`)
      .join('\n')

    const res = await fetch('/api/debrief', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript, role: form.role, offer: form.offer, target: form.target, personaLabel: persona?.name, userId }),
    })
    const data = await res.json()
    setDebrief(data)
    setDebriefLoading(false)
  }

  function reset() { setStage('setup'); setMessages([]); setTurn(0); setDebrief(null); setPersona(null) }

  const inp: React.CSSProperties = { height: 40, border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, padding: '0 12px', fontSize: 13, background: '#fff', width: '100%' }
  const lbl: React.CSSProperties = { fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }

  if (stage === 'setup') return (
    <div style={{ padding: '32px 32px 80px', maxWidth: 780 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 18, fontWeight: 500 }}>Negotiation simulator</h1>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>Practice a live negotiation with a realistic AI recruiter. Get a scored debrief after 6 turns.</p>
      </div>

      <div style={{ background: '#fff', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, padding: 24, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>Paste your offer letter (optional)</div>
        <textarea style={{ ...inp, height: 80, padding: '10px 12px', marginBottom: 10 }} placeholder="Paste offer letter text to auto-fill fields..." value={offerText} onChange={(e) => setOfferText(e.target.value)} />
        <button onClick={parseOffer} disabled={parseLoading || !offerText.trim()} style={{ height: 34, padding: '0 14px', background: 'transparent', border: '0.5px solid var(--color-border-primary)', borderRadius: 6, fontSize: 12, opacity: parseLoading ? 0.6 : 1 }}>
          {parseLoading ? 'Parsing…' : 'Parse offer'}
        </button>

        <div style={{ height: 1, background: 'var(--color-border-tertiary)', margin: '16px 0' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          <div><div style={lbl}>JOB TITLE</div><input style={inp} placeholder="Senior Engineer" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></div>
          <div><div style={lbl}>THEIR OFFER ($)</div><input type="number" style={inp} placeholder="130000" value={form.offer} onChange={(e) => setForm({ ...form, offer: e.target.value })} /></div>
          <div><div style={lbl}>YOUR TARGET ($)</div><input type="number" style={inp} placeholder="150000" value={form.target} onChange={(e) => setForm({ ...form, target: e.target.value })} /></div>
          <div><div style={lbl}>LEVERAGE</div><input style={inp} placeholder="Competing offer, market data..." value={form.leverage} onChange={(e) => setForm({ ...form, leverage: e.target.value })} /></div>
        </div>
      </div>

      <div style={{ background: '#fff', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, padding: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>Choose your recruiter</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
          {PERSONAS.map((p) => (
            <button key={p.id} onClick={() => setPersona(p)} style={{
              background: persona?.id === p.id ? p.bgColor : '#fff',
              border: persona?.id === p.id ? `1.5px solid ${p.fgColor}` : '0.5px solid var(--color-border-tertiary)',
              borderRadius: 10, padding: 14, cursor: 'pointer', textAlign: 'left',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, background: p.bgColor, border: `1px solid ${p.fgColor}30`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 500, color: p.fgColor }}>
                  {p.initials}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>{p.company}</div>
                </div>
              </div>
              <div style={{ display: 'inline-block', background: p.bgColor, color: p.difficultyColor, fontSize: 10, padding: '2px 6px', borderRadius: 4 }}>{p.difficultyLabel}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={startSimulation} disabled={!persona || !form.role || !form.offer || !form.target} style={{
          height: 38, padding: '0 24px', background: '#141414', color: '#fff', border: 'none',
          borderRadius: 8, fontSize: 13, opacity: (!persona || !form.role || !form.offer || !form.target) ? 0.4 : 1,
        }}>
          Start simulation →
        </button>
      </div>
    </div>
  )

  if (stage === 'chat') return (
    <div style={{ padding: '24px 32px', maxWidth: 700, height: 'calc(100vh - 0px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: persona!.bgColor, border: `1px solid ${persona!.fgColor}30`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 500, color: persona!.fgColor }}>
            {persona!.initials}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{persona!.name}</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>{persona!.title} · {persona!.company}</div>
          </div>
          <div style={{ marginLeft: 8, padding: '2px 8px', background: persona!.bgColor, color: persona!.difficultyColor, fontSize: 11, borderRadius: 4 }}>{persona!.difficultyLabel}</div>
          <div style={{ padding: '2px 8px', background: 'var(--color-background-secondary)', fontSize: 11, borderRadius: 4 }}>${parseInt(form.offer).toLocaleString()}</div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>Turn {turn} of {MAX_TURNS}</div>
      </div>

      <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 16 }}>
        {messages.map((m, i) => {
          if (m.role === 'system') return (
            <div key={i} style={{ textAlign: 'center', fontSize: 11, color: 'var(--color-text-tertiary)', fontStyle: 'italic' }}>{m.content}</div>
          )
          const isUser = m.role === 'user'
          return (
            <div key={i} style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '75%', padding: '10px 14px', borderRadius: 10,
                background: isUser ? '#141414' : 'var(--color-background-secondary)',
                color: isUser ? '#fff' : 'var(--color-text-primary)',
                fontSize: 13, lineHeight: 1.6,
              }}>
                {m.content}
              </div>
            </div>
          )
        })}
        {chatLoading && (
          <div style={{ display: 'flex', gap: 4, padding: '10px 14px', background: 'var(--color-background-secondary)', borderRadius: 10, width: 'fit-content' }}>
            {[0,1,2].map((i) => <div key={i} style={{ width: 6, height: 6, background: 'var(--color-text-tertiary)', borderRadius: '50%', animation: `typing-bounce 1s ease-in-out ${i * 0.2}s infinite` }} />)}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, paddingTop: 12, borderTop: '0.5px solid var(--color-border-tertiary)' }}>
        <input
          style={{ flex: 1, height: 40, border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, padding: '0 12px', fontSize: 13, background: '#fff' }}
          placeholder="Your response…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
          disabled={chatLoading}
        />
        <button onClick={sendMessage} disabled={chatLoading || !input.trim()} style={{ width: 40, height: 40, background: '#141414', color: '#fff', border: 'none', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Send size={15} />
        </button>
      </div>

      <style>{`@keyframes typing-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }`}</style>
    </div>
  )

  return (
    <div style={{ padding: '32px 32px 80px', maxWidth: 780 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 500 }}>Negotiation debrief</h1>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>Here&apos;s how your negotiation with {persona?.name} went.</p>
        </div>
        <button onClick={reset} style={{ display: 'flex', alignItems: 'center', gap: 6, height: 34, padding: '0 12px', background: 'transparent', border: '0.5px solid var(--color-border-primary)', borderRadius: 6, fontSize: 12 }}>
          <RotateCcw size={12} /> Practice again
        </button>
      </div>

      {debriefLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[1,2,3,4].map((i) => <div key={i} className="skeleton" style={{ height: 80 }} />)}
        </div>
      ) : debrief ? (
        <div className="animate-slide-up">
          <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
            {([['Overall', debrief.overallScore], ['Confidence', debrief.confidenceScore], ['Tactics', debrief.tacticsScore]] as [string, number][]).map(([label, score]) => (
              <div key={label} style={{ flex: 1, minWidth: 120, background: 'var(--color-background-secondary)', borderRadius: 8, padding: '16px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 500, color: scoreColor(score) }}>{score}</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ border: '0.5px solid var(--color-border-tertiary)', borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>OUTCOME</div>
            <div style={{ fontSize: 13, lineHeight: 1.7 }}>{debrief.outcome}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div style={{ border: '0.5px solid rgba(15,110,86,0.3)', borderRadius: 8, padding: 16, background: '#F0FBF7' }}>
              <div style={{ fontSize: 11, color: 'var(--color-success)', marginBottom: 10 }}>WHAT WORKED</div>
              {debrief.strengths.map((s, i) => <div key={i} style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 6, paddingLeft: 12, borderLeft: '2px solid var(--color-success)' }}>{s}</div>)}
            </div>
            <div style={{ border: '0.5px solid rgba(133,79,11,0.3)', borderRadius: 8, padding: 16, background: '#FEF9EF' }}>
              <div style={{ fontSize: 11, color: 'var(--color-warning)', marginBottom: 10 }}>WHAT TO IMPROVE</div>
              {debrief.improvements.map((s, i) => <div key={i} style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 6, paddingLeft: 12, borderLeft: '2px solid var(--color-warning)' }}>{s}</div>)}
            </div>
          </div>

          <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8 }}>COUNTER-OFFER EMAIL</div>
          <pre style={{ fontFamily: 'monospace', fontSize: 12, lineHeight: 1.7, whiteSpace: 'pre-wrap', background: 'var(--color-background-secondary)', borderRadius: 8, padding: 16, marginBottom: 16, border: '0.5px solid var(--color-border-tertiary)' }}>{debrief.emailDraft}</pre>

          <div style={{ background: '#141414', color: '#fff', borderRadius: 10, padding: 20, marginBottom: 20 }}>
            <div style={{ fontSize: 12, marginBottom: 12, opacity: 0.6 }}>Hayven · {form.role} negotiation with {persona?.name}</div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div><div style={{ fontSize: 24, fontWeight: 500, color: scoreColor(debrief.overallScore) }}>{debrief.overallScore}</div><div style={{ fontSize: 10, opacity: 0.6 }}>Overall</div></div>
              <div><div style={{ fontSize: 24, fontWeight: 500, color: scoreColor(debrief.confidenceScore) }}>{debrief.confidenceScore}</div><div style={{ fontSize: 10, opacity: 0.6 }}>Confidence</div></div>
              <div><div style={{ fontSize: 24, fontWeight: 500, color: scoreColor(debrief.tacticsScore) }}>{debrief.tacticsScore}</div><div style={{ fontSize: 10, opacity: 0.6 }}>Tactics</div></div>
            </div>
            <button onClick={() => { navigator.clipboard.writeText(`I just practiced salary negotiation on Hayven. Scores: ${debrief.overallScore} overall, ${debrief.confidenceScore} confidence, ${debrief.tacticsScore} tactics.`); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
              style={{ marginTop: 14, height: 32, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 6, fontSize: 12 }}>
              {copied ? 'Copied!' : 'Copy results'}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
