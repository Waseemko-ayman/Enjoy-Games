import React from 'react';
import dynamic from 'next/dynamic';
import SectionComponent from '@/components/atomic/SectionComponent';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import Loading from '@/components/molecules/loading';
import { SuggestedProductsProps } from '@/interfaces';
const ProductCard = dynamic(() => import('@/components/atomic/ProductCard'), {
  loading: () => <Loading />,
});

const SuggestedProducts: React.FC<SuggestedProductsProps> = ({
  t,
  suggestedProducts,
  isLoading,
  getSlugs,
}) => {
  return (
    <SectionComponent title={t('sectionsTitles.suggestedProducts')}>
      {isLoading ? (
        <Loading />
      ) : (
        <GridWrapper isScrollable>
          {suggestedProducts.map((card, index) => {
            const slugs =
              card.sub_category_id !== undefined
                ? getSlugs(card.sub_category_id)
                : null;
            return (
              <AnimatedWrapper key={card.id} custom={index}>
                <ProductCard
                  // imgSrc={card.image}
                  image={'/assets/play-station.webp'}
                  imgAlt={card.title}
                  imgTitle={card.title}
                  title={card.title}
                  onClick={() => {
                    if (slugs) {
                      const { categorySlug, subCategorySlug } = slugs;
                      const path = `/categories/${categorySlug}/${subCategorySlug}/product/${card.slug}`;
                      window.location.href = path;
                    }
                  }}
                />
              </AnimatedWrapper>
            );
          })}
        </GridWrapper>
      )}
    </SectionComponent>
  );
};

export default SuggestedProducts;
