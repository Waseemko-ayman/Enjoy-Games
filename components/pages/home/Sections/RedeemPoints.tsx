'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import Loading from '@/components/molecules/loading';
import ResponsiveWrapper from '@/components/molecules/ResponsiveWrapper';
import useIsMobile from '@/hook/useIsMobile';
import Link from 'next/link';
import { PiShoppingCartLight } from 'react-icons/pi';
import { useTranslations } from 'next-intl';
import { NewlyArrivedProps } from '@/interfaces';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import { useRouter } from 'next/navigation';
import { API_IMAGE_URL } from '@/config/api';
import NoDataMessage from '@/components/organism/NoDataMessage';
const ProductCard = dynamic(() => import('@/components/atomic/ProductCard'), {
  loading: () => <Loading />,
});

const RedeemPoints: React.FC<NewlyArrivedProps> = ({
  t,
  newlyArrived,
  isLoading,
  getSlugs,
  error,
}) => {
  const isMobile = useIsMobile();
  const btnText = useTranslations('BtnTexts');
  const router = useRouter();

  return (
    <ResponsiveWrapper>
      <div
        className={`bg-[var(--enjoy-secondary-light)] overflow-hidden pt-5 pb-7 sm:pb-10 ${
          isMobile ? '' : 'rounded-[20px]'
        }`}
      >
        <div className="flex items-center justify-between gap-1 px-5 sm:px-10">
          <AnimatedWrapper direction="x">
            <h2 className="text-xl font-semibold my-3 inline-block">
              {t('sectionsTitles.redeemPoints.title')}
            </h2>
          </AnimatedWrapper>
          <AnimatedWrapper direction="x" distance={-40}>
            <Link href="#" className="text-base">
              {t('sectionsTitles.redeemPoints.showAll')}
            </Link>
          </AnimatedWrapper>
        </div>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <ErrorFetching />
        ) : newlyArrived?.length === 0 ? (
          <NoDataMessage />
        ) : (
          <GridWrapper
            otherClassName="mt-3 !p-5 md:!py-0 px-5 sm:px-10"
            isScrollable
          >
            {newlyArrived?.map((card, index) => {
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
                    btnText={btnText('GetItNow')}
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
      </div>
    </ResponsiveWrapper>
  );
};

export default RedeemPoints;
