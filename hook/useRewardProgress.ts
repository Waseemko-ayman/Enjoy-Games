'use client';
import { useEffect, useState } from 'react';
import { RewardTier } from '@/interfaces';

export const useRewardProgress = (tiers: RewardTier[], target: number) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [rewardTiers, setRewardTiers] = useState<RewardTier[]>(tiers);

  // Animate progress
  useEffect(() => {
    let animation: number;
    const animate = () => {
      setCurrentPercentage((prev) => {
        if (prev < target) {
          const next = Math.min(prev + 0.01, target);
          animation = requestAnimationFrame(animate);
          return next;
        }
        return prev;
      });
    };
    animate();
    return () => cancelAnimationFrame(animation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update active tiers
  useEffect(() => {
    setRewardTiers(
      tiers.map((tier) => ({
        ...tier,
        isActive: currentPercentage >= tier.percentage,
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPercentage]);

  const getCurrentTier = () => {
    const active = rewardTiers.filter((t) => currentPercentage >= t.percentage);
    return active.length > 0 ? active[active.length - 1] : rewardTiers[0];
  };

  const getConnectionLineWidth = () => {
    const min = Math.min(...tiers.map((t) => t.percentage));
    const max = Math.max(...tiers.map((t) => t.percentage));
    return ((currentPercentage - min) / (max - min)) * 100;
  };

  return {
    rewardTiers,
    currentPercentage,
    currentTier: getCurrentTier(),
    connectionLineWidth: getConnectionLineWidth(),
  };
};
