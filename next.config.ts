import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: process.env.BASEPATH ?? '',
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  experimental: {
    turbopackFileSystemCacheForDev: false
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false
      },
      {
        source: '/apps/users',
        destination: '/apps/users/list',
        permanent: true
      }
    ]
  }
}

export default nextConfig
