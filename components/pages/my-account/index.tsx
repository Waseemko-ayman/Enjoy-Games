'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PageHeader from '@/components/molecules/PageHeader';
import Content from './Sections/Content';
import { useAuthContext } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';

const MyAccountPage = () => {
  const { token } = useAuthContext();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname.endsWith('/my-account') && !token) {
      router.replace('/');
    }
  }, [token, pathname]);

  return (
    <div>
      <PageHeader />
      <Content />
    </div>
  );
};

export default MyAccountPage;
