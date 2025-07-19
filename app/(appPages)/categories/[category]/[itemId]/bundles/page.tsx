import dynamic from 'next/dynamic';
import { getItemData } from '@/lib/mockData';
import { paramsProps } from '@/interfaces';

const BundlesPage = dynamic(() => import('@/components/pages/BundlesPage'), {
  ssr: false,
});

export default async function BundlesWrapper({
  params,
}: {
  params: paramsProps;
}) {
  const item = getItemData(params.category, params.itemId);

  if (!item) return <div>العنصر غير موجود.</div>;

  return <BundlesPage item={item} params={params} />;
}
