import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ subscribed: false })

    const { data } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single()

    const subscribed = data?.plan === 'pro' || data?.plan === 'report'
    return NextResponse.json({ subscribed })
  } catch {
    return NextResponse.json({ subscribed: false })
  }
}
