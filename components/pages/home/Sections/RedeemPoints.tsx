'use client';
const ProductCard = lazy(() => import('@/components/atomic/ProductCard'));
import React, { lazy, Suspense } from 'react';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import Loading from '@/components/molecules/loading';
import ResponsiveWrapper from '@/components/molecules/ResponsiveWrapper';
import { NewlyArrivedData } from '@/data';
import { PATHS } from '@/data/paths';
import useIsMobile from '@/hook/useIsMobile';
import Link from 'next/link';
import { PiShoppingCartLight } from 'react-icons/pi';
import { useTranslations } from 'next-intl';
import { TranslationFunction } from '@/interfaces';

const RedeemPoints = ({ t }: { t: TranslationFunction }) => {
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
        <GridWrapper
          otherClassName="mt-3 !p-5 md:!py-0 px-5 sm:px-10"
          isScrollable
        >
          {NewlyArrivedData.map((card, index) => (
            <AnimatedWrapper key={card.id} custom={index}>
              <Suspense fallback={<Loading />}>
                <ProductCard
                  imgSrc={card.image}
                  imgAlt={card.name}
                  imgTitle={card.name}
                  description
                  variant="column"
                  showBtn
                  btnVariant="secondary"
                  btnText={btnText('GetItNow')}
                  icon={PiShoppingCartLight}
                  {...card}
                />
              </Suspense>
            </AnimatedWrapper>
          ))}
        </GridWrapper>
      </div>
    </ResponsiveWrapper>
  );
};

export default RedeemPoints;
