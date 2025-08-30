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
import { InterestsProvider } from '@/context/InterestsContext';
import { ReferralCodeProvider } from '@/hook/ReferralCodeContext';
import { API_URL } from '@/config/api';

export async function generateMetadata(): Promise<Metadata> {
  const res = await fetch(`${API_URL}/get/seo`, { next: { revalidate: 0 } });
  const data = await res.json();

  return {
    title: data?.title || 'Enjoy Games',
    description: data?.description || 'Enjoy Games',
    keywords: data?.keywords || 'enjoy games,website,codes,digital products',
  };
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
              <ProductCodesProvider>
                <UpdateContentProvider>
                  <CurrencyProvider>
                    <CartProvider>
                      <TicketsProvider>
                        <OrdersProvider>
                          <InterestsProvider>
                            <ReferralCodeProvider>
                              <BodyWrapper>
                                <DashboardGuard>{children}</DashboardGuard>
                              </BodyWrapper>
                            </ReferralCodeProvider>
                          </InterestsProvider>
                        </OrdersProvider>
                      </TicketsProvider>
                    </CartProvider>
                  </CurrencyProvider>
                </UpdateContentProvider>
              </ProductCodesProvider>
            </AuthProvider>
          </ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
