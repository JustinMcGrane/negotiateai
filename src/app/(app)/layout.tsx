import { AppShell } from '@/components/negotiate/AppShell'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>
}
