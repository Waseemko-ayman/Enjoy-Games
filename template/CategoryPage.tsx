'use client';

import { FC } from 'react';
import PageHeader from '@/components/molecules/PageHeader';
import { CategoryPageProps } from '@/interfaces';
import CategoryCardsGrid from '@/components/organism/CategoryCardsGrid';

const CategoryPage: FC<CategoryPageProps> = ({ cards }) => {
  return (
    <div>
      <PageHeader />
      <CategoryCardsGrid cards={cards} />
    </div>
  );
};

export default CategoryPage;
