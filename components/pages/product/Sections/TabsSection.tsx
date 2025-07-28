import CardWrapper from '@/components/atomic/CardWrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import RatingsTabContent from './RatingsTabContent';
import ProductDetailsTabContent from './ProductDetailsTabContent';
import { useTranslations } from 'next-intl';
import { ProductCardProps } from '@/interfaces';

const TabsSection = ({ product }: { product: ProductCardProps }) => {
  const t = useTranslations('productDetails');
  return (
    <CardWrapper className="pt-4 pb-6 mt-7">
      <Tabs defaultValue="ratings" className="w-full">
        <TabsList>
          <TabsTrigger value="ratings">{t('ratingsTab')}</TabsTrigger>
          <TabsTrigger value="product-details">
            {t('productDetailsTab')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ratings">
          <RatingsTabContent />
        </TabsContent>
        <TabsContent value="product-details">
          <ProductDetailsTabContent product={product} />
        </TabsContent>
      </Tabs>
    </CardWrapper>
  );
};

export default TabsSection;
