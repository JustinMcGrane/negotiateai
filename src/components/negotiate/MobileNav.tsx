'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, UserCircle, FileText, Search, Settings } from 'lucide-react'

const items = [
  { label: 'Home', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Sarah', href: '/recruiter', icon: UserCircle },
  { label: 'Resume', href: '/resume', icon: FileText },
  { label: 'Jobs', href: '/jobs', icon: Search },
  { label: 'Account', href: '/account', icon: Settings },
]

export function MobileNav() {
  const path = usePathname()
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#DBEAFE',
      borderTop: '1px solid #BFDBFE',
      display: 'flex', zIndex: 50,
      paddingBottom: 'env(safe-area-inset-bottom)',
      boxShadow: '0 -2px 12px rgba(37,99,235,0.08)',
    }}>
      {items.map((item) => {
        const active = path === item.href || path.startsWith(item.href + '/')
        return (
          <Link key={item.href} href={item.href} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '10px 4px 8px', gap: 4, textDecoration: 'none',
            color: active ? '#1e3a8a' : '#60a5fa',
            fontSize: 10, fontWeight: active ? 700 : 400,
            transition: 'color 0.15s',
          }}>
            <item.icon size={20} strokeWidth={active ? 2.5 : 1.8} />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
