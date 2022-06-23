/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack5:true,
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    

    return config;
  }
}

module.exports = nextConfig
