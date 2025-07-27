'use client';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import Container from '@/components/organism/Container';
import { CategoryPageProps } from '@/interfaces';
import GridWrapper from '../molecules/GridWrapper';
import AnimatedWrapper from '../molecules/FramerMotion/AnimatedWrapper';
import Loading from '../molecules/loading';

const CategoryCard = dynamic(() => import('../molecules/CategoryCard'), {
  loading: () => <Loading />,
});

const CategoryCardsGrid: FC<CategoryPageProps> = ({ cards }) => {
  return (
    <Container>
      <GridWrapper otherClassName="gap-8 mt-12">
        {cards.map((card, index) => (
          <AnimatedWrapper key={card.id} custom={index}>
            <CategoryCard
              image={'/assets/play-station.webp'}
              name={card.name}
              onClick={card.onClick}
            />
          </AnimatedWrapper>
        ))}
      </GridWrapper>
    </Container>
  );
};

export default CategoryCardsGrid;
