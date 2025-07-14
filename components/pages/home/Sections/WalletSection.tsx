import GridWrapper from '@/components/molecules/GridWrapper';
import WalletCard from '@/components/molecules/WalletCard';
import Container from '@/components/organism/Container';
import { cardsData } from '@/data';
import React from 'react';

const WalletSection = () => {
  return (
    <Container otherClassName="mt-10">
      <GridWrapper gridCols="grid-cols-1">
        {cardsData.map((card) => (
          <WalletCard
            key={card.id}
            pathName={card.link}
            title={card.title}
            value={card.value}
            unit={card.unit}
            Icon={card.icon}
            bgColor={card.bgColor}
            textColor={card.textColor}
          />
        ))}
      </GridWrapper>
    </Container>
  );
};

export default WalletSection;
