'use client'

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      style={{ height: 34, padding: '0 14px', background: 'transparent', border: '0.5px solid var(--color-border-primary)', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}
      className="no-print"
    >
      Save as PDF
    </button>
  )
}
