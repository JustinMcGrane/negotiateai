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
  {
    slug: 'dental-hygienist',
    title: 'Dental Hygienist',
    category: 'Healthcare',
    context: 'Focus on full-time vs part-time practice, private vs DSO pay differences, geographic variation, and commission-based bonus structures at some practices.',
  },
  {
    slug: 'actuary',
    title: 'Actuary',
    category: 'Finance',
    context: 'Focus on exam progression (ASA vs FSA/ACAS/FCAS), how each passed exam raises salary, and differences between P&C, life, health, and pension actuaries.',
  },
  {
    slug: 'pharmacist',
    title: 'Pharmacist',
    category: 'Healthcare',
    context: 'Focus on retail vs hospital vs clinical pharmacy pay gaps, PharmD sign-on bonuses, and how board certifications (BCPS, BCACP) increase earnings.',
  },
  {
    slug: 'air-traffic-controller',
    title: 'Air Traffic Controller',
    category: 'Government',
    context: 'Focus on FAA pay bands (D through CPC), facility level (TRACON vs ARTCC vs tower), federal benefits package, and mandatory retirement at 56.',
  },
  {
    slug: 'iron-worker',
    title: 'Iron Worker',
    category: 'Trades',
    context: 'Focus on union vs non-union pay (IABSW locals), prevailing wage on public projects, structural vs reinforcing vs ornamental specializations, and overtime-heavy compensation.',
  },
  {
    slug: 'neurosurgeon',
    title: 'Neurosurgeon',
    category: 'Healthcare',
    context: 'Focus on the exceptionally long training path (14+ years), academic vs private practice pay, RVU-based compensation models, and subspecialty premiums (spine, pediatric, skull base).',
  },
  {
    slug: 'mental-health-counselor',
    title: 'Mental Health Counselor',
    category: 'Healthcare',
    context: 'Focus on LPC/LMHC licensure requirements, private practice vs agency pay gaps, telehealth rate expansion, and how supervision hours affect early-career earnings.',
  },
]

export function getRoleBySlug(slug: string): SalaryRole | undefined {
  return SALARY_ROLES.find(r => r.slug === slug)
}
