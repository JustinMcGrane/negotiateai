'use client'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <main style={{ flex: 1, minWidth: 0, overflowX: 'hidden' }}>
        {children}
      </main>
      <div className="md:hidden">
        <MobileNav />
      </div>
    </div>
  )
}
