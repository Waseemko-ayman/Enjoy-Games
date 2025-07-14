'use client';
import React from 'react';
import TierProgressWrapper from '@/components/organism/TierProgressWrapper';
import TierBadge from '@/components/molecules/TierBadge';
import { tiers } from '@/data';
import { useRewardProgress } from '@/hook/useRewardProgress';

const Upgrade = () => {
  const targetPercentage = 0.7;
  const { rewardTiers, currentPercentage, connectionLineWidth } =
    useRewardProgress(tiers, targetPercentage);

  const updatedTiers = rewardTiers.map((tier) => ({
    ...tier,
    isActive: currentPercentage >= tier.percentage,
  }));

  return (
    <TierProgressWrapper
      title="إشتري أكثر، وضاعف نقاطك"
      connectionLineWidth={connectionLineWidth}
      progress={currentPercentage.toFixed(1)}
      progressFooter={{ type: 'text', text: 'تبقى لترقيتك 100 مستخدم' }}
      // posotionLine="top-full"
    >
      {updatedTiers.map((tier) => (
        <TierBadge
          key={tier.id}
          Icon={tier.icon}
          name={tier.name}
          isActive={tier.isActive}
          progress={currentPercentage}
          requiredProgress={tier.percentage}
        />
      ))}
    </TierProgressWrapper>
  );
};

export default Upgrade;
