'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { linkPermissionMap } from '@/utils/linkPermissionMap';
import DashboardPage from '@/components/pages/dashboard';
import { useUserInfo } from '@/context/UserInfoContext';
import Loading from '@/components/molecules/loading';

const Dashboard = () => {
  const router = useRouter();
  // Get User Information
  const { user, isLoading } = useUserInfo();

  useEffect(() => {
    if (isLoading || !user) return;

    const isAdmin = user?.is_admin || user?.roles?.includes('admin');

    // If Admin -> Logs in directly
    if (isAdmin) return;

    // If Manage Orders -> Logs in to the main dashboard page
    if (user?.permissions?.includes('manage orders')) return;

    // Otherwise -> Goes to the first page he has access to
    if (user?.permissions?.length) {
      const firstAllowed = Object.entries(linkPermissionMap).find(([, perm]) =>
        user?.permissions?.includes(perm)
      );

      if (firstAllowed) {
        router.replace(`/dashboard/${firstAllowed[0]}`);
      } else {
        router.replace('/');
      }
    } else {
      router.replace('/');
    }
  }, [user, router, isLoading]);

  if (isLoading || !user) {
    return <Loading otherClassName="mt-0 min-h-[calc(100vh-200px)]" />;
  }

  const isAdmin = user?.is_admin || user?.roles?.includes('admin');
  
  if (isAdmin || user?.permissions?.includes('manage orders'))
    return <DashboardPage />;

  // During the conversion, we do not display anything
  return null;
};

export default Dashboard;
