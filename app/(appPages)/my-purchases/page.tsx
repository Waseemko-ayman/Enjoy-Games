import React from 'react';
import dynamic from 'next/dynamic';

const MyPurchasesPage = dynamic(
  () => import('@/components/pages/my-purchases'),
  {
    ssr: false,
  }
);

const MyPurchases = () => <MyPurchasesPage />;

export default MyPurchases;
