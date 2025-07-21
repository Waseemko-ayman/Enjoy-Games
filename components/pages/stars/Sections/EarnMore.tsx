'use client';
import PointsEarningGuide from '@/components/molecules/PointsEarningGuide';
import DiscoverEarnMoreCard from '@/components/organism/DiscoverEarnMoreCard';
import { useTranslations } from 'next-intl';
import React from 'react';

const EarnMore = () => {
  const t = useTranslations('Stars.ReferralProgram');
  return (
    <DiscoverEarnMoreCard
      title={t('title')}
      description={t('description')}
      imageSrc="character.png"
    >
      <PointsEarningGuide isLogin={false} />
    </DiscoverEarnMoreCard>
  );
};

export default EarnMore;
