import Layer from '@/components/atomic/Layer';
import ProgressCircle from '@/components/molecules/ProgressCircle';
import TierBadge from '@/components/molecules/TierBadge';
import Container from '@/components/organism/Container';
import { tiers } from '@/data';
import React from 'react';

const RewardsTierSection = () => {
  return (
    <Layer otherClassName="bg-enjoy-gray-light py-16 px-4">
      <Container>
        <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-3 text-center">إشتري أكثر، وضاعف نقاطك</h2>

          {/* Tier Badges */}
          <div className="flex justify-center mb-20">
            <div className="flex w-max items-end gap-8 sm:gap-12 md:gap-20 overflow-x-auto px-3 pt-6 scrollbar-none">
              {tiers.map((tier) => (
                <TierBadge key={tier.id} {...tier} />
              ))}
            </div>
          </div>

          {/* Progress Circle */}
          <ProgressCircle />
        </div>
      </Container>
    </Layer>
  );
};

export default RewardsTierSection;
