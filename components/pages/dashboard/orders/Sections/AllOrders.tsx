/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { useTranslations } from 'next-intl';
import React from 'react';

const AllOrders = ({
  value,
  onTabChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
}) => {
  const t = useTranslations();

  const handleOrderFilter = (rows: any[], currentFilter: string) => {
    if (currentFilter === 'all') return rows;
    return rows.filter(
      (item: any) => item.status?.toLowerCase() === currentFilter.toLowerCase()
    );
  };

  return (
    <GenericAllTable<any>
      value={value}
      title={t('Dashboard.orders.title')}
      description={t('Dashboard.orders.manageOrders')}
      apiEndpoint="order/admin/get-orders"
      placeholder={t('Inputs.placeHolders.searchOrder')}
      onTabChange={onTabChange}
      showEdit={false}
      showActionsColumn={false}
      customFilter={handleOrderFilter}
    />
  );
};

export default AllOrders;
