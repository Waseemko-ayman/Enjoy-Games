'use client';
import React from 'react';
import AllCoupons from './Sections/AllCoupons';
import CreateCoupons from './Sections/CreateCoupons';
import GenericPage from '@/components/organism/GenericPage';
import { useTranslations } from 'next-intl';

const CouponsPage = () => {
  const t = useTranslations('Dashboard.coupons');

  const tabsData = [
    { value: 'allCoupons', label: t('title') },
    { value: 'createCoupons', label: t('createProduct') },
  ];
  return (
    <GenericPage
      title={t('title')}
      description={t('desc')}
      tabs={tabsData}
      allComponent={AllCoupons}
      createComponent={CreateCoupons}
    />
  );
};

export default CouponsPage;
