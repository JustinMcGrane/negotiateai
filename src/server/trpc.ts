import { initTRPC, TRPCError } from '@trpc/server'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import superjson from 'superjson'

export const createTRPCContext = async () => {
  const [supabase, cookieStore] = await Promise.all([createClient(), cookies()])

  const { data: { session } } = await supabase.auth.getSession()
  const user = session?.user ?? null

  let workspaceId: string | null = null
  let userName: string | null = null

  if (user) {
    const cachedWorkspace = cookieStore.get('r_workspace')?.value
    const cachedName = cookieStore.get('r_name')?.value
    const cachedUserId = cookieStore.get('r_uid')?.value

    if (cachedWorkspace && cachedName && cachedUserId === user.id) {
      workspaceId = cachedWorkspace
      userName = cachedName
    } else {
      const { data: profile } = await supabase
        .from('users')
        .select('workspace_id, name')
        .eq('id', user.id)
        .single()
      workspaceId = profile?.workspace_id ?? null
      userName = profile?.name ?? null
      if (workspaceId) {
        const opts = { path: '/', httpOnly: true, sameSite: 'lax' as const, maxAge: 60 * 60 * 24 }
        try {
          cookieStore.set('r_workspace', workspaceId, opts)
          cookieStore.set('r_name', userName ?? '', opts)
          cookieStore.set('r_uid', user.id, opts)
        } catch {}
      }
    }
  }

  return { supabase, user, workspaceId, userName }
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
})

export const router = t.router
export const publicProcedure = t.procedure
export const createCallerFactory = t.createCallerFactory

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  if (!ctx.workspaceId) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Workspace not found' })
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
      workspaceId: ctx.workspaceId,
      userName: ctx.userName ?? '',
    },
  })
})
