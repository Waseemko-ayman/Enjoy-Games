import React from 'react';
import dynamic from 'next/dynamic';

const InterestsPage = dynamic(
  () => import('@/components/pages/my-account/interests'),
  {
    ssr: false,
  }
);

const Interests = () => <InterestsPage />;

export default Interests;
