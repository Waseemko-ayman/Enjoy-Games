'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import Loading from '../molecules/loading';
// import { PATHS as PATHS_DATA } from '@/data/paths';
import { PATHS as PATHS_HELPER } from '@/utils/router.helper';
import { useUserInfo } from '@/context/UserInfoContext';
import BackgroundGradientWrapper from '../molecules/BackgroundGradientWrapper';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { token } = useAuthContext();

  // Get User Information
  const { user, isLoading } = useUserInfo();

  useEffect(() => {
    if (!isLoading && !token) {
      router.push(PATHS_HELPER.AUTH.LOGIN);
    }
  }, [token, user, isLoading, router]);

  if (isLoading)
    return (
      <BackgroundGradientWrapper>
        <Loading otherClassName="mt-0 min-h-[calc(100vh-200px)]" />
      </BackgroundGradientWrapper>
    );

  const canAccessDashboard =
    (user?.permissions && user.permissions.length > 0) ||
    user?.roles?.includes('admin');

  if (!token || !canAccessDashboard) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
