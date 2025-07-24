import React, { FC } from 'react';
import Container from '@/components/organism/Container';
import { CategoryPageProps } from '@/interfaces';
import CategoryCard from '../molecules/CategoryCard';
import GridWrapper from '../molecules/GridWrapper';
import AnimatedWrapper from '../molecules/FramerMotion/AnimatedWrapper';

const CategoryCardsGrid: FC<CategoryPageProps> = ({ cards }) => {
  return (
    <Container>
      <GridWrapper otherClassName="gap-8 mt-12">
        {cards.map((card, index) => (
          <AnimatedWrapper key={card.id} custom={index}>
            <CategoryCard
              banner={card.banner}
              label={card.label}
              onClick={card.onClick}
            />
          </AnimatedWrapper>
        ))}
      </GridWrapper>
    </Container>
  );
};

export default CategoryCardsGrid;
