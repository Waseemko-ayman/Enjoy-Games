import { getCategoryData } from '@/lib/mockData';
import CategoryPage from '@/template/CategoryPage';

export default function CategoryPageWrapper({
  params,
}: {
  params: { category: string };
}) {
  // Get data from mockData (will be replaced by API later)
  // const categoryData = await getCategoryData(params.category);
  const categoryData = getCategoryData(params.category);

  return <CategoryPage cards={categoryData} />;
}
