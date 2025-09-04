'use client';
import GenericPage from '@/components/organism/GenericPage';
import { useTranslations } from 'next-intl';
import React from 'react';
import AllOrderItems from './AllOrderItems';

const OrderItemsPage = () => {
  const t = useTranslations('Dashboard.orders');

  const tabsData = [
    {
      value: 'AllOrderItems',
      label: t('products.allProducts'),
    },
  ];

  return (
    <GenericPage
      title={t('title')}
      description={t('desc')}
      tabs={tabsData}
      allComponent={AllOrderItems}
    />
  );
};

export default OrderItemsPage;
