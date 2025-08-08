/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchPage from '@/components/pages/search';
import { Metadata } from 'next';

export async function generateMetadata({
  searchParams,
}: {
  params: any;
  searchParams: { query?: string };
}): Promise<Metadata> {
  const query = searchParams.query || '';
  return {
    title: query ? `${query} | إنجوي قيمز` : 'إنجوي قيمز',
  };
}

export default function Page() {
  return <SearchPage />;
}
