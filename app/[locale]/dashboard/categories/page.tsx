import CategoriesPage from '@/components/pages/dashboard/categories';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'إنجوي قيمز | الأقسام ',
};

const Categories = () => <CategoriesPage />;

export default Categories;
