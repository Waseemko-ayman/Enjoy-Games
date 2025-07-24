'use client';
import PageHeader from '@/components/molecules/PageHeader';
import { CategoryPageProps } from '@/interfaces';
import CategoryCardsGrid from '@/components/organism/CategoryCardsGrid';
import { useParams, useRouter } from 'next/navigation';

const CategoryPage: React.FC<CategoryPageProps> = ({ cards }) => {
  const params = useParams();
  const router = useRouter();

  const enhancedCards = cards.map((card) => ({
    ...card,
    // A dynamic href link is added to each card.
    // href: `/categories/${params.category}/${card.id}/bundles`,
    onClick: () => {
      if (!params?.category) {
        console.error('Category is missing in params');
        return;
      }
      const basePath = `/categories/${params.category}/${card.id}`;
      if (card.children_count && card.children_count > 0) {
        router.push(`${basePath}/select-account`);
      } else {
        router.push(`${basePath}/bundles`);
      }
    },
  }));

  return (
    <div>
      <PageHeader />
      <CategoryCardsGrid cards={enhancedCards} />
    </div>
  );
};

export default CategoryPage;
