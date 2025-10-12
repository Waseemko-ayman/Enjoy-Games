'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import Loading from '../molecules/loading';
import { PATHS as PATHS_DATA } from '@/data/paths';
import { PATHS as PATHS_HELPER } from '@/utils/router.helper';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, token, isLoading } = useAuthContext();

  useEffect(() => {
    if (!isLoading) {
      if (!token) {
        router.push(PATHS_HELPER.AUTH.LOGIN);
      } else if (!user?.permissions || user.permissions.length === 0) {
        router.push(PATHS_DATA.HOME.link);
      }
    }
  }, [token, user, isLoading, router]);

  if (isLoading) return <Loading />;
  if (!token || !user?.permissions || user.permissions.length === 0)
    return null;

  return <>{children}</>;
};

export default ProtectedRoute;
