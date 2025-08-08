import dynamic from 'next/dynamic';
import React from 'react';
import SectionComponent from '@/components/atomic/SectionComponent';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import { BestSellersProps } from '@/interfaces';
import Loading from '@/components/molecules/loading';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import { useRouter } from 'next/navigation';
const ProductCard = dynamic(() => import('@/components/atomic/ProductCard'), {
  loading: () => <Loading />,
});

const BestSellers: React.FC<BestSellersProps> = ({
  t,
  bestSeller,
  isLoading,
  getSlugs,
  error,
}) => {
  const router = useRouter();
  return (
    <SectionComponent title={t('sectionsTitles.bestSellers')}>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorFetching />
      ) : (
        <GridWrapper isScrollable>
          {bestSeller.map((card, index) => {
            const slugs =
              card.sub_category_id !== undefined
                ? getSlugs(card.sub_category_id)
                : null;
            return (
              <AnimatedWrapper key={card.id} custom={index}>
                <ProductCard
                  // imgSrc={card.image}
                  image={'/assets/best-sellers/itunes.webp'}
                  imgAlt={card.title}
                  imgTitle={card.title}
                  title={card.title}
                  tall
                  onClick={() => {
                    if (slugs) {
                      const { categorySlug, subCategorySlug } = slugs;
                      const path = `/categories/${categorySlug}/${subCategorySlug}/product/${card.slug}`;
                      router.push(path);
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

export default BestSellers;
