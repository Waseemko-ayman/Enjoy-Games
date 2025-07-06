import CommonCard from '@/components/atomic/CommonCard';
import SectionComponent from '@/components/atomic/SectionComponent';
import { BestSellersData } from '@/data';
import React from 'react';

const BestSellers = () => {
  return (
    <SectionComponent title="البطاقات الأكثر مبيعًا">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {BestSellersData.map((card) => (
          <CommonCard
            key={card.id}
            imgSrc={`/assets/best-sellers/${card.src}.webp`}
            imgAlt={card.title}
            imgTitle={card.title}
            title={card.title}
            tall
          />
        ))}
      </div>
    </SectionComponent>
  );
};

export default BestSellers;
