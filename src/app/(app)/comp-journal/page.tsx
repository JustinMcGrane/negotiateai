'use client'
import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'

type EntryType = 'salary' | 'raise' | 'bonus' | 'equity' | 'new_job'
type Entry = {
  id: string
  date: string
  base: number
  bonus?: number
  equity_value?: number
  type: EntryType
  notes?: string
}

const TYPE_CONFIG: Record<EntryType, { label: string; color: string }> = {
  salary:   { label: 'Base salary',  color: '#2563eb' },
  raise:    { label: 'Raise',        color: '#059669' },
  bonus:    { label: 'Bonus',        color: '#d97706' },
  equity:   { label: 'Equity grant', color: '#7c3aed' },
  new_job:  { label: 'New job',      color: '#dc2626' },
}

function fmt(n: number) { return `$${n.toLocaleString()}` }
function fmtK(n: number) { return n >= 1000 ? `$${Math.round(n / 1000)}k` : fmt(n) }

export default function CompJournalPage() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ date: new Date().toISOString().slice(0, 10), base: '', bonus: '', equity_value: '', type: 'salary' as EntryType, notes: '' })
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/comp-journal').then(r => r.json()).then(d => {
      setEntries(d.entries || [])
      setLoading(false)
    })
  }, [])

  async function add() {
    if (!form.base) return
    setSaving(true)
    const res = await fetch('/api/comp-journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const d = await res.json()
    if (d.entry) {
      setEntries(prev => [...prev, d.entry].sort((a, b) => a.date.localeCompare(b.date)))
      setForm({ date: new Date().toISOString().slice(0, 10), base: '', bonus: '', equity_value: '', type: 'salary', notes: '' })
      setShowForm(false)
    }
    setSaving(false)
  }

  async function remove(id: string) {
    await fetch('/api/comp-journal', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  const inp: React.CSSProperties = {
    width: '100%', height: 38, padding: '0 12px', fontSize: 13,
    border: '0.5px solid var(--color-border-secondary)', borderRadius: 7,
    background: '#fff', boxSizing: 'border-box' as const,
  }

  // Calculate growth
  const salaryEntries = entries.filter(e => e.type === 'salary' || e.type === 'raise' || e.type === 'new_job')
  const firstBase = salaryEntries[0]?.base
  const lastBase = salaryEntries[salaryEntries.length - 1]?.base
  const totalGrowth = firstBase && lastBase && firstBase !== lastBase
    ? Math.round(((lastBase - firstBase) / firstBase) * 100)
    : null

  const totalComp = (e: Entry) => e.base + (e.bonus || 0) + (e.equity_value || 0)

  // Simple chart — bar heights relative to max base
  const maxBase = Math.max(...entries.map(e => e.base), 1)

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px 80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>Compensation Journal</h1>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: 0 }}>Log every raise, bonus, and grant. Watch your growth over time.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ display: 'flex', alignItems: 'center', gap: 6, height: 38, padding: '0 16px', background: '#141414', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          <Plus size={14} /> Log entry
        </button>
      </div>

      {/* Summary stats */}
      {entries.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 28 }}>
          <div style={{ background: 'var(--color-background-secondary)', borderRadius: 10, padding: '16px 18px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{fmtK(lastBase || 0)}</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>Current base</div>
          </div>
          {totalGrowth !== null && (
            <div style={{ background: totalGrowth > 0 ? '#ecfdf5' : 'var(--color-background-secondary)', borderRadius: 10, padding: '16px 18px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: totalGrowth > 0 ? '#059669' : 'inherit' }}>{totalGrowth > 0 ? '+' : ''}{totalGrowth}%</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>Total growth</div>
            </div>
          )}
          <div style={{ background: 'var(--color-background-secondary)', borderRadius: 10, padding: '16px 18px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{entries.length}</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>Events logged</div>
          </div>
          <div style={{ background: 'var(--color-background-secondary)', borderRadius: 10, padding: '16px 18px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{fmtK(totalComp(entries[entries.length - 1]))}</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>Total comp</div>
          </div>
        </div>
      )}

      {/* Bar chart */}
      {entries.length > 1 && (
        <div style={{ background: '#fff', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Base salary over time</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100 }}>
            {entries.filter(e => e.base).map((e, i) => (
              <div key={e.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: 9, color: 'var(--color-text-tertiary)', textAlign: 'center' }}>{fmtK(e.base)}</div>
                <div style={{
                  width: '100%',
                  background: i === entries.length - 1 ? '#141414' : '#e5e7eb',
                  height: `${Math.round((e.base / maxBase) * 100)}%`,
                  borderRadius: '3px 3px 0 0',
                  minHeight: 4,
                }} />
                <div style={{ fontSize: 9, color: 'var(--color-text-tertiary)', textAlign: 'center' }}>{e.date.slice(0, 7)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div style={{ background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Log a compensation event</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>DATE</div>
              <input type="date" style={inp} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>TYPE</div>
              <select style={inp} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as EntryType }))}>
                {(Object.entries(TYPE_CONFIG) as [EntryType, { label: string }][]).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>BASE SALARY ($)</div>
              <input type="number" style={inp} placeholder="130000" value={form.base} onChange={e => setForm(f => ({ ...f, base: e.target.value }))} required />
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>BONUS ($)</div>
              <input type="number" style={inp} placeholder="15000" value={form.bonus} onChange={e => setForm(f => ({ ...f, bonus: e.target.value }))} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>EQUITY VALUE ($)</div>
              <input type="number" style={inp} placeholder="50000" value={form.equity_value} onChange={e => setForm(f => ({ ...f, equity_value: e.target.value }))} />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>NOTES</div>
            <input style={inp} placeholder="Promoted to Senior, switched to Stripe, got 8% raise..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={add} disabled={!form.base || saving} style={{ height: 36, padding: '0 16px', background: '#141414', color: '#fff', border: 'none', borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: 'pointer', opacity: !form.base || saving ? 0.5 : 1 }}>
              {saving ? 'Saving…' : 'Save entry'}
            </button>
            <button onClick={() => setShowForm(false)} style={{ height: 36, padding: '0 14px', background: 'transparent', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 7, fontSize: 13, cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Entry list */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 68, borderRadius: 10 }} />)}
        </div>
      ) : entries.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 24px', background: 'var(--color-background-secondary)', borderRadius: 12 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📈</div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Start your compensation history</div>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: '0 0 20px', lineHeight: 1.6 }}>
            Log your current salary, past raises, and bonuses. The longer you track, the more powerful your history becomes.
          </p>
          <button onClick={() => setShowForm(true)} style={{ height: 38, padding: '0 20px', background: '#141414', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Log first entry →
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[...entries].reverse().map((entry) => {
            const cfg = TYPE_CONFIG[entry.type]
            return (
              <div key={entry.id} style={{ background: '#fff', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 10, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: cfg.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{fmt(entry.base)}</span>
                    {entry.bonus ? <span style={{ fontSize: 12, color: '#d97706' }}>+{fmtK(entry.bonus)} bonus</span> : null}
                    {entry.equity_value ? <span style={{ fontSize: 12, color: '#7c3aed' }}>+{fmtK(entry.equity_value)} equity</span> : null}
                    <span style={{ fontSize: 12, background: '#f3f4f6', color: cfg.color, borderRadius: 4, padding: '2px 6px', fontWeight: 500 }}>{cfg.label}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginTop: 2 }}>
                    {new Date(entry.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    {entry.notes ? ` · ${entry.notes}` : ''}
                  </div>
                </div>
                <button onClick={() => remove(entry.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary)', padding: 4, display: 'flex' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
