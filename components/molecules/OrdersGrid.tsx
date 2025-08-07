import React from 'react';
import { useTranslations } from 'next-intl';
import { Order } from '@/interfaces';
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
  const t = useTranslations('MyPurchases');

  return (
    <Container>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">
          {t('yourOrders')} ({orders.length})
        </h2>
        <div className="text-sm text-gray-500">{t('sortedByDate')}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <ErrorFetching />
        ) : (
          paginatedOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>
      {/* Pagination component - only shows if there are multiple pages */}
      {totalPages > 1 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
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
