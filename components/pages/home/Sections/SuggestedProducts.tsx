import ProductCard from '@/components/atomic/ProductCard';
import SectionComponent from '@/components/atomic/SectionComponent';
import GridWrapper from '@/components/molecules/GridWrapper';
import { SuggestedProdData } from '@/data';
import React from 'react';

const SuggestedProducts = () => {
  return (
    <SectionComponent title="منتجات مقترحة">
      <GridWrapper isScrollable>
        {SuggestedProdData.map((card) => (
          <ProductCard
            key={card.id}
            imgSrc={card.src}
            imgAlt={card.title}
            imgTitle={card.title}
            title={card.title}
          />
        ))}
      </GridWrapper>
    </SectionComponent>
  );
};

export default SuggestedProducts;
