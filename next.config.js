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
};

module.exports = nextConfig;
