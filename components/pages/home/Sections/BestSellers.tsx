import dynamic from 'next/dynamic';
import React from 'react';
import SectionComponent from '@/components/atomic/SectionComponent';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import { ProductCardProps, TranslationFunction } from '@/interfaces';
import Loading from '@/components/molecules/loading';
const ProductCard = dynamic(() => import('@/components/atomic/ProductCard'), {
  loading: () => <Loading />,
});

const BestSellers = ({
  t,
  bestSeller,
}: {
  t: TranslationFunction;
  bestSeller: ProductCardProps[];
}) => {
  return (
    <SectionComponent title={t('sectionsTitles.bestSellers')}>
      <GridWrapper isScrollable>
        {bestSeller?.map((card, index) => (
          <AnimatedWrapper key={card.id} custom={index}>
            <ProductCard
              // imgSrc={card.image}
              image={'/assets/best-sellers/itunes.webp'}
              imgAlt={card.title}
              imgTitle={card.title}
              title={card.title}
              tall
            />
          </AnimatedWrapper>
        ))}
      </GridWrapper>
    </SectionComponent>
  );
};

export default BestSellers;
