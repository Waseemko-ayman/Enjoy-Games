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
import { ProductCardProps } from '@/interfaces';
import { useCartContext } from '@/context/CartContext';
import { useToast } from '@/lib/toast';
const ProductCard = dynamic(() => import('@/components/atomic/ProductCard'), {
  loading: () => <Loading />,
});

const StarsGiftsPage = () => {
  const secTexts = useTranslations('SectionsTitles.Gifts');
  const { data, isLoading, error } = useMainContent();
  const { categories } = useCategories();
  const msgTxts = useTranslations('Messages');
  const { addToCart } = useCartContext();
  const { showToast } = useToast();

  const handleAddToCart = (product: ProductCardProps) => {
    addToCart(product);
    showToast(`${product.title} ${msgTxts('addedToCart')}`);
  };
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
                      image={image || '/assets/play-station.webp'}
                      imgAlt={card.title}
                      imgTitle={card.title}
                      showDesc
                      showBtn={true}
                      btnVariant="primary"
                      btnText="إشترِ الآن"
                      icon={PiShoppingCartLight}
                      onClick={() => {
                        if (slugs) {
                          const { categorySlug, subCategorySlug } = slugs;
                          const path = `/categories/${categorySlug}/${subCategorySlug}/product/${card.slug}`;
                          window.location.href = path;
                        }
                      }}
                      onAddToCart={() => handleAddToCart(card)}
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
