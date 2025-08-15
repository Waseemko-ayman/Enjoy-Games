'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/utils/router.helper';
import { useAuthContext } from '@/context/AuthContext';
import Loading from '../molecules/loading';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { token, isLoading } = useAuthContext();

  useEffect(() => {
    if (!token) {
      router.push(PATHS.AUTH.LOGIN);
    }
  }, [token, router]);

  if (!token) return null;
  if (isLoading) return <Loading />;
  return <>{children}</>;
};

export default ProtectedRoute;
