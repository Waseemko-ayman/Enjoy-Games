import CommonCard from '@/components/atomic/CommonCard';
import Layer from '@/components/atomic/Layer';
import SectionTitle from '@/components/atomic/SectionTitle';
import GridWrapper from '@/components/molecules/GridWrapper';
import Container from '@/components/organism/Container';
import { NewlyArrivedData } from '@/data';
import React from 'react';
import { PiShoppingCartLight } from 'react-icons/pi';

const StarsGiftsPage = () => {
  return (
    <Layer>
      <Container>
        <SectionTitle
          title="هدايا دليل ستارز 🤩"
          subtitle="يمكنك استبدال البطاقات بنقاط دليل ستارز!"
        />
        <GridWrapper otherClassName="mt-3 !py-0 px-5 sm:px-10">
          {NewlyArrivedData.map((card) => (
            <CommonCard
              key={card.id}
              imgAlt={card.title}
              imgTitle={card.title}
              imgSrc={`/assets/newly-arrived/${card.src}.webp`}
              storeFlagImg={`/assets/flags/${card.storeFlagImgSrc}.png`}
              description
              variant="column"
              showBtn
              btnVariant="secondary"
              btnText="ليس لديك نقاط كافية"
              Icon={PiShoppingCartLight}
              {...card}
            />
          ))}
        </GridWrapper>
      </Container>
    </Layer>
  );
};

export default StarsGiftsPage;
