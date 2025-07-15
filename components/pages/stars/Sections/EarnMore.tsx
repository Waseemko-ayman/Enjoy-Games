'use client';
import PointsEarningGuide from '@/components/molecules/PointsEarningGuide';
import DiscoverEarnMoreCard from '@/components/organism/DiscoverEarnMoreCard';
import React from 'react';

const EarnMore = () => {
  return (
    <DiscoverEarnMoreCard
      title="تعرف على نظام دليل ستارز"
      description="تعرف كيف تكسب و تترقى مع دليل ستارز"
      imageSrc="character.png"
    >
      <PointsEarningGuide isLogin={false} />
    </DiscoverEarnMoreCard>
  );
};

export default EarnMore;
