'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

const TOOLS = [
  { label: 'Compensation Analyzer', href: '/tools/comp-analyzer' },
  { label: 'Offer Evaluator', href: '/tools/offer-evaluator' },
  { label: 'Counter-Offer Builder', href: '/tools/counter-offer' },
  { label: 'Equity Calculator', href: '/tools/equity-calc' },
  { label: 'Negotiation Simulator', href: '/tools/simulator' },
  { label: 'Interview Salary Coach', href: '/tools/interview-coach' },
  { label: 'Raise Request Builder', href: '/tools/raise-builder' },
  { label: 'Objection Handler', href: '/tools/objections' },
  { label: 'Negotiation Playbook', href: '/tools/playbook' },
]

const RESOURCES = [
  { label: 'Why Professionals Leave Money on the Table', href: '/blog/why-professionals-leave-money-on-table' },
  { label: 'How to Negotiate a SaaS Job Offer', href: '/blog/how-to-negotiate-saas-job-offer' },
  { label: 'What Your Equity Is Actually Worth', href: '/blog/what-your-equity-is-actually-worth' },
  { label: 'Recruiter Types and How to Handle Them', href: '/blog/recruiter-types-and-how-to-handle' },
]

function Dropdown({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, fontWeight: 500, color: '#374151', background: 'none', border: 'none', cursor: 'pointer', padding: '7px 10px', borderRadius: 6 }}
      >
        {label} <ChevronDown size={14} style={{ transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, marginTop: 4,
          background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 10,
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)', padding: '6px 0',
          minWidth: 220, zIndex: 100,
        }}>
          {items.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '8px 16px', fontSize: 13, color: '#374151', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function LandingNav() {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="landing-nav">
      <Link href="/resume-builder" style={{ fontSize: 14, fontWeight: 500, color: '#374151', textDecoration: 'none', padding: '7px 10px', borderRadius: 6 }}>
        AI Resume Builder
      </Link>
      <Link href="/tracker" style={{ fontSize: 14, fontWeight: 500, color: '#374151', textDecoration: 'none', padding: '7px 10px', borderRadius: 6 }}>
        Job Tracker
      </Link>
      <Dropdown label="Tools" items={TOOLS} />
      <Dropdown label="Resources" items={RESOURCES} />
      <style>{`
        @media (max-width: 767px) { .landing-nav { display: none !important; } }
      `}</style>
    </nav>
  )
}
