import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const { title, content } = await req.json()
    if (!content || typeof content !== 'string') {
      return NextResponse.json({ error: 'No content provided' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('resumes')
      .insert({
        user_id: user.id,
        title: title || 'Resume ' + new Date().toLocaleDateString(),
        content,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ id: data.id, title: data.title })
  } catch (err) {
    console.error('save-resume error:', err)
    return NextResponse.json({ error: 'Failed to save resume.' }, { status: 500 })
  }
}
