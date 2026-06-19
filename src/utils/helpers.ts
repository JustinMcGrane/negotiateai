import { PLATFORM_COLORS } from '@/types'

export function initials(name: string): string {
  return (name || '?')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function fmtDate(d: string | null | undefined): string {
  if (!d) return '—'
  const dt = new Date(d + 'T12:00:00')
  return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function isOverdue(d: string | null | undefined): boolean {
  if (!d) return false
  return new Date(d + 'T23:59:59') < new Date()
}

export function greeting(): string {
  const h = new Date().getHours()
  return h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening'
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export function platformColor(platform: string | null | undefined): string {
  return platform ? (PLATFORM_COLORS[platform] ?? '#888') : '#888'
}

export function darkenPlatformColor(color: string): string {
  const map: Record<string, string> = {
    '#D95555': '#A33D1E',
    '#7C6EE8': '#4A40A8',
    '#4A94D8': '#1F68B3',
    '#2DB87A': '#1A7A5E',
    '#E09830': '#92580C',
    '#B36EE8': '#7A3AAD',
    '#1F68B3': '#154F8A',
  }
  return map[color] ?? color
}
