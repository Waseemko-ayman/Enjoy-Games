import { paramsProps } from '@/interfaces';
import { getCategoryData } from '@/lib/mockData';
import CategoryPage from '@/template/CategoryPage';

export default async function CategoryPageWrapper({
  params,
}: {
  params: paramsProps;
}) {
  // Get data from mockData (will be replaced by API later)
  // const categoryData = await getCategoryData(params.category);
  const categoryData = getCategoryData(params.category);

  return <CategoryPage cards={categoryData} />;
}
