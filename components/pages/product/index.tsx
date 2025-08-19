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
import { useCurrency } from '@/context/CurrencyContext';
import { useUpdateContent } from '@/context/updateContentContext';

const ProductDetailsPage = ({ productId }: { productId: string }) => {
  // API Hooks
  const { categories } = useCategories();
  const { getSingle, product, isLoading } = useAPI(`product`);
  const { selectedCountry } = useCurrency();
  const { refreshFlags } = useUpdateContent();

  const t = useTranslations('Loading');
  const serviceTxts = useTranslations('HomePage');

  useEffect(() => {
    getSingle(productId);
  }, [productId, selectedCountry, refreshFlags['ratings']]);

  if (isLoading) {
    return <LoadingPlaceholder message={t('loadingMessage')} />;
  }

  return (
    <Layer className="mt-5">
      <Container>
        <ProductDetailsSections product={product} />
        <TabsSection product={product} isLoading={isLoading} />
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
