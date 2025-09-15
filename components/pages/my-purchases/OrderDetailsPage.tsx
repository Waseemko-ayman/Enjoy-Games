'use client';
import React, { useEffect } from 'react';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import Loading from '@/components/molecules/loading';
import OrderDetailsContent from './OrderDetailsContent';
import PageHeader from '@/components/molecules/PageHeader';
import useAPI from '@/hook/useAPI';

const OrderDetailsPage = ({ id }: { id: string }) => {
  // API Hook
  const { get, data: items, isLoading, error } = useAPI(`order/${id}/items`);

  useEffect(() => {
    get();
  }, [get]);

  return (
    <div>
      <PageHeader />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorFetching />
      ) : (
        <OrderDetailsContent items={items} />
      )}
    </div>
  );
};

export default OrderDetailsPage;
