import Layer from '@/components/atomic/Layer';
import RewardCard from '@/components/molecules/RewardCard';
import Container from '@/components/organism/Container';
import { EnjoyWinWinData } from '@/data';
import React from 'react';

const EnjoyWinWin = () => {
  return (
    <Layer otherClassName="bg-[var(--daleel-glass-lavender)]">
      <Container otherClassName="py-[70px]">
        <h2 className="text-3xl font-semibold mb-6 max-sm:text-center">
          الكل رابح مع إنجوي قيمز
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-6">
          {EnjoyWinWinData.map((sec) => (
            <RewardCard key={sec.id} {...sec} />
          ))}
        </div>
      </Container>
    </Layer>
  );
};

export default EnjoyWinWin;
