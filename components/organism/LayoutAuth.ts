'use client';

import { useAuthContext } from '@/context/AuthContext';
import { PATHS } from '@/data/paths';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LayoutAuth = () => {
  const { isLoading, data } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (data?.data?.token) {
      router.replace(PATHS.HOME.link);
    } else {
      router.replace(PATHS.LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return null;
};

export default LayoutAuth;
