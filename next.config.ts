import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { API_URL } from './config/api';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_URL}/:path*`,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
