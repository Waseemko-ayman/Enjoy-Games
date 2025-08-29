const SectionTypeCard = lazy(
  () => import('@/components/molecules/SectionTypeCard')
);
import { lazy, Suspense } from 'react';
import Loading from '@/components/molecules/loading';
import Container from '@/components/organism/Container';
import { Category } from '@/interfaces';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import { API_IMAGE_URL } from '@/config/api';

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
                imgSrc={
                  `${API_IMAGE_URL}${item.image}` || '/assets/play-station.webp'
                }
                path={`/categories/${item.slug}`}
                title={item.name}
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
