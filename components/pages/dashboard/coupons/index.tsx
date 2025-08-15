'use client';
import React from 'react';
import AllCoupons from './Sections/AllCoupons';
import CreateCoupons from './Sections/CreateCoupons';
import GenericPage from '@/components/organism/GenericPage';

const tabsData = [
  { value: 'allCoupons', label: 'جميع الكوبونات' },
  { value: 'createCoupons', label: 'إنشاء كوبون' },
];

const CouponsPage = () => {
  return (
    <GenericPage
      title="جميع الكوبونات"
      description="قم بإنشاء وإدارة الكوبونات لمتجرك"
      tabs={tabsData}
      allComponent={AllCoupons}
      createComponent={CreateCoupons}
    />
  );
};

export default CouponsPage;
