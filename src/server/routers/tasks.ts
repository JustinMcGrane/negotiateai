import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'
import { logActivity } from '../logActivity'

const taskInput = z.object({
  title: z.string().min(1),
  assignee_id: z.string().nullable().default(null),
  status: z.enum(['todo', 'in-progress', 'done']).default('todo'),
  priority: z.enum(['high', 'medium', 'low']).default('medium'),
  due_date: z.string().nullable().default(null),
  platform: z.string().nullable().default(null),
  notes: z.string().default(''),
})

export const tasksRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from('tasks')
      .select('*')
      .eq('workspace_id', ctx.workspaceId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  }),

  create: protectedProcedure
    .input(taskInput)
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('tasks')
        .insert({ ...input, workspace_id: ctx.workspaceId })
        .select()
        .single()
      if (error) throw error
      await logActivity(ctx.supabase, ctx.workspaceId, ctx.userName, 'added task', 'task', input.title)
      return data
    }),

  update: protectedProcedure
    .input(taskInput.partial().extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input
      const { data, error } = await ctx.supabase
        .from('tasks')
        .update(rest)
        .eq('id', id)
        .eq('workspace_id', ctx.workspaceId)
        .select()
        .single()
      if (error) throw error
      return data
    }),

  cycleStatus: protectedProcedure
    .input(z.object({ id: z.string(), currentStatus: z.string(), title: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const cycle: Record<string, string> = {
        todo: 'in-progress',
        'in-progress': 'done',
        done: 'todo',
      }
      const newStatus = cycle[input.currentStatus] ?? 'todo'
      const { data, error } = await ctx.supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', input.id)
        .eq('workspace_id', ctx.workspaceId)
        .select()
        .single()
      if (error) throw error
      if (newStatus === 'done' && input.title) {
        await logActivity(ctx.supabase, ctx.workspaceId, ctx.userName, 'completed task', 'task', input.title)
      }
      return data
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabase
        .from('tasks')
        .delete()
        .eq('id', input.id)
        .eq('workspace_id', ctx.workspaceId)
      if (error) throw error
      return { success: true }
    }),
})
