import { paramsProps } from '@/interfaces';
import { getCategoryData } from '@/lib/mockData';
import CategoryPage from '@/template/CategoryPage';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<paramsProps>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  const categoryName = resolvedParams.category;

  return {
    title: `إنجوي قيمز | ${categoryName}`,
    description: `تصفح المنتجات في فئة ${categoryName} على موقعنا.`,
  };
}

export default async function CategoryPageWrapper({
  params,
}: {
  params: Promise<paramsProps>;
}) {
  const resolvedParams = await params;

  const categoryData = await getCategoryData(resolvedParams.category);

  return <CategoryPage cards={categoryData} />;
}
