/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import dynamic from 'next/dynamic';
import useAPI from '@/hook/useAPI';
import React, { useEffect } from 'react';
import Loading from '@/components/molecules/loading';
import { Category, SubCategories } from '@/interfaces';
const CategoryCardsGrid = dynamic(
  () => import('@/components/organism/CategoryCardsGrid'),
  {
    loading: () => <Loading />,
  }
);

const StorePage = () => {
  const { get, data: categories } = useAPI(`categories-subcategories`);

  const shuffleArray = (array: SubCategories[]) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const allSubCategories = shuffleArray(
    categories?.flatMap((cat: Category) => cat.sub_categories) || []
  );

  useEffect(() => {
    get();
  }, []);
  return <CategoryCardsGrid cards={allSubCategories} />;
};

export default StorePage;
