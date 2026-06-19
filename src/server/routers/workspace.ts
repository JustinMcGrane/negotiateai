import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'

export const workspaceRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from('workspaces')
      .select('*')
      .eq('id', ctx.workspaceId)
      .single()
    if (error) throw error
    return data
  }),

  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from('users')
      .select('*')
      .eq('id', ctx.user.id)
      .single()
    if (error) throw error
    return data
  }),

  update: protectedProcedure
    .input(z.object({
      name: z.string().min(1).optional(),
      channel_name: z.string().min(1).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('workspaces')
        .update(input)
        .eq('id', ctx.workspaceId)
        .select()
        .single()
      if (error) throw error
      return data
    }),

  updateProfile: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('users')
        .update(input)
        .eq('id', ctx.user.id)
        .select()
        .single()
      if (error) throw error
      return data
    }),

  seed: protectedProcedure
    .input(z.object({
      workspaceName: z.string(),
      channelName: z.string(),
      platforms: z.array(z.string()),
      role: z.string(),
      inviteEmails: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const wid = ctx.workspaceId
      const { workspaceName, channelName, platforms, inviteEmails } = input

      await ctx.supabase.from('workspaces').update({
        name: workspaceName.trim() || 'My Workspace',
        channel_name: channelName.trim() || 'My Channel',
        platforms,
      }).eq('id', wid)

      const primaryPlatform = platforms[0] ?? null

      const today = new Date()
      const isoDate = (offset: number) => {
        const d = new Date(today)
        d.setDate(d.getDate() + offset)
        return d.toISOString().split('T')[0]
      }

      const TASK_TEMPLATES = [
        { title: 'Write script for next video', priority: 'high', status: 'todo', platform: primaryPlatform, due_date: isoDate(3) },
        { title: 'Edit and export latest footage', priority: 'high', status: 'in-progress', platform: primaryPlatform, due_date: isoDate(5) },
        { title: 'Design thumbnail for upcoming post', priority: 'medium', status: 'todo', platform: primaryPlatform, due_date: isoDate(6) },
        { title: 'Reply to comments from last week', priority: 'low', status: 'todo', platform: primaryPlatform, due_date: isoDate(2) },
      ]

      await ctx.supabase.from('tasks').insert(
        TASK_TEMPLATES.map((t) => ({ ...t, workspace_id: wid, notes: '', assignee_id: null }))
      )

      const POST_TITLES: Record<string, string[]> = {
        YouTube: ['New Tutorial: Getting Started Guide', 'Behind the Scenes Vlog', 'Q&A — Your Questions Answered'],
        Instagram: ['Monday Motivation Post', 'Product Spotlight Reel', 'Story Series: Day in the Life'],
        TikTok: ['Trending Audio Duet', 'Quick Tips Series #1', 'Weekly Challenge Entry'],
        Twitter: ['Weekly Thread: Industry Insights', 'Announcement Tweet', 'Poll: What should I cover next?'],
        Newsletter: ['Weekly Digest — Issue #1', 'Subscriber Exclusive Deep Dive', 'Behind the Scenes Update'],
        Podcast: ['Episode 1: Introduction', 'Interview Prep Session', 'Solo Episode: Lessons Learned'],
        LinkedIn: ['Thought Leadership Post', 'Career Milestone Announcement', 'Industry Trends Thread'],
      }

      const postPlatforms = platforms.slice(0, 3)
      const postRows = postPlatforms.flatMap((p, pi) => {
        const titles = POST_TITLES[p] ?? [`New post on ${p}`, `${p} update`, `${p} content`]
        return titles.slice(0, 2).map((title, ti) => ({
          workspace_id: wid,
          title,
          platform: p,
          status: ti === 0 ? 'scheduled' : 'draft',
          date: isoDate(pi * 3 + ti * 2 + 1),
          assignee_id: null,
          notes: '',
        }))
      })

      if (postRows.length > 0) {
        await ctx.supabase.from('posts').insert(postRows)
      }

      const emails = inviteEmails
        .split('\n')
        .map((e) => e.trim().toLowerCase())
        .filter((e) => e && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))

      if (emails.length > 0) {
        const COLORS = ['#7C6EE8', '#2DB87A', '#E09830', '#4A94D8', '#D95555', '#B36EE8']
        await ctx.supabase.from('team_members').insert(
          emails.map((email, i) => ({
            workspace_id: wid,
            name: email.split('@')[0],
            email,
            role: 'Team Member',
            rate: 0,
            rate_type: 'per hour',
            status: 'invited',
            color: COLORS[i % COLORS.length],
          }))
        )
      }

      return { ok: true }
    }),
})
