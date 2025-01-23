const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.bhphotovideo.com',
      },
      {
        protocol: 'https',
        hostname: 'rentout-pro.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'static.bhphoto.com',
      },
    ],
  },
  webpack: (config) => {
    config.ignoreWarnings = [
      {
        module: /react-toastify\.esm\.mjs/, // Suppress source map warning for react-toastify
      },
    ];
    return config;
  },
};

module.exports = nextConfig;
