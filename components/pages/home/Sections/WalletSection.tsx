'use client';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import InlineError from '@/components/molecules/InlineError';
import WalletCard from '@/components/molecules/WalletCard';
import Container from '@/components/organism/Container';
import { useTotalPaid } from '@/context/TotalPaidContext';
import { PATHS } from '@/data/paths';
import { TranslationFunction } from '@/interfaces';
import { Sparkles, Wallet } from 'lucide-react';
import React from 'react';

const WalletSection = ({ t }: { t: TranslationFunction }) => {
  const { totalPaid, isLoading, error } = useTotalPaid();

  const walletValue = isLoading ? (
    <ButtonLoading />
  ) : error ? (
    <InlineError />
  ) : (
    `${totalPaid?.amount ?? 0} ${totalPaid?.currency ?? ''}`
  );

  const WalletSectionData = [
    {
      id: 1,
      link: PATHS.WALLET.link,
      title: 'wallet',
      value: walletValue,
      icon: Wallet,
      bgColor: 'bg-violet-600',
      textColor: 'text-white',
      isUnitTranslatable: false,
    },
    {
      id: 2,
      link: PATHS.STARS.link,
      title: 'stars',
      value: '0',
      unit: 'point',
      icon: Sparkles,
      bgColor: 'bg-orange-300',
      textColor: 'text-[#060919]',
      isUnitTranslatable: true,
    },
    // {
    //   id: 3,
    //   link: '#',
    //   title: 'maxup',
    //   value: '0',
    //   unit: '/assets/saudi_riyal.png',
    //   icon: Wallet,
    //   bgColor: 'bg-amber-50',
    //   textColor: 'text-[#060919]',
    //   isUnitTranslatable: false,
    // },
  ];

  return (
    <Container otherClassName="mt-10">
      <GridWrapper gridCols="grid-cols-1 md:!grid-cols-2">
        {WalletSectionData.map((card, index) => (
          <AnimatedWrapper key={card.id} custom={index}>
            <WalletCard
              pathName={card.link}
              title={t(`walletSections.${card.title}`)}
              value={card.value}
              unit={
                card.isUnitTranslatable
                  ? t(`walletSections.${card.unit}`)
                  : card.unit
              }
              icon={card.icon}
              bgColor={card.bgColor}
              textColor={card.textColor}
              isUnitTranslatable={card.isUnitTranslatable}
            />
          </AnimatedWrapper>
        ))}
      </GridWrapper>
    </Container>
  );
};

export default WalletSection;
