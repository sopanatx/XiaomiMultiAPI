/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    concurrentFeatures: true,
    serverComponents: true,
  },
};

module.exports = nextConfig;
