import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single()

    const isPro = profile?.plan === 'pro' || profile?.plan === 'elite'

    if (!isPro) {
      return NextResponse.json({ memory: {}, isPro: false })
    }

    const serviceClient = createServiceClient()
    const { data: memoryData } = await serviceClient
      .from('sarah_memory')
      .select('context')
      .eq('user_id', user.id)
      .single()

    return NextResponse.json({ memory: memoryData?.context ?? {}, isPro: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ memory: {}, isPro: false })
  }
}
