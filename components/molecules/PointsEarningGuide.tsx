import React from 'react';
import { PiSparkleFill } from 'react-icons/pi';
import { featuresData } from '@/data';
import FeatureCard from './FeatureCard';
import Link from 'next/link';
import { PATHS } from '@/data/paths';
import AnimatedWrapper from './FramerMotion/AnimatedWrapper';
import { useTranslations } from 'next-intl';
import { useAuthContext } from '@/context/AuthContext';

const PointsEarningGuide = ({ descClassName }: { descClassName?: string }) => {
  const t = useTranslations('Stars.ReferralProgram.EnjoyGames');
  const { token } = useAuthContext();
  return (
    <div>
      <div className="text-center mb-3 sm:mb-8 p-3 rounded-2xl border border-gray-200">
        <h2 className="text-base sm:text-lg font-semibold text-[var(--enjoy-secondary)] flex items-center justify-center gap-2">
          <PiSparkleFill className="w-6 h-6" />
          {t('mainTitle')}
        </h2>
      </div>

      <p className="text-center mb-3 leading-relaxed text-sm sm:text-base">
        {t('description')}
      </p>

      <h3 className="text-lg font-semibold text-center mb-3">
        {t('howItWorksTitle')}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {featuresData.map((feature, index) => (
          <AnimatedWrapper key={index} custom={index}>
            <FeatureCard
              key={feature.id}
              title={t(`features.${feature.key}.title`)}
              description={t(`features.${feature.key}.description`)}
              bgColor={feature.bgColor}
              textColor={feature.textColor}
              descClassName={descClassName}
            />
          </AnimatedWrapper>
        ))}
      </div>

      <div className="text-center flex items-center gap-1 justify-center text-xs sm:text-base font-bold">
        {token ? (
          <>
            <p>
              {t('startNow')} {t('cta')} 🔥
            </p>
          </>
        ) : (
          <>
            <Link
              href={PATHS.LOGIN}
              className="text-enjoy-primary hover:text-enjoy-primary-soft transition-all duration-300"
            >
              {t('registerNow')}
            </Link>
            <p>{t('cta')} 🔥</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PointsEarningGuide;
