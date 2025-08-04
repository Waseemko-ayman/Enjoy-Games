/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Layer from '@/components/atomic/Layer';
import Container from '@/components/organism/Container';
import React, { useEffect } from 'react';
import ProductDetailsSections from './Sections/ProductDetailsSections';
import TabsSection from './Sections/TabsSection';
import SimilarProducts from './Sections/SimilarProducts';
import useAPI from '@/hook/useAPI';
import { getCategoryAndSubCategorySlugs } from '@/utils/helpers';
import { useCategories } from '@/context/CategoriesContext';
import LoadingPlaceholder from '@/components/atomic/LoadingPlaceholder';
import { useTranslations } from 'next-intl';
import ServiceAdvantages from '../home/Sections/ServiceAdvantages';

const ProductDetailsPage = ({ productId }: { productId: string }) => {
  const { categories } = useCategories();
  const { getSingle, product, isLoading } = useAPI(`product`);

  const t = useTranslations('Loading');
  const serviceTxts = useTranslations('HomePage');

  useEffect(() => {
    getSingle(productId);
  }, [productId]);

  if (isLoading) {
    return <LoadingPlaceholder message={t('loadingMessage')} />;
  }
  return (
    <Layer className="mt-5">
      <Container>
        <ProductDetailsSections product={product} />
        <TabsSection product={product} />
      </Container>
      <SimilarProducts
        getSlugs={(subCatId) =>
          getCategoryAndSubCategorySlugs(categories, subCatId)
        }
      />
      <ServiceAdvantages t={serviceTxts} />
    </Layer>
  );
};

export default ProductDetailsPage;
