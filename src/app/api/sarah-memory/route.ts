import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const serviceClient = createServiceClient()
    const { data } = await serviceClient
      .from('sarah_memory')
      .select('context')
      .eq('user_id', user.id)
      .single()

    return NextResponse.json({ memory: data?.context ?? {} })
  } catch {
    return NextResponse.json({ memory: {} })
  }
}
