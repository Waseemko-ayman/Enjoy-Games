const ProductCard = lazy(() => import('@/components/atomic/ProductCard'));
import SectionComponent from '@/components/atomic/SectionComponent';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import Loading from '@/components/molecules/loading';
import { SuggestedProdData } from '@/data';
import { TranslationFunction } from '@/interfaces';
import React, { lazy, Suspense } from 'react';

interface SimpleProduct {
  id: number;
  image: string;
  name: string;
}

const SuggestedProducts = ({
  t,
  suggestedProducts,
}: {
  t: TranslationFunction;
  suggestedProducts: SimpleProduct;
}) => {
  return (
    <SectionComponent title={t('sectionsTitles.suggestedProducts')}>
      <GridWrapper isScrollable>
        {SuggestedProdData.map((card, index) => (
          <AnimatedWrapper key={card.id} custom={index}>
            <Suspense fallback={<Loading />}>
              <ProductCard
                imgSrc={card.image}
                imgAlt={card.name}
                imgTitle={card.name}
                name={card.name}
              />
            </Suspense>
          </AnimatedWrapper>
        ))}
      </GridWrapper>
    </SectionComponent>
  );
};

export default SuggestedProducts;
