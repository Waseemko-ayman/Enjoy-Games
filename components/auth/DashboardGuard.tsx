'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { PATHS } from '@/utils/router.helper';

export default function DashboardGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, isLoading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && pathname.startsWith(PATHS.HOME.ROOT) && !token) {
      router.push(PATHS.AUTH.LOGIN);
    }
  }, [pathname, token, isLoading, router]);

  return <>{children}</>;
}
