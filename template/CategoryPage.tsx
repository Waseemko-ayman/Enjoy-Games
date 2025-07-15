'use client';
import PageHeader from '@/components/molecules/PageHeader';
import { CategoryPageProps } from '@/interfaces';
import CategoryCardsGrid from '@/components/organism/CategoryCardsGrid';
import { useParams } from 'next/navigation';

const CategoryPage: React.FC<CategoryPageProps> = ({ cards }) => {
  const params = useParams();

  const enhancedCards = cards.map((card) => ({
    ...card,
    // A dynamic href link is added to each card.
    href: `/categories/${params.category}/${card.id}/bundles`,
  }));

  return (
    <div>
      <PageHeader />
      <CategoryCardsGrid cards={enhancedCards} />
    </div>
  );
};

export default CategoryPage;
