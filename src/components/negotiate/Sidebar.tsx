'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard, TrendingUp, FileSearch, Calculator, DollarSign,
  BookOpen, Mail, Shield, PenLine, Play, MessageSquare,
  BarChart2, Settings, CreditCard, ChevronRight,
  UserCircle, FileText, Search, ClipboardList, PenSquare, ArrowUpLeft,
  Zap, Users, Star, Award, GitCompare, Map,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

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
      { label: 'Roleplay practice', href: '/roleplay', icon: Users },
      { label: 'Live call coaching', href: '/live-coach', icon: Zap },
    ],
  },
  {
    label: 'Elite',
    items: [
      { label: 'Annual Review Coach', href: '/tools/annual-review', icon: Star },
      { label: 'Promotion Planner', href: '/tools/promotion-planner', icon: Award },
      { label: 'Competing Offer', href: '/tools/competing-offer', icon: GitCompare },
      { label: 'Career Timeline', href: '/tools/career-timeline', icon: Map },
    ],
  },
  { label: 'Progress', href: '/progress', icon: BarChart2 },
  { label: 'Settings', href: '/account', icon: Settings },
  { label: 'Billing', href: '/account/billing', icon: CreditCard },
]

export function Sidebar() {
  const path = usePathname()
  const [plan, setPlan] = useState<string | null>(null)

  useEffect(() => {
    createClient().auth.getUser().then(async ({ data }) => {
      if (!data.user) return
      const { data: profile } = await createClient().from('profiles').select('plan').eq('id', data.user.id).single()
      setPlan(profile?.plan ?? 'free')
    })
  }, [])

  return (
    <aside
      className="no-print"
      style={{
        width: 224,
        minHeight: '100vh',
        background: '#0f172a',
        borderRight: 'none',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div style={{
        padding: '20px 16px 18px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image
            src="/logo-light.svg"
            alt="Hayven"
            width={180}
            height={52}
            style={{ objectFit: 'contain' }}
            priority
          />
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px 0', overflowY: 'auto' }}>
        {nav.map((item) => {
          if ('href' in item) {
            const active = path === item.href
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'flex', alignItems: 'center', gap: 9,
                padding: '7px 12px', fontSize: 13,
                color: active ? '#fff' : 'rgba(255,255,255,0.5)',
                background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                textDecoration: 'none',
                borderRadius: 7,
                margin: '0 8px',
                fontWeight: active ? 500 : 400,
                transition: 'background 0.15s, color 0.15s',
              }}>
                <Icon size={15} />
                {item.label}
              </Link>
            )
          }
          return (
            <div key={item.label}>
              <div style={{
                padding: '14px 20px 5px',
                fontSize: 10,
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.08em',
                fontWeight: 600,
              }}>
                {item.label.toUpperCase()}
              </div>
              {item.items.map((sub) => {
                const active = path === sub.href
                const SubIcon = sub.icon
                return (
                  <Link key={sub.href} href={sub.href} style={{
                    display: 'flex', alignItems: 'center', gap: 9,
                    padding: '6px 12px', fontSize: 13,
                    color: active ? '#fff' : 'rgba(255,255,255,0.5)',
                    background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                    textDecoration: 'none',
                    borderRadius: 7,
                    margin: '0 8px',
                    fontWeight: active ? 500 : 400,
                    transition: 'background 0.15s, color 0.15s',
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

      {/* Footer */}
      <div style={{
        padding: '12px 10px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}>
        {plan !== 'elite' && (
          <Link href="/account/billing" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(255,255,255,0.1)',
            color: '#fff',
            borderRadius: 8,
            padding: '8px 12px',
            fontSize: 12,
            fontWeight: 500,
            textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.12)',
          }}>
            {plan === 'pro' ? 'Upgrade to Elite' : 'Upgrade to Pro'}
            <ChevronRight size={14} />
          </Link>
        )}
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 8px', fontSize: 12,
          color: 'rgba(255,255,255,0.3)',
          textDecoration: 'none', borderRadius: 6,
        }}>
          <ArrowUpLeft size={13} />
          Back to website
        </Link>
      </div>
    </aside>
  )
}
