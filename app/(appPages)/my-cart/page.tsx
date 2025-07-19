import dynamic from 'next/dynamic';
import React from 'react';

const MyCartPage = dynamic(() => import('@/components/pages/my-cart'), {
  ssr: false,
});

const MyCart = () => <MyCartPage />;

export default MyCart;
