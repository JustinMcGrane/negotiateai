'use client'
import { useState, useEffect, useRef } from 'react'

const LOADING_STEPS = [
  'Checking market rates for your role...',
  'Comparing against salary data points...',
  'Building your negotiation strategy...',
]

type DataPoint = { label: string; value: string }
type NegotiateItem = { lever: string; script: string; potential: string }

type Component =
  | { title: string; type: 'market'; summary: string; dataPoints: DataPoint[] }
  | { title: string; type: 'negotiate'; summary: string; items: NegotiateItem[] }
  | { title: string; type: 'strengths'; items: string[] }
  | { title: string; type: 'redflags'; items: string[] }

type OfferAnalysis = {
  score: number
  verdict: 'below market' | 'at market' | 'above market'
  role: string
  company: string
  location: string
  baseSalary: number
  marketMedian: number
  gap: number
  totalComp4yr: number
  moneyLeftOnTable: number
  components: Component[]
}

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString()
}

function ScoreCard({ score, verdict }: { score: number; verdict: string }) {
  const color = score >= 7 ? '#10b981' : score >= 4 ? '#f59e0b' : '#ef4444'
  const bg = score >= 7 ? 'bg-emerald-50' : score >= 4 ? 'bg-amber-50' : 'bg-red-50'
  const textColor = score >= 7 ? 'text-emerald-700' : score >= 4 ? 'text-amber-700' : 'text-red-700'
  const r = 32
  const circ = 2 * Math.PI * r
  const dash = (score / 10) * circ
  return (
    <div className="flex items-center gap-6 bg-gray-50 rounded-2xl p-6 border border-gray-100">
      <div className="flex-shrink-0">
        <svg width="88" height="88" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r={r} fill="none" stroke="#e5e7eb" strokeWidth="7" />
          <circle cx="44" cy="44" r={r} fill="none" stroke={color} strokeWidth="7"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" transform="rotate(-90 44 44)" />
          <text x="44" y="47" textAnchor="middle" fontSize="22" fontWeight="800" fill="#111827">{score}</text>
          <text x="44" y="59" textAnchor="middle" fontSize="9" fill="#9ca3af">out of 10</text>
        </svg>
      </div>
      <div>
        <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 ${bg} ${textColor}`}>
          {verdict.toUpperCase()}
        </span>
        <p className="text-sm text-gray-500">Overall offer score</p>
      </div>
    </div>
  )
}

function MarketComponent({ comp }: { comp: Extract<Component, { type: 'market' }> }) {
  return (
    <div className="border border-gray-100 rounded-2xl p-5 space-y-4">
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">{comp.title}</p>
        <p className="text-sm text-gray-700 leading-relaxed">{comp.summary}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {comp.dataPoints?.map((dp, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-0.5">{dp.label}</p>
            <p className="text-base font-bold text-gray-900">{dp.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function NegotiateComponent({ comp }: { comp: Extract<Component, { type: 'negotiate' }> }) {
  return (
    <div className="border border-gray-100 rounded-2xl p-5 space-y-4">
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">{comp.title}</p>
        <p className="text-sm text-gray-700 leading-relaxed">{comp.summary}</p>
      </div>
      <div className="space-y-3">
        {comp.items?.map((item, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-900">{item.lever}</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{item.potential}</span>
            </div>
            <p className="text-xs text-gray-500 italic">&ldquo;{item.script}&rdquo;</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function StrengthsComponent({ comp }: { comp: Extract<Component, { type: 'strengths' }> }) {
  return (
    <div className="border border-gray-100 rounded-2xl p-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">{comp.title}</p>
      <ul className="space-y-2">
        {comp.items?.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
            <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function RedFlagsComponent({ comp }: { comp: Extract<Component, { type: 'redflags' }> }) {
  if (!comp.items?.length) return null
  return (
    <div className="border border-red-100 rounded-2xl p-5 bg-red-50/40">
      <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-4">{comp.title}</p>
      <ul className="space-y-2">
        {comp.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
            <span className="text-red-400 mt-0.5 flex-shrink-0">⚠</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function renderComponent(comp: Component) {
  if (comp.type === 'market') return <MarketComponent comp={comp} />
  if (comp.type === 'negotiate') return <NegotiateComponent comp={comp} />
  if (comp.type === 'strengths') return <StrengthsComponent comp={comp} />
  if (comp.type === 'redflags') return <RedFlagsComponent comp={comp} />
  return null
}

function WhatIsIncludedModal({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])
  const items = [
    { icon: '📊', label: 'Full market rate breakdown with data points' },
    { icon: '🎯', label: 'Negotiation playbook with word-for-word scripts' },
    { icon: '💪', label: 'Offer strengths to leverage in your conversation' },
    { icon: '🚩', label: 'Red flags and missing terms to watch out for' },
    { icon: '💬', label: 'Unlimited offer analyses every month' },
  ]
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div ref={ref} className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold text-gray-900">What&apos;s included — $49/month</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-lg leading-none">&times;</button>
        </div>
        <ul className="space-y-4 mb-8">
          {items.map((item) => (
            <li key={item.label} className="flex items-start gap-3 text-sm text-gray-700">
              <span className="text-base flex-shrink-0">{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>
        <button onClick={onClose}
          className="w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition-colors">
          Got it
        </button>
      </div>
    </div>
  )
}

function AnalysisResults({ result, isUnlocked, onUnlock }: {
  result: OfferAnalysis
  isUnlocked: boolean
  onUnlock: () => Promise<void>
}) {
  const [showModal, setShowModal] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const components = result.components ?? []
  const firstComp = components[0]
  const lockedComps = components.slice(1)
  const hasLocked = lockedComps.length > 0 && !isUnlocked

  async function handleUnlock() {
    setCheckoutLoading(true)
    try {
      await onUnlock()
    } finally {
      setCheckoutLoading(false)
    }
  }

  return (
    <>
      {showModal && <WhatIsIncludedModal onClose={() => setShowModal(false)} />}
      <div className="space-y-4">
        <ScoreCard score={result.score} verdict={result.verdict} />
        {firstComp && renderComponent(firstComp)}
        {lockedComps.length > 0 && (
          <div className="relative">
            <div className="space-y-4"
              style={hasLocked ? { filter: 'blur(6px)', pointerEvents: 'none', userSelect: 'none' } : undefined}>
              {lockedComps.map((comp, i) => <div key={i}>{renderComponent(comp)}</div>)}
            </div>
            {hasLocked && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4 text-center">
                  <div className="text-3xl mb-3">🔒</div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Estimated money left on table</p>
                  <p className="text-4xl font-black text-gray-900 mb-1">{fmt(result.moneyLeftOnTable ?? result.gap ?? 0)}</p>
                  <p className="text-xs text-gray-400 mb-5">$49/month · cancel anytime</p>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    Unlock your full negotiation playbook, scripts, red flags, and offer strengths.
                  </p>
                  <button onClick={handleUnlock} disabled={checkoutLoading}
                    className="w-full py-3.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition-colors mb-3 disabled:opacity-50">
                    {checkoutLoading ? 'Redirecting...' : 'Unlock my analysis — $49/mo'}
                  </button>
                  <button onClick={() => setShowModal(true)}
                    className="w-full py-3 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">
                    See what&apos;s included
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default function AnalyzePage() {
  const [offerText, setOfferText] = useState('')
  const [loading, setLoading] = useState(false)
  const [stepIndex, setStepIndex] = useState(-1)
  const [result, setResult] = useState<OfferAnalysis | null>(null)
  const [error, setError] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [subChecked, setSubChecked] = useState(false)

  // Check subscription status on load
  useEffect(() => {
    async function checkSub() {
      try {
        // Unlocked via Stripe redirect
        const params = new URLSearchParams(window.location.search)
        if (params.get('unlocked') === '1') {
          setIsUnlocked(true)
          setSubChecked(true)
          return
        }
        // Check Supabase profile plan
        const res = await fetch('/api/subscription-status')
        const data = await res.json()
        if (data.subscribed) setIsUnlocked(true)
      } finally {
        setSubChecked(true)
      }
    }
    checkSub()
  }, [])

  useEffect(() => {
    if (!loading) return
    setStepIndex(0)
    const t1 = setTimeout(() => setStepIndex(1), 600)
    const t2 = setTimeout(() => setStepIndex(2), 1200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [loading])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!offerText.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offerText }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Analysis failed')
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
      setStepIndex(-1)
    }
  }

  async function handleUnlock() {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
        returnPath: '/analyze?unlocked=1',
      }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-sm font-semibold text-gray-900 tracking-tight">NegotiateAI</a>
        <a href="/recruiter" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Full platform →</a>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 py-16">
        <div className="w-full max-w-2xl">

          {!result && !loading && (
            <>
              <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">Analyze your offer</h1>
                <p className="text-gray-500 text-base">Paste your offer details below — salary, equity, bonus, role, location. The more detail, the better.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={offerText}
                  onChange={e => setOfferText(e.target.value)}
                  placeholder={`Paste your offer details here. For example:\n\nRole: Senior Product Manager\nCompany: Acme Corp (Series B)\nLocation: San Francisco, CA\nBase salary: $145,000\nAnnual bonus: 15% target\nEquity: 0.1% over 4 years\nStart date: August 2025`}
                  required
                  rows={12}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none leading-relaxed"
                />
                <button type="submit" disabled={!offerText.trim()}
                  className="w-full py-4 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  Analyze Offer
                </button>
              </form>
            </>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-32 gap-6">
              <div className="w-10 h-10 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
              <div className="flex flex-col gap-3 w-full max-w-sm">
                {LOADING_STEPS.map((step, i) => (
                  <div key={step} className={`flex items-center gap-3 text-sm transition-all duration-500 ${i <= stepIndex ? 'opacity-100' : 'opacity-20'}`}>
                    <div className={`w-4 h-4 rounded-full flex-shrink-0 transition-colors duration-300 ${
                      i < stepIndex ? 'bg-gray-900' : i === stepIndex ? 'bg-gray-400 animate-pulse' : 'bg-gray-200'
                    }`} />
                    <span className={i <= stepIndex ? 'text-gray-800' : 'text-gray-400'}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && !loading && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm text-center">
              {error}
              <button onClick={() => setError('')} className="block mx-auto mt-3 text-red-400 underline text-xs">Try again</button>
            </div>
          )}

          {result && !loading && subChecked && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-900">Your Offer Analysis</h2>
                <button onClick={() => { setResult(null); setOfferText('') }}
                  className="text-xs text-gray-400 hover:text-gray-700 underline underline-offset-2">
                  Analyze another
                </button>
              </div>
              <AnalysisResults result={result} isUnlocked={isUnlocked} onUnlock={handleUnlock} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
