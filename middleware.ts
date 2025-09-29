import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  const maintenanceMode = false;
  const pathname = req.nextUrl.pathname;

  // التحقق مما إذا كان المسار يحتوي على locale
  const localeMatch = pathname.match(/^\/(ar|en)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : routing.defaultLocale;

  // استثناء الملفات الثابتة وAPI routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return intlMiddleware(req);
  }

  // إذا كانت الصيانة مفعلة ولم يكن المستخدم في صفحة الصيانة
  if (maintenanceMode && !pathname.endsWith('/maintenance')) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/maintenance`;
    return NextResponse.rewrite(url);
  }

  // إذا كان المستخدم في صفحة الصيانة ولكن الصيانة غير مفعلة، إعادة التوجيه للصفحة الرئيسية
  if (!maintenanceMode && pathname.endsWith('/maintenance')) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  // تمرير باقي الطلبات لـ next-intl
  return intlMiddleware(req);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
