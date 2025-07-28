import MyAccountPage from '@/components/pages/my-account';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'إنجوي قيمز | حسابي',
};

const MyAccount = () => <MyAccountPage />;

export default MyAccount;
