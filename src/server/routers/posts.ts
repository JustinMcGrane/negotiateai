import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'
import { logActivity } from '../logActivity'

const postInput = z.object({
  title: z.string().min(1),
  date: z.string().nullable().default(null),
  platform: z.string().nullable().default(null),
  status: z.enum(['draft', 'scheduled', 'idea']).default('draft'),
  assignee_id: z.string().nullable().default(null),
  notes: z.string().default(''),
})

export const postsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from('posts')
      .select('*')
      .eq('workspace_id', ctx.workspaceId)
      .order('date', { ascending: true })
    if (error) throw error
    return data ?? []
  }),

  streak: protectedProcedure.query(async ({ ctx }) => {
    const since = new Date()
    since.setDate(since.getDate() - 60)
    const { data } = await ctx.supabase
      .from('posts')
      .select('date')
      .eq('workspace_id', ctx.workspaceId)
      .not('date', 'is', null)
      .gte('date', since.toISOString().slice(0, 10))

    if (!data || data.length === 0) return 0

    const uniqueDates = [...new Set(data.map((p) => p.date as string))].sort().reverse()
    const today = new Date().toISOString().slice(0, 10)

    let streak = 0
    let cursor = today

    for (const date of uniqueDates) {
      if (date === cursor) {
        streak++
        const d = new Date(cursor + 'T12:00:00')
        d.setDate(d.getDate() - 1)
        cursor = d.toISOString().slice(0, 10)
      } else if (date < cursor) {
        break
      }
    }

    return streak
  }),

  create: protectedProcedure
    .input(postInput)
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('posts')
        .insert({ ...input, workspace_id: ctx.workspaceId })
        .select()
        .single()
      if (error) throw error
      await logActivity(ctx.supabase, ctx.workspaceId, ctx.userName, 'scheduled post', 'post', input.title)
      return data
    }),

  update: protectedProcedure
    .input(postInput.partial().extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input
      const { data, error } = await ctx.supabase
        .from('posts')
        .update(rest)
        .eq('id', id)
        .eq('workspace_id', ctx.workspaceId)
        .select()
        .single()
      if (error) throw error
      return data
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabase
        .from('posts')
        .delete()
        .eq('id', input.id)
        .eq('workspace_id', ctx.workspaceId)
      if (error) throw error
      return { success: true }
    }),
})
