import GenericPage from '@/components/organism/GenericPage';
import React from 'react';
import AllOrders from './Sections/AllOrders';
import { useTranslations } from 'next-intl';
import SuspiciousTransactions from './Sections/SuspiciousTransactions';

const OrdersPage = () => {
  const t = useTranslations('Dashboard.orders');

  const tabsData = [
    { value: 'allOrders', label: t('title') },
    {
      value: 'suspiciousTransactions',
      label: t('suspiciousTransactions'),
    },
  ];

  return (
    <GenericPage
      title={t('title')}
      description={t('desc')}
      tabs={tabsData}
      allComponent={AllOrders}
      overviewComponent={SuspiciousTransactions}
    />
  );
};

export default OrdersPage;
