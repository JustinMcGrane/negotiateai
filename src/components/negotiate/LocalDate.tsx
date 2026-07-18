'use client'

export function LocalDate() {
  return (
    <>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</>
  )
}
