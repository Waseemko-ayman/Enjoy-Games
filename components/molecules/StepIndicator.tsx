'use client';

import React from 'react';
import { Check } from 'lucide-react';
import Layer from '../atomic/Layer';
import Container from '../organism/Container';
import Link from 'next/link';
import Image from 'next/image';
import { PATHS } from '@/data/paths';
import { StepIndicatorProps } from '@/interfaces';
import { useTranslations } from 'next-intl';
import { FaX } from 'react-icons/fa6';

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, success }) => {
  // const totalSteps = steps.length;
  // const completedCount = steps.filter((s) => s.isCompleted).length;
  // const progressPercentage =
  //   success === false || success === true
  //     ? 100
  //     : (completedCount / (totalSteps - 1)) * 100;

  const currentStepIndex = steps.findIndex((step) => step.isCurrent);
  const progressPercentage = steps[2]?.isCurrent
    ? 100
    : (currentStepIndex / (steps.length - 1)) * 100;

  const t = useTranslations('MyCart.stepsTitles');

  return (
    <Layer otherClassName="bg-white pb-4 md:pb-6 md:px-8 !my-0">
      <Container>
        <div className="flex items-center gap-1 sm:gap-10">
          <Link href={PATHS.HOME.link}>
            <div className="relative w-[90px] sm:w-[130px] aspect-square">
              <Image
                src="/assets/logo.png"
                alt="Enjoy Games Logo"
                title="Enjoy Games"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <div className="relative z-20 w-full max-w-3/4 mx-auto max-sm:overflow-x-auto max-sm:scroll-smooth scrollbar-none">
            <div className="min-w-max">
              <div className="flex justify-between items-center pt-10 max-sm:pt-7 space-x-9 px-2 sm:px-0">
                {steps.map((step) => {
                  const isFinalStep = step.id === 3;
                  const failed = isFinalStep && success === false;

                  const circleClasses = step.isCompleted
                    ? failed
                      ? 'bg-red-500 border-red-500 text-white shadow-lg scale-110 ring-4 ring-red-200'
                      : 'bg-green-500 border-green-500 text-white shadow-lg scale-110 ring-4 ring-green-200'
                    : step.isCurrent
                    ? 'bg-purple-600 border-purple-600 text-white shadow-lg scale-110 ring-4 ring-purple-200'
                    : 'bg-gray-200 border-gray-300 text-gray-500';

                  const labelColor = step.isCompleted
                    ? failed
                      ? 'text-red-500'
                      : 'text-enjoy-primary'
                    : 'text-gray-600';

                  return (
                    <div key={step.id} className="flex flex-col items-center">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border-2 mb-3 transition-all duration-300 ${circleClasses}`}
                      >
                        {step.isCompleted ? (
                          failed ? (
                            <FaX className="w-3 h-3" />
                          ) : (
                            <Check className="w-3.5 h-3.5" />
                          )
                        ) : (
                          <div className="bg-white w-2.5 h-2.5 rounded-full"></div>
                        )}
                      </div>

                      <h3
                        className={`text-sm font-semibold mb-2 transition-colors duration-300 ${labelColor}`}
                      >
                        {t(step.key)}
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
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layer>
  );
};

export default StepIndicator;
