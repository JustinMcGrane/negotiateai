import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabase
      .from('comp_history')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: true })

    if (error) throw error
    return NextResponse.json({ entries: data || [] })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { date, base, bonus, equity_value, type, notes } = await req.json()
    if (!date || !base) return NextResponse.json({ error: 'date and base required' }, { status: 400 })

    const { data, error } = await supabase.from('comp_history').insert({
      user_id: user.id,
      date,
      base: Number(base),
      bonus: bonus ? Number(bonus) : null,
      equity_value: equity_value ? Number(equity_value) : null,
      type: type || 'salary',
      notes: notes || null,
    }).select().single()

    if (error) throw error
    return NextResponse.json({ entry: data })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await req.json()
    await supabase.from('comp_history').delete().eq('id', id).eq('user_id', user.id)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
