import CardWrapper from '@/components/atomic/CardWrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import RatingsTabContent from './RatingsTabContent';
import ProductDetailsTabContent from './ProductDetailsTabContent';

const TabsSection = () => {
  return (
    <CardWrapper className="pt-4 pb-6 mt-7">
      <Tabs defaultValue="ratings" className="w-full">
        <TabsList>
          <TabsTrigger value="ratings">التقييمات</TabsTrigger>
          <TabsTrigger value="product-details">تفاصيل المنتج</TabsTrigger>
        </TabsList>
        <TabsContent value="ratings">
          <RatingsTabContent />
        </TabsContent>
        <TabsContent value="product-details">
          <ProductDetailsTabContent />
        </TabsContent>
      </Tabs>
    </CardWrapper>
  );
};

export default TabsSection;
