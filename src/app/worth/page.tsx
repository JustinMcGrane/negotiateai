'use client'
import { useState } from 'react'

type Result = {
  underpaid_by: number
  percentile: number
  market_range: { min: number; max: number }
}

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString()
}

export default function WorthPage() {
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch('/api/worth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, company, location, salary: Number(salary.replace(/[^0-9]/g, '')) }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Failed')
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  function getTweetText() {
    if (!result) return ''
    const diff = result.underpaid_by
    const rangeStr = `${fmt(result.market_range.min)}–${fmt(result.market_range.max)}`
    const diffStr = diff > 0 ? `I'm underpaid by ${fmt(diff)}.` : diff < 0 ? `I'm actually above market by ${fmt(Math.abs(diff))}.` : `I'm right at market rate.`
    return `I just checked my salary as a ${title} in ${location}. ${diffStr} Market range is ${rangeStr} (${result.percentile}th percentile). Check yours 👇`
  }

  function handleTweet() {
    const text = encodeURIComponent(getTweetText())
    const url = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://negotiateai.co/worth')
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }

  function handleCopy() {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const diff = result?.underpaid_by ?? 0
  const isUnder = diff > 0
  const isOver = diff < 0

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-sm font-semibold text-gray-900 tracking-tight">Hayven</a>
        <a href="/recruiter" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Try the full platform →</a>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start px-6 py-16">
        <div className="w-full max-w-lg">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">Are you paid what you're worth?</h1>
            <p className="text-gray-500 text-base">Enter your details and find out in seconds.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Senior Product Manager"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="e.g. Google"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Salary</label>
              <input
                value={salary}
                onChange={e => setSalary(e.target.value)}
                placeholder="e.g. 120000"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing...' : 'Check My Salary'}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-10">
              {/* Main result */}
              <div className={`rounded-2xl p-8 text-center mb-6 ${
                isUnder ? 'bg-red-50' : isOver ? 'bg-green-50' : 'bg-gray-50'
              }`}>
                <p className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-widest">
                  {isUnder ? 'Underpaid by' : isOver ? 'Above market by' : 'Right at market'}
                </p>
                {diff !== 0 && (
                  <p className={`text-6xl font-black mb-2 ${
                    isUnder ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {fmt(Math.abs(diff))}
                  </p>
                )}
                {diff === 0 && (
                  <p className="text-5xl font-black text-gray-700 mb-2">Right on target</p>
                )}
                <p className="text-gray-500 text-sm">You're at the <span className="font-semibold text-gray-800">{result.percentile}th percentile</span> for this role</p>
              </div>

              {/* Market range */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Market Range</p>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">25th percentile</p>
                    <p className="text-2xl font-bold text-gray-900">{fmt(result.market_range.min)}</p>
                  </div>
                  <div className="flex-1 mx-4 h-1.5 bg-gray-200 rounded-full relative">
                    <div
                      className="absolute top-0 h-1.5 bg-gray-900 rounded-full"
                      style={{
                        left: '0%',
                        width: `${Math.min(100, Math.max(0, result.percentile))}%`,
                      }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-900 rounded-full border-2 border-white shadow"
                      style={{ left: `calc(${Math.min(100, Math.max(0, result.percentile))}% - 6px)` }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">75th percentile</p>
                    <p className="text-2xl font-bold text-gray-900">{fmt(result.market_range.max)}</p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleTweet}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  Share on X
                </button>
                <button
                  onClick={handleCopy}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  {copied ? (
                    <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied!</>
                  ) : (
                    <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy Link</>
                  )}
                </button>
              </div>

              <p className="text-center text-xs text-gray-400 mt-6">
                Want to negotiate a raise or offer?{' '}
                <a href="/recruiter" className="text-gray-700 font-medium underline underline-offset-2">Try Hayven free →</a>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
