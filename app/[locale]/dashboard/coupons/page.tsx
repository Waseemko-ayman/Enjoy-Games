import CouponsPage from '@/components/pages/dashboard/coupons';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'إنجوي قيمز | الكوبونات ',
};

const Coupons = () => <CouponsPage />;

export default Coupons;
