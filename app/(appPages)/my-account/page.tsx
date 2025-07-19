import React from 'react';
import dynamic from 'next/dynamic';

const MyAccountPage = dynamic(() => import('@/components/pages/my-account'), {
  ssr: false,
});

const MyAccount = () => <MyAccountPage />;

export default MyAccount;
