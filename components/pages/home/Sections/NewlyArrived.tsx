'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import SectionComponent from '@/components/atomic/SectionComponent';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import Loading from '@/components/molecules/loading';
import { useTranslations } from 'next-intl';
import { NewlyArrivedProps } from '@/interfaces';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import { useRouter } from 'next/navigation';

const ProductCard = dynamic(() => import('@/components/atomic/ProductCard'), {
  loading: () => <Loading />,
});

const NewlyArrived: React.FC<NewlyArrivedProps> = ({
  t,
  isLoading,
  getSlugs,
  newlyArrived,
  error,
}) => {
  const btnText = useTranslations('BtnTexts');
  const router = useRouter();
  return (
    <SectionComponent title={t('sectionsTitles.newlyArrived')}>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorFetching />
      ) : (
        <GridWrapper otherClassName="gap-5" isScrollable>
          {newlyArrived.map((card, index) => {
            const { image, ...cardWithoutImage } = card;
            const slugs =
              card.sub_category_id !== undefined
                ? getSlugs(card.sub_category_id)
                : null;
            return (
              <AnimatedWrapper key={card.id} custom={index}>
                <ProductCard
                  image={image || '/assets/play-station.webp'}
                  imgAlt={card.title}
                  imgTitle={card.title}
                  showDesc
                  btnVariant="primary"
                  btnText={btnText('BuyNow')}
                  showBtn
                  onClick={() => {
                    if (slugs) {
                      const { categorySlug, subCategorySlug } = slugs;
                      const path = `/categories/${categorySlug}/${subCategorySlug}/product/${card.slug}`;
                      router.push(path);
                    }
                  }}
                  productData={card}
                  {...cardWithoutImage}
                />
              </AnimatedWrapper>
            );
          })}
        </GridWrapper>
      )}
    </SectionComponent>
  );
};

export default NewlyArrived;
