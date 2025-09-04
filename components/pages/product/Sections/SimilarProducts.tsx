import ProductCard from '@/components/atomic/ProductCard';
import SectionComponent from '@/components/atomic/SectionComponent';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import Loading from '@/components/molecules/loading';
import { API_IMAGE_URL } from '@/config/api';
import { SimilarProductsProps } from '@/interfaces';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';
import { PiShoppingCartLight } from 'react-icons/pi';

const SimilarProducts: React.FC<SimilarProductsProps> = ({
  getSlugs,
  products,
  isLoading,
  error,
}) => {
  const t = useTranslations('productDetails');
  const btnTxts = useTranslations('BtnTexts');
  const router = useRouter();

  return (
    <SectionComponent title={t('relatedProducts')}>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorFetching />
      ) : (
        <GridWrapper otherClassName="gap-5" isScrollable>
          {Array.isArray(products) &&
            products?.map((card, index) => {
              const { image, ...cardWithoutImage } = card;
              const slugs =
                card.sub_category_id !== undefined
                  ? getSlugs(card.sub_category_id)
                  : null;
              return (
                <AnimatedWrapper key={card.id} custom={index}>
                  <ProductCard
                    image={`${API_IMAGE_URL}${image}`}
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

export default SimilarProducts;
