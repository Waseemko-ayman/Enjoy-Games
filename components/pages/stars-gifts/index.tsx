import ProductCard from '@/components/atomic/ProductCard';
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

const StarsGiftsPage = () => {
  const secTexts = useTranslations('SectionsTitles.Gifts');
  const { data, loading: isLoading } = useMainContent();
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
        ) : (
          <GridWrapper otherClassName="mt-3">
            {Array.isArray(data?.newly_arrived) &&
              data.newly_arrived.map((card, index) => {
                const { image, ...cardWithoutImage } = card;
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
