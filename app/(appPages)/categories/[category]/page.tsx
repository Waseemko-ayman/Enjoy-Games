import { paramsProps } from '@/interfaces';
import { getCategoryData } from '@/lib/mockData';
import CategoryPage from '@/template/CategoryPage';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: paramsProps;
}): Promise<Metadata> {
  const categoryName = params.category;

  return {
    title: `إنجوي قيمز | ${categoryName}`,
    description: `تصفح المنتجات في فئة ${categoryName} على موقعنا.`,
  };
}

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
