import Layer from '@/components/atomic/Layer';
import Container from '@/components/organism/Container';
import React from 'react';
import TabsSection from './Sections/TabsSection';
import ProductDetailsSections from './Sections/ProductDetailsSections';
import SimilarProducts from './Sections/SimilarProducts';

const BundlesDetails = () => {
  return (
    <Layer className="mt-5">
      <Container>
        <ProductDetailsSections />
        <TabsSection />
        <SimilarProducts />
      </Container>
    </Layer>
  );
};

export default BundlesDetails;
