'use client'
import { useState, useRef, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Send, Briefcase, ArrowRight, Paperclip, X, FileText, Download, BookmarkCheck, ClipboardList } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

type Message = { role: 'user' | 'assistant'; content: string }

function looksLikeResume(text: string) {
  const markers = ['experience', 'education', 'skills', 'summary', 'work history']
  const lower = text.toLowerCase()
  return markers.filter(m => lower.includes(m)).length >= 3 && text.length > 500
}

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
  const [resumeText, setResumeText] = useState<string | null>(null)
  const [resumeFilename, setResumeFilename] = useState<string | null>(null)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [exportLoading, setExportLoading] = useState(false)
  const [savedIds, setSavedIds] = useState<Record<number, string>>({})
  const [uploadCount, setUploadCount] = useState(0)
  const [isPro, setIsPro] = useState(false)
  const [jobDescription, setJobDescription] = useState('')
  const [showJobInput, setShowJobInput] = useState(false)
  const [jobDescriptionSaved, setJobDescriptionSaved] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/subscription-status').then(r => r.json()).then(d => setIsPro(!!d.subscribed)).catch(() => {})
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!isPro && uploadCount >= 1) {
      setUploadError('Free accounts can upload 1 resume. Upgrade to Pro for unlimited uploads.')
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    setUploadLoading(true)
    setUploadError(null)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/parse-resume', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) {
        setUploadError(data.error ?? 'Failed to read file.')
        return
      }
      setResumeText(data.text)
      setResumeFilename(data.filename)
      setUploadCount(c => c + 1)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `I've read your resume (${data.filename}). I can see your experience, skills, and background. What would you like help with — feedback on how it reads, rewriting specific sections, ATS optimization, or something else?`,
      }])
    } catch {
      setUploadError('Something went wrong. Please try again.')
    } finally {
      setUploadLoading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  async function saveResume(content: string, msgIndex: number) {
    try {
      const res = await fetch('/api/save-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          title: resumeFilename ? `Resume – ${resumeFilename.replace(/\.[^.]+$/, '')}` : 'Resume',
        }),
      })
      if (res.ok) {
        const data = await res.json()
        setSavedIds(prev => ({ ...prev, [msgIndex]: data.id }))
      }
    } catch {}
  }

  async function exportPDF(content: string) {
    setExportLoading(true)
    try {
      const res = await fetch('/api/export-resume-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })
      if (!res.ok) throw new Error('Export failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'resume-hayven.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      alert('PDF export failed. Please try again.')
    } finally {
      setExportLoading(false)
    }
  }

  function autoResize() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 120) + 'px'
  }

  async function send(text?: string) {
    const content = (text ?? input).trim()
    if (!content || loading) return

    const userMsg: Message = { role: 'user', content }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    if (textareaRef.current) { textareaRef.current.style.height = 'auto' }

    const newCount = userMessageCount + 1
    setUserMessageCount(newCount)

    try {
      const jobContext = jobDescriptionSaved
        ? `\n\nThe user has provided a job description they are targeting:\n---\n${jobDescriptionSaved}\n---\nWhen reviewing their resume or giving advice, compare it directly against this job description. Identify: (1) keywords and skills in the job description missing from their resume, (2) experiences they have that map well to the role, (3) specific bullets they should rewrite to better match this role. Be specific — quote lines from both the job description and their resume.`
        : ''
      const combinedContext = [worthContext?.systemContext, jobContext].filter(Boolean).join('\n\n')

      const res = await fetch('/api/recruiter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          ...(combinedContext ? { contextNote: combinedContext } : {}),
          ...(resumeText ? { resumeContext: resumeText } : {}),
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

      setMessages(prev => {
        const next = [...prev, { role: 'assistant' as const, content: replyContent }]
        if (looksLikeResume(replyContent)) {
          saveResume(replyContent, next.length - 1)
        }
        return next
      })

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
            <div style={{ maxWidth: '78%', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div
                style={{
                  background: msg.role === 'user' ? '#667eea' : 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  padding: '12px 16px', fontSize: 14, lineHeight: 1.65,
                  border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                }}
                dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }}
              />
              {msg.role === 'assistant' && looksLikeResume(msg.content) && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => exportPDF(msg.content)}
                    disabled={exportLoading}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      background: 'rgba(102,126,234,0.2)', border: '1px solid rgba(102,126,234,0.4)',
                      borderRadius: 8, padding: '6px 12px', fontSize: 12, color: '#a5b4fc',
                      cursor: 'pointer', opacity: exportLoading ? 0.5 : 1,
                    }}
                  >
                    <Download size={12} />
                    {exportLoading ? 'Exporting…' : 'Export as PDF'}
                  </button>
                  {savedIds[i] && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#4ade80' }}>
                      <BookmarkCheck size={12} />
                      Saved
                    </div>
                  )}
                </div>
              )}
            </div>
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
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '12px 16px', paddingBottom: 'max(12px, env(safe-area-inset-bottom))', maxWidth: 720, width: '100%', margin: '0 auto' }}>
        {/* Resume badge */}
        {resumeFilename && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, background: 'rgba(102,126,234,0.15)', border: '1px solid rgba(102,126,234,0.3)', borderRadius: 8, padding: '6px 10px' }}>
            <FileText size={13} color="#667eea" />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', flex: 1 }}>{resumeFilename}</span>
            <button onClick={() => { setResumeText(null); setResumeFilename(null) }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 0, display: 'flex' }}>
              <X size={13} />
            </button>
          </div>
        )}
        {jobDescriptionSaved && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 8, padding: '6px 10px' }}>
            <ClipboardList size={13} color="#4ade80" />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', flex: 1 }}>Job description added</span>
            <button onClick={() => { setJobDescriptionSaved(''); setJobDescription('') }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 0, display: 'flex' }}>
              <X size={13} />
            </button>
          </div>
        )}
        {showJobInput && (
          <div style={{ marginBottom: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: 10 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>Paste job description — Sarah will compare your resume against it</div>
            <textarea
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              placeholder="Paste the full job posting here…"
              rows={5}
              style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: '#fff', resize: 'none', lineHeight: 1.5, boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button
                onClick={() => { if (jobDescription.trim()) { setJobDescriptionSaved(jobDescription.trim()); setShowJobInput(false) } }}
                disabled={!jobDescription.trim()}
                style={{ fontSize: 12, padding: '6px 14px', borderRadius: 7, background: '#667eea', color: '#fff', border: 'none', cursor: 'pointer', opacity: jobDescription.trim() ? 1 : 0.4 }}
              >
                Save
              </button>
              <button onClick={() => { setShowJobInput(false); setJobDescription('') }} style={{ fontSize: 12, padding: '6px 14px', borderRadius: 7, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', border: 'none', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        )}
        {uploadError && (
          <div style={{ fontSize: 12, color: '#fca5a5', marginBottom: 8, textAlign: 'center' }}>{uploadError}</div>
        )}
        <input ref={fileInputRef} type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" style={{ display: 'none' }} onChange={handleFileUpload} />
        <div style={{
          display: 'flex', gap: 8, alignItems: 'flex-end',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 12, padding: '8px 12px',
        }}>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadLoading}
            title="Upload resume (PDF or DOCX)"
            style={{
              background: 'none', border: 'none', color: resumeFilename ? '#667eea' : 'rgba(255,255,255,0.35)',
              cursor: 'pointer', padding: '4px 2px', display: 'flex', alignItems: 'center', flexShrink: 0,
              opacity: uploadLoading ? 0.5 : 1,
            }}
          >
            <Paperclip size={17} />
          </button>
          <button
            onClick={() => setShowJobInput(v => !v)}
            title="Add job description"
            style={{
              background: 'none', border: 'none', color: jobDescriptionSaved ? '#4ade80' : 'rgba(255,255,255,0.35)',
              cursor: 'pointer', padding: '4px 2px', display: 'flex', alignItems: 'center', flexShrink: 0,
            }}
          >
            <ClipboardList size={17} />
          </button>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => { setInput(e.target.value); autoResize() }}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder={resumeFilename ? 'Ask Sarah about your resume…' : 'Ask Sarah anything…'}
            rows={1}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontSize: 16, color: '#fff', resize: 'none', lineHeight: 1.5, paddingTop: 4,
              overflowY: 'hidden', maxHeight: 120,
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
