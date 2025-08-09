/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchPage from '@/components/pages/search';
import { Metadata } from 'next';

export async function generateMetadata({
  searchParams,
}: {
  params: Promise<any>;
  searchParams: Promise<{ query?: string }>;
}): Promise<Metadata> {
  const queryParam = (await searchParams)?.query || '';
  return {
    title: queryParam ? `${queryParam} | إنجوي قيمز` : 'إنجوي قيمز',
  };
}

export default function Page() {
  return <SearchPage />;
}
