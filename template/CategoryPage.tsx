'use client';
import { useMemo, useState } from 'react';
import PageHeader from '@/components/molecules/PageHeader';
import { CategoryPageProps } from '@/interfaces';
import CategoryCardsGrid from '@/components/organism/CategoryCardsGrid';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/components/molecules/loading';

const CategoryPage: React.FC<CategoryPageProps> = ({ cards }) => {
  const params = useParams();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const enhancedCards = useMemo(() => {
    return cards.map((card) => ({
      ...card,
      onClick: () => {
        setIsNavigating(true);
        const basePath = `/categories/${params.category}/${
          card.slug || card.id
        }`;
        const path =
          card.children_count > 0
            ? `${basePath}/select-account`
            : `${basePath}/bundles`;

        setTimeout(() => router.push(path), 150);
      },
    }));
  }, [cards, params.category, router]);

  if (isNavigating) {
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
