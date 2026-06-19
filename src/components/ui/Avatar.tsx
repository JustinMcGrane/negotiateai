import { initials } from '@/utils/helpers'

interface AvatarProps {
  name: string
  color?: string
  size?: number
}

export function Avatar({ name, color = '#6558D3', size = 32 }: AvatarProps) {
  const bg = color + '22'
  const fontSize = Math.round(size * 0.35)

  return (
    <div
      className="rounded-full flex items-center justify-center font-semibold flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: bg,
        color,
        fontSize,
        letterSpacing: '0.02em',
      }}
    >
      {initials(name)}
    </div>
  )
}
