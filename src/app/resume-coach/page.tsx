'use client'
import { useState, useRef } from 'react'
import { Send, Briefcase, Paperclip, X, FileText, Download } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

type Message = { role: 'user' | 'assistant'; content: string }

const RESUME_INTRO = `Hi! I'm Sarah. Upload your resume and I'll give you honest, specific feedback — what's working, what's not, and exactly how to fix it. I'll also tell you how it reads to an ATS and what recruiters will think when they see it.`

function renderContent(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />')
}

// Detect if a message contains a full resume rewrite
function looksLikeResume(text: string) {
  const markers = ['experience', 'education', 'skills', 'summary', 'work history']
  const lower = text.toLowerCase()
  return markers.filter(m => lower.includes(m)).length >= 3 && text.length > 500
}

export default function ResumeCoachPage() {
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: RESUME_INTRO }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [resumeText, setResumeText] = useState<string | null>(null)
  const [resumeFilename, setResumeFilename] = useState<string | null>(null)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [exportLoading, setExportLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function autoResize() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 120) + 'px'
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
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
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Got it — I've read your resume (${data.filename}). Give me a moment to go through it and I'll tell you exactly what I think.\n\nWhat's your target role? That helps me calibrate my feedback to what actually matters for the jobs you're going after.`,
      }])
    } catch {
      setUploadError('Something went wrong uploading your file. Please try again.')
    } finally {
      setUploadLoading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  async function send(text?: string) {
    const content = (text ?? input).trim()
    if (!content || loading) return

    const userMsg: Message = { role: 'user', content }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    if (textareaRef.current) textareaRef.current.style.height = 'auto'

    try {
      const resumeSystemNote = resumeText
        ? `The user has uploaded their resume. Here is the full text:\n---\n${resumeText}\n---\nFocus all feedback on the actual content of this resume. Be specific — quote lines that are weak, rewrite them with better versions. Check for: weak action verbs, missing metrics, vague bullets, ATS keyword gaps, formatting issues, summary quality, skills relevance. When you rewrite sections, format them clearly so the user can copy them.`
        : 'No resume uploaded yet. Encourage the user to upload their resume using the paperclip button so you can give specific feedback.'

      const res = await fetch('/api/recruiter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          contextNote: resumeSystemNote,
          ...(resumeText ? { resumeContext: resumeText } : {}),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I ran into an issue. Try again in a moment." }])
        return
      }
      const replyContent = data.content.replace(/\[ASSESSMENT_COMPLETE\][\s\S]*?\[\/ASSESSMENT_COMPLETE\]/, '').trim()
      setMessages(prev => [...prev, { role: 'assistant', content: replyContent }])
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Something went wrong. Please try again." }])
    } finally {
      setLoading(false)
    }
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
            <FileText size={11} color="#fff" />
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Sarah · Resume Coach</div>
        </div>
      </div>

      {/* Upload CTA when no resume yet */}
      {!resumeFilename && messages.length === 1 && (
        <div style={{ maxWidth: 720, width: '100%', margin: '24px auto 0', padding: '0 16px' }}>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadLoading}
            style={{
              width: '100%', padding: '20px', borderRadius: 12,
              border: '2px dashed rgba(102,126,234,0.4)',
              background: 'rgba(102,126,234,0.06)',
              color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            }}
          >
            <Paperclip size={22} color="#667eea" />
            <span style={{ fontSize: 14, fontWeight: 600 }}>{uploadLoading ? 'Reading your resume…' : 'Upload your resume to get started'}</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>PDF or DOCX · Google Docs: File → Download → PDF</span>
          </button>
        </div>
      )}

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 16px', maxWidth: 720, width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 24 }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: '78%' }}>
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
              {/* Export button for messages that look like full resume rewrites */}
              {msg.role === 'assistant' && looksLikeResume(msg.content) && (
                <button
                  onClick={() => exportPDF(msg.content)}
                  disabled={exportLoading}
                  style={{
                    alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 6,
                    background: 'rgba(102,126,234,0.15)', border: '1px solid rgba(102,126,234,0.3)',
                    borderRadius: 8, padding: '6px 12px', fontSize: 12, color: '#a5b4fc',
                    cursor: 'pointer', marginLeft: 0,
                  }}
                >
                  <Download size={12} />
                  {exportLoading ? 'Exporting…' : 'Export as PDF'}
                </button>
              )}
            </div>
          </div>
        ))}

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
              Sarah is reviewing…
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '12px 16px', paddingBottom: 'max(12px, env(safe-area-inset-bottom))', maxWidth: 720, width: '100%', margin: '0 auto' }}>
        {resumeFilename && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, background: 'rgba(102,126,234,0.15)', border: '1px solid rgba(102,126,234,0.3)', borderRadius: 8, padding: '6px 10px' }}>
            <FileText size={13} color="#667eea" />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', flex: 1 }}>{resumeFilename}</span>
            <button onClick={() => { setResumeText(null); setResumeFilename(null) }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 0, display: 'flex' }}>
              <X size={13} />
            </button>
          </div>
        )}
        {uploadError && (
          <div style={{ fontSize: 12, color: '#fca5a5', marginBottom: 8, textAlign: 'center' }}>{uploadError}</div>
        )}
        <input ref={fileInputRef} type="file" accept=".pdf,.docx" style={{ display: 'none' }} onChange={handleFileUpload} />
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
              background: 'none', border: 'none',
              color: resumeFilename ? '#667eea' : 'rgba(255,255,255,0.35)',
              cursor: 'pointer', padding: '4px 2px', display: 'flex', alignItems: 'center', flexShrink: 0,
              opacity: uploadLoading ? 0.5 : 1,
            }}
          >
            <Paperclip size={17} />
          </button>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => { setInput(e.target.value); autoResize() }}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder={resumeFilename ? 'Ask Sarah about your resume…' : 'Upload your resume or ask a question…'}
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
