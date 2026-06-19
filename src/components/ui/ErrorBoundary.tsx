'use client'

import React from 'react'

interface State { hasError: boolean; error?: Error }

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  State
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      if ('fallback' in this.props) return this.props.fallback
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 text-center">
          <div className="w-16 h-16 rounded-[16px] bg-c-red-d flex items-center justify-center mb-4 text-[28px]">⚠</div>
          <h2 className="font-display text-[22px] font-bold text-c-text mb-2">Something went wrong</h2>
          <p className="text-[14px] text-c-text3 mb-6 max-w-[320px] leading-relaxed">
            An unexpected error occurred. Try refreshing the page.
          </p>
          <button
            onClick={() => { this.setState({ hasError: false }); window.location.reload() }}
            className="bg-c-purple text-white rounded-app-sm px-5 py-[10px] text-[13px] font-semibold hover:bg-c-purple-l transition-all cursor-pointer"
          >
            Refresh page
          </button>
          {this.state.error && (
            <details className="mt-4 text-[11px] text-c-text3 max-w-[400px]">
              <summary className="cursor-pointer hover:text-c-text">Error details</summary>
              <pre className="mt-2 text-left bg-c-surface2 p-3 rounded-[8px] overflow-auto">{this.state.error.message}</pre>
            </details>
          )}
        </div>
      )
    }
    return this.props.children
  }
}
