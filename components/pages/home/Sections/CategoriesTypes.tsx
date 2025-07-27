import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import SectionTypeCard from '@/components/molecules/SectionTypeCard';
import Container from '@/components/organism/Container';
import { subMenuItems } from '@/data';
import { Category } from '@/interfaces';

const CategoriesTypes = ({ categories }: { categories?: Category }) => {
  return (
    <Container>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-5">
        {subMenuItems.map((item, index) => (
          <AnimatedWrapper key={item.id} custom={index}>
            <SectionTypeCard
              path={item.path}
              name={item.name}
              imgSrc={item.image}
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
