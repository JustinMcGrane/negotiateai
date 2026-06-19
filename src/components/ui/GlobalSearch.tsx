'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { trpc } from '@/utils/trpc'

type Result = {
  id: string
  type: 'task' | 'post' | 'member' | 'payment'
  title: string
  subtitle: string
  link: string
  icon: string
}

const TYPE_COLOR: Record<Result['type'], string> = {
  task: '#6558D3',
  post: '#1A7A5E',
  member: '#E09830',
  payment: '#1F68B3',
}

const TYPE_LABEL: Record<Result['type'], string> = {
  task: 'Task',
  post: 'Post',
  member: 'Team',
  payment: 'Payment',
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const { data: tasks = [] } = trpc.tasks.list.useQuery()
  const { data: posts = [] } = trpc.posts.list.useQuery()
  const { data: team = [] } = trpc.team.list.useQuery()
  const { data: payments = [] } = trpc.payments.list.useQuery()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
        setQuery('')
        setSelected(0)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  const results: Result[] = query.trim().length < 1 ? [] : [
    ...tasks
      .filter((t) => t.title.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 4)
      .map((t) => ({
        id: t.id,
        type: 'task' as const,
        title: t.title,
        subtitle: `${t.status} · ${t.priority} priority`,
        link: '/tasks',
        icon: '◈',
      })),
    ...posts
      .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 3)
      .map((p) => ({
        id: p.id,
        type: 'post' as const,
        title: p.title,
        subtitle: `${p.platform ?? 'No platform'} · ${p.status}`,
        link: '/calendar',
        icon: '◫',
      })),
    ...team
      .filter((m) => m.name.toLowerCase().includes(query.toLowerCase()) || m.email.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 3)
      .map((m) => ({
        id: m.id,
        type: 'member' as const,
        title: m.name,
        subtitle: `${m.role} · ${m.email}`,
        link: '/team',
        icon: '◉',
      })),
    ...payments
      .filter((p) => p.description.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 3)
      .map((p) => ({
        id: p.id,
        type: 'payment' as const,
        title: p.description,
        subtitle: `$${p.amount} · ${p.status}`,
        link: '/payments',
        icon: '◆',
      })),
  ]

  const navigate = useCallback((result: Result) => {
    router.push(result.link)
    setOpen(false)
    setQuery('')
  }, [router])

  useEffect(() => {
    setSelected(0)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => Math.min(s + 1, results.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)) }
    if (e.key === 'Enter' && results[selected]) navigate(results[selected])
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      style={{ background: 'rgba(30,27,58,0.4)', backdropFilter: 'blur(4px)' }}
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-[560px] bg-c-surface rounded-[18px] overflow-hidden animate-modal-in"
        style={{ boxShadow: '0 32px 80px rgba(30,27,58,0.22)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-c-border">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-c-text3 shrink-0">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search tasks, posts, team members, payments…"
            className="flex-1 bg-transparent text-[14px] text-c-text placeholder-c-text3 outline-none"
          />
          <kbd className="text-[11px] text-c-text3 bg-c-surface2 border border-c-border rounded-[6px] px-[6px] py-[2px] font-mono shrink-0">ESC</kbd>
        </div>

        {query.trim().length > 0 && (
          <div className="max-h-[360px] overflow-y-auto py-2">
            {results.length === 0 ? (
              <div className="py-8 text-center text-[13px] text-c-text3">No results for &ldquo;{query}&rdquo;</div>
            ) : (
              results.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => navigate(r)}
                  className={`w-full text-left flex items-center gap-3 px-4 py-[10px] transition-colors ${i === selected ? 'bg-c-surface2' : 'hover:bg-c-surface2'}`}
                >
                  <span
                    className="w-7 h-7 rounded-[8px] flex items-center justify-center text-white text-[13px] shrink-0"
                    style={{ background: TYPE_COLOR[r.type] }}
                  >
                    {r.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-c-text truncate">{r.title}</div>
                    <div className="text-[11px] text-c-text3 truncate">{r.subtitle}</div>
                  </div>
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wide px-2 py-[2px] rounded-full shrink-0"
                    style={{ background: TYPE_COLOR[r.type] + '18', color: TYPE_COLOR[r.type] }}
                  >
                    {TYPE_LABEL[r.type]}
                  </span>
                </button>
              ))
            )}
          </div>
        )}

        {query.trim().length === 0 && (
          <div className="py-6 text-center text-[13px] text-c-text3">
            Start typing to search across your workspace
          </div>
        )}

        <div className="px-4 py-2 border-t border-c-border flex items-center gap-4 text-[11px] text-c-text3">
          <span><kbd className="font-mono bg-c-surface2 border border-c-border rounded px-1">↑↓</kbd> navigate</span>
          <span><kbd className="font-mono bg-c-surface2 border border-c-border rounded px-1">↵</kbd> open</span>
          <span><kbd className="font-mono bg-c-surface2 border border-c-border rounded px-1">esc</kbd> close</span>
        </div>
      </div>
    </div>
  )
}
