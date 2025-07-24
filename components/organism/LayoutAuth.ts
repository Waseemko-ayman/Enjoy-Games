'use client';

import { ROLES } from '@/constants';
import { useAuthContext } from '@/context/AuthContext';
import { PATHS } from '@/data/paths';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LayoutAuth = () => {
  const { role } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (role === ROLES.USER || role === ROLES.ADMIN) {
      router.replace(PATHS.HOME.link);
    } else if (role === ROLES.GUEST) {
      router.replace(PATHS.LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return;
};

export default LayoutAuth;
