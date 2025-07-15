import { useRewardProgress } from '@/hook/useRewardProgress';
import { RewardTier } from '@/interfaces';
import React from 'react';
import Layer from '../atomic/Layer';
import Container from './Container';
import Link from 'next/link';
import Image from 'next/image';
import { PATHS } from '@/data/paths';

export const mockApiData: RewardTier[] = [
  { id: 1, name: 'سلة التسوق', percentage: 1, isActive: true },
  { id: 2, name: 'الدفع', percentage: 2, isActive: false },
  { id: 3, name: 'إتمام الطلب', percentage: 3, isActive: false },
];

const CartHeader = () => {
  const targetPercentage = 2;
  const { currentPercentage, currentTier, connectionLineWidth } =
    useRewardProgress(mockApiData, targetPercentage);
  return (
    <Layer otherClassName="bg-white pb-4 md:pb-6 md:px-8 !my-0">
      <Container>
        <div className="flex items-center gap-1 sm:gap-10">
          <Link href={PATHS.HOME.link}>
            <div className="relative w-[90px] sm:w-[130px] aspect-square">
              <Image
                src="/assets/logo.png"
                alt="Enjoy Games"
                title="Enjoy Games"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <div className="relative z-20 w-full max-w-3/4 max-sm:overflow-x-auto max-sm:scroll-smooth scrollbar-none">
            <div className="min-w-max">
              <div className="flex justify-between items-center pt-10 max-sm:pt-7 space-x-9 px-2 sm:px-0">
                {mockApiData.map((tier) => {
                  const isReached = currentPercentage >= tier.percentage;
                  const isCurrentTier = tier.id === currentTier.id;

                  return (
                    <div key={tier.id} className="flex flex-col items-center">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 transition-all duration-500 ${
                          isCurrentTier
                            ? 'bg-enjoy-primary shadow-lg scale-110 ring-4 ring-purple-200'
                            : isReached
                            ? 'bg-purple-500'
                            : 'bg-gray-400'
                        }`}
                      >
                        <div className="bg-white w-2.5 h-2.5 rounded-full"></div>
                      </div>

                      <h3
                        className={`text-sm font-semibold mb-2 transition-colors duration-300 ${
                          isReached ? 'text-enjoy-primary' : 'text-gray-600'
                        }`}
                      >
                        {tier.name}
                      </h3>
                    </div>
                  );
                })}
              </div>

              {/* Background Line */}
              <div className="h-1 bg-gray-300 w-full mt-1 rounded-full relative">
                {/* Active Line inside */}
                <div
                  className="h-1 bg-enjoy-primary rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${connectionLineWidth}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layer>
  );
};

export default CartHeader;
