'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { PATHS as PATHS_DATA } from '@/data/paths';
import { PATHS as PATHS_HELPER } from '@/utils/router.helper';
import { linkPermissionMap } from '@/utils/linkPermissionMap';

export default function DashboardGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, token, isLoading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isDashboardPath = pathname.startsWith(PATHS_DATA.DASHBOARD.HOME.ROOT);
    // const noPermissions =
    //   !user?.permissions || user.permissions.length === 0;
    const noPermissions =
      (!user?.permissions || user.permissions.length === 0) &&
      !user?.roles?.includes('admin');

    if (!isLoading && isDashboardPath) {
      if (!token) {
        router.push(PATHS_HELPER.AUTH.LOGIN);
        return;
      }

      if (noPermissions) {
        router.push(PATHS_DATA.HOME.link);
        return;
      }

      // --- Check page validity ---
      const segment = pathname.split('/dashboard/')[1]?.split('/')[0];
      const requiredPermission = linkPermissionMap[segment];
      const hasPermission = requiredPermission
        ? user?.permissions?.includes(requiredPermission)
        : true;

      if (!hasPermission) {
        router.push(PATHS_DATA.HOME.link);
      }
    }
  }, [pathname, token, isLoading, user, router]);

  return <>{children}</>;
}
