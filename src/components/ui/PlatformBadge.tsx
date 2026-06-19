import { platformColor, darkenPlatformColor } from '@/utils/helpers'

interface PlatformBadgeProps {
  platform: string | null | undefined
}

export function PlatformBadge({ platform }: PlatformBadgeProps) {
  if (!platform) return null
  const c = platformColor(platform)
  const tc = darkenPlatformColor(c)

  return (
    <span
      className="inline-flex items-center text-[11px] font-semibold px-[9px] py-[3px] rounded-full whitespace-nowrap"
      style={{
        background: `${c}15`,
        color: tc,
        border: `1px solid ${c}30`,
      }}
    >
      {platform}
    </span>
  )
}
