export type SalaryRole = {
  slug: string
  title: string
  category: string
  context: string // used to vary the Claude prompt for unique content
}

export const SALARY_ROLES: SalaryRole[] = [
  {
    slug: 'software-engineer',
    title: 'Software Engineer',
    category: 'Technology',
    context: 'Focus on tech stack seniority levels, FAANG vs startup pay gaps, and equity compensation.',
  },
  {
    slug: 'registered-nurse',
    title: 'Registered Nurse',
    category: 'Healthcare',
    context: 'Focus on specialization premiums (ICU, ER, travel nursing), shift differentials, and geographic variation.',
  },
  {
    slug: 'flight-attendant',
    title: 'Flight Attendant',
    category: 'Aviation',
    context: 'Focus on airline seniority systems, per-diem pay, union contracts, and domestic vs international routes.',
  },
]

export function getRoleBySlug(slug: string): SalaryRole | undefined {
  return SALARY_ROLES.find(r => r.slug === slug)
}
