import React from 'react';
import ProductCard from '@/components/atomic/ProductCard';
import Layer from '@/components/atomic/Layer';
import SectionTitle from '@/components/atomic/SectionTitle';
import Container from '@/components/organism/Container';
import { MdWavingHand } from 'react-icons/md';
import { PiShoppingCartLight } from 'react-icons/pi';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { useTranslations } from 'next-intl';
import { useMainContent } from '@/context/MainContentContext';
import Loading from '@/components/molecules/loading';

const EnjoyGamesGifts = () => {
  const secTexts = useTranslations('SectionsTitles.Gifts');
  const btnTexts = useTranslations('BtnTexts');
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3">
            {Array.isArray(data?.newly_arrived) &&
              data.newly_arrived.map((card, index) => {
                const { image, ...cardWithoutImage } = card;
                return (
                  <AnimatedWrapper key={card.id} custom={index}>
                    <ProductCard
                      key={card.id}
                      image={image || '/assets/play-station.webp'}
                      imgAlt={card.title}
                      imgTitle={card.title}
                      showDesc
                      variant="column"
                      showBtn
                      btnVariant="secondary"
                      btnText={btnTexts('GetItNow')}
                      icon={PiShoppingCartLight}
                      {...cardWithoutImage}
                    />
                  </AnimatedWrapper>
                );
              })}
          </div>
        )}
      </Container>
    </Layer>
  );
};

export default EnjoyGamesGifts;
