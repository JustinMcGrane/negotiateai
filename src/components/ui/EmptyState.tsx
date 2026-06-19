interface EmptyStateProps {
  icon: string
  title: string
  body: string
  action?: React.ReactNode
}

export function EmptyState({ icon, title, body, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center text-center py-20 px-6 animate-fade-in">
      <div
        className="w-16 h-16 rounded-[18px] flex items-center justify-center text-[28px] mb-5 shadow-card"
        style={{ background: 'linear-gradient(135deg, #F2F1ED, #ECEAE4)', border: '1.5px solid #E2E0D8' }}
      >
        {icon}
      </div>
      <div className="font-display text-[18px] font-semibold text-c-text mb-2 tracking-[-0.02em]">
        {title}
      </div>
      <div className="text-[14px] text-c-text3 leading-[1.65] max-w-[280px] mb-6">
        {body}
      </div>
      {action}
    </div>
  )
}
