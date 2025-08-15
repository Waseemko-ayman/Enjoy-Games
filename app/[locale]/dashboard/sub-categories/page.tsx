import SubCategoriesPage from '@/components/pages/dashboard/sub-categories';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'إنجوي قيمز | الأقسام الفرعية ',
};

const SubCategories = () => <SubCategoriesPage />;

export default SubCategories;
