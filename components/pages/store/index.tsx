'use client';
import dynamic from 'next/dynamic';
import React from 'react';
import Loading from '@/components/molecules/loading';
import { Category, SubCategories } from '@/interfaces';
import { useCategories } from '@/context/CategoriesContext';
import { useRouter } from 'next/navigation';
const CategoryCardsGrid = dynamic(
  () => import('@/components/organism/CategoryCardsGrid'),
  {
    loading: () => <Loading />,
  }
);

const StorePage = () => {
  const { categories, isLoading } = useCategories();
  const router = useRouter();

  const shuffleArray = (array: SubCategories[]) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const allSubCategories = shuffleArray(
    categories?.flatMap((cat: Category) =>
      cat.sub_categories.map((sub) => ({
        ...sub,
        categorySlug: cat.slug,
      }))
    ) || []
  );

  const handleCardClick = (categorySlug: string, subSlug: string) => {
    router.push(`/categories/${categorySlug}/${subSlug}`);
  };

  return (
    <CategoryCardsGrid
      cards={allSubCategories}
      isLoading={isLoading}
      onCardClick={handleCardClick}
    />
  );
};

export default StorePage;
