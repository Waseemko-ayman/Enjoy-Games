import React from 'react';
import dynamic from 'next/dynamic';
import SectionComponent from '@/components/atomic/SectionComponent';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import Loading from '@/components/molecules/loading';
import { ProductCardProps, TranslationFunction } from '@/interfaces';
const ProductCard = dynamic(() => import('@/components/atomic/ProductCard'), {
  loading: () => <Loading />,
});

const SuggestedProducts = ({
  t,
  suggestedProducts,
  isLoading,
}: {
  t: TranslationFunction;
  suggestedProducts: ProductCardProps[];
  isLoading: boolean;
}) => {
  return (
    <SectionComponent title={t('sectionsTitles.suggestedProducts')}>
      {isLoading ? (
        <Loading />
      ) : (
        <GridWrapper isScrollable>
          {suggestedProducts.map((card, index) => (
            <AnimatedWrapper key={card.id} custom={index}>
              <ProductCard
                // imgSrc={card.image}
                image={'/assets/play-station.webp'}
                imgAlt={card.title}
                imgTitle={card.title}
                title={card.title}
              />
            </AnimatedWrapper>
          ))}
        </GridWrapper>
      )}
    </SectionComponent>
  );
};

export default SuggestedProducts;
