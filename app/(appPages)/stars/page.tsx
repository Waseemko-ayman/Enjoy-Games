import React from 'react';
import dynamic from 'next/dynamic';

const StarsPage = dynamic(() => import('@/components/pages/stars'), {
  ssr: false,
});

const Stars = () => <StarsPage />;

export default Stars;
