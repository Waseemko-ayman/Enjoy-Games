'use client';
import React from 'react';
import AllSubCategories from './Sections/AllSubCategories';
import CreateSubCategories from './Sections/CreateSubCategories';
import GenericPage from '@/components/organism/GenericPage';
import { useTranslations } from 'next-intl';

const SubCategoriesPage = () => {
  const t = useTranslations('Dashboard.subCategories');

  const tabsData = [
    {
      value: 'allSubCategories',
      label: t('allSubCategories'),
    },
    {
      value: 'createSubCategory',
      label: t('createSubCategories'),
    },
  ];
  return (
    <GenericPage
      title={t('SectionsTitles.subCategories')}
      description={t('desc')}
      tabs={tabsData}
      allComponent={AllSubCategories}
      createComponent={CreateSubCategories}
    />
  );
};

export default SubCategoriesPage;
