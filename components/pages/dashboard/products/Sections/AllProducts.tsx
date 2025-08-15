'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { ProductCardProps } from '@/interfaces';
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
  return (
    <GenericAllTable<ProductCardProps>
      value={value}
      title="جميع المنتجات"
      description="إدارة جميع المنتجات في مكان واحد"
      apiEndpoint="products"
      deleteEndpoint="product/delete"
      createTabValue="createProducts"
      onEditIdChange={onEditIdChange}
      onTabChange={onTabChange}
    />
  );
};

export default AllProducts;
