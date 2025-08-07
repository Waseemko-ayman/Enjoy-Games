/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import EmptyStateBox from '@/components/molecules/EmptyStateBox';
import PageHeader from '@/components/molecules/PageHeader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PATHS } from '@/data/paths';
import React, { useEffect, useState } from 'react';
import { MyPurchasesTypes } from '@/data';
import { useTranslations } from 'next-intl';
import useAPI from '@/hook/useAPI';
import Loading from '@/components/molecules/loading';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import OrdersStats from '@/components/molecules/OrdersStats';
import OrdersGrid from '@/components/molecules/OrdersGrid';
import Layer from '@/components/atomic/Layer';
import { Order } from '@/interfaces';
import { usePagination } from '@/hook/usePagination';

const MyPurchasesPage = () => {
  const [filter, setFilter] = useState('all');

  const t = useTranslations('MyPurchases');
  const ariaTxts = useTranslations('ariaLabels.btns');
  const btnTexts = useTranslations('BtnTexts');

  // API Hook
  const { get, data: orders, isLoading, error } = useAPI('orders');

  // Pagination configuration
  const ITEMS_PER_PAGE = 6; // Number of orders to show per page

  // Pagination hook - manages all pagination logic and state
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedOrders,
    goToPage,
    totalItems,
    itemsPerPage,
  } = usePagination({
    data: orders || [], // Use empty array if orders is null/undefined
    itemsPerPage: ITEMS_PER_PAGE,
    initialPage: 1,
  });

  useEffect(() => {
    get();
  }, []);

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const filteredOrders = orders?.filter((order: Order) =>
    filter === 'all'
      ? true
      : order.status.toLowerCase() === filter.toLowerCase()
  );

  if (isLoading) return <Loading />;
  if (error) return <ErrorFetching />;

  return (
    <div>
      <PageHeader>
        <Select onValueChange={handleFilterChange} value={filter}>
          <SelectTrigger
            className="w-[180px]"
            aria-label={ariaTxts('selectPurchaseType')}
          >
            <SelectValue placeholder={t('all')} />
          </SelectTrigger>
          <SelectContent>
            {MyPurchasesTypes.map((item) => (
              <SelectItem
                key={item.id}
                value={item.labelKey}
                className="hover:bg-[#f4f4ff] hover:text-enjoy-primary"
              >
                {t(item.labelKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
