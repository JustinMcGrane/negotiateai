import { MetadataRoute } from 'next'
import { SALARY_ROLES } from '@/lib/salaries/roles'

// Use fixed dates so the sitemap doesn't report every page as "modified today" on every build.
// Update the date for a specific page only when its content actually changes.
const D = (s: string) => new Date(s)

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://gethayven.com'

  return [
    // Core
    { url: base, lastModified: D('2026-09-23'), priority: 1.0 },
    { url: `${base}/ai-career-coach`, lastModified: D('2026-09-01'), priority: 0.9 },
    { url: `${base}/sarah`, lastModified: D('2026-09-01'), priority: 0.8 },
    { url: `${base}/worth`, lastModified: D('2026-09-01'), priority: 0.8 },

    // Negotiation tools
    { url: `${base}/compensation-analyzer`, lastModified: D('2026-09-23'), priority: 0.8 },
    { url: `${base}/offer-evaluator`, lastModified: D('2026-09-01'), priority: 0.8 },
    { url: `${base}/counter-offer-builder`, lastModified: D('2026-09-01'), priority: 0.8 },
    { url: `${base}/equity-calculator`, lastModified: D('2026-09-01'), priority: 0.7 },
    { url: `${base}/negotiation-simulator`, lastModified: D('2026-09-23'), priority: 0.8 },
    { url: `${base}/interview-salary-coach`, lastModified: D('2026-09-23'), priority: 0.7 },
    { url: `${base}/raise-request-builder`, lastModified: D('2026-09-23'), priority: 0.7 },
    { url: `${base}/objection-handler`, lastModified: D('2026-09-01'), priority: 0.7 },
    { url: `${base}/negotiation-playbook`, lastModified: D('2026-09-01'), priority: 0.7 },

    // Calculators
    { url: `${base}/raise-calculator`, lastModified: D('2026-09-01'), priority: 0.9 },
    { url: `${base}/salary-to-hourly-calculator`, lastModified: D('2026-09-01'), priority: 0.9 },
    { url: `${base}/paycheck-calculator`, lastModified: D('2026-09-01'), priority: 0.9 },

    // Resume tools
    { url: `${base}/resume-builder`, lastModified: D('2026-09-01'), priority: 0.8 },
    { url: `${base}/resume-templates`, lastModified: D('2026-09-01'), priority: 0.9 },
    { url: `${base}/resume-skills`, lastModified: D('2026-09-01'), priority: 0.9 },
    { url: `${base}/resume-builder/software-engineer`, lastModified: D('2026-09-01'), priority: 0.9 },
    { url: `${base}/resume-builder/product-manager`, lastModified: D('2026-09-01'), priority: 0.9 },
    { url: `${base}/resume-builder/marketing-manager`, lastModified: D('2026-09-01'), priority: 0.9 },
    { url: `${base}/resume-builder/account-executive`, lastModified: D('2026-09-01'), priority: 0.9 },
    { url: `${base}/resume-builder/data-scientist`, lastModified: D('2026-09-01'), priority: 0.9 },
    { url: `${base}/resume-builder/ux-designer`, lastModified: D('2026-09-01'), priority: 0.9 },
    { url: `${base}/resume-builder/project-manager`, lastModified: D('2026-09-01'), priority: 0.9 },
    { url: `${base}/resume-builder/financial-analyst`, lastModified: D('2026-09-01'), priority: 0.9 },
    { url: `${base}/resume-builder/operations-manager`, lastModified: D('2026-09-01'), priority: 0.9 },

    // Job search
    { url: `${base}/job-tracker`, lastModified: D('2026-09-01'), priority: 0.7 },

    // Salary guides
    { url: `${base}/tools/salaries`, lastModified: D('2026-09-23'), priority: 0.8 },
    ...SALARY_ROLES.map(r => ({
      url: `${base}/tools/salaries/${r.slug}`,
      lastModified: D('2026-09-23'),
      priority: 0.8 as const,
    })),

    // Blog — negotiation
    { url: `${base}/blog/how-to-negotiate-salary-offer`, lastModified: D('2026-09-23'), priority: 0.8 },
    { url: `${base}/blog/how-to-negotiate-salary-after-job-offer`, lastModified: D('2026-08-01'), priority: 0.8 },
    { url: `${base}/blog/how-to-negotiate-salary-in-an-interview`, lastModified: D('2026-08-01'), priority: 0.8 },
    { url: `${base}/blog/how-to-negotiate-a-salary`, lastModified: D('2026-08-01'), priority: 0.8 },
    { url: `${base}/blog/how-to-negotiate-saas-job-offer`, lastModified: D('2026-08-01'), priority: 0.8 },
    { url: `${base}/blog/how-to-negotiate-remote-job-offer`, lastModified: D('2026-08-01'), priority: 0.8 },
    { url: `${base}/blog/how-to-negotiate-signing-bonus`, lastModified: D('2026-08-01'), priority: 0.8 },
    { url: `${base}/blog/how-to-ask-for-a-raise-scripts-that-work`, lastModified: D('2026-08-01'), priority: 0.8 },
    { url: `${base}/blog/salary-negotiation-email-template`, lastModified: D('2026-08-01'), priority: 0.8 },
    { url: `${base}/blog/what-to-say-when-recruiter-asks-current-salary`, lastModified: D('2026-08-01'), priority: 0.8 },
    { url: `${base}/blog/how-to-evaluate-a-job-offer`, lastModified: D('2026-08-01'), priority: 0.8 },
    { url: `${base}/blog/average-software-engineer-salary-by-city`, lastModified: D('2026-08-01'), priority: 0.8 },
    { url: `${base}/blog/what-your-equity-is-actually-worth`, lastModified: D('2026-09-23'), priority: 0.8 },
    { url: `${base}/blog/why-professionals-leave-money-on-table`, lastModified: D('2026-09-23'), priority: 0.8 },
    { url: `${base}/blog/recruiter-types-and-how-to-handle`, lastModified: D('2026-09-23'), priority: 0.8 },
    { url: `${base}/blog/what-does-a-career-coach-do`, lastModified: D('2026-09-23'), priority: 0.7 },

    // Blog — resume
    { url: `${base}/blog/software-engineer-resume`, lastModified: D('2026-08-01'), priority: 0.8 },
    { url: `${base}/blog/account-executive-resume`, lastModified: D('2026-08-01'), priority: 0.8 },
    { url: `${base}/blog/marketing-manager-resume`, lastModified: D('2026-08-01'), priority: 0.8 },
    { url: `${base}/blog/product-manager-resume`, lastModified: D('2026-08-01'), priority: 0.8 },
    { url: `${base}/blog/project-manager-resume`, lastModified: D('2026-08-01'), priority: 0.8 },
    { url: `${base}/blog/financial-analyst-resume`, lastModified: D('2026-08-01'), priority: 0.8 },
    { url: `${base}/blog/operations-manager-resume`, lastModified: D('2026-08-01'), priority: 0.8 },
    { url: `${base}/blog/data-scientist-resume`, lastModified: D('2026-08-01'), priority: 0.8 },
    { url: `${base}/blog/ux-designer-resume`, lastModified: D('2026-08-01'), priority: 0.8 },
  ]
}
