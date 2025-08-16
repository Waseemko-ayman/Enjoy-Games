'use client';
import React from 'react';
import AllCategories from './Sections/AllCategories';
import CreateCategories from './Sections/CreateCategories';
import GenericPage from '@/components/organism/GenericPage';
import { useTranslations } from 'next-intl';

const CategoriesPage = () => {
  const t = useTranslations();

  const tabsData = [
    { value: 'allCategories', label: t('Layout.header.navBar.allCategories') },
    { value: 'createCategory', label: t('Dashboard.categories.title') },
  ];
  return (
    <GenericPage
      title={t('SectionsTitles.categories')}
      description={t('Dashboard.categories.desc')}
      tabs={tabsData}
      allComponent={AllCategories}
      createComponent={CreateCategories}
    />
  );
};

export default CategoriesPage;
