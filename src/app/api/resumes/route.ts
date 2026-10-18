import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { data, error } = await supabase
      .from('resumes')
      .select('id, title, created_at, updated_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })

    if (error) throw error
    return NextResponse.json({ resumes: data ?? [] })
  } catch (err) {
    console.error('list resumes error:', err)
    return NextResponse.json({ error: 'Failed to load resumes.' }, { status: 500 })
  }
}
