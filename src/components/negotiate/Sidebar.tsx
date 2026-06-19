'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BrandMark } from './BrandMark'
import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard, TrendingUp, FileSearch, Calculator, DollarSign,
  BookOpen, Mail, Shield, PenLine, Play, MessageSquare,
  BarChart2, Settings, CreditCard, ChevronRight,
} from 'lucide-react'

type NavItem = { label: string; href: string; icon: LucideIcon }
type NavGroup = { label: string; items: NavItem[] }
type NavEntry = NavItem | NavGroup

const nav: NavEntry[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
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
      <div style={{ padding: '16px 16px 12px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '0.5px solid var(--color-border-tertiary)' }}>
        <BrandMark />
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)' }}>NegotiateAI</span>
      </div>

      <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
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

      <div style={{ padding: 12, borderTop: '0.5px solid var(--color-border-tertiary)' }}>
        <Link href="/account/billing" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: '#141414', color: '#fff', borderRadius: 8,
          padding: '8px 12px', fontSize: 12, textDecoration: 'none',
        }}>
          Upgrade to Pro
          <ChevronRight size={14} />
        </Link>
      </div>
    </aside>
  )
}
