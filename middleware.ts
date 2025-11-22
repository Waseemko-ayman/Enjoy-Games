import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PATHS } from './utils/router.helper';

const intlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const token = req.cookies.get('token')?.value;
  const userCookie = req.cookies.get('user')?.value;
  const user = userCookie ? JSON.parse(decodeURIComponent(userCookie)) : null;

  const headers: HeadersInit = { Accept: 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  // استخراج الـ locale من المسار
  const localeMatch = pathname.match(/^\/(ar|en)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : null;

  // لو ما في locale → إعادة توجيه للـ default locale
  if (!locale) {
    const url = req.nextUrl.clone();
    url.pathname = `/${routing.defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // إزالة الـ locale من بداية المسار
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  const isMaintenancePage = pathWithoutLocale === '/maintenance';

  // استثناء ملفات النظام
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return intlMiddleware(req);
  }

  // حالة الصيانة من API
  let maintenanceMode = false;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/maintenance/status`,
      {
        headers,
        cache: 'no-store',
      }
    );

    const data = await res.json();
    maintenanceMode = res.ok && data?.data?.is_maintenance === true;
  } catch (err) {
    console.error('Error fetching maintenance status:', err);
    maintenanceMode = true;
  }

  // المسارات العامة المتاحة دائماً
  const publicPaths = [
    PATHS.HOME.ROOT,
    PATHS.AUTH.LOGIN,
    PATHS.AUTH.OTP,
    PATHS.AUTH.FORGET_PASS,
    PATHS.AUTH.RESET_PASS,
  ];

  const isPublicPath = publicPaths.some((p) => pathWithoutLocale.startsWith(p));
  const isAdmin =
    token &&
    (user?.roles?.includes('admin') || (user?.permissions?.length ?? 0) > 0);

  // -------------------------
  //       ✨ حالة الصيانة
  // -------------------------
  if (maintenanceMode) {
    // 1) الأدمن يدخل بشكل طبيعي
    if (isAdmin) return intlMiddleware(req);

    // 2) المسارات العامة تبقى متاحة
    if (isPublicPath) return intlMiddleware(req);

    // 3) أي مسار آخر → صفحة الصيانة
    if (!isMaintenancePage) {
      const url = req.nextUrl.clone();
      url.pathname = `/${locale}/maintenance`;
      return NextResponse.rewrite(url);
    }

    return intlMiddleware(req);
  }

  // -------------------------
  //     🚫 الموقع ليس بصيانة
  // -------------------------

  // لو الموقع ليس في صيانة، ومنع الدخول لصفحة الصيانة نفسها:
  if (!maintenanceMode && isMaintenancePage) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};