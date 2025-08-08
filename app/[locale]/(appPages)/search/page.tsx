import SearchPage from '@/components/pages/search';
import { Metadata } from 'next';

type Props = {
  params: Record<string, string>;
  searchParams: { query?: string };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const query = searchParams.query || '';
  return {
    title: query ? `${query} | إنجوي قيمز` : 'إنجوي قيمز',
  };
}

export default function Page() {
  return <SearchPage />;
}
