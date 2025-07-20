import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import WalletCard from '@/components/molecules/WalletCard';
import Container from '@/components/organism/Container';
import { WalletSectionData } from '@/data';
import React from 'react';

const WalletSection = () => {
  return (
    <Container otherClassName="mt-10">
      <GridWrapper gridCols="grid-cols-1">
        {WalletSectionData.map((card, index) => (
          <AnimatedWrapper key={card.id} custom={index}>
            <WalletCard
              pathName={card.link}
              title={card.title}
              value={card.value}
              unit={card.unit}
              Icon={card.icon}
              bgColor={card.bgColor}
              textColor={card.textColor}
            />
          </AnimatedWrapper>
        ))}
      </GridWrapper>
    </Container>
  );
};

export default WalletSection;
