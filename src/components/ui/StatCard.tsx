interface StatCardProps {
  label: string
  value: string | number
  color: string
  sub: string
}

export function StatCard({ label, value, color, sub }: StatCardProps) {
  return (
    <div
      className="bg-c-surface border border-c-border rounded-app px-5 py-[22px] card-hover"
      style={{ borderTop: `3px solid ${color}44` }}
    >
      <div className="text-[11px] text-c-text3 uppercase tracking-[.08em] font-semibold mb-3">
        {label}
      </div>
      <div className="font-display text-[30px] font-bold tracking-[-0.03em] leading-none mb-[6px]" style={{ color }}>
        {value}
      </div>
      <div className="text-[12px] text-c-text3">{sub}</div>
    </div>
  )
}
