import React from 'react';
import dynamic from 'next/dynamic';

const RefundPolicyPage = dynamic(
  () => import('@/components/pages/refund-policy'),
  {
    ssr: false,
  }
);

const RefundPolicy = () => <RefundPolicyPage />;

export default RefundPolicy;
