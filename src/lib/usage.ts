import { createServiceClient } from '@/lib/supabase/server'

const FREE_LIMITS: Record<string, number> = {
  recruiter: 20,
  resume: 3,
  'cover-letter': 5,
}

function getPeriod() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export async function checkAndIncrementUsage(
  userId: string,
  feature: string,
  isPro: boolean
): Promise<{ allowed: boolean; used: number; limit: number }> {
  const limit = FREE_LIMITS[feature] ?? 999
  if (isPro) return { allowed: true, used: 0, limit: 999 }

  const supabase = createServiceClient()
  const period = getPeriod()

  const { data } = await supabase
    .from('usage_tracking')
    .select('count')
    .eq('user_id', userId)
    .eq('feature', feature)
    .eq('period', period)
    .single()

  const used = data?.count ?? 0
  if (used >= limit) return { allowed: false, used, limit }

  await supabase.from('usage_tracking').upsert(
    { user_id: userId, feature, period, count: used + 1 },
    { onConflict: 'user_id,feature,period' }
  )

  return { allowed: true, used: used + 1, limit }
}

export async function getUsage(userId: string): Promise<Record<string, number>> {
  const supabase = createServiceClient()
  const period = getPeriod()

  const { data } = await supabase
    .from('usage_tracking')
    .select('feature, count')
    .eq('user_id', userId)
    .eq('period', period)

  const result: Record<string, number> = {}
  for (const row of data ?? []) {
    result[row.feature] = row.count
  }
  return result
}

export { FREE_LIMITS }
