'use client';
import CardWrapper from '@/components/atomic/CardWrapper';
import Layer from '@/components/atomic/Layer';
import SectionTitle from '@/components/atomic/SectionTitle';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import EarningsPointsSection from '@/components/molecules/EarningsPointsSection';
import PointsEarningGuide from '@/components/molecules/PointsEarningGuide';
import Container from '@/components/organism/Container';
import { PATHS } from '@/data/paths';
import React, { useState } from 'react';
import { MdWavingHand } from 'react-icons/md';

const WelcomeSection = () => {
  const [isLogin] = useState(true);
  return (
    <Layer>
      <Container>
        <SectionTitle
          title="أهلًا بك في دليل ستارز"
          subtitle="اشتري أكثر واكسب الضعف واستبدل نقاطك ببطاقات!"
          Icon={MdWavingHand}
        />
        {isLogin ? (
          <EarningsPointsSection
            variant="points"
            totalAmount={0}
            withdrawableAmount={0}
            conversionRate="1600 نقطة"
            starPoints={0}
            lastWithdrawalText="لا توجد عمليات سحب بعد"
            secondButtonHref={PATHS.STARS_GIFTS}
          />
        ) : (
          <AnimatedWrapper>
            <CardWrapper className="py-6 px-8 mb-8 max-w-5/6 mx-auto">
              <PointsEarningGuide isLogin={false} />
            </CardWrapper>
          </AnimatedWrapper>
        )}
      </Container>
    </Layer>
  );
};

export default WelcomeSection;
