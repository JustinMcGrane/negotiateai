'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'

interface ToastItem {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

interface ToastContextValue {
  toast: (message: string, type?: ToastItem['type']) => void
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} })

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [counter, setCounter] = useState(0)

  const toast = useCallback((message: string, type: ToastItem['type'] = 'success') => {
    setCounter((c) => {
      const id = c + 1
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000)
      return id
    })
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-7 right-7 z-[200] flex flex-col gap-2">
        {toasts.map((t) => (
          <ToastItem key={t.id} {...t} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function ToastItem({ message, type }: ToastItem) {
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'
  const color =
    type === 'success' ? '#1A7A5E' : type === 'error' ? '#A33D1E' : '#1F68B3'

  return (
    <div
      className="bg-c-surface border border-c-border rounded-app px-5 py-[13px] text-[13px] font-medium text-c-text flex items-center gap-[9px] animate-[toastIn_.22s_cubic-bezier(.34,1.56,.64,1)]"
      style={{ boxShadow: '0 8px 32px rgba(101,88,211,.12)' }}
    >
      <span style={{ color, fontSize: 16 }}>{icon}</span>
      {message}
    </div>
  )
}
