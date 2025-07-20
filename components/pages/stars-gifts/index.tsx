import ProductCard from '@/components/atomic/ProductCard';
import Layer from '@/components/atomic/Layer';
import SectionTitle from '@/components/atomic/SectionTitle';
import GridWrapper from '@/components/molecules/GridWrapper';
import Container from '@/components/organism/Container';
import { NewlyArrivedData } from '@/data';
import React from 'react';
import { PiShoppingCartLight } from 'react-icons/pi';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';

const StarsGiftsPage = () => {
  return (
    <Layer>
      <Container>
        <SectionTitle
          title="هدايا دليل ستارز 🤩"
          subtitle="يمكنك استبدال البطاقات بنقاط دليل ستارز!"
        />
        <GridWrapper otherClassName="mt-3">
          {NewlyArrivedData.map((card, index) => (
            <AnimatedWrapper key={card.id} custom={index}>
              <ProductCard
                imgAlt={card.title}
                imgTitle={card.title}
                imgSrc={card.src}
                description
                showBtn={true}
                btnVariant="primary"
                btnText="إشترِ الآن"
                Icon={PiShoppingCartLight}
                {...card}
              />
            </AnimatedWrapper>
          ))}
        </GridWrapper>
      </Container>
    </Layer>
  );
};

export default StarsGiftsPage;
