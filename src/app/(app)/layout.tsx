import { AppShell } from '@/components/negotiate/AppShell'
import { Providers } from '@/app/providers'
import { PostHogProvider } from '@/components/PostHogProvider'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      <Providers>
        <AppShell>{children}</AppShell>
      </Providers>
    </PostHogProvider>
  )
}
