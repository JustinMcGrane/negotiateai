'use client'

import { useEffect, useState } from 'react'

export function CookieConsent({ onConsent }: { onConsent: (granted: boolean) => void }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent')
    if (!stored) {
      setVisible(true)
    } else {
      onConsent(stored === 'granted')
    }
  }, [onConsent])

  function accept() {
    localStorage.setItem('cookie-consent', 'granted')
    onConsent(true)
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('cookie-consent', 'declined')
    onConsent(false)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
      background: '#fff', borderTop: '0.5px solid #e5e7eb',
      padding: '14px 24px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
      boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
    }}>
      <p style={{ margin: 0, fontSize: 13, color: '#475569', maxWidth: 600 }}>
        We use cookies and tracking technologies to improve your experience and measure performance.
        See our <a href="/privacy" style={{ color: '#4A90D9', textDecoration: 'none' }}>Privacy Policy</a>.
      </p>
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <button onClick={decline} style={{
          fontSize: 13, color: '#6b7280', background: 'transparent', border: '0.5px solid #d1d5db',
          borderRadius: 7, padding: '7px 16px', cursor: 'pointer',
        }}>Decline</button>
        <button onClick={accept} style={{
          fontSize: 13, fontWeight: 600, color: '#fff', background: '#141414',
          border: 'none', borderRadius: 7, padding: '7px 16px', cursor: 'pointer',
        }}>Accept</button>
      </div>
    </div>
  )
}
