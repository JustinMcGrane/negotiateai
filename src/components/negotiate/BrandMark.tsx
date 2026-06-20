import Image from 'next/image'

export function BrandMark({ size = 26 }: { size?: number }) {
  return (
    <Image
      src="/9893fdb6-00eb-4f89-8209-8a3cffb84aa8.png"
      alt="NegotiateAI"
      width={size}
      height={size}
      style={{ objectFit: 'contain', flexShrink: 0 }}
    />
  )
}
