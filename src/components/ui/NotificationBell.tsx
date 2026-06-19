'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { trpc } from '@/utils/trpc'
import { createClient } from '@/lib/supabase/client'

function timeAgo(iso: string): string {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (secs < 60) return 'just now'
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`
  return `${Math.floor(secs / 86400)}d ago`
}

const TYPE_ICON: Record<string, string> = {
  task_assigned: '◈',
  task_overdue: '⚠',
  payment_due: '◆',
  member_joined: '◉',
  lesson_assigned: '◎',
}

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const utils = trpc.useUtils()

  const { data: notifications = [], isError: notifError } = trpc.notifications.list.useQuery(undefined, { retry: 0, throwOnError: false })
  const { data: unreadCount = 0 } = trpc.notifications.unreadCount.useQuery(undefined, { retry: 0, throwOnError: false })

  const markRead = trpc.notifications.markRead.useMutation({
    onSuccess: () => {
      utils.notifications.list.invalidate()
      utils.notifications.unreadCount.invalidate()
    },
  })
  const markAllRead = trpc.notifications.markAllRead.useMutation({
    onSuccess: () => {
      utils.notifications.list.invalidate()
      utils.notifications.unreadCount.invalidate()
    },
  })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel('notifications-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        () => {
          utils.notifications.list.invalidate()
          utils.notifications.unreadCount.invalidate()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [utils])

  if (notifError) {
    return (
      <button className="relative w-9 h-9 rounded-[10px] flex items-center justify-center text-c-text2 hover:bg-c-surface2 transition-all" aria-label="Notifications">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 1.5A5.25 5.25 0 0 0 3.75 6.75c0 3-1.5 4.5-2.25 5.25h15c-.75-.75-2.25-2.25-2.25-5.25A5.25 5.25 0 0 0 9 1.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
          <path d="M7.5 15a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </button>
    )
  }

  const handleClick = (n: typeof notifications[0]) => {
    if (!n.read) markRead.mutate({ id: n.id })
    setOpen(false)
    if (n.link) router.push(n.link)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative w-9 h-9 rounded-[10px] flex items-center justify-center text-c-text2 hover:bg-c-surface2 hover:text-c-text transition-all"
        aria-label="Notifications"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 1.5A5.25 5.25 0 0 0 3.75 6.75c0 3-1.5 4.5-2.25 5.25h15c-.75-.75-2.25-2.25-2.25-5.25A5.25 5.25 0 0 0 9 1.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
          <path d="M7.5 15a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-[3px] -right-[3px] min-w-[16px] h-4 bg-c-purple text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-11 w-[360px] bg-c-surface border border-c-border rounded-[16px] overflow-hidden z-50 animate-modal-in"
          style={{ boxShadow: '0 16px 48px rgba(30,27,58,0.16)' }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-c-border">
            <span className="text-[13px] font-semibold text-c-text">Notifications</span>
            {unreadCount > 0 && (
              <button
                onClick={() => markAllRead.mutate()}
                className="text-[11px] text-c-purple font-semibold hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-10 text-center">
                <div className="text-[28px] mb-2">🔔</div>
                <div className="text-[13px] text-c-text3">No notifications yet</div>
              </div>
            ) : (
              notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => handleClick(n)}
                  className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-c-surface2 transition-colors border-b border-c-border last:border-0 ${!n.read ? 'bg-c-purple-dd/40' : ''}`}
                >
                  <span className="text-[16px] mt-[1px] shrink-0 text-c-purple">
                    {TYPE_ICON[n.type] ?? '●'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-c-text leading-snug">{n.title}</div>
                    {n.body && <div className="text-[12px] text-c-text3 mt-[2px] leading-snug">{n.body}</div>}
                    <div className="text-[11px] text-c-text3 mt-1">{timeAgo(n.created_at)}</div>
                  </div>
                  {!n.read && (
                    <div className="w-2 h-2 rounded-full bg-c-purple shrink-0 mt-[5px]" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
