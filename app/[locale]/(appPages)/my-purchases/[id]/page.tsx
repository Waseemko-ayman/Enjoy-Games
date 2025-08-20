import OrderDetailsPage from '@/components/pages/my-purchases/OrderDetailsPage';
import type { Metadata } from 'next';

interface ParamsProps {
  id: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ParamsProps>;
}): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `إنجوي قيمز | طلب ${id} | المنتجات`,
    description: `تصفح التفاصيل الخاصة بـ ${id}.`,
  };
}

const OrderDetails = async ({ params }: { params: Promise<ParamsProps> }) => {
  const { id } = await params;
  return <OrderDetailsPage id={id} />;
};

export default OrderDetails;
