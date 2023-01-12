/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true
    };
    return config;
  },
  swcMinify: true,
  images: {
    domains: ['images.microcms-assets.io', 'raw.githubusercontent.com'],
  },
}

module.exports = nextConfig
