'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import Loading from '@/components/molecules/loading';
import ResponsiveWrapper from '@/components/molecules/ResponsiveWrapper';
import { PATHS } from '@/data/paths';
import useIsMobile from '@/hook/useIsMobile';
import Link from 'next/link';
import { PiShoppingCartLight } from 'react-icons/pi';
import { useTranslations } from 'next-intl';
import { NewlyArrivedProps } from '@/interfaces';
const ProductCard = dynamic(() => import('@/components/atomic/ProductCard'), {
  loading: () => <Loading />,
});

const RedeemPoints: React.FC<NewlyArrivedProps> = ({
  t,
  newlyArrived,
  isLoading,
  getSlugs,
}) => {
  const isMobile = useIsMobile();
  const btnText = useTranslations('BtnTexts');
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
            <Link href={PATHS.STARS_GIFTS} className="text-base">
              {t('sectionsTitles.redeemPoints.showAll')}
            </Link>
          </AnimatedWrapper>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <GridWrapper
            otherClassName="mt-3 !p-5 md:!py-0 px-5 sm:px-10"
            isScrollable
          >
            {newlyArrived.map((card, index) => {
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
                    btnText={btnText('GetItNow')}
                    icon={PiShoppingCartLight}
                    onClick={() => {
                      if (slugs) {
                        const { categorySlug, subCategorySlug } = slugs;
                        const path = `/categories/${categorySlug}/${subCategorySlug}/product/${card.slug}`;
                        window.location.href = path;
                      }
                    }}
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
