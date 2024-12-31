const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^\.\/.*$/,
          contextRegExp: /keyv\/src$/,
        })
      );
    }

    return config;
  },
};

module.exports = nextConfig;