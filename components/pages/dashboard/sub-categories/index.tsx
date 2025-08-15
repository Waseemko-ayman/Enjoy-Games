'use client';
import React from 'react';
import AllSubCategories from './Sections/AllSubCategories';
import CreateSubCategories from './Sections/CreateSubCategories';
import GenericPage from '@/components/organism/GenericPage';

const tabsData = [
  { value: 'allSubCategories', label: 'جميع الأقسام الفرعية' },
  { value: 'createSubCategory', label: 'إنشاء قسم فرعي' },
];

const SubCategoriesPage = () => {
  return (
    <GenericPage
      title="الأقسام الفرعية"
      description="قم بإدارة الأقسام الفرعية لتحسين وتنظيم الأقسام الرئيسية"
      tabs={tabsData}
      allComponent={AllSubCategories}
      createComponent={CreateSubCategories}
    />
  );
};

export default SubCategoriesPage;
