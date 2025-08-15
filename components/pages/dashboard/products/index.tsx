'use client';
import React from 'react';
import AllProducts from './Sections/AllProducts';
import CreateProducts from './Sections/CreateProducts';
import GenericPage from '@/components/organism/GenericPage';

const tabsData = [
  { value: 'allProducts', label: 'جميع المنتجات' },
  { value: 'createProducts', label: 'إنشاء منتج' },
];

const ProductsPage = () => {
  return (
    <GenericPage
      title="المنتجات"
      description="قم بإنشاء وإدارة المنتجات لمتجرك"
      tabs={tabsData}
      allComponent={AllProducts}
      createComponent={CreateProducts}
    />
  );
};

export default ProductsPage;
