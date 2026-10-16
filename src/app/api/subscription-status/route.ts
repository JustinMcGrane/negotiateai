import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ subscribed: false })

    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single()

    const subscribed = profile?.plan === 'pro' || profile?.plan === 'elite'
    return NextResponse.json({ subscribed })
  } catch {
    return NextResponse.json({ subscribed: false })
  }
}
