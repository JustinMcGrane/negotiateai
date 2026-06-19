import React from 'react'

type BadgeVariant = 'purple' | 'green' | 'amber' | 'red' | 'blue' | 'gray'

const STYLES: Record<BadgeVariant, string> = {
  purple: 'bg-c-purple-d text-c-purple-l',
  green: 'bg-c-green-d text-c-green',
  amber: 'bg-c-amber-d text-c-amber',
  red: 'bg-c-red-d text-c-red',
  blue: 'bg-c-blue-d text-c-blue',
  gray: 'bg-c-surface3 text-c-text3',
}

interface BadgeProps {
  label: string
  variant?: BadgeVariant
  className?: string
}

export function Badge({ label, variant = 'gray', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold px-[9px] py-[3px] rounded-full whitespace-nowrap tracking-[0.02em] ${STYLES[variant]} ${className}`}
    >
      {label}
    </span>
  )
}

export const STATUS_VARIANT: Record<string, BadgeVariant> = {
  todo: 'gray',
  'in-progress': 'amber',
  done: 'green',
  scheduled: 'green',
  draft: 'amber',
  idea: 'gray',
  due: 'amber',
  paid: 'green',
  active: 'green',
  invited: 'gray',
  completed: 'green',
}

export const PRIORITY_VARIANT: Record<string, BadgeVariant> = {
  high: 'red',
  medium: 'amber',
  low: 'gray',
}
