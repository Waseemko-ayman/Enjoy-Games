import dynamic from 'next/dynamic';
import React from 'react';

const CreatePage = dynamic(() => import('@/components/pages/tickets/create'), {
  ssr: false,
});

const Create = () => <CreatePage />;

export default Create;
