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

  // التحقق من locale في المسار
  const localeMatch = pathname.match(/^\/(ar|en)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : null;

  if (!locale) {
    // إعادة توجيه أي مسار بدون locale لإضافة الـ default locale
    const url = req.nextUrl.clone();
    url.pathname = `/${routing.defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // إزالة الـ locale من pathname لمقارنات أسهل
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  const isMaintenancePage = pathWithoutLocale === "/maintenance";

  // استثناء الملفات الثابتة و API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  )
    return intlMiddleware(req);

  // جلب حالة الصيانة
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
    if (!res.ok || !data?.data?.is_maintenance) {
      maintenanceMode = true;
    } else {
      maintenanceMode = data?.data?.is_maintenance;
    }
  } catch (err) {
    console.error('Error fetching maintenance status:', err);
    maintenanceMode = true;
  }

  // مسارات عامة لا تحتاج أي تحقق
  const publicPaths = [PATHS.HOME.ROOT, PATHS.AUTH.LOGIN, PATHS.AUTH.OTP];

  if (publicPaths.some((p) => pathWithoutLocale.startsWith(p))) {
    return intlMiddleware(req);
  }

  // حالة الصيانة
  if (maintenanceMode) {
    if (
      token &&
      (user?.roles?.includes('admin') || (user?.permissions?.length ?? 0) > 0)
    ) {
      return intlMiddleware(req);
    }

    if (!isMaintenancePage) {
      const url = req.nextUrl.clone();
      url.pathname = `/${locale}/maintenance`;
      return NextResponse.rewrite(url);
    }

    return intlMiddleware(req);
  }

  // منع الدخول للصفحة maintenance إذا لم يكن الموقع في الصيانة
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
