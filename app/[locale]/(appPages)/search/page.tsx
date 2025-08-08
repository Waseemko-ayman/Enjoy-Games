import SearchPage from '@/components/pages/search';

type Props = {
  params: Record<string, string>;
  searchParams: { query?: string };
};

export async function generateMetadata({ searchParams }: Props) {
  const query = searchParams.query || '';
  return {
    title: query ? `${query} | إنجوي قيمز` : 'إنجوي قيمز',
  };
}

export default function Search() {
  return <SearchPage />;
}
