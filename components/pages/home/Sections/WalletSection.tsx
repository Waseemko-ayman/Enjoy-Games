'use client';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import InlineError from '@/components/molecules/InlineError';
import WalletCard from '@/components/molecules/WalletCard';
import Container from '@/components/organism/Container';
import { useWallet } from '@/context/WalletContext';
import { PATHS } from '@/data/paths';
import { TranslationFunction } from '@/interfaces';
import { Sparkles, Wallet } from 'lucide-react';
import React from 'react';

const WalletSection = ({ t }: { t: TranslationFunction }) => {
  const { myWallet, isLoading, error } = useWallet();

  // const walletValue = isLoading ? (
  //   <ButtonLoading />
  // ) : error ? (
  //   <InlineError />
  // ) : (
  //   `${myWallet?.wallet_balance?.amount ?? 0} ${
  //     myWallet?.wallet_balance?.currency ?? ''
  //   }`
  // );

  const getCardValue = (value?: string | number) => {
    if (isLoading) return <ButtonLoading />;
    if (error) return <InlineError />;
    return value ?? 0;
  };

  const WalletSectionData = [
    {
      id: 1,
      link: PATHS.WALLET.link,
      title: 'wallet',
      value: getCardValue(
        `${myWallet?.wallet_balance?.amount} ${myWallet?.wallet_balance?.currency}`
      ),
      icon: Wallet,
      bgColor: 'bg-violet-600',
      textColor: 'text-white',
      isUnitTranslatable: false,
    },
    {
      id: 2,
      link: PATHS.STARS.link,
      title: 'stars',
      value: getCardValue(myWallet?.points_balance),
      unit: 'point',
      icon: Sparkles,
      bgColor: 'bg-orange-300',
      textColor: 'text-[#060919]',
      isUnitTranslatable: true,
    },
  ];

  return (
    <Container otherClassName="mt-10">
      <GridWrapper gridCols="!grid-cols-2">
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
