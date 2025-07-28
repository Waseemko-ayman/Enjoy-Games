import { paramsProps } from '@/interfaces';
import SubCategoryPage from '@/template/SubCategoryPage';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<paramsProps>;
}): Promise<Metadata> {
  const { itemId } = await params;

  return {
    title: `إنجوي قيمز | ${itemId}`,
    description: `تصفح التفاصيل الخاصة بـ ${itemId}.`,
  };
}

export default async function SubCategoryPageWrapper({
  params,
}: {
  params: Promise<paramsProps>;
}) {
  const resolvedParams = await params;

  return <SubCategoryPage itemId={resolvedParams.itemId} />;
}
