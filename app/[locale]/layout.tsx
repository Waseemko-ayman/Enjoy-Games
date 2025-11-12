import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import './globals.css';
import AuthProvider from '@/context/AuthContext';
import ErrorBoundary from './ErrorBoundary';
import 'react-toastify/dist/ReactToastify.css';
import BodyWrapper from '@/components/organism/layouts/BodyWrapper';
import { IBM_Plex_Sans_Arabic } from 'next/font/google';
import LocaleSync from '@/components/organism/layouts/LocaleSync';
import { CartProvider } from '@/context/CartContext';
import { TicketsProvider } from '@/context/TicketsContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { UpdateContentProvider } from '@/context/updateContentContext';
import { ProductCodesProvider } from '@/context/selectedProductId';
import DashboardGuard from '@/components/auth/DashboardGuard';
import { OrdersProvider } from '@/context/OrdersContext';
import { ReferralCodeProvider } from '@/hook/ReferralCodeContext';
import { API_URL } from '@/config/api';
import { UserInfoProvider } from '@/context/UserInfoContext';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await fetch(`${API_URL}/get/seo`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch SEO data');
    const data = await res.json();
    return {
      title: data?.title || 'Enjoy Games',
      description: data?.description || 'Enjoy Games',
      keywords: data?.keywords || 'enjoy games,website,codes,digital products',
    };
  } catch (error) {
    console.error('Metadata fetch error:', error);
    return {
      title: 'Enjoy Games',
      description: 'Enjoy Games',
      keywords: 'enjoy games,website,codes,digital products',
    };
  }
}

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const isArabic = locale === 'ar';

  return (
    <html lang={locale} dir={isArabic ? 'rtl' : 'ltr'}>
      <head>
        <link rel="icon" href="/assets/logo.png" sizes="any" />
      </head>
      <body className={`${ibmArabic.className} antialiased`}>
        <NextIntlClientProvider>
          <LocaleSync />
          <ErrorBoundary>
            <AuthProvider>
              <UserInfoProvider>
                <ProductCodesProvider>
                  <UpdateContentProvider>
                    <CurrencyProvider>
                      <CartProvider>
                        <TicketsProvider>
                          <OrdersProvider>
                            <ReferralCodeProvider>
                              <BodyWrapper>
                                <DashboardGuard>{children}</DashboardGuard>
                              </BodyWrapper>
                            </ReferralCodeProvider>
                          </OrdersProvider>
                        </TicketsProvider>
                      </CartProvider>
                    </CurrencyProvider>
                  </UpdateContentProvider>
                </ProductCodesProvider>
              </UserInfoProvider>
            </AuthProvider>
          </ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
