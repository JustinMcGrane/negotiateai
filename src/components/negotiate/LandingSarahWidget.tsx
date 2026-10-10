'use client'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

function SarahAvatar({ size = 36 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.4, fontWeight: 700, color: '#fff',
    }}>S</div>
  )
}

function UserAvatar({ size = 36 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: 'linear-gradient(135deg, #0ea5e9 0%, #2952CC 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.4, fontWeight: 700, color: '#fff',
    }}>J</div>
  )
}

const chat = [
  { from: 'user', text: "I've been a Senior Engineer for 2 years. Making $118K in Austin. Is that good?" },
  { from: 'sarah', text: "Not quite. The market median for Senior Engineers in Austin is $141K. You're at the 28th percentile — that's a $23K gap.", highlight: true },
  { from: 'user', text: "Wow. I had no idea. What do I do?" },
  { from: 'sarah', text: "Here's your 3-step plan: anchor at $145K, justify with your on-call record, and counter any pushback with the market compensation data I pulled.", plan: true },
  { from: 'user', text: "I sent it. They came back with $138K 🎉" },
  { from: 'sarah', text: "That's $20K more per year. Nice work. Let's revisit in 6 months. 🚀", result: true },
]

// Delay before each message appears (ms)
const DELAYS = [400, 1200, 2800, 3800, 5600, 6400]

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
      <SarahAvatar size={28} />
      <div style={{
        borderRadius: '4px 14px 14px 14px', padding: '12px 14px',
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', gap: 4, alignItems: 'center',
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: '50%', background: '#64748b',
            animation: `typing-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
    </div>
  )
}

export function LandingSarahWidget() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [showTyping, setShowTyping] = useState(false)
  const [started, setStarted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const timers: ReturnType<typeof setTimeout>[] = []

    chat.forEach((msg, i) => {
      // Show typing indicator before Sarah messages
      if (msg.from === 'sarah') {
        timers.push(setTimeout(() => setShowTyping(true), DELAYS[i] - 900))
      }
      timers.push(setTimeout(() => {
        setShowTyping(false)
        setVisibleCount(i + 1)
        // Scroll chat to bottom
        requestAnimationFrame(() => {
          if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
        })
      }, DELAYS[i]))
    })

    return () => timers.forEach(clearTimeout)
  }, [started])

  return (
    <section id="meet-sarah" ref={sectionRef} style={{ background: '#0f172a', padding: '96px 40px', scrollMarginTop: 80 }} className="landing-section-pad">
      <style>{`
        @keyframes typing-bounce { 0%,100%{transform:translateY(0);opacity:0.4} 50%{transform:translateY(-4px);opacity:1} }
        @keyframes msg-in { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
      <div className="landing-sarah" style={{ maxWidth: 1040, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>

        {/* Left: Sarah pitch */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#7AB8E8', letterSpacing: '0.1em', marginBottom: 20 }}>MEET SARAH · YOUR AI CAREER COACH</div>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 18, letterSpacing: '-0.03em' }}>
            She&apos;ll help you earn<br /><span style={{ color: '#7AB8E8' }}>$20K more this year.</span>
          </h2>
          <p style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.75, marginBottom: 32 }}>
            Sarah knows the market rates, the negotiation scripts, and exactly what to say to your manager. She&apos;s available 24/7 and remembers every detail of your career.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
            {[
              'Pinpoints your exact salary gap in seconds',
              'Builds a personalized negotiation script',
              'Preps you for every manager objection',
              'Follows up and tracks your progress',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#cbd5e1' }}>
                <CheckCircle size={15} color="#7AB8E8" style={{ flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>

          <Link href="/signup" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#5865f2', color: '#fff', textDecoration: 'none',
            borderRadius: 10, padding: '13px 22px', fontSize: 14, fontWeight: 700,
            boxShadow: '0 4px 20px rgba(88,101,242,0.4)',
          }}>
            Talk to Sarah free <ArrowRight size={15} />
          </Link>
          <div style={{ fontSize: 12, color: '#475569', marginTop: 10 }}>No credit card required</div>
        </div>

        {/* Right: animated chat */}
        <div style={{ background: '#1e293b', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
          {/* Chat header */}
          <div style={{ background: '#0f172a', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <SarahAvatar size={32} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0', lineHeight: 1 }}>Sarah</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                <span style={{ fontSize: 11, color: '#64748b' }}>AI Career Coach · Online now</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={chatRef} style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 360, maxHeight: 420, overflowY: 'auto' }}>
            {chat.slice(0, visibleCount).map((msg, i) => {
              const isSarah = msg.from === 'sarah'
              return (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flexDirection: isSarah ? 'row' : 'row-reverse', animation: 'msg-in 0.35s ease both' }}>
                  {isSarah ? <SarahAvatar size={28} /> : <UserAvatar size={28} />}
                  <div style={{ maxWidth: '78%' }}>
                    <div style={{
                      borderRadius: isSarah ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                      padding: '10px 13px', fontSize: 13, lineHeight: 1.6,
                      color: isSarah ? '#e2e8f0' : '#fff',
                      background: msg.result
                        ? 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.08))'
                        : msg.highlight
                          ? 'rgba(239,68,68,0.12)'
                          : isSarah
                            ? 'rgba(255,255,255,0.06)'
                            : '#2952CC',
                      border: msg.result
                        ? '1px solid rgba(16,185,129,0.3)'
                        : msg.highlight
                          ? '1px solid rgba(239,68,68,0.25)'
                          : isSarah
                            ? '1px solid rgba(255,255,255,0.08)'
                            : 'none',
                    }}>
                      {msg.text}
                    </div>
                    {msg.plan && (
                      <div style={{ marginTop: 8, background: 'rgba(88,101,242,0.12)', border: '1px solid rgba(88,101,242,0.25)', borderRadius: 10, padding: '10px 12px' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: '#818cf8', letterSpacing: '0.06em', marginBottom: 6 }}>YOUR NEGOTIATION PLAN</div>
                        {['Anchor at $145K', 'Cite on-call contributions', 'Counter with verified market data'].map((step, si) => (
                          <div key={si} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: '#c7d2fe', marginBottom: si < 2 ? 4 : 0 }}>
                            <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(88,101,242,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#818cf8', flexShrink: 0 }}>{si + 1}</div>
                            {step}
                          </div>
                        ))}
                      </div>
                    )}
                    {msg.result && (
                      <div style={{ marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 20, padding: '4px 10px' }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#10b981' }}>+$20,000 / year secured</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
            {showTyping && <TypingIndicator />}
          </div>

          {/* CTA footer */}
          {visibleCount === chat.length && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '14px 16px', background: '#0f172a', display: 'flex', alignItems: 'center', gap: 10, animation: 'msg-in 0.4s ease both' }}>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '9px 14px', fontSize: 13, color: '#475569' }}>
                Ask Sarah about your salary…
              </div>
              <Link href="/signup" style={{
                background: '#5865f2', color: '#fff', borderRadius: 8, padding: '9px 16px',
                fontSize: 13, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap',
              }}>
                Try free →
              </Link>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
