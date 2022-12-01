/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.microcms-assets.io', 'source.unsplash.com'],
  },
  env: {
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
  },
}

module.exports = nextConfig
