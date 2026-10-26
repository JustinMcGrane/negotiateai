/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/worth', destination: '/tools/salaries', permanent: true },
      { source: '/ai-career-coach', destination: '/sarah', permanent: true },
    ]
  },
}

module.exports = nextConfig
