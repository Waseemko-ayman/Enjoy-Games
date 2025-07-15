import { getCategoryData } from '@/lib/mockData';
import dynamic from 'next/dynamic';

// Import the dynamic component while preserving your existing components
const CategoryPage = dynamic(() => import('@/template/CategoryPage'));

export default async function CategoryPageWrapper({
  params,
}: {
  params: { category: string };
}) {
  // Get data from mockData (will be replaced by API later)
  const categoryData = await getCategoryData(params.category);

  return <CategoryPage cards={categoryData} />;
}
