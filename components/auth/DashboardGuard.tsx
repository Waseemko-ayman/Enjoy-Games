'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { PATHS as PATHS_DATA } from '@/data/paths';
import { PATHS as PATHS_HELPER } from '@/utils/router.helper';

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
    const noPermissions = !user?.permissions || user.permissions.length === 0;

    if (!isLoading && isDashboardPath) {
      if (!token) {
        router.push(PATHS_HELPER.AUTH.LOGIN);
      } else if (noPermissions) {
        router.push(PATHS_DATA.HOME.link);
      }
    }
  }, [pathname, token, isLoading, user, router]);

  return <>{children}</>;
}
