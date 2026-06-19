import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'

const memberInput = z.object({
  name: z.string().min(1),
  email: z.string().email().optional().or(z.literal('')),
  role: z.string().default('Team Member'),
  rate: z.number().default(0),
  rate_type: z.enum(['per video', 'per hour', 'per design', 'per script', 'flat monthly']).default('per hour'),
  status: z.enum(['active', 'invited']).default('active'),
  color: z.string().default('#6558D3'),
})

export const teamRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from('team_members')
      .select('*')
      .eq('workspace_id', ctx.workspaceId)
      .order('created_at', { ascending: true })
    if (error) throw error
    return data ?? []
  }),

  create: protectedProcedure
    .input(memberInput)
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('team_members')
        .insert({ ...input, workspace_id: ctx.workspaceId })
        .select()
        .single()
      if (error) throw error
      return data
    }),

  update: protectedProcedure
    .input(memberInput.partial().extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input
      const { data, error } = await ctx.supabase
        .from('team_members')
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
      await ctx.supabase
        .from('tasks')
        .update({ assignee_id: null })
        .eq('assignee_id', input.id)
        .eq('workspace_id', ctx.workspaceId)

      const { error } = await ctx.supabase
        .from('team_members')
        .delete()
        .eq('id', input.id)
        .eq('workspace_id', ctx.workspaceId)
      if (error) throw error
      return { success: true }
    }),
})
