import MyCartPage from '@/components/pages/my-cart';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'إنجوي قيمز | سلتي',
};

const MyCart = () => <MyCartPage />;

export default MyCart;
