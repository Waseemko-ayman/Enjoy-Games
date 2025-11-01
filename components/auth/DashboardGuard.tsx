'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { PATHS as PATHS_DATA } from '@/data/paths';
import { PATHS as PATHS_HELPER } from '@/utils/router.helper';
import { linkPermissionMap } from '@/utils/linkPermissionMap';
import Loading from '../molecules/loading';
import { useUserInfo } from '@/context/UserInfoContext';
import BackgroundGradientWrapper from '../molecules/BackgroundGradientWrapper';

export default function DashboardGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useAuthContext();

  // Get User Information
  const { user, isLoading } = useUserInfo();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const pathnameWithoutLocale = pathname.replace(/^\/(en|ar)/, '');
    const isDashboardPath = pathnameWithoutLocale.startsWith('/dashboard');
    // const isDashboardPath = pathname.startsWith(PATHS_DATA.DASHBOARD.HOME.ROOT);

    if (!isLoading && isDashboardPath) {
      if (!token) {
        router.push(PATHS_HELPER.AUTH.LOGIN);
        return;
      }

      // const canAccessDashboard =
      //   (user?.permissions && user.permissions.length > 0) ||
      //   user?.roles?.includes('admin');
      const canAccessDashboard =
        user?.permissions?.includes('manage orders') ||
        user?.roles?.includes('admin');

      if (!canAccessDashboard) {
        router.push(PATHS_DATA.HOME.link);
        return;
      }

      // --- Check page validity ---
      const segment = pathnameWithoutLocale
        .split('/dashboard/')[1]
        ?.split('/')[0];
      const requiredPermission = linkPermissionMap[segment];
      const hasPermission = requiredPermission
        ? user?.permissions?.includes(requiredPermission) ||
          user?.roles?.includes('admin')
        : true;

      if (!hasPermission) {
        router.push(PATHS_DATA.HOME.link);
      }
    }
  }, [pathname, token, isLoading, user, router]);

  if (isLoading)
    return (
      <BackgroundGradientWrapper>
        <Loading otherClassName="mt-0 min-h-[calc(100vh-200px)]" />
      </BackgroundGradientWrapper>
    );

  return <>{children}</>;
}
