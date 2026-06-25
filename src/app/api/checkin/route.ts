import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

export async function POST() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const service = createServiceClient()
    await service.from('profiles').update({
      last_checkin_at: new Date().toISOString(),
    }).eq('id', user.id)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[checkin]', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
