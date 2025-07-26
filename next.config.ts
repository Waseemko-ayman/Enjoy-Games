import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // يتم استبدال هذا بـ أي API route محلي في Next.js
        destination: 'http://31.97.36.197/api/:path*', // استبدل هذا بعنوان API البعيد
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
