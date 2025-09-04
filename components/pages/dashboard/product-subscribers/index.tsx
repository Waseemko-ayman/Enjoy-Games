'use client';
import GenericPage from '@/components/organism/GenericPage';
import React from 'react';
import AllSubscribers from './AllSubscribers';
import { useTranslations } from 'next-intl';

const ProductSubscribersPage = () => {
  const t = useTranslations();

  const tabsData = [
    { value: 'allSubscribers', label: t('Dashboard.productSubscribers.title') },
  ];

  return (
    <GenericPage
      title={t('SectionsTitles.productSubscribers')}
      description={t('Dashboard.productSubscribers.desc')}
      tabs={tabsData}
      allComponent={AllSubscribers}
    />
  );
};

export default ProductSubscribersPage;
