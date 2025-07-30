/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useMemo } from 'react';
import PageHeader from '@/components/molecules/PageHeader';
import { Category, CategoryPageProps, SubCategories } from '@/interfaces';
import CategoryCardsGrid from '@/components/organism/CategoryCardsGrid';
import { useParams, useRouter } from 'next/navigation';
import useAPI from '@/hook/useAPI';
import LoadingPlaceholder from '@/components/atomic/LoadingPlaceholder';
import { useTranslations } from 'next-intl';

const CategoryPage: React.FC<CategoryPageProps> = ({ cards }) => {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('Loading');
  const { get, data, isLoading, error } = useAPI(`category/${params.category}`);

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
    return <LoadingPlaceholder message={t('loadingMessage')} />;
  }

  return (
    <div>
      <PageHeader />
      <CategoryCardsGrid cards={enhancedCards} error={error} />
    </div>
  );
};

export default CategoryPage;
