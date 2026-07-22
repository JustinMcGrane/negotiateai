'use client'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', height: '100dvh', overflow: 'hidden', background: '#f8fafc' }}>
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f8fafc' }} className="mobile-main">
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 'var(--mobile-nav-height, 0)' }}>
          {children}
        </div>
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
