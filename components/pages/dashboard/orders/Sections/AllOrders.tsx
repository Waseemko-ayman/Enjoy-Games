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

  return (
    <GenericAllTable<any>
      value={value}
      title={t('Dashboard.orders.title')}
      description={t('Dashboard.orders.manageOrders')}
      apiEndpoint="order/admin/get-orders"
      deleteEndpoint="order/delete"
      createTabValue="createOrders"
      placeholder={t('Inputs.placeHolders.searchOrder')}
      onTabChange={onTabChange}
      showEdit={false}
    />
  );
};

export default AllOrders;
