/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,       // recommended
  eslint: {
    ignoreDuringBuilds: true,  // keep ignoring ESLint during build
  },
  images: {
    unoptimized: true,         // optional, keeps your current behavior
  },

  // Remove output: 'export' because API routes like NextAuth need server
};

module.exports = nextConfig;
