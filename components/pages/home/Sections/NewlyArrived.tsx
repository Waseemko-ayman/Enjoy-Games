import CommonCard from '@/components/atomic/CommonCard';
import SectionComponent from '@/components/atomic/SectionComponent';
import GridWrapper from '@/components/molecules/GridWrapper';
import { NewlyArrivedData } from '@/data';
import React from 'react';

const NewlyArrived = () => {
  return (
    <SectionComponent title="وصل حديثًا">
      <GridWrapper otherClassName="gap-5" isScrollable>
        {NewlyArrivedData.map((card) => (
          <CommonCard
            key={card.id}
            imgAlt={card.title}
            imgTitle={card.title}
            imgSrc={card.src}
            description
            showBtn={true}
            btnVariant="primary"
            btnText="إشترِ الآن"
            {...card}
          />
        ))}
      </GridWrapper>
    </SectionComponent>
  );
};

export default NewlyArrived;
