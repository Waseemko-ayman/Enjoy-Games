'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { ProductCardProps } from '@/interfaces';
import { useTranslations } from 'next-intl';
import React from 'react';

const AllProducts = ({
  value,
  onTabChange,
  onEditIdChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
  onEditIdChange: (id: string | number | null) => void;
}) => {
  const t = useTranslations();

  return (
    <GenericAllTable<ProductCardProps>
      value={value}
      title={t('Dashboard.products.title')}
      description={t('Dashboard.products.manageProducts')}
      apiEndpoint="products"
      deleteEndpoint="product/delete"
      createTabValue="createProducts"
      placeholder={t('Inputs.placeHolders.searchProduct')}
      onEditIdChange={onEditIdChange}
      onTabChange={onTabChange}
    />
  );
};

export default AllProducts;
