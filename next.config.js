/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    GRAPHQL_API_URL: process.env.GRAPHQL_API_URL
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/login',
        permanent: true,
      },
    ]
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['page.tsx']
}

module.exports = nextConfig
