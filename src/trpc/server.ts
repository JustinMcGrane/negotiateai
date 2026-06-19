import { createHydrationHelpers } from '@trpc/react-query/rsc'
import { cache } from 'react'
import { appRouter, type AppRouter } from '@/server/routers/_app'
import { createTRPCContext, createCallerFactory } from '@/server/trpc'
import { getQueryClient } from './query-client'

const createCaller = createCallerFactory(appRouter)
const caller = createCaller(cache(createTRPCContext))

export const { trpc: serverTrpc, HydrateClient } =
  createHydrationHelpers<AppRouter>(caller, cache(getQueryClient))
