import CommonCard from '@/components/atomic/CommonCard';
import Layer from '@/components/atomic/Layer';
import { NewlyArrivedData } from '@/data';
import Link from 'next/link';
import React from 'react';
import { PiShoppingCartLight } from 'react-icons/pi';

const RedeemPoints = () => {
  return (
    <Layer>
      <div className="bg-[var(--daleel-secondary-light)] rounded-[20px] overflow-hidden px-10 pt-5 pb-10">
        <div className="flex items-center justify-between gap-1">
          <h2 className="text-xl px-3 lg:px-0 font-semibold my-3 inline-block">
            استبدل نقاطك
          </h2>
          <Link href="#" className="text-lg">
            عرض الكل
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3">
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
              btnText="إحصل عليها الآن"
              Icon={PiShoppingCartLight}
              {...card}
            />
          ))}
        </div>
      </div>
    </Layer>
  );
};

export default RedeemPoints;
