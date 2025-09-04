import GenericPage from '@/components/organism/GenericPage';
import React from 'react';
import AllOrders from './Sections/AllOrders';
import { useTranslations } from 'next-intl';

const OrdersPage = () => {
  const t = useTranslations('Dashboard.orders');

  const tabsData = [{ value: 'allOrders', label: t('title') }];

  return (
    <GenericPage
      title={t('title')}
      description={t('desc')}
      tabs={tabsData}
      allComponent={AllOrders}
    />
  );
};

export default OrdersPage;
