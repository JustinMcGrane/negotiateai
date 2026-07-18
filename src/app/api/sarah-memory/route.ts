import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const serviceClient = createServiceClient()
    const [{ data: memoryData }, { data: profile }] = await Promise.all([
      serviceClient.from('sarah_memory').select('context').eq('user_id', user.id).single(),
      serviceClient.from('profiles').select('plan').eq('id', user.id).single(),
    ])

    const isPro = profile?.plan === 'pro' || profile?.plan === 'elite'
    return NextResponse.json({ memory: memoryData?.context ?? {}, isPro })
  } catch {
    return NextResponse.json({ memory: {} })
  }
}
