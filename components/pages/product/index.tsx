/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Layer from '@/components/atomic/Layer';
import Container from '@/components/organism/Container';
import React, { useEffect } from 'react';
import ProductDetailsSections from './Sections/ProductDetailsSections';
import TabsSection from './Sections/TabsSection';
import SimilarProducts from './Sections/SimilarProducts';
import useAPI from '@/hook/useAPI';
import Loading from '@/components/molecules/loading';

const ProductDetailsPage = ({ productId }: { productId: string }) => {
  const { getSingle, product, isLoading } = useAPI(`product`);

  useEffect(() => {
    getSingle(productId);
  }, [productId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loading />
        <p className="mt-4">جاري التحميل...</p>
      </div>
    );
  }
  return (
    <Layer className="mt-5">
      <Container>
        <ProductDetailsSections product={product} />
        <TabsSection product={product} />
        <SimilarProducts />
      </Container>
    </Layer>
  );
};

export default ProductDetailsPage;
