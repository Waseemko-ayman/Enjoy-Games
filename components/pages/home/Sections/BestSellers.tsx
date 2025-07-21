import React, { lazy, Suspense } from 'react';
const ProductCard = lazy(() => import('@/components/atomic/ProductCard'));
import SectionComponent from '@/components/atomic/SectionComponent';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import Loading from '@/components/molecules/loading';
import { BestSellersData } from '@/data';
import { TranslationFunction } from '@/interfaces';

const BestSellers = ({ t }: { t: TranslationFunction }) => {
  return (
    <SectionComponent title={t('sectionsTitles.bestSellers')}>
      <GridWrapper isScrollable>
        {BestSellersData.map((card, index) => (
          <AnimatedWrapper key={card.id} custom={index}>
            <Suspense fallback={<Loading />}>
              <ProductCard
                imgSrc={card.src}
                imgAlt={card.title}
                imgTitle={card.title}
                title={card.title}
                tall
              />
            </Suspense>
          </AnimatedWrapper>
        ))}
      </GridWrapper>
    </SectionComponent>
  );
};

export default BestSellers;
