import { createClient } from '@/lib/supabase/server'

const GOAL_LABELS: Record<string, string> = {
  new_job: 'Landing a new job',
  negotiate: 'Negotiating a job offer',
  raise: 'Getting a raise or promotion',
  resume: 'Improving their resume',
}

const SITUATION_LABELS: Record<string, string> = {
  actively_looking: 'Actively applying',
  casually_looking: 'Casually exploring',
  have_offer: 'Has an offer in hand',
  employed: 'Currently employed, not actively looking',
}

export type OnboardingProfile = {
  goal?: string
  situation?: string
  experience?: string
  role?: string
}

export async function getUserProfile(): Promise<OnboardingProfile | null> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data } = await supabase
      .from('profiles')
      .select('onboarding_goal, onboarding_situation, onboarding_experience, onboarding_role')
      .eq('id', user.id)
      .single()

    if (!data) return null
    return {
      goal: data.onboarding_goal,
      situation: data.onboarding_situation,
      experience: data.onboarding_experience,
      role: data.onboarding_role,
    }
  } catch {
    return null
  }
}

export function formatProfileContext(profile: OnboardingProfile | null): string {
  if (!profile) return ''
  const lines: string[] = []
  if (profile.role) lines.push(`Role/field: ${profile.role}`)
  if (profile.experience) lines.push(`Years of experience: ${profile.experience}`)
  if (profile.goal) lines.push(`Primary goal: ${GOAL_LABELS[profile.goal] ?? profile.goal}`)
  if (profile.situation) lines.push(`Current situation: ${SITUATION_LABELS[profile.situation] ?? profile.situation}`)
  if (lines.length === 0) return ''
  return `ABOUT THIS USER:\n${lines.join('\n')}`
}
