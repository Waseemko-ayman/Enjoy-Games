import StorePage from '@/components/pages/store';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'إنجوي قيمز | المتجر',
};

const Store = () => <StorePage />;

export default Store;
