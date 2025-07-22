'use client';
import PointsEarningGuide from '@/components/molecules/PointsEarningGuide';
import DiscoverEarnMoreCard from '@/components/organism/DiscoverEarnMoreCard';
import { useToggleLocale } from '@/hook/useToggleLocale';
import { useTranslations } from 'next-intl';
import React from 'react';

const EarnMore = () => {
  const t = useTranslations('Stars.ReferralProgram');
  const { isArabic } = useToggleLocale();
  return (
    <DiscoverEarnMoreCard
      title={t('title')}
      description={t('description')}
      imageSrc="character.png"
    >
      <PointsEarningGuide
        isLogin={false}
        descClassName={isArabic ? 'text-sm' : 'text-xs'}
      />
    </DiscoverEarnMoreCard>
  );
};

export default EarnMore;
