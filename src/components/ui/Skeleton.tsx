interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`skeleton rounded-[6px] ${className}`} />
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 px-5 py-[18px] bg-c-surface border-[1.5px] border-c-border rounded-app-sm">
      <Skeleton className="w-[38px] h-[38px] rounded-full flex-shrink-0" />
      <div className="flex-1 flex flex-col gap-2">
        <Skeleton className="h-[14px] w-2/3" />
        <Skeleton className="h-[11px] w-1/3" />
      </div>
      <Skeleton className="h-[22px] w-[56px] rounded-full" />
    </div>
  )
}

export function SkeletonStatCard() {
  return (
    <div className="bg-c-surface border border-c-border rounded-app px-5 py-[22px]">
      <Skeleton className="h-[10px] w-20 mb-3" />
      <Skeleton className="h-[30px] w-28 mb-2" />
      <Skeleton className="h-[10px] w-16" />
    </div>
  )
}

export function SkeletonBlock({ rows = 3 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-[9px]">
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  )
}
