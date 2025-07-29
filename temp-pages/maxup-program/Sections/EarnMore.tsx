'use client';
import EarnMoreDrawerCard from '@/components/molecules/EarnMoreDrawerCard';
import DiscoverEarnMoreCard from '@/components/organism/DiscoverEarnMoreCard';
import { inviteStepsData } from '@/data';
import { useTranslations } from 'next-intl';
import React from 'react';

const EarnMore = () => {
  const t = useTranslations('MaxupProgram.ReferralProgram');
  return (
    <DiscoverEarnMoreCard
      title={t('title')}
      description={t('description')}
      imageSrc="character.png"
    >
      {inviteStepsData.map((step, index) => {
        const stepKey = `step${step.id}`;
        return (
          <EarnMoreDrawerCard
            key={step.id}
            id={step.id}
            title={t(`steps.${stepKey}.title`)}
            description={t(`steps.${stepKey}.description`)}
            image={step.image}
            otherClassName={
              index !== inviteStepsData.length - 1
                ? 'border-b border-gray-300'
                : ''
            }
            // footerType={step.footerType}
            // order={step.order}
          />
        );
      })}
    </DiscoverEarnMoreCard>
  );
};

export default EarnMore;
