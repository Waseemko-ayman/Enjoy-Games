import ProductCard from '@/components/atomic/ProductCard';
import Layer from '@/components/atomic/Layer';
import SectionTitle from '@/components/atomic/SectionTitle';
import Container from '@/components/organism/Container';
import { NewlyArrivedData } from '@/data';
import React from 'react';
import { MdWavingHand } from 'react-icons/md';
import { PiShoppingCartLight } from 'react-icons/pi';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';

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
          {NewlyArrivedData.map((card, index) => (
            <AnimatedWrapper key={card.id} custom={index}>
              <ProductCard
                key={card.id}
                imgAlt={card.title}
                imgTitle={card.title}
                imgSrc={card.src}
                description
                variant="column"
                showBtn
                btnVariant="secondary"
                btnText="إحصل عليها الآن"
                Icon={PiShoppingCartLight}
                {...card}
              />
            </AnimatedWrapper>
          ))}
        </div>
      </Container>
    </Layer>
  );
};

export default EnjoyGamesGifts;
