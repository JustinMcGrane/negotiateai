import { router } from '../trpc'
import { workspaceRouter } from './workspace'
import { notificationsRouter } from './notifications'
import { teamRouter } from './team'
import { tasksRouter } from './tasks'
import { postsRouter } from './posts'
import { paymentsRouter } from './payments'
import { lessonsRouter } from './lessons'
import { brandDealsRouter } from './brandDeals'
import { activityLogRouter } from './activityLog'
import { goalsRouter } from './goals'

export const appRouter = router({
  workspace: workspaceRouter,
  team: teamRouter,
  tasks: tasksRouter,
  posts: postsRouter,
  payments: paymentsRouter,
  lessons: lessonsRouter,
  brandDeals: brandDealsRouter,
  activityLog: activityLogRouter,
  goals: goalsRouter,
  notifications: notificationsRouter,
})

export type AppRouter = typeof appRouter
