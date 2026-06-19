interface LogoProps {
  dark?: boolean
  width?: number
}

export function Logo({ dark = false, width = 180 }: LogoProps) {
  const height = Math.round(width * (52 / 180))
  return (
    <svg width={width} height={height} viewBox="0 0 180 52" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="2" width="48" height="48" rx="11" fill="#6558D3" />
      <rect x="11" y="14" width="26" height="4.5" rx="2.25" fill="white" />
      <rect x="11" y="23" width="18" height="4.5" rx="2.25" fill="white" />
      <rect x="11" y="32" width="22" height="4.5" rx="2.25" fill="white" />
      <text
        x="62" y="38"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="32"
        fontWeight="700"
        fill={dark ? '#EEEDF8' : '#1A1A2E'}
        letterSpacing="-0.8"
      >
        Roster
      </text>
    </svg>
  )
}

export function LogoMark({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="48" height="48" rx="11" fill="#6558D3" />
      <rect x="11" y="12" width="26" height="4.5" rx="2.25" fill="white" />
      <rect x="11" y="21" width="18" height="4.5" rx="2.25" fill="white" />
      <rect x="11" y="30" width="22" height="4.5" rx="2.25" fill="white" />
    </svg>
  )
}
