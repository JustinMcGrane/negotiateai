import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'
import { logActivity } from '../logActivity'

const dealInput = z.object({
  brand_name: z.string().min(1),
  offer_amount: z.number().min(0),
  status: z.enum(['pending', 'negotiating', 'accepted', 'rejected']).default('pending'),
  deadline: z.string().nullable().default(null),
  notes: z.string().default(''),
})

export const brandDealsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from('brand_deals')
      .select('*')
      .eq('workspace_id', ctx.workspaceId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  }),

  create: protectedProcedure
    .input(dealInput)
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('brand_deals')
        .insert({ ...input, workspace_id: ctx.workspaceId })
        .select()
        .single()
      if (error) throw error
      await logActivity(ctx.supabase, ctx.workspaceId, ctx.userName, 'logged deal', 'deal', input.brand_name)
      return data
    }),

  update: protectedProcedure
    .input(dealInput.partial().extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input
      const { data, error } = await ctx.supabase
        .from('brand_deals')
        .update(rest)
        .eq('id', id)
        .eq('workspace_id', ctx.workspaceId)
        .select()
        .single()
      if (error) throw error
      if (rest.status === 'accepted' && rest.brand_name) {
        await logActivity(
          ctx.supabase,
          ctx.workspaceId,
          ctx.userName,
          'accepted deal',
          'deal',
          rest.brand_name,
        )
      }
      return data
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabase
        .from('brand_deals')
        .delete()
        .eq('id', input.id)
        .eq('workspace_id', ctx.workspaceId)
      if (error) throw error
      return { success: true }
    }),
})
