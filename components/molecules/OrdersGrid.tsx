'use client';

import type React from 'react';
import { useTranslations } from 'next-intl';
import type { Order } from '@/interfaces';
import Pagination from './Pagination';
import Container from '../organism/Container';
import Loading from './loading';
import dynamic from 'next/dynamic';
import ErrorFetching from './ErrorFetching';
const OrderCard = dynamic(() => import('./OrderCard'), {
  loading: () => <Loading />,
});

interface OrdersGridProps {
  orders: Order[];
  // Pagination props - these control the pagination behavior
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  paginatedOrders: Order[]; // The actual orders to display for current page
  isLoading: boolean;
  error: string;
}

const OrdersGrid: React.FC<OrdersGridProps> = ({
  orders,
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  paginatedOrders,
  isLoading,
  error,
}) => {
  const t = useTranslations();

  return (
    <Container>
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {t('MyPurchases.yourOrders')}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {orders.length}{' '}
            {orders.length === 1
              ? t('MyPurchases.order')
              : t('PagesHeaderTitles.orders')}
          </p>
        </div>
        <div className="text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
          {t('MyPurchases.sortedByDate')}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <ErrorFetching />
        ) : (
          paginatedOrders?.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 pt-8 border-t border-gray-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            className="justify-center"
          />
        </div>
      )}
    </Container>
  );
};

export default OrdersGrid;
