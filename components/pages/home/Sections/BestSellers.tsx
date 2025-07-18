import ProductCard from '@/components/atomic/ProductCard';
import SectionComponent from '@/components/atomic/SectionComponent';
import GridWrapper from '@/components/molecules/GridWrapper';
import { BestSellersData } from '@/data';
import React from 'react';

const BestSellers = () => {
  return (
    <SectionComponent title="البطاقات الأكثر مبيعًا">
      <GridWrapper isScrollable>
        {BestSellersData.map((card) => (
          <ProductCard
            key={card.id}
            imgSrc={card.src}
            imgAlt={card.title}
            imgTitle={card.title}
            title={card.title}
            tall
          />
        ))}
      </GridWrapper>
    </SectionComponent>
  );
};

export default BestSellers;
