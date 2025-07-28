import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { TranslationFunction } from '@/interfaces';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

const StepIndicator = ({ t }: { t: TranslationFunction }) => {
  const btnTexts = useTranslations('BtnTexts');
  const currentPercentage = '0.3 %';
  return (
    <div className="border-b border-gray-300 pb-7">
      <AnimatedWrapper>
        <div className="flex items-center justify-between gap-2">
          <h5 className="font-semibold text-sm">{t('rank.title')}</h5>
          <div className="bg-enjoy-primary text-white w-7 h-7 flex items-center justify-center rounded-full">
            1
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {t('rank.commission', { percentage: currentPercentage })}
        </p>
        <Link href="#" className="text-sm text-enjoy-primary font-semibold">
          {btnTexts('LearnMore')}
        </Link>
      </AnimatedWrapper>
    </div>
  );
};

export default StepIndicator;
