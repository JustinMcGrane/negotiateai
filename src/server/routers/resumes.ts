import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'

export const resumesRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from('resumes')
      .select('id, title, created_at, updated_at')
      .eq('user_id', ctx.user.id)
      .order('updated_at', { ascending: false })
    if (error) throw error
    return data ?? []
  }),

  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('resumes')
        .select('*')
        .eq('id', input.id)
        .eq('user_id', ctx.user.id)
        .single()
      if (error) throw error
      return data
    }),

  save: protectedProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('resumes')
        .insert({ ...input, user_id: ctx.user.id })
        .select()
        .single()
      if (error) throw error
      return data
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), title: z.string().optional(), content: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input
      const { data, error } = await ctx.supabase
        .from('resumes')
        .update({ ...rest, updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('user_id', ctx.user.id)
        .select()
        .single()
      if (error) throw error
      return data
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabase
        .from('resumes')
        .delete()
        .eq('id', input.id)
        .eq('user_id', ctx.user.id)
      if (error) throw error
      return { success: true }
    }),
})
