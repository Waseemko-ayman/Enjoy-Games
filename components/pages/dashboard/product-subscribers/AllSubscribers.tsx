/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import useAPI from '@/hook/useAPI';
import { ProductCardProps } from '@/interfaces';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

const AllSubscribers = ({ value }: { value: string }) => {
  const t = useTranslations();
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');

  const { get: getProducts, data: productsData } =
    useAPI<any>('code/get-products');

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    if (productsData) {
      setProducts(productsData);
    }
  }, [productsData]);

  const subscriberFilterOptions = [
    { id: 'all', label: t('MyPurchases.all') },
    ...products.map((p: ProductCardProps) => ({
      id: String(p.id),
      label: p.title,
    })),
  ];

  const handleSubscriberFilter = (rows: any[]) => {
    return rows;
  };

  const endpoint =
    selectedProductId && selectedProductId !== 'all'
      ? `users/paid/product-${selectedProductId}`
      : 'code/get-products';

  return (
    <GenericAllTable<ProductCardProps>
      value={value}
      title={t('Dashboard.products.title')}
      description={t('Dashboard.products.manageProducts')}
      apiEndpoint={endpoint}
      placeholder={t('Inputs.placeHolders.searchUser')}
      customFilter={handleSubscriberFilter}
      filterOptions={subscriberFilterOptions}
      onFilterChange={(id) => setSelectedProductId(id === 'all' ? '' : id)}
      showEdit={false}
      showActionsColumn={false}
    />
  );
};

export default AllSubscribers;
