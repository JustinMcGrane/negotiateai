import { Briefcase } from 'lucide-react'

export function BrandMark({ size = 26 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: '#141414',
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Briefcase size={size * 0.55} color="#fff" strokeWidth={1.5} />
    </div>
  )
}
