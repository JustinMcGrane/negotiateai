import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

const defaultOptions = {
  queries: {
    staleTime: 30 * 60_000,
    refetchOnWindowFocus: false,
  },
}

export const getQueryClient = cache(() => new QueryClient({ defaultOptions }))
export const makeQueryClient = () => new QueryClient({ defaultOptions })
