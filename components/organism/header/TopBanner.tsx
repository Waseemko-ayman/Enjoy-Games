import Link from 'next/link';
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';

const TopBanner = () => {
  return (
    <Link href="#" dir="ltr">
      <div className="bg-daleel-primary text-white text-center py-2 px-2 text-lg font-bold relative">
        <div className="flex items-center justify-center gap-2">
          <IoIosArrowBack />
          <span>🎉 !إشتري أكثر وإكسب الضعف وإستبدل نقاطك ببطاقات</span>
          <span className="text-sm text-[var(--daleel-primary-deep)] bg-[var(--daleel-lime-yellow)] rounded-4xl px-1.5">
            جديد
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TopBanner;
