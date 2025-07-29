'use client';
import React from 'react';
import TierProgressWrapper from '@/components/organism/TierProgressWrapper';
import TierBadge from '@/components/molecules/TierBadge';
import { tiers } from '@/data';
import { useRewardProgress } from '@/hook/useRewardProgress';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { useTranslations } from 'next-intl';

const Upgrade = () => {
  const targetPercentage = 0.7;
  const { rewardTiers, currentPercentage, connectionLineWidth } =
    useRewardProgress(tiers, targetPercentage);

  const updatedTiers = rewardTiers.map((tier) => ({
    ...tier,
    isActive: currentPercentage >= tier.percentage,
  }));

  const starsTexts = useTranslations('Stars.Upgrade');

  return (
    <TierProgressWrapper
      title={starsTexts('title')}
      connectionLineWidth={connectionLineWidth}
      progress={currentPercentage.toFixed(1)}
      progressFooter={{
        type: 'text',
        text: starsTexts('percentageSection.note', { note: 100 }),
      }}
    >
      {updatedTiers.map((tier, index) => (
        <AnimatedWrapper key={tier.id} custom={index}>
          <TierBadge
            icon={tier.icon}
            name={starsTexts(`levels.${tier.key}`)}
            isActive={tier.isActive}
            progress={currentPercentage}
            requiredProgress={tier.percentage}
            starsTexts={starsTexts}
          />
        </AnimatedWrapper>
      ))}
    </TierProgressWrapper>
  );
};

export default Upgrade;
