import ProductCard from '@/components/atomic/ProductCard';
import SectionComponent from '@/components/atomic/SectionComponent';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import Loading from '@/components/molecules/loading';
import { useCartContext } from '@/context/CartContext';
import { useMainContent } from '@/context/MainContentContext';
import { getSlugsProps, ProductCardProps } from '@/interfaces';
import { useToast } from '@/lib/toast';
import { useTranslations } from 'next-intl';
import React from 'react';
import { PiShoppingCartLight } from 'react-icons/pi';

const SimilarProducts: React.FC<getSlugsProps> = ({ getSlugs }) => {
  const t = useTranslations('productDetails');
  const btnTxts = useTranslations('BtnTexts');
  const { data, isLoading, error } = useMainContent();
  const msgTxts = useTranslations('Messages');
  const { addToCart } = useCartContext();
  const { showToast } = useToast();

  const handleAddToCart = (product: ProductCardProps) => {
    addToCart(product);
    showToast(`${product.title} ${msgTxts('addedToCart')}`);
  };
  return (
    <SectionComponent title={t('relatedProducts')}>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorFetching />
      ) : (
        <GridWrapper
          otherClassName="gap-5"
          isScrollable
        >
          {Array.isArray(data?.newly_arrived) &&
            data.newly_arrived.map((card, index) => {
              const { image, ...cardWithoutImage } = card;
              const slugs =
                card.sub_category_id !== undefined
                  ? getSlugs(card.sub_category_id)
                  : null;
              return (
                <AnimatedWrapper key={card.id} custom={index}>
                  <ProductCard
                    // imgSrc={card.image}
                    image={image || '/assets/play-station.webp'}
                    imgAlt={card.title}
                    imgTitle={card.title}
                    showDesc
                    variant="column"
                    showBtn
                    btnVariant="secondary"
                    btnText={btnTxts('GetItNow')}
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
    </SectionComponent>
  );
};

export default SimilarProducts;
