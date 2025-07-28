import CreatePage from '@/components/pages/tickets/create';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'إنجوي قيمز | إضافة تذكرة جديدة',
};

const Create = () => <CreatePage />;

export default Create;
