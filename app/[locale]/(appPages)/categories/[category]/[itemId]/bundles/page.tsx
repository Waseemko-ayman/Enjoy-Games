import { getItemData } from '@/lib/mockData';
import BundlesPage from '@/components/pages/BundlesPage';
import { paramsProps } from '@/interfaces';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<paramsProps>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const categoryName = resolvedParams.category;

  return {
    title: `إنجوي قيمز | ${categoryName} | ${resolvedParams.itemId}`,
    description: `تصفح المنتجات في فئة ${categoryName} على موقعنا.`,
  };
}

export default async function BundlesWrapper({
  params,
  searchParams,
}: {
  params: paramsProps;
  searchParams?: { account?: string };
}) {
  const item = await getItemData(
    params.category,
    params.itemId,
    searchParams?.account
  );

  if (!item) return <div>العنصر غير موجود.</div>;

  return <BundlesPage item={item} params={params} />;
}
