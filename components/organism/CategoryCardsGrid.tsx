import React, { FC } from 'react';
import Container from '@/components/organism/Container';
import Layer from '@/components/atomic/Layer';
import { CategoryPageProps } from '@/interfaces';
import CategoryCard from '../molecules/CategoryCard';

const CategoryCardsGrid: FC<CategoryPageProps> = ({ cards }) => {
  return (
    <Container>
      <Layer otherClassName="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <CategoryCard
            key={index}
            href={card.href}
            banner={card.banner}
            label={card.label}
          />
        ))}
      </Layer>
    </Container>
  );
};

export default CategoryCardsGrid;
