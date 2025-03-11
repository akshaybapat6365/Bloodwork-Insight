/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  env: {
    // Add any environment variables here that you want to expose to the browser
  },
}

module.exports = nextConfig 