import Link from 'next/link';
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';

const TopBanner = () => {
  return (
    <Link href="#" dir="ltr">
      <div className="bg-daleel-primary text-white text-center py-2 px-1 text-sm min-[425px]:text-lg font-bold relative">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <div className="flex items-center gap-2 order-2 sm:order-1">
            <IoIosArrowBack />
            <span>🎉 !إشتري أكثر وإكسب الضعف وإستبدل نقاطك ببطاقات</span>
          </div>
          <span className="text-sm text-[var(--daleel-primary-deep)] bg-[var(--daleel-lime-yellow)] rounded-4xl px-1.5 order-1 sm:order-2">
            جديد
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TopBanner;
