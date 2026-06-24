'use client'
import { useState, useEffect } from 'react'

const LOADING_STEPS = [
  'Checking market rates for your role...',
  'Comparing against salary data points...',
  'Building your negotiation strategy...',
]

type OfferAnalysis = {
  score: number
  verdict: 'below market' | 'at market' | 'above market'
  role: string
  company: string
  location: string
  baseSalary: number
  totalComp4yr: number
  marketMedian: number
  gap: number
  analysis: string
  negotiate: string[]
  strengths: string[]
}

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString()
}

function ScoreRing({ score }: { score: number }) {
  const r = 36
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  const color = score >= 70 ? '#10b981' : score >= 45 ? '#f59e0b' : '#ef4444'
  return (
    <svg width="96" height="96" viewBox="0 0 96 96">
      <circle cx="48" cy="48" r={r} fill="none" stroke="#f3f4f6" strokeWidth="8" />
      <circle
        cx="48" cy="48" r={r} fill="none"
        stroke={color} strokeWidth="8"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 48 48)"
      />
      <text x="48" y="53" textAnchor="middle" fontSize="20" fontWeight="700" fill="#111827">{score}</text>
    </svg>
  )
}

export default function AnalyzePage() {
  const [offerText, setOfferText] = useState('')
  const [loading, setLoading] = useState(false)
  const [stepIndex, setStepIndex] = useState(-1)
  const [result, setResult] = useState<OfferAnalysis | null>(null)
  const [error, setError] = useState('')

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

  const verdictColor = result?.verdict === 'above market'
    ? 'text-emerald-600 bg-emerald-50'
    : result?.verdict === 'below market'
    ? 'text-red-600 bg-red-50'
    : 'text-amber-600 bg-amber-50'

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
                <button
                  type="submit"
                  disabled={!offerText.trim()}
                  className="w-full py-4 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
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
                  <div
                    key={step}
                    className={`flex items-center gap-3 text-sm transition-all duration-500 ${
                      i <= stepIndex ? 'opacity-100' : 'opacity-20'
                    }`}
                  >
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

          {result && !loading && (
            <div className="space-y-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900">Your Offer Analysis</h2>
                <button
                  onClick={() => { setResult(null); setOfferText('') }}
                  className="text-xs text-gray-400 hover:text-gray-700 underline underline-offset-2"
                >
                  Analyze another
                </button>
              </div>

              {/* Score + verdict */}
              <div className="flex items-center gap-6 bg-gray-50 rounded-2xl p-6">
                <ScoreRing score={result.score} />
                <div>
                  <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-2 ${verdictColor}`}>
                    {result.verdict.toUpperCase()}
                  </span>
                  <p className="text-sm text-gray-600 leading-relaxed">{result.analysis}</p>
                </div>
              </div>

              {/* Key numbers */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Base Salary</p>
                  <p className="text-xl font-bold text-gray-900">{fmt(result.baseSalary)}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Market Median</p>
                  <p className="text-xl font-bold text-gray-900">{fmt(result.marketMedian)}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1">{result.gap > 0 ? 'Gap to Close' : 'Above Market'}</p>
                  <p className={`text-xl font-bold ${result.gap > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                    {fmt(Math.abs(result.gap))}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">4-Year Total Comp</p>
                <p className="text-2xl font-bold text-gray-900">{fmt(result.totalComp4yr)}</p>
              </div>

              {/* Negotiation points */}
              {result.negotiate?.length > 0 && (
                <div className="border border-gray-100 rounded-2xl p-5">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">What to negotiate</p>
                  <ul className="space-y-3">
                    {result.negotiate.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="w-5 h-5 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Strengths */}
              {result.strengths?.length > 0 && (
                <div className="border border-gray-100 rounded-2xl p-5">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Offer strengths</p>
                  <ul className="space-y-2">
                    {result.strengths.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="text-emerald-500 mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-center text-xs text-gray-400 pt-2">
                Want a full negotiation strategy?{' '}
                <a href="/recruiter" className="text-gray-700 font-medium underline underline-offset-2">Talk to Sarah, your AI recruiter →</a>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
