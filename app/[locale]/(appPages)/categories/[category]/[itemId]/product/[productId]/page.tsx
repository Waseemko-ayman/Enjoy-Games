import ProductDetailsPage from '@/components/pages/product';
import { paramsProps } from '@/interfaces';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<paramsProps>;
}): Promise<Metadata> {
  const { productId } = await params;

  return {
    title: `إنجوي قيمز | ${productId}`,
    description: `تصفح التفاصيل الخاصة بـ ${productId}.`,
  };
}

export default async function ProductPageWrapper({
  params,
}: {
  params: Promise<paramsProps>;
}) {
  const resolvedParams = await params;

  return <ProductDetailsPage productId={resolvedParams.productId} />;
}
