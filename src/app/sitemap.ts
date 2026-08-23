import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://gethayven.com'
  const now = new Date()

  return [
    { url: base, lastModified: now, priority: 1.0 },
    { url: `${base}/ai-career-coach`, lastModified: now, priority: 0.9 },
    { url: `${base}/compensation-analyzer`, lastModified: now, priority: 0.7 },
    { url: `${base}/offer-evaluator`, lastModified: now, priority: 0.7 },
    { url: `${base}/counter-offer-builder`, lastModified: now, priority: 0.7 },
    { url: `${base}/equity-calculator`, lastModified: now, priority: 0.7 },
    { url: `${base}/negotiation-simulator`, lastModified: now, priority: 0.7 },
    { url: `${base}/interview-salary-coach`, lastModified: now, priority: 0.7 },
    { url: `${base}/raise-calculator`, lastModified: now, priority: 0.9 },
    { url: `${base}/raise-request-builder`, lastModified: now, priority: 0.7 },
    { url: `${base}/objection-handler`, lastModified: now, priority: 0.7 },
    { url: `${base}/negotiation-playbook`, lastModified: now, priority: 0.7 },
    { url: `${base}/resume-builder`, lastModified: now, priority: 0.7 },
    { url: `${base}/job-tracker`, lastModified: now, priority: 0.7 },
    { url: `${base}/blog/how-to-negotiate-saas-job-offer`, lastModified: now, priority: 0.8 },
    { url: `${base}/blog/recruiter-types-and-how-to-handle`, lastModified: now, priority: 0.8 },
    { url: `${base}/blog/why-professionals-leave-money-on-table`, lastModified: now, priority: 0.8 },
    { url: `${base}/blog/what-your-equity-is-actually-worth`, lastModified: now, priority: 0.8 },
    { url: `${base}/blog/what-to-say-when-recruiter-asks-current-salary`, lastModified: now, priority: 0.8 },
    { url: `${base}/blog/how-to-negotiate-remote-job-offer`, lastModified: now, priority: 0.8 },
    { url: `${base}/blog/average-software-engineer-salary-by-city`, lastModified: now, priority: 0.8 },
    { url: `${base}/blog/how-to-ask-for-a-raise-scripts-that-work`, lastModified: now, priority: 0.8 },
    { url: `${base}/blog/how-to-evaluate-a-job-offer`, lastModified: now, priority: 0.8 },
    { url: `${base}/blog/how-to-negotiate-salary-after-job-offer`, lastModified: now, priority: 0.8 },
    { url: `${base}/blog/salary-negotiation-email-template`, lastModified: now, priority: 0.8 },
    { url: `${base}/blog/how-to-negotiate-signing-bonus`, lastModified: now, priority: 0.8 },
  ]
}
