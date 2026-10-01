import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Send welcome email only on first signup (created within last 30 seconds)
      const user = data?.user
      if (user?.email) {
        const createdAt = new Date(user.created_at).getTime()
        const isNewUser = Date.now() - createdAt < 30_000
        if (isNewUser) {
          const name = user.user_metadata?.full_name || user.user_metadata?.name || ''
          fetch(`${origin}/api/welcome`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, name }),
          }).catch(() => {})
        }
      }
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=oauth`)
}
