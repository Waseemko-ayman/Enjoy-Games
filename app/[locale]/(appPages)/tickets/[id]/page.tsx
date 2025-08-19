import TicketDetailsPage from '@/components/pages/tickets/ticket-details/TicketDetails';
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
    title: `إنجوي قيمز | تذاكر الدعم الفني | ${id}`,
    description: `تصفح التفاصيل الخاصة بـ ${id}.`,
  };
}

const TicketDetails = async ({ params }: { params: Promise<ParamsProps> }) => {
  const { id } = await params;
  return <TicketDetailsPage id={id} />;
};

export default TicketDetails;
