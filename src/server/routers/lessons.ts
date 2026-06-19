import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'

const lessonInput = z.object({
  title: z.string().min(1),
  type: z.enum(['instruction', 'learning']).default('instruction'),
  category: z.string().default('Content'),
  body: z.string().default(''),
  assignee_ids: z.array(z.string()).default([]),
  due_date: z.string().nullable().default(null),
  status: z.enum(['active', 'completed']).default('active'),
})

export const lessonsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from('lessons')
      .select('*')
      .eq('workspace_id', ctx.workspaceId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  }),

  create: protectedProcedure
    .input(lessonInput)
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('lessons')
        .insert({ ...input, workspace_id: ctx.workspaceId })
        .select()
        .single()
      if (error) throw error
      return data
    }),

  update: protectedProcedure
    .input(lessonInput.partial().extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input
      const { data, error } = await ctx.supabase
        .from('lessons')
        .update(rest)
        .eq('id', id)
        .eq('workspace_id', ctx.workspaceId)
        .select()
        .single()
      if (error) throw error
      return data
    }),

  toggleStatus: protectedProcedure
    .input(z.object({ id: z.string(), currentStatus: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const newStatus = input.currentStatus === 'completed' ? 'active' : 'completed'
      const { data, error } = await ctx.supabase
        .from('lessons')
        .update({ status: newStatus })
        .eq('id', input.id)
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
        .from('lessons')
        .delete()
        .eq('id', input.id)
        .eq('workspace_id', ctx.workspaceId)
      if (error) throw error
      return { success: true }
    }),
})
