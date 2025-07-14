'use client';
import EarnMoreDrawerCard from '@/components/molecules/EarnMoreDrawerCard';
import DiscoverEarnMoreCard from '@/components/organism/DiscoverEarnMoreCard';
import { inviteStepsData } from '@/data';
import React from 'react';

const EarnMore = () => {
  return (
    <DiscoverEarnMoreCard
      title="إكتشف مكسب الآن"
      description="تعرف كيف تزيد مكسبك وترتقي في المستويات!"
      imageSrc="character.png"
    >
      {inviteStepsData.map((step, index) => (
        <EarnMoreDrawerCard
          key={step.id}
          id={step.id}
          title={step.title}
          description={step.description}
          image={step.image}
          footerType={step.footerType}
          order={step.order}
          otherClassName={
            index !== inviteStepsData.length - 1
              ? 'border-b border-gray-300'
              : ''
          }
        />
      ))}
    </DiscoverEarnMoreCard>
  );
};

export default EarnMore;
