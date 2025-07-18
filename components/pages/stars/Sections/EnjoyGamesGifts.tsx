import ProductCard from '@/components/atomic/ProductCard';
import Layer from '@/components/atomic/Layer';
import SectionTitle from '@/components/atomic/SectionTitle';
import Container from '@/components/organism/Container';
import { NewlyArrivedData } from '@/data';
import React from 'react';
import { MdWavingHand } from 'react-icons/md';
import { PiShoppingCartLight } from 'react-icons/pi';

const EnjoyGamesGifts = () => {
  return (
    <Layer>
      <Container>
        <SectionTitle
          title="هدايا إنجوي قيمز"
          subtitle="يمكنك استبدال البطاقات بنقاط إنجوي قيمز!"
          Icon={MdWavingHand}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3">
          {NewlyArrivedData.map((card) => (
            <ProductCard
              key={card.id}
              imgAlt={card.title}
              imgTitle={card.title}
              imgSrc={`/assets/newly-arrived/${card.src}.webp`}
              storeFlagImg={`/assets/flags/${card.storeFlagImgSrc}.png`}
              description
              variant="column"
              showBtn
              btnVariant="secondary"
              btnText="إحصل عليها الآن"
              Icon={PiShoppingCartLight}
              {...card}
            />
          ))}
        </div>
      </Container>
    </Layer>
  );
};

export default EnjoyGamesGifts;
