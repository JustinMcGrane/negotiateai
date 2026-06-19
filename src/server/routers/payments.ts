import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'
import { logActivity } from '../logActivity'

const paymentInput = z.object({
  team_member_id: z.string().nullable().default(null),
  amount: z.number().positive(),
  description: z.string().default(''),
  status: z.enum(['due', 'paid']).default('due'),
  date: z.string().nullable().default(null),
  notes: z.string().default(''),
})

export const paymentsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from('payments')
      .select('*')
      .eq('workspace_id', ctx.workspaceId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  }),

  revenuePulse: protectedProcedure.query(async ({ ctx }) => {
    const now = new Date()
    const thisYear = now.getFullYear()
    const thisMonthNum = now.getMonth()

    const thisMonthStr = `${thisYear}-${String(thisMonthNum + 1).padStart(2, '0')}`
    const lastMonthDate = new Date(thisYear, thisMonthNum - 1, 1)
    const lastMonthStr = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, '0')}`

    const twoMonthsAgo = new Date(thisYear, thisMonthNum - 1, 1).toISOString().slice(0, 10)

    const [{ data: allPaid }, { data: allDeals }] = await Promise.all([
      ctx.supabase
        .from('payments')
        .select('amount, date, created_at')
        .eq('workspace_id', ctx.workspaceId)
        .eq('status', 'paid')
        .gte('created_at', twoMonthsAgo),
      ctx.supabase
        .from('brand_deals')
        .select('offer_amount, created_at')
        .eq('workspace_id', ctx.workspaceId)
        .eq('status', 'accepted')
        .gte('created_at', twoMonthsAgo),
    ])

    const paidThisMonth = (allPaid ?? [])
      .filter((p) => (p.date ?? p.created_at.slice(0, 10)).startsWith(thisMonthStr))
      .reduce((s, p) => s + Number(p.amount), 0)

    const paidLastMonth = (allPaid ?? [])
      .filter((p) => (p.date ?? p.created_at.slice(0, 10)).startsWith(lastMonthStr))
      .reduce((s, p) => s + Number(p.amount), 0)

    const dealsThisMonth = (allDeals ?? [])
      .filter((d) => d.created_at.startsWith(thisMonthStr))
      .reduce((s, d) => s + Number(d.offer_amount), 0)

    const dealsLastMonth = (allDeals ?? [])
      .filter((d) => d.created_at.startsWith(lastMonthStr))
      .reduce((s, d) => s + Number(d.offer_amount), 0)

    const thisMonth = paidThisMonth + dealsThisMonth
    const lastMonth = paidLastMonth + dealsLastMonth

    return { thisMonth, lastMonth, delta: thisMonth - lastMonth }
  }),

  create: protectedProcedure
    .input(paymentInput)
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('payments')
        .insert({ ...input, workspace_id: ctx.workspaceId })
        .select()
        .single()
      if (error) throw error
      await logActivity(ctx.supabase, ctx.workspaceId, ctx.userName, 'logged payment', 'payment', `$${input.amount}`)
      return data
    }),

  update: protectedProcedure
    .input(paymentInput.partial().extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input
      const { data, error } = await ctx.supabase
        .from('payments')
        .update(rest)
        .eq('id', id)
        .eq('workspace_id', ctx.workspaceId)
        .select()
        .single()
      if (error) throw error
      return data
    }),

  markPaid: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { data: payment } = await ctx.supabase
        .from('payments')
        .select('amount, team_member_id')
        .eq('id', input.id)
        .single()

      const { data, error } = await ctx.supabase
        .from('payments')
        .update({ status: 'paid' })
        .eq('id', input.id)
        .eq('workspace_id', ctx.workspaceId)
        .select()
        .single()
      if (error) throw error

      if (payment) {
        await logActivity(
          ctx.supabase,
          ctx.workspaceId,
          ctx.userName,
          'marked payment paid',
          'payment',
          `$${payment.amount}`,
        )
      }
      return data
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabase
        .from('payments')
        .delete()
        .eq('id', input.id)
        .eq('workspace_id', ctx.workspaceId)
      if (error) throw error
      return { success: true }
    }),
})
