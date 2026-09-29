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
  {
    slug: 'er-nurse',
    title: 'ER Nurse',
    category: 'Healthcare',
    context: 'Focus on emergency department shift differentials, charge nurse premium, trauma center vs community hospital pay gaps, and travel ER nurse rates vs staff rates.',
  },
  {
    slug: 'pediatric-nurse',
    title: 'Pediatric Nurse',
    category: 'Healthcare',
    context: 'Focus on PICU vs general peds pay differences, childrens hospital vs general hospital compensation, and how specialty certifications (CPN) affect earnings.',
  },
  {
    slug: 'interventional-radiology-technologist',
    title: 'Interventional Radiology Technologist',
    category: 'Healthcare',
    context: 'Focus on IR vs diagnostic rad tech pay premiums, cath lab vs hospital setting, call pay and overtime prevalence, and how ARRT IR certification affects salary.',
  },
  {
    slug: 'doula',
    title: 'Doula',
    category: 'Healthcare',
    context: 'Focus on birth vs postpartum doula rates, per-birth vs package pricing, self-employed vs agency structure, and geographic variation in demand and pay.',
  },
  {
    slug: 'hospice-nurse',
    title: 'Hospice Nurse',
    category: 'Healthcare',
    context: 'Focus on inpatient vs home hospice pay, on-call requirements and stipends, RN vs case manager titles, and how CHPN certification affects compensation.',
  },
  {
    slug: 'cardiovascular-surgeon',
    title: 'Cardiovascular Surgeon',
    category: 'Healthcare',
    context: 'Focus on academic vs private practice pay, RVU-based compensation models, open heart vs endovascular subspecialty premiums, and call burden impact on total comp.',
  },
  {
    slug: 'pastor',
    title: 'Pastor',
    category: 'Nonprofit & Faith',
    context: 'Focus on congregation size and denominational affiliation as primary pay drivers, housing allowance tax treatment, bi-vocational vs full-time ministry pay, and megachurch vs small church compensation differences.',
  },
  {
    slug: 'thoracic-surgeon',
    title: 'Thoracic Surgeon',
    category: 'Healthcare',
    context: 'Focus on cardiac vs general thoracic subspecialization, VATS/minimally invasive premium, academic vs private practice split, and how fellowship training affects starting salary.',
  },
  {
    slug: 'otolaryngologist',
    title: 'Otolaryngologist',
    category: 'Healthcare',
    context: 'Focus on ENT private practice vs employed model pay differences, surgical volume and RVU productivity, subspecialty premiums (skull base, pediatric, facial plastics), and rural vs urban market variation.',
  },
  {
    slug: 'locksmith',
    title: 'Locksmith',
    category: 'Trades',
    context: 'Focus on employee vs self-employed/business owner income gap, automotive vs residential vs commercial specialization, emergency/lockout call premium, and how ALOA certification affects rates.',
  },
  {
    slug: 'allergist',
    title: 'Allergist',
    category: 'Healthcare',
    context: 'Focus on allergy/immunology subspecialty RVU productivity, private practice vs employed model pay, injection revenue and allergy testing volume, and the shortage premium in underserved markets.',
  },
  {
    slug: 'sleep-medicine-physician',
    title: 'Sleep Medicine Physician',
    category: 'Healthcare',
    context: 'Focus on sleep medicine as a subspecialty of pulmonology, neurology, or psychiatry, interpretive vs procedural revenue mix, DME relationships, and how sleep lab ownership affects total income.',
  },
  {
    slug: 'home-health-care-nurse',
    title: 'Home Health Care Nurse',
    category: 'Healthcare',
    context: 'Focus on per-visit vs salaried pay structures, mileage and travel time compensation, agency vs independent contractor rates, and how OASIS documentation burden affects effective hourly pay.',
  },
  {
    slug: 'counseling-psychologist',
    title: 'Counseling Psychologist',
    category: 'Healthcare',
    context: 'Focus on PhD/PsyD licensure differences, private practice vs community mental health vs university counseling center pay, insurance panel reimbursement rates, and telehealth impact on caseload capacity.',
  },
]

export function getRoleBySlug(slug: string): SalaryRole | undefined {
  return SALARY_ROLES.find(r => r.slug === slug)
}
