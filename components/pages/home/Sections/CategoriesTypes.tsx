'use client';
import Loading from '@/components/molecules/loading';
import Container from '@/components/organism/Container';
import { Category } from '@/interfaces';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import { API_IMAGE_URL } from '@/config/api';
import NoDataMessage from '@/components/organism/NoDataMessage';
import SectionComponent from '@/components/atomic/SectionComponent';
import GridWrapper from '@/components/molecules/GridWrapper';
import dynamic from 'next/dynamic';
const SectionTypeCard = dynamic(
  () => import('@/components/molecules/SectionTypeCard'),
  {
    loading: () => <Loading />,
  }
);

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
      <SectionComponent>
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorFetching />
        ) : categories?.length === 0 ? (
          <NoDataMessage />
        ) : (
          <GridWrapper
            otherClassName="max-lg:overflow-x-auto max-lg:scroll-smooth max-lg:px-2"
            gridCols={
              (categories?.length ?? 0) > 4
                ? 'lg:grid-cols-5'
                : 'lg:grid-cols-4'
            }
            itemClassName="max-md:!min-w-[120px]"
            isScrollable
          >
            {categories?.map((item: Category) => (
              <SectionTypeCard
                key={item.id}
                imgSrc={
                  `${API_IMAGE_URL}${item.image}` ||
                  '/assets/no-image-available.webp'
                }
                path={`/categories/${item.slug}`}
                title={item.name}
                imgAlt={item.name}
                imgTitle={item.name}
                width={90}
                height={90}
                otherClassName="w-[90px] h-[90px] sm:w-[120px] sm:h-[120px]"
              />
            ))}
          </GridWrapper>
        )}
      </SectionComponent>
    </Container>
  );
};

export default CategoriesTypes;
