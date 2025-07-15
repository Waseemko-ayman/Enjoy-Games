import React, { FC } from 'react';
import Container from '@/components/organism/Container';
import { CategoryPageProps } from '@/interfaces';
import CategoryCard from '../molecules/CategoryCard';
import GridWrapper from '../molecules/GridWrapper';

const CategoryCardsGrid: FC<CategoryPageProps> = ({ cards }) => {
  return (
    <Container>
      <GridWrapper otherClassName="gap-8 mt-12">
        {cards.map((card, index) => (
          <CategoryCard
            key={index}
            href={card.href}
            banner={card.banner}
            label={card.label}
          />
        ))}
      </GridWrapper>
    </Container>
  );
};

export default CategoryCardsGrid;
