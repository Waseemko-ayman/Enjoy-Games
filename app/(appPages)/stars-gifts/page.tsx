import React from 'react';
import dynamic from 'next/dynamic';

const TermsOfUsePage = dynamic(() => import('@/components/pages/stars-gifts'), {
  ssr: false,
});

const StarsGifts = () => <TermsOfUsePage />;

export default StarsGifts;
