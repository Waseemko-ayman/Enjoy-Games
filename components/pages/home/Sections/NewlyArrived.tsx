const ProductCard = lazy(() => import('@/components/atomic/ProductCard'));
import SectionComponent from '@/components/atomic/SectionComponent';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import Loading from '@/components/molecules/loading';
import { NewlyArrivedData } from '@/data';
import { TranslationFunction } from '@/interfaces';
import { useTranslations } from 'next-intl';
import React, { lazy, Suspense } from 'react';

const NewlyArrived = ({ t }: { t: TranslationFunction }) => {
  const btnText = useTranslations('BtnTexts');

  return (
    <SectionComponent title={t('sectionsTitles.newlyArrived')}>
      <GridWrapper otherClassName="gap-5" isScrollable>
        {NewlyArrivedData.map((card, index) => (
          <AnimatedWrapper key={card.id} custom={index}>
            <Suspense fallback={<Loading />}>
              <ProductCard
                imgAlt={card.title}
                imgTitle={card.title}
                imgSrc={card.src}
                description
                showBtn={true}
                btnVariant="primary"
                btnText={btnText('BuyNow')}
                {...card}
              />
            </Suspense>
          </AnimatedWrapper>
        ))}
      </GridWrapper>
    </SectionComponent>
  );
};

export default NewlyArrived;
