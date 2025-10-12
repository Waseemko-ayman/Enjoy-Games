'use client';
import React from 'react';
import AllProducts from './Sections/AllProducts';
import CreateProducts from './Sections/CreateProducts';
import GenericPage from '@/components/organism/GenericPage';
import { useTranslations } from 'next-intl';
import CodeInventoryStats from './Sections/CodeInventoryStats';

const ProductsPage = () => {
  const t = useTranslations();

  const tabsData = [
    { value: 'allProducts', label: t('Dashboard.products.title') },
    {
      value: 'createProducts',
      label: t('Dashboard.products.createNewProduct'),
    },
    {
      value: 'codeInventoryStatistics',
      label: t('Dashboard.products.codeInventoryStatistics'),
    },
  ];

  return (
    <GenericPage
      title={t('SectionsTitles.products')}
      description={t('Dashboard.products.desc')}
      tabs={tabsData}
      allComponent={AllProducts}
      createComponent={CreateProducts}
      overviewComponent={CodeInventoryStats}
    />
  );
};

export default ProductsPage;
