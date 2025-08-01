const SectionTypeCard = lazy(
  () => import('@/components/molecules/SectionTypeCard')
);
import { lazy, Suspense } from 'react';
import Loading from '@/components/molecules/loading';
import Container from '@/components/organism/Container';
import { Category } from '@/interfaces';
import ErrorFetching from '@/components/molecules/ErrorFetching';

const CategoriesTypes = ({
  categories,
  loading,
  error,
}: {
  categories?: Category[];
  loading: boolean;
  error: boolean;
}) => {
  return (
    <Container>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorFetching />
      ) : (
        <div
          className={`grid grid-cols-3 ${
            (categories?.length ?? 0) > 4 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
          } gap-5`}
        >
          {categories?.map((item: Category) => (
            <Suspense key={item.id} fallback={<Loading />}>
              <SectionTypeCard
                path={`/categories/${item.slug}`}
                // imgSrc={item.image}
                title={item.name}
                imgSrc={'/assets/digitalStores.webp'}
                imgAlt={item.name}
                imgTitle={item.name}
                width={90}
                height={90}
                otherClassName="w-[90px] h-[90px] sm:w-[120px] sm:h-[120px]"
              />
            </Suspense>
          ))}
        </div>
      )}
    </Container>
  );
};

export default CategoriesTypes;
