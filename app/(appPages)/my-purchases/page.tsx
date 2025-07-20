import MyPurchasesPage from '@/components/pages/my-purchases';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'إنجوي قيمز | طلباتي',
};

const MyPurchases = () => <MyPurchasesPage />;

export default MyPurchases;
