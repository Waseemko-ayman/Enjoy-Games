import React from 'react';
import dynamic from 'next/dynamic';

const TermsOfUsePage = dynamic(
  () => import('@/components/pages/terms-of-use'),
  {
    ssr: false,
  }
);

const TermsOfUse = () => <TermsOfUsePage />;

export default TermsOfUse;
