/* eslint-disable @typescript-eslint/no-explicit-any */
import GenericAllTable from '@/components/organism/GenericAllTable';
import useAPI from '@/hook/useAPI';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

const AllOrderItems = ({
  value,
  onTabChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
}) => {
  const t = useTranslations();
  const params = useParams();
  const orderId = params?.id;

  const { get, data, isLoading, error } = useAPI(
    `order/get-order-items/${orderId}`
  );

  useEffect(() => {
    if (orderId) get();
  }, [get, orderId]);

  return (
    <GenericAllTable<any>
      value={value}
      title={t('Dashboard.orders.products.title')}
      description={t('Dashboard.orders.products.desc')}
      placeholder={t('Inputs.placeHolders.searchProduct')}
      onTabChange={onTabChange}
      showEdit={false}
      data={data}
    />
  );
};

export default AllOrderItems;
