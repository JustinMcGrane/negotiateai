import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Salary to Hourly Calculator — Convert Any Pay Rate Instantly | Hayven',
  description: 'Convert annual salary to hourly rate — or hourly to salary. Adjusts for hours worked per week and weeks per year.',
  alternates: { canonical: 'https://gethayven.com/salary-to-hourly-calculator' },
  openGraph: {
    type: 'website',
    title: 'Salary to Hourly Calculator — Convert Any Pay Rate Instantly | Hayven',
    description: 'Convert annual salary to hourly rate — or hourly to salary. Adjusts for hours worked per week and weeks per year.',
    url: 'https://gethayven.com/salary-to-hourly-calculator',
    images: [{ url: 'https://gethayven.com/salary-to-hourly-calculator/opengraph-image' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salary to Hourly Calculator — Convert Any Pay Rate Instantly | Hayven',
    description: 'Convert annual salary to hourly rate — or hourly to salary. Adjusts for hours worked per week and weeks per year.',
    images: ['https://gethayven.com/salary-to-hourly-calculator/opengraph-image'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
