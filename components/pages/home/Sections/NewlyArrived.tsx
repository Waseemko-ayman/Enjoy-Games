import CommonCard from '@/components/atomic/CommonCard';
import SectionComponent from '@/components/atomic/SectionComponent';
import { NewlyArrivedData } from '@/data';
import React from 'react';
import { PiShoppingCartLight } from 'react-icons/pi';

const NewlyArrived = () => {
  return (
    <SectionComponent title="وصل حديثًا">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {NewlyArrivedData.map((card) => (
          <CommonCard
            key={card.id}
            imgAlt={card.title}
            imgTitle={card.title}
            imgSrc={`/assets/newly-arrived/${card.src}.webp`}
            storeFlagImg={`/assets/flags/${card.storeFlagImgSrc}.png`}
            description
            btnVariant="primary"
            btnText="اشترِ الآن"
            otherClassNameBtn="p-3"
            Icon={PiShoppingCartLight}
            {...card}
          />
        ))}
      </div>
    </SectionComponent>
  );
};

export default NewlyArrived;
