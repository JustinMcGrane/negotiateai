import Image from 'next/image'

export function BrandMark({ size = 26 }: { size?: number }) {
  return (
    <Image
      src="/logo.svg"
      alt="Hayven"
      width={size}
      height={size}
      style={{ objectFit: 'contain', flexShrink: 0 }}
    />
  )
}
