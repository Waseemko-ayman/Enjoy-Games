import dynamic from 'next/dynamic';
import React from 'react';
import SectionComponent from '@/components/atomic/SectionComponent';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import Loading from '@/components/molecules/loading';
import { CardProps, TranslationFunction } from '@/interfaces';
import { useTranslations } from 'next-intl';

const ProductCard = dynamic(() => import('@/components/atomic/ProductCard'), {
  loading: () => <Loading />,
});

const NewlyArrived = ({
  t,
  newlyArrived,
}: {
  t: TranslationFunction;
  newlyArrived: CardProps[];
}) => {
  const btnText = useTranslations('BtnTexts');

  return (
    <SectionComponent title={t('sectionsTitles.newlyArrived')}>
      <GridWrapper otherClassName="gap-5" isScrollable>
        {newlyArrived.map((card, index) => (
          <AnimatedWrapper key={card.id} custom={index}>
            <ProductCard
              // imgSrc={card.image}
              imgSrc={'/assets/play-station.webp'}
              imgAlt={card.title}
              imgTitle={card.title}
              showDesc
              btnVariant="primary"
              btnText={btnText('BuyNow')}
              showBtn
              {...card}
            />
          </AnimatedWrapper>
        ))}
      </GridWrapper>
    </SectionComponent>
  );
};

export default NewlyArrived;
