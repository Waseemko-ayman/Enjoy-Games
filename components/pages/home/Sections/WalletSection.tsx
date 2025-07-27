import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import WalletCard from '@/components/molecules/WalletCard';
import Container from '@/components/organism/Container';
import { WalletSectionData } from '@/data';
import { TranslationFunction } from '@/interfaces';
import React from 'react';

const WalletSection = ({ t }: { t: TranslationFunction }) => {
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
