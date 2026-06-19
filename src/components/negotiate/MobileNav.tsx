'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, TrendingUp, Play, BarChart2, Settings } from 'lucide-react'

const items = [
  { label: 'Home', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Analyze', href: '/tools/comp-analyzer', icon: TrendingUp },
  { label: 'Practice', href: '/tools/simulator', icon: Play },
  { label: 'Progress', href: '/progress', icon: BarChart2 },
  { label: 'Account', href: '/account', icon: Settings },
]

export function MobileNav() {
  const path = usePathname()
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'var(--color-background-primary)',
      borderTop: '0.5px solid var(--color-border-tertiary)',
      display: 'flex', zIndex: 50, paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {items.map((item) => {
        const active = path.startsWith(item.href)
        return (
          <Link key={item.href} href={item.href} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '10px 4px 8px', gap: 3, textDecoration: 'none',
            color: active ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
            fontSize: 10,
          }}>
            <item.icon size={20} />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
