import React from 'react';
import dynamic from 'next/dynamic';
import SectionComponent from '@/components/atomic/SectionComponent';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import Loading from '@/components/molecules/loading';
import { SuggestedProductsProps } from '@/interfaces';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import { useRouter } from 'next/navigation';
import { API_IMAGE_URL } from '@/config/api';
import NoDataMessage from '@/components/organism/NoDataMessage';
const ProductCard = dynamic(() => import('@/components/atomic/ProductCard'), {
  loading: () => <Loading />,
});

const SuggestedProducts: React.FC<SuggestedProductsProps> = ({
  t,
  suggestedProducts,
  isLoading,
  getSlugs,
  error,
}) => {
  const router = useRouter();
  return (
    <SectionComponent title={t('sectionsTitles.suggestedProducts')}>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorFetching />
      ) : suggestedProducts?.length === 0 ? (
        <NoDataMessage />
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
                  image={
                    `${API_IMAGE_URL}${card.image}` ||
                    '/assets/no-image-available.webp'
                  }
                  imgAlt={card.title}
                  imgTitle={card.title}
                  title={card.title}
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

export default SuggestedProducts;
