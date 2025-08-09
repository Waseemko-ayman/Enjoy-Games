'use client';
import dynamic from 'next/dynamic';
import Layer from '@/components/atomic/Layer';
import SectionTitle from '@/components/atomic/SectionTitle';
import GridWrapper from '@/components/molecules/GridWrapper';
import Container from '@/components/organism/Container';
import React from 'react';
import { PiShoppingCartLight } from 'react-icons/pi';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { useMainContent } from '@/context/MainContentContext';
import Loading from '@/components/molecules/loading';
import { useTranslations } from 'next-intl';
import { MdWavingHand } from 'react-icons/md';
import { useCategories } from '@/context/CategoriesContext';
import { getCategoryAndSubCategorySlugs } from '@/utils/helpers';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import { useRouter } from 'next/navigation';
import { API_IMAGE_URL } from '@/config/api';
const ProductCard = dynamic(() => import('@/components/atomic/ProductCard'), {
  loading: () => <Loading />,
});

const StarsGiftsPage = () => {
  const btnText = useTranslations('BtnTexts');
  const secTexts = useTranslations('SectionsTitles.Gifts');
  const { data, isLoading, error } = useMainContent();
  const { categories } = useCategories();
  const router = useRouter();

  return (
    <Layer>
      <Container>
        <SectionTitle
          title={secTexts('title')}
          subtitle={secTexts('desc')}
          icon={MdWavingHand}
        />
        {isLoading ? (
          <Loading />
        ) : error ? (
          <ErrorFetching />
        ) : (
          <GridWrapper otherClassName="mt-3">
            {Array.isArray(data?.newly_arrived) &&
              data.newly_arrived.map((card, index) => {
                const { image, ...cardWithoutImage } = card;
                const slugs =
                  card.sub_category_id !== undefined
                    ? getCategoryAndSubCategorySlugs(
                        categories,
                        card.sub_category_id
                      )
                    : null;
                return (
                  <AnimatedWrapper key={card.id} custom={index}>
                    <ProductCard
                      image={
                        `${API_IMAGE_URL}${image}` ||
                        '/assets/play-station.webp'
                      }
                      imgAlt={card.title}
                      imgTitle={card.title}
                      showDesc
                      showBtn={true}
                      btnVariant="primary"
                      btnText={btnText('BuyNow')}
                      icon={PiShoppingCartLight}
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
      </Container>
    </Layer>
  );
};

export default StarsGiftsPage;
