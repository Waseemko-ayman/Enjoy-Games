'use client';
import CardWrapper from '@/components/atomic/CardWrapper';
import Layer from '@/components/atomic/Layer';
import SectionTitle from '@/components/atomic/SectionTitle';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import EarningsPointsSection from '@/components/molecules/EarningsPointsSection';
import PointsEarningGuide from '@/components/molecules/PointsEarningGuide';
import Container from '@/components/organism/Container';
import { PATHS } from '@/data/paths';
import React from 'react';
import { MdWavingHand } from 'react-icons/md';
import { useTranslations } from 'next-intl';
import { useAuthContext } from '@/context/AuthContext';

const WelcomeSection = () => {
  const { token } = useAuthContext();
  const secTexts = useTranslations('SectionsTitles.Stars');
  const sharedTexts = useTranslations('Shared');
  const btnTexts = useTranslations('BtnTexts');
  return (
    <Layer>
      <Container>
        <SectionTitle
          title={secTexts('title')}
          subtitle={secTexts('desc')}
          icon={MdWavingHand}
        />
        {token ? (
          <EarningsPointsSection
            variant="points"
            totalAmount={0}
            withdrawableAmount={0}
            conversionRate={`1600 ${sharedTexts('point')}`}
            starPoints={0}
            lastWithdrawalText={sharedTexts('emptyState')}
            secondButtonHref={PATHS.STARS_GIFTS}
            btnTexts={btnTexts}
          />
        ) : (
          <AnimatedWrapper>
            <CardWrapper className="py-6 px-5 sm:px-8 mb-8 w-full sm:max-w-5/6 mx-auto">
              <PointsEarningGuide />
            </CardWrapper>
          </AnimatedWrapper>
        )}
      </Container>
    </Layer>
  );
};

export default WelcomeSection;
