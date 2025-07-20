import { getItemData } from '@/lib/mockData';
import BundlesPage from '@/components/pages/BundlesPage';
import { paramsProps } from '@/interfaces';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: paramsProps;
}): Promise<Metadata> {
  const categoryName = params.category;

  return {
    title: `إنجوي قيمز | ${categoryName} | ${params.itemId}`,
    description: `تصفح المنتجات في فئة ${categoryName} على موقعنا.`,
  };
}

export default async function BundlesWrapper({
  params,
}: {
  params: paramsProps;
}) {
  const item = getItemData(params.category, params.itemId);

  if (!item) return <div>العنصر غير موجود.</div>;

  return <BundlesPage item={item} params={params} />;
}
