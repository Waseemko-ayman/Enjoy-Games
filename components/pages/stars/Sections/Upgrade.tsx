'use client';
import React from 'react';
import TierProgressWrapper from '@/components/organism/TierProgressWrapper';
import TierBadge from '@/components/molecules/TierBadge';
import { tiers } from '@/data';
import { useRewardProgress } from '@/hook/useRewardProgress';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { useTranslations } from 'next-intl';
import { useWallet } from '@/context/WalletContext';

const Upgrade = () => {
  // API Context
  const { myWallet, isLoading, error } = useWallet();

  const walletAmount = myWallet?.wallet_balance?.amount || 0;

  // احسب النسبة بناءً على المبلغ الحالي
  const getTargetPercentage = () => {
    // لو أقل من أول tier
    if (walletAmount <= tiers[0].amount) return tiers[0].percentage;

    // مرّ على التيرات وتأكد في أي مرحلة هو
    for (let i = 1; i < tiers.length; i++) {
      const prevTier = tiers[i - 1];
      const currentTier = tiers[i];

      if (walletAmount < currentTier.amount) {
        // interpolation بين tier السابق والحالي
        const range = currentTier.amount - prevTier.amount;
        const progress = (walletAmount - prevTier.amount) / range;

        return (
          prevTier.percentage +
          progress * (currentTier.percentage - prevTier.percentage)
        );
      }
    }

    // لو تعدى آخر tier
    return tiers[tiers.length - 1].percentage;
  };

  const targetPercentage = getTargetPercentage();

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
      progress={String(currentPercentage)}
      progressFooter={{
        type: 'text',
        text: starsTexts('percentageSection.note', { note: 100 }),
      }}
      isLoading={isLoading}
      error={error}
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
