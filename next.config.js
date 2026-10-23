/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Old short tool URLs → current paths
      { source: '/equity-calculator', destination: '/tools/equity-calc', permanent: true },
      { source: '/offer-evaluator', destination: '/tools/offer-evaluator', permanent: true },
      { source: '/counter-offer-builder', destination: '/tools/counter-offer', permanent: true },
      { source: '/objection-handler', destination: '/tools/objections', permanent: true },
      { source: '/worth', destination: '/tools/salaries', permanent: true },
      { source: '/ai-career-coach', destination: '/sarah', permanent: true },
    ]
  },
}

module.exports = nextConfig
