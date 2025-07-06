import CommonCard from '@/components/atomic/CommonCard';
import SectionComponent from '@/components/atomic/SectionComponent';
import { SuggestedProdData } from '@/data';
import React from 'react';

const SuggestedProducts = () => {
  return (
    <SectionComponent title="منتجات مقترحة">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {SuggestedProdData.map((card) => (
          <CommonCard
            key={card.id}
            imgSrc={`/assets/suggested-products/${card.src}.jpg`}
            imgAlt={card.title}
            imgTitle={card.title}
            title={card.title}
          />
        ))}
      </div>
    </SectionComponent>
  );
};

export default SuggestedProducts;
