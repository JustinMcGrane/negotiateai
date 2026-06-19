export type TaskStatus = 'todo' | 'in-progress' | 'done'
export type TaskPriority = 'high' | 'medium' | 'low'
export type PostStatus = 'draft' | 'scheduled' | 'idea'
export type PaymentStatus = 'due' | 'paid'
export type BrandDealStatus = 'pending' | 'negotiating' | 'accepted' | 'rejected'
export type MemberStatus = 'active' | 'invited'
export type LessonType = 'instruction' | 'learning'
export type LessonStatus = 'active' | 'completed'

export type Platform = 'YouTube' | 'Instagram' | 'TikTok' | 'Twitter' | 'Newsletter' | 'Podcast'
export type RateType = 'per video' | 'per hour' | 'per design' | 'per script' | 'flat monthly'

export interface Workspace {
  id: string
  name: string
  channel_name: string
  owner_id: string
  created_at: string
}

export interface UserProfile {
  id: string
  name: string
  email: string | null
  workspace_id: string
  created_at: string
}

export interface TeamMember {
  id: string
  workspace_id: string
  name: string
  email: string | null
  role: string
  rate: number
  rate_type: RateType
  status: MemberStatus
  color: string
  created_at: string
}

export interface Task {
  id: string
  workspace_id: string
  title: string
  assignee_id: string | null
  status: TaskStatus
  priority: TaskPriority
  due_date: string | null
  platform: Platform | null
  notes: string
  created_at: string
}

export interface Post {
  id: string
  workspace_id: string
  title: string
  date: string | null
  platform: Platform | null
  status: PostStatus
  assignee_id: string | null
  notes: string
  created_at: string
}

export interface Payment {
  id: string
  workspace_id: string
  team_member_id: string | null
  amount: number
  description: string
  status: PaymentStatus
  date: string | null
  notes: string
  created_at: string
}

export interface BrandDeal {
  id: string
  workspace_id: string
  brand_name: string
  offer_amount: number
  status: BrandDealStatus
  deadline: string | null
  notes: string
  created_at: string
}

export interface ActivityLog {
  id: string
  workspace_id: string
  actor_name: string
  action: string
  entity_type: string
  entity_label: string
  created_at: string
}

export interface Goal {
  id: string
  workspace_id: string
  month: number
  year: number
  revenue_target: number
  created_at: string
}

export interface Lesson {
  id: string
  workspace_id: string
  title: string
  type: LessonType
  category: string
  body: string
  assignee_ids: string[]
  due_date: string | null
  status: LessonStatus
  created_at: string
}

export const PLATFORM_COLORS: Record<string, string> = {
  YouTube: '#D95555',
  Instagram: '#7C6EE8',
  TikTok: '#4A94D8',
  Twitter: '#4A94D8',
  Newsletter: '#2DB87A',
  Podcast: '#E09830',
  LinkedIn: '#1F68B3',
}

export const MEMBER_COLORS = [
  '#7C6EE8', '#2DB87A', '#E09830', '#4A94D8', '#D95555', '#B36EE8',
]
