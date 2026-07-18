'use client'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <main style={{ flex: 1, minWidth: 0, overflowX: 'hidden', height: '100vh', overflowY: 'auto', paddingBottom: 'var(--mobile-nav-height, 0)' }} className="mobile-main">
        {children}
      </main>
      <div className="md:hidden">
        <MobileNav />
      </div>
      <style>{`
        @media (max-width: 767px) {
          .mobile-main { padding-bottom: 72px !important; }
        }
      `}</style>
    </div>
  )
}
