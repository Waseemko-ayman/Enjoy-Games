'use client';
import React from 'react';
import TierProgressWrapper from '@/components/organism/TierProgressWrapper';
import { useRewardProgress } from '@/hook/useRewardProgress';
import { mockApiData } from '@/data';

const Upgrade = () => {
  const targetPercentage = 0.4;
  const { currentPercentage, currentTier, connectionLineWidth } =
    useRewardProgress(mockApiData, targetPercentage);

  return (
    <TierProgressWrapper
      title="شارك أكثر، واكسب أكثر"
      connectionLineWidth={connectionLineWidth}
      progress={currentPercentage.toFixed(1)}
      progressFooter={{ type: 'text', text: 'تبقى لترقيتك 100 مستخدم' }}
    >
      {mockApiData.map((tier) => {
        const isReached = currentPercentage >= tier.percentage;
        const isCurrentTier = tier.id === currentTier.id;

        return (
          <div key={tier.id} className="flex flex-col items-center">
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

            <h3
              className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                isReached ? 'text-purple-600' : 'text-gray-600'
              }`}
            >
              {tier.name}
            </h3>

            <p className="text-sm text-gray-500">
              <span className="text-green-600 font-bold">
                %{tier.percentage}
              </span>{' '}
              عائد لكل عملية
            </p>
          </div>
        );
      })}
    </TierProgressWrapper>
  );
};

export default Upgrade;
