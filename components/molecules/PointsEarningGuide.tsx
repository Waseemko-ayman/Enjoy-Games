import React from 'react';
import { PiSparkleFill } from 'react-icons/pi';
import { featuresData } from '@/data';
import FeatureCard from './FeatureCard';
import Link from 'next/link';
import { PATHS } from '@/data/paths';

const PointsEarningGuide = ({ isLogin = true }: { isLogin?: boolean }) => {
  return (
    <div>
      <div className="text-center mb-3 sm:mb-8 p-3 rounded-2xl border border-gray-200">
        <h2 className="text-lg font-semibold text-[var(--enjoy-secondary)] flex items-center justify-center gap-2">
          <PiSparkleFill className="w-6 h-6" />
          كلما اشتريت أكثر، كلما كسبت أكثر!
        </h2>
      </div>

      <p className="text-center mb-3 leading-relaxed text-base">
        إنجوي قيمز هو نظام ولاء يمنحك نقاطاً عند كل عملية شراء، والتي يمكنك
        استبدالها ببطاقات رقمية أو تحويلها إلى نقاط في محفظتك.
      </p>

      <h3 className="text-lg font-semibold text-center mb-3">
        كيف يعمل إنجوي قيمز؟
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {featuresData.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>

      <div className="text-center flex items-center gap-1 justify-center text-base font-bold">
        {isLogin ? (
          <>
            <p>ابدأ الآن وحقق أقصى استفادة من مشترياتك! 🔥</p>
          </>
        ) : (
          <>
            <Link
              href={PATHS.LOGIN}
              className="text-enjoy-primary hover:text-enjoy-primary-soft transition-all duration-300"
            >
              سجل الآن
            </Link>
            <p>وحقق أقصى استفادة من مشترياتك! 🔥</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PointsEarningGuide;
