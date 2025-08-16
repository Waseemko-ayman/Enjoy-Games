import GenericPage from '@/components/organism/GenericPage';
import React from 'react';
import AllOrders from './Sections/AllOrders';
import { useTranslations } from 'next-intl';
import CreateOrders from './Sections/CreateOrders';

const OrdersPage = () => {
  const t = useTranslations('Dashboard.orders');

  const tabsData = [
    { value: 'allOrders', label: t('title') },
    { value: 'createOrders', label: t('createOrder') },
  ];

  return (
    <GenericPage
      title={t('title')}
      description={t('desc')}
      tabs={tabsData}
      allComponent={AllOrders}
      createComponent={CreateOrders}
    />
  );
};

export default OrdersPage;
