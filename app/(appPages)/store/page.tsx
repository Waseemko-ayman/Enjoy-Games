import React from 'react';
import dynamic from 'next/dynamic';

const StorePage = dynamic(() => import('@/components/pages/store'), {
  ssr: false,
});

const Store = () => <StorePage />;

export default Store;
