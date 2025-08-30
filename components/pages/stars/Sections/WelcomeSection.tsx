'use client';
import CardWrapper from '@/components/atomic/CardWrapper';
import Layer from '@/components/atomic/Layer';
import SectionTitle from '@/components/atomic/SectionTitle';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import EarningsPointsSection from '@/components/molecules/EarningsPointsSection';
import PointsEarningGuide from '@/components/molecules/PointsEarningGuide';
import Container from '@/components/organism/Container';
import React from 'react';
import { MdWavingHand } from 'react-icons/md';
import { useTranslations } from 'next-intl';
import { useAuthContext } from '@/context/AuthContext';
import { WalletProvider } from '@/context/WalletContext';

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
          <WalletProvider>
            <EarningsPointsSection
              variant="points"
              withdrawableAmount={0}
              conversionRate={`1000 ${sharedTexts('point')}`}
              lastWithdrawalText={sharedTexts('emptyState')}
              btnTexts={btnTexts}
            />
          </WalletProvider>
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
