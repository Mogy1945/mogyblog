/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.microcms-assets.io', 'source.unsplash.com'],
  },
  basePath: '/public',
}

module.exports = nextConfig
