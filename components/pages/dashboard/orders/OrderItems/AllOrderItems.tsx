/* eslint-disable @typescript-eslint/no-explicit-any */
import GenericAllTable from '@/components/organism/GenericAllTable';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import React from 'react';

const AllOrderItems = ({
  value,
  onTabChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
}) => {
  const t = useTranslations();
  const params = useParams();
  const orderId = String(params?.id);

  return (
    <GenericAllTable<any>
      value={value}
      title={t('Dashboard.orders.products.title')}
      apiEndpoint={orderId ? `order/get-order-items/${orderId}` : ''}
      description={t('Dashboard.orders.products.desc')}
      placeholder={t('Inputs.placeHolders.searchProduct')}
      onTabChange={onTabChange}
      showEdit={false}
      showActionsColumn={false}
    />
  );
};

export default AllOrderItems;
