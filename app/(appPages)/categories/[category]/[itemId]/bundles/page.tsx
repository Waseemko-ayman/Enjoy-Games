import React from 'react';
import { getItemData } from '@/lib/mockData';
import dynamic from 'next/dynamic';
const BundlesPage = dynamic(() => import('@/components/pages/BundlesPage'));

export default function BundlesWrapper({
  params,
}: {
  params: { category: string; itemId: string };
}) {
  const item = getItemData(params.category, params.itemId);

  if (!item) return <div>العنصر غير موجود.</div>;

  return <BundlesPage item={item} />;
}
