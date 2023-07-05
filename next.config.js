/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
}

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA(nextConfig)
