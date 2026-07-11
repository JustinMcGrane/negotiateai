'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

type Prefs = { checkin_emails: boolean; market_alert_emails: boolean }

export default function NotificationsPage() {
  const [prefs, setPrefs] = useState<Prefs>({ checkin_emails: true, market_alert_emails: true })
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUserId(user.id)
      const { data } = await supabase.from('profiles').select('checkin_emails, market_alert_emails').eq('id', user.id).single()
      if (data) {
        setPrefs({
          checkin_emails: data.checkin_emails ?? true,
          market_alert_emails: data.market_alert_emails ?? true,
        })
      }
      setLoading(false)
    }
    load()
  }, [])

  async function save() {
    if (!userId) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from('profiles').update(prefs).eq('id', userId)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      style={{
        width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
        background: value ? '#141414' : '#d1d5db',
        position: 'relative', transition: 'background 0.2s', flexShrink: 0,
      }}
    >
      <span style={{
        position: 'absolute', top: 2, left: value ? 22 : 2,
        width: 20, height: 20, borderRadius: '50%', background: '#fff',
        transition: 'left 0.2s',
      }} />
    </button>
  )

  if (loading) return <div style={{ padding: '32px 24px' }}><div className="skeleton" style={{ height: 120, borderRadius: 12 }} /></div>

  return (
    <div style={{ maxWidth: 580, margin: '0 auto', padding: '32px 24px 80px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 6px' }}>Email notifications</h1>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: '0 0 28px' }}>
        Control which emails you receive from NegotiateAI.
      </p>

      <div style={{ background: '#fff', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
        {[
          {
            key: 'checkin_emails' as const,
            title: 'Quarterly check-in reminders',
            desc: 'A reminder every 90 days to update your compensation picture and check in with Sarah.',
          },
          {
            key: 'market_alert_emails' as const,
            title: 'Weekly market alerts',
            desc: 'A weekly insight about compensation trends and market conditions for your role.',
          },
        ].map((item, i) => (
          <div key={item.key} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '18px 20px',
            borderBottom: i === 0 ? '0.5px solid var(--color-border-tertiary)' : 'none',
            gap: 16,
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 3 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
            <Toggle value={prefs[item.key]} onChange={v => setPrefs(p => ({ ...p, [item.key]: v }))} />
          </div>
        ))}
      </div>

      <button
        onClick={save}
        disabled={saving}
        style={{
          height: 40, padding: '0 20px',
          background: saved ? '#10b981' : '#141414',
          color: '#fff', border: 'none', borderRadius: 8,
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
          opacity: saving ? 0.6 : 1, transition: 'background 0.2s',
        }}
      >
        {saved ? '✓ Saved' : saving ? 'Saving…' : 'Save preferences'}
      </button>
    </div>
  )
}
