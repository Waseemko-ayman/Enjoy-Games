'use client';
import React from 'react';
import AllSubCategories from './Sections/AllSubCategories';
import CreateSubCategories from './Sections/CreateSubCategories';
import GenericPage from '@/components/organism/GenericPage';
import { useTranslations } from 'next-intl';

const SubCategoriesPage = () => {
  const t = useTranslations();

  const tabsData = [
    {
      value: 'allSubCategories',
      label: t('Dashboard.subCategories.allSubCategories'),
    },
    {
      value: 'createSubCategory',
      label: t('Dashboard.subCategories.createSubCategories'),
    },
  ];
  return (
    <GenericPage
      title={t('SectionsTitles.subCategories')}
      description={t('Dashboard.subCategories.desc')}
      tabs={tabsData}
      allComponent={AllSubCategories}
      createComponent={CreateSubCategories}
    />
  );
};

export default SubCategoriesPage;
