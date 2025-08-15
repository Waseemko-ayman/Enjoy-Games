'use client';
import React from 'react';
import AllCategories from './Sections/AllCategories';
import CreateCategories from './Sections/CreateCategories';
import GenericPage from '@/components/organism/GenericPage';

const tabsData = [
  { value: 'allCategories', label: 'جميع الأقسام' },
  { value: 'createCategory', label: 'إنشاء قسم' },
];

const CategoriesPage = () => {
  return (
    <GenericPage
      title="الأقسام"
      description="قم بإنشاء وإدارة الأقسام للمتبرعين لديك"
      tabs={tabsData}
      allComponent={AllCategories}
      createComponent={CreateCategories}
    />
  );
};

export default CategoriesPage;
