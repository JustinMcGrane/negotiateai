'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard, TrendingUp, FileSearch, Calculator, DollarSign,
  BookOpen, Mail, Shield, PenLine, Play, MessageSquare,
  BarChart2, Settings, CreditCard, ChevronRight,
  UserCircle, FileText, Search, ClipboardList, PenSquare, ArrowUpLeft,
} from 'lucide-react'

type NavItem = { label: string; href: string; icon: LucideIcon }
type NavGroup = { label: string; items: NavItem[] }
type NavEntry = NavItem | NavGroup

const nav: NavEntry[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  {
    label: 'Career Hub',
    items: [
      { label: 'AI Recruiter', href: '/recruiter', icon: UserCircle },
      { label: 'Resume Analyzer', href: '/resume', icon: FileText },
      { label: 'Job Search', href: '/jobs', icon: Search },
      { label: 'Cover Letter', href: '/tools/cover-letter', icon: PenSquare },
      { label: 'Application Tracker', href: '/tracker', icon: ClipboardList },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { label: 'Compensation analyzer', href: '/tools/comp-analyzer', icon: TrendingUp },
      { label: 'Offer evaluator', href: '/tools/offer-evaluator', icon: FileSearch },
      { label: 'Equity calculator', href: '/tools/equity-calc', icon: Calculator },
      { label: 'Cost of not negotiating', href: '/tools/cost-calculator', icon: DollarSign },
    ],
  },
  {
    label: 'Strategy',
    items: [
      { label: 'Negotiation playbook', href: '/tools/playbook', icon: BookOpen },
      { label: 'Counter-offer builder', href: '/tools/counter-offer', icon: Mail },
      { label: 'Objection handler', href: '/tools/objections', icon: Shield },
      { label: 'Raise request builder', href: '/tools/raise-builder', icon: PenLine },
    ],
  },
  {
    label: 'Practice',
    items: [
      { label: 'Negotiation simulator', href: '/tools/simulator', icon: Play },
      { label: 'Interview salary coach', href: '/tools/interview-coach', icon: MessageSquare },
    ],
  },
  { label: 'Progress', href: '/progress', icon: BarChart2 },
  { label: 'Settings', href: '/account', icon: Settings },
  { label: 'Billing', href: '/account/billing', icon: CreditCard },
]

export function Sidebar() {
  const path = usePathname()

  return (
    <aside
      className="no-print"
      style={{
        width: 220,
        minHeight: '100vh',
        background: 'var(--color-background-secondary)',
        borderRight: '0.5px solid var(--color-border-tertiary)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      <div style={{
        padding: '20px 16px 18px',
        borderBottom: '0.5px solid var(--color-border-tertiary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image
            src="/logo.png"
            alt="NegotiateAI"
            width={180}
            height={52}
            style={{ objectFit: 'contain' }}
            priority
          />
        </Link>
      </div>

      <nav style={{ flex: 1, padding: '10px 0', overflowY: 'auto' }}>
        {nav.map((item) => {
          if ('href' in item) {
            const active = path === item.href
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '7px 16px', fontSize: 13,
                color: active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                background: active ? 'rgba(0,0,0,0.05)' : 'transparent',
                textDecoration: 'none',
                borderRadius: 6,
                margin: '0 6px',
              }}>
                <Icon size={15} />
                {item.label}
              </Link>
            )
          }
          return (
            <div key={item.label}>
              <div style={{ padding: '12px 16px 4px', fontSize: 11, color: 'var(--color-text-tertiary)', letterSpacing: '0.04em' }}>
                {item.label.toUpperCase()}
              </div>
              {item.items.map((sub) => {
                const active = path === sub.href
                const SubIcon = sub.icon
                return (
                  <Link key={sub.href} href={sub.href} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '6px 16px', fontSize: 13,
                    color: active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    background: active ? 'rgba(0,0,0,0.05)' : 'transparent',
                    textDecoration: 'none',
                    borderRadius: 6,
                    margin: '0 6px',
                  }}>
                    <SubIcon size={14} />
                    {sub.label}
                  </Link>
                )
              })}
            </div>
          )
        })}
      </nav>

      <div style={{ padding: 12, borderTop: '0.5px solid var(--color-border-tertiary)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Link href="/account/billing" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: '#141414', color: '#fff', borderRadius: 8,
          padding: '8px 12px', fontSize: 12, textDecoration: 'none',
        }}>
          Upgrade to Pro
          <ChevronRight size={14} />
        </Link>
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 8px', fontSize: 12,
          color: 'var(--color-text-tertiary)',
          textDecoration: 'none', borderRadius: 6,
          transition: 'color 0.15s',
        }}>
          <ArrowUpLeft size={13} />
          Back to website
        </Link>
      </div>
    </aside>
  )
}
