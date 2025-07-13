/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Layer from '@/components/atomic/Layer';
import SectionTitle from '@/components/atomic/SectionTitle';
import ProgressCircle from '@/components/molecules/ProgressCircle';
import Container from '@/components/organism/Container';
import { RewardTier } from '@/interfaces';
import React, { useEffect, useState } from 'react';

const mockApiData: RewardTier[] = [
  { id: 1, name: 'البرونزية', percentage: 0.3, isActive: true },
  { id: 2, name: 'الفضية', percentage: 0.4, isActive: false },
  { id: 3, name: 'الذهبية', percentage: 0.5, isActive: false },
  { id: 4, name: 'البلاتينيوم', percentage: 0.6, isActive: false },
  { id: 5, name: 'VIP', percentage: 0.7, isActive: false },
];

const Upgrade = () => {
  const [rewardTiers, setRewardTiers] = useState<RewardTier[]>(mockApiData);
  const [currentPercentage, setCurrentPercentage] = useState<number>(0.5);
  const targetPercentage = 0.4;

  // Animate percentage increase
  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      setCurrentPercentage((prev) => {
        if (prev < targetPercentage) {
          const next = Math.min(prev + 0.01, targetPercentage);
          animationFrame = requestAnimationFrame(animate);
          return next;
        }
        return prev;
      });
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const getActivatedTiers = (percentage: number) => {
    return rewardTiers.map((tier) => ({
      ...tier,
      isActive: percentage >= tier.percentage,
    }));
  };

  const getConnectionLineWidth = (percentage: number) => {
    const minPercentage = 0.3;
    const maxPercentage = 0.7;
    return (
      ((percentage - minPercentage) / (maxPercentage - minPercentage)) * 100
    );
  };

  const getCurrentActiveTier = (percentage: number) => {
    const eligibleTiers = rewardTiers.filter(
      (tier) => percentage >= tier.percentage
    );
    return eligibleTiers.length > 0
      ? eligibleTiers[eligibleTiers.length - 1]
      : rewardTiers[0];
  };

  useEffect(() => {
    const updatedTiers = getActivatedTiers(currentPercentage);
    setRewardTiers(updatedTiers);
  }, [currentPercentage]);

  const currentTier = getCurrentActiveTier(currentPercentage);
  const connectionLineWidth = Math.max(
    0,
    Math.min(100, getConnectionLineWidth(currentPercentage))
  );

  return (
    <Layer otherClassName="bg-enjoy-gray-light pb-40 sm:pb-32 pt-16 px-4">
      <Container>
        <SectionTitle
          title="شارك أكثر، واكسب أكثر"
          className="!mb-3"
          titleClassName="!text-2xl"
        />

        {/* Reward Tiers */}
        <div className="relative mt-10 mb-16 max-sm:overflow-x-auto max-sm:scroll-smooth max-sm:whitespace-nowrap scrollbar-none w-full">
          {/* Background Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2 z-0 rounded-full"></div>

          {/* Active Connection Line */}
          <div
            className="absolute top-1/2 right-0 h-1 bg-purple-600 transform -translate-y-1/2 z-10 transition-all duration-700 ease-out rounded-full"
            style={{
              width: `${connectionLineWidth}%`,
            }}
          ></div>

          <div className="flex justify-between items-center relative z-20 max-sm:overflow-x-auto max-sm:scroll-smooth scrollbar-none min-w-max max-sm:pt-7">
            {rewardTiers.map((tier) => {
              const isReached = currentPercentage >= tier.percentage;
              const isCurrentTier = tier.id === currentTier.id;

              return (
                <div key={tier.id} className="flex flex-col items-center">
                  {/* Circle */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 transition-all duration-500 ${
                      isCurrentTier
                        ? 'bg-purple-600 shadow-lg scale-110 ring-4 ring-purple-200'
                        : isReached
                        ? 'bg-purple-500'
                        : 'bg-gray-400'
                    }`}
                  >
                    {tier.id}
                  </div>

                  {/* Tier Name */}
                  <h3
                    className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                      isReached ? 'text-purple-600' : 'text-gray-600'
                    }`}
                  >
                    {tier.name}
                  </h3>

                  {/* Percentage */}
                  <p className="text-sm text-gray-500">
                    <span className="text-green-600 font-bold">
                      %{tier.percentage}
                    </span>{' '}
                    عائد لكل عملية
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Central Display Circle */}
        <ProgressCircle
          progress={currentPercentage.toFixed(1)}
          progressColor="text-green-600"
          footer={{ type: 'text', text: 'تبقى لترقيتك 100 مستخدم' }}
        />
      </Container>
    </Layer>
  );
};

export default Upgrade;
