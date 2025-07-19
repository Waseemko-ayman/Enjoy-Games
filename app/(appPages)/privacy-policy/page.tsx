import React from 'react';
import dynamic from 'next/dynamic';

const PrivacyPolicyPage = dynamic(
  () => import('@/components/pages/privacy-policy'),
  {
    ssr: false,
  }
);

const PrivacyPolicy = () => <PrivacyPolicyPage />;

export default PrivacyPolicy;
