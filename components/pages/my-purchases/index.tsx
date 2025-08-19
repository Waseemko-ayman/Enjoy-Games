'use client';
import EmptyStateBox from '@/components/molecules/EmptyStateBox';
import PageHeader from '@/components/molecules/PageHeader';
import { PATHS } from '@/data/paths';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import useAPI from '@/hook/useAPI';
import Loading from '@/components/molecules/loading';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import OrdersStats from '@/components/molecules/OrdersStats';
import OrdersGrid from '@/components/molecules/OrdersGrid';
import Layer from '@/components/atomic/Layer';
import { Order } from '@/interfaces';
import { usePagination } from '@/hook/usePagination';
import { useCurrency } from '@/context/CurrencyContext';
import PurchasesFilterSelect from '@/components/molecules/PurchasesFilterSelect';

const MyPurchasesPage = () => {
  const [filter, setFilter] = useState('all');

  const t = useTranslations('MyPurchases');
  const btnTexts = useTranslations('BtnTexts');

  // API Hook
  const { get, data: orders, isLoading, error } = useAPI('orders');
  const { selectedCountry } = useCurrency();

  // Pagination configuration
  const ITEMS_PER_PAGE = 6; // Number of orders to show per page

  const filteredOrders = orders?.filter((order: Order) => {
    if (filter === 'all') return true;
    return order.status?.trim().toLowerCase() === filter.trim().toLowerCase();
  });

  // Pagination hook - manages all pagination logic and state
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedOrders,
    goToPage,
    totalItems,
    itemsPerPage,
  } = usePagination<Order>({
    data: filteredOrders || [], // Use empty array if orders is null/undefined
    itemsPerPage: ITEMS_PER_PAGE,
    initialPage: 1,
  });

  useEffect(() => {
    get();
  }, [get, selectedCountry]);

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorFetching />;

  return (
    <div>
      <PageHeader>
        <PurchasesFilterSelect value={filter} onChange={handleFilterChange} />
      </PageHeader>
      {!filteredOrders || filteredOrders.length === 0 ? (
        <EmptyStateBox
          imageSrc="/assets/empty-status.png"
          alt="empty-status"
          title={
            filter === 'all'
              ? t('ُemptyStateMsg')
              : t(`emptyFiltered.${filter}`)
          }
          buttonText={btnTexts('StartMarketingNow')}
          btnlink={PATHS.STORE.link}
        />
      ) : (
        <Layer>
          <OrdersStats orders={filteredOrders} />
          <OrdersGrid
            orders={filteredOrders}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            paginatedOrders={paginatedOrders}
            isLoading={isLoading}
            error={error}
          />
        </Layer>
      )}
    </div>
  );
};

export default MyPurchasesPage;
