import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import Link from 'next/link';
import React from 'react';

const StepIndicator = () => {
  return (
    <div className="border-b border-gray-300 pb-7">
      <AnimatedWrapper>
        <div className="flex items-center justify-between gap-2">
          <h5 className="font-semibold text-sm">الترقية الحالية لحسابك</h5>
          <div className="bg-enjoy-primary text-white w-7 h-7 flex items-center justify-center rounded-full">
            1
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">0.3 % لكل عملية</p>
        <Link href="#" className="text-sm text-enjoy-primary font-semibold">
          تعرف على المزيد
        </Link>
      </AnimatedWrapper>
    </div>
  );
};

export default StepIndicator;
