import CommonCard from '@/components/atomic/CommonCard';
import Layer from '@/components/atomic/Layer';
import GridWrapper from '@/components/molecules/GridWrapper';
import { NewlyArrivedData } from '@/data';
import Link from 'next/link';
import React from 'react';
import { PiShoppingCartLight } from 'react-icons/pi';

const RedeemPoints = () => {
  return (
    <Layer>
      <div className="bg-[var(--enjoy-secondary-light)] rounded-[20px] overflow-hidden px-5 pt-5 pb-7 sm:px-10 sm:pb-10">
        <div className="flex items-center justify-between gap-1">
          <h2 className="text-xl px-3 lg:px-0 font-semibold my-3 inline-block">
            استبدل نقاطك
          </h2>
          <Link href="#" className="text-lg">
            عرض الكل
          </Link>
        </div>
        <GridWrapper otherClassName="mt-3 !p-0" isScrollable>
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
              btnText="أحصل عليها الآن"
              Icon={PiShoppingCartLight}
              {...card}
            />
          ))}
        </GridWrapper>
      </div>
    </Layer>
  );
};

export default RedeemPoints;
