import dynamic from 'next/dynamic';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import Loading from '@/components/molecules/loading';
import Container from '@/components/organism/Container';
import { Category } from '@/interfaces';
const SectionTypeCard = dynamic(
  () => import('@/components/molecules/SectionTypeCard'),
  {
    loading: () => <Loading />,
  }
);

const CategoriesTypes = ({ categories }: { categories?: Category[] }) => {
  return (
    <Container>
      <div
        className={`grid grid-cols-3 ${
          (categories?.length ?? 0) > 4 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
        } gap-5`}
      >
        {categories?.map((item: Category, index: number) => (
          <AnimatedWrapper key={item.id} custom={index}>
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
          </AnimatedWrapper>
        ))}
      </div>
    </Container>
  );
};

export default CategoriesTypes;
