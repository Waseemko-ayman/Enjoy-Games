/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useMemo } from 'react';
import PageHeader from '@/components/molecules/PageHeader';
import { Category, CategoryPageProps, SubCategories } from '@/interfaces';
import CategoryCardsGrid from '@/components/organism/CategoryCardsGrid';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/components/molecules/loading';
import useAPI from '@/hook/useAPI';

const CategoryPage: React.FC<CategoryPageProps> = ({ cards }) => {
  const params = useParams();
  const router = useRouter();
  const { get, data, isLoading } = useAPI(`category/${params.category}`);

  const enhancedCards = useMemo(() => {
    const base =
      Array.isArray(cards) && cards.length > 0
        ? cards
        : Array.isArray((data as Category)?.sub_categories)
        ? (data as Category).sub_categories
        : [];

    return base.map((card: SubCategories) => ({
      ...card,
      onClick: () => {
        const basePath = `/categories/${params.category}/${card.slug}`;
        setTimeout(() => router.push(basePath), 150);
      },
    }));
  }, [cards, data, params.category, router]);

  useEffect(() => {
    get();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loading />
        <p className="mt-4">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader />
      <CategoryCardsGrid cards={enhancedCards} />
    </div>
  );
};

export default CategoryPage;
