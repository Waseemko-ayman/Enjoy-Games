import CardWrapper from '@/components/atomic/CardWrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import RatingsTabContent from './RatingsTabContent';
import ProductDetailsTabContent from './ProductDetailsTabContent';
import { useTranslations } from 'next-intl';
import { ProductCardProps } from '@/interfaces';

const TabsSection = ({
  product,
  isLoading,
}: {
  product: ProductCardProps;
  isLoading: boolean;
}) => {
  const t = useTranslations('productDetails');
  return (
    <CardWrapper className="pt-4 pb-6 mt-7">
      <Tabs defaultValue="ratings" className="w-full">
        <TabsList variant="modern">
          <TabsTrigger value="ratings" variant="modern">
            {t('ratingsTab')}
          </TabsTrigger>
          <TabsTrigger value="product-details" variant="modern">
            {t('productDetailsTab')}
          </TabsTrigger>
        </TabsList>

        {/* Ratings */}
        <TabsContent value="ratings" variant="modern">
          <RatingsTabContent product={product} isLoading={isLoading} />
        </TabsContent>

        {/* Description */}
        <TabsContent value="product-details" variant="modern">
          <ProductDetailsTabContent product={product} />
        </TabsContent>
      </Tabs>
    </CardWrapper>
  );
};

export default TabsSection;
