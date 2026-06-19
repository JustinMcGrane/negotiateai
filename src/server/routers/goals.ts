import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'

export const goalsRouter = router({
  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    const now = new Date()
    const month = now.getMonth() + 1
    const year = now.getFullYear()
    const { data } = await ctx.supabase
      .from('goals')
      .select('*')
      .eq('workspace_id', ctx.workspaceId)
      .eq('month', month)
      .eq('year', year)
      .maybeSingle()
    return data ?? null
  }),

  upsert: protectedProcedure
    .input(z.object({ revenue_target: z.number().min(0) }))
    .mutation(async ({ ctx, input }) => {
      const now = new Date()
      const month = now.getMonth() + 1
      const year = now.getFullYear()
      const { data, error } = await ctx.supabase
        .from('goals')
        .upsert(
          {
            workspace_id: ctx.workspaceId,
            month,
            year,
            revenue_target: input.revenue_target,
          },
          { onConflict: 'workspace_id,month,year' },
        )
        .select()
        .single()
      if (error) throw error
      return data
    }),
})
