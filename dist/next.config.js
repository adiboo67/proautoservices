/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  trailingSlash: true,
  basePath: '',
  images: {
    domains: ['pjxtjkmqgkbisgfleaps.supabase.co'],
  },
}

module.exports = nextConfig
