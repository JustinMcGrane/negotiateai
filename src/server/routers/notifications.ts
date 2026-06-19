import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'

export const notificationsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from('notifications')
      .select('*')
      .eq('user_id', ctx.user.id)
      .order('created_at', { ascending: false })
      .limit(50)
    if (error) throw error
    return data ?? []
  }),

  unreadCount: protectedProcedure.query(async ({ ctx }) => {
    const { count } = await ctx.supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', ctx.user.id)
      .eq('read', false)
    return count ?? 0
  }),

  markRead: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', input.id)
        .eq('user_id', ctx.user.id)
      return { ok: true }
    }),

  markAllRead: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', ctx.user.id)
      .eq('read', false)
    return { ok: true }
  }),
})
