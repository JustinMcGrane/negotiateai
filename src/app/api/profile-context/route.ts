import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ profile: null })

    const { data } = await supabase
      .from('profiles')
      .select('onboarding_goal, onboarding_situation, onboarding_experience, onboarding_role, last_session_summary, last_session_at')
      .eq('id', user.id)
      .single()

    if (!data) return NextResponse.json({ profile: null })

    return NextResponse.json({
      profile: {
        goal: data.onboarding_goal,
        situation: data.onboarding_situation,
        experience: data.onboarding_experience,
        role: data.onboarding_role,
        lastSessionSummary: data.last_session_summary,
        lastSessionAt: data.last_session_at,
      },
    })
  } catch {
    return NextResponse.json({ profile: null })
  }
}
