import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.menglanghuo.online',
      },
      {
        protocol: 'https',
        hostname: 'menglanghuo.online',
      },
    ],
  },
  turbopack: {},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

