'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { linkPermissionMap } from '@/utils/linkPermissionMap';
import DashboardPage from '@/components/pages/dashboard';

const Dashboard = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) return;

    if (!user?.is_admin && user?.permissions?.length) {
      const firstAllowed = Object.entries(linkPermissionMap).find(([, perm]) =>
        user?.permissions?.includes(perm)
      );

      if (firstAllowed) {
        router.replace(`/dashboard/${firstAllowed[0]}`);
      } else {
        router.replace('/');
      }
    }
  }, [user, router]);

  if (user?.is_admin) return <DashboardPage />;

  // During conversion, we do not display the dashboard content.
  return null;
};

export default Dashboard;
