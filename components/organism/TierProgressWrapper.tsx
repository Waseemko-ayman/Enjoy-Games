'use client';
import React from 'react';
import Layer from '@/components/atomic/Layer';
import Container from '@/components/organism/Container';
import SectionTitle from '@/components/atomic/SectionTitle';
import ProgressCircle from '@/components/molecules/ProgressCircle';
import { TierProgressWrapperProps } from '@/interfaces';
import AnimatedWrapper from '../molecules/FramerMotion/AnimatedWrapper';
import Loading from '../molecules/loading';
import ErrorFetching from '../molecules/ErrorFetching';

const TierProgressWrapper: React.FC<TierProgressWrapperProps> = ({
  children,
  title,
  connectionLineWidth,
  progress,
  progressFooter,
  isLoading,
  error,
}) => {
  return (
    <Layer otherClassName="bg-enjoy-gray-light pt-16 pb-36">
      <Container>
        <div className="max-w-6xl mx-auto relative">
          <AnimatedWrapper>
            <SectionTitle
              title={title}
              className="!mb-3"
              titleClassName="!text-2xl"
            />
          </AnimatedWrapper>

          <AnimatedWrapper>
            <div className="relative z-20 w-full max-[991px]:overflow-x-auto max-[991px]:scroll-smooth scrollbar-none">
              <div className="min-w-max">
                {/* Scrollable children */}
                {isLoading ? (
                  <Loading />
                ) : error ? (
                  <ErrorFetching />
                ) : (
                  <div className="flex justify-between items-center pt-10 max-sm:pt-7 space-x-9 px-5 sm:px-0">
                    {children}
                  </div>
                )}

                {/* Background Line */}
                <div className="h-1 bg-gray-300 w-full mt-4 rounded-full relative">
                  {/* Active Line inside */}
                  <div
                    className="h-1 bg-enjoy-primary rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${connectionLineWidth}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </AnimatedWrapper>

          {/* Progress Circle */}
          <AnimatedWrapper>
            <div className="mt-14 flex justify-center">
              <ProgressCircle
                progress={progress}
                progressColor="text-green-600"
                footer={progressFooter}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </AnimatedWrapper>
        </div>
      </Container>
    </Layer>
  );
};

export default TierProgressWrapper;
