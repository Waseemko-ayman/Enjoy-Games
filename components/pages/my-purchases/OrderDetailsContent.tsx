'use client';
import dynamic from 'next/dynamic';
import CardWrapper from '@/components/atomic/CardWrapper';
import Layer from '@/components/atomic/Layer';
import Container from '@/components/organism/Container';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderDetailsProps, OrderItem } from '@/interfaces';
import { Package } from 'lucide-react';
import React from 'react';
import Loading from '@/components/molecules/loading';
import { useTranslations } from 'next-intl';
import { usePagination } from '@/hook/usePagination';
import Pagination from '@/components/molecules/Pagination';

const OrderProductCard = dynamic(() => import('./OrderProductCard'), {
  loading: () => <Loading />,
});

const OrderDetailsContent: React.FC<OrderDetailsProps> = ({ items }) => {
  const t = useTranslations();

  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    totalItems,
    itemsPerPage,
  } = usePagination<OrderItem>({
    data: items,
    itemsPerPage: 6,
  });

  const formatCurrency = (amount: string) => {
    return `${items[0]?.currency_code} ${Number.parseFloat(amount).toFixed(2)}`;
  };

  const totalOrderValue = items.reduce(
    (sum, item) => sum + Number.parseFloat(item.total_price),
    0
  );
  const totalDiscount = items.reduce(
    (sum, item) => sum + Number.parseFloat(item.discount),
    0
  );

  return (
    <Layer>
      <Container>
        {/* Order Summary */}
        <CardWrapper className="mb-8 bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              {t('Invoice.summary.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(totalOrderValue.toString())}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t('Invoice.summary.total.label')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  -{formatCurrency(totalDiscount.toString())}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t('Invoice.summary.discount.label')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">
                  {items?.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t('SectionsTitles.products')}
                </div>
              </div>
            </div>
          </CardContent>
        </CardWrapper>

        {/* Items Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedData?.map((item: OrderItem) => {
            return <OrderProductCard key={item.id} item={item} />;
          })}
        </div>

        {/* Pagination */}
        {items.length > 6 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            className="mt-6"
          />
        )}
      </Container>
    </Layer>
  );
};

export default OrderDetailsContent;
