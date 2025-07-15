import CommonCard from '@/components/atomic/CommonCard';
import SectionComponent from '@/components/atomic/SectionComponent';
import GridWrapper from '@/components/molecules/GridWrapper';
import { SuggestedProdData } from '@/data';
import React from 'react';

const SuggestedProducts = () => {
  return (
    <SectionComponent title="منتجات مقترحة">
      <GridWrapper isScrollable>
        {SuggestedProdData.map((card) => (
          <CommonCard
            key={card.id}
            imgSrc={`/assets/suggested-products/${card.src}.jpg`}
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
