import { router, protectedProcedure } from '../trpc'

export const activityLogRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from('activity_log')
      .select('*')
      .eq('workspace_id', ctx.workspaceId)
      .order('created_at', { ascending: false })
      .limit(30)
    if (error) throw error
    return data ?? []
  }),

  weeklyCompletions: protectedProcedure.query(async ({ ctx }) => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (6 - i))
      return d.toISOString().slice(0, 10)
    })

    const since = days[0] + 'T00:00:00'

    const { data } = await ctx.supabase
      .from('activity_log')
      .select('created_at, action')
      .eq('workspace_id', ctx.workspaceId)
      .in('action', ['completed task', 'marked payment paid', 'accepted deal', 'added post'])
      .gte('created_at', since)

    const counts: Record<string, number> = Object.fromEntries(days.map((d) => [d, 0]))
    ;(data ?? []).forEach((a) => {
      const day = a.created_at.slice(0, 10)
      if (day in counts) counts[day]++
    })

    return days.map((d) => ({
      date: d,
      label: new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short' }),
      count: counts[d],
    }))
  }),
})
