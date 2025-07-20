const ProductCard = lazy(() => import('@/components/atomic/ProductCard'));
import SectionComponent from '@/components/atomic/SectionComponent';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import Loading from '@/components/molecules/loading';
import { NewlyArrivedData } from '@/data';
import React, { lazy, Suspense } from 'react';

const NewlyArrived = () => {
  return (
    <SectionComponent title="وصل حديثًا">
      <GridWrapper otherClassName="gap-5" isScrollable>
        {NewlyArrivedData.map((card, index) => (
          <AnimatedWrapper key={card.id} custom={index}>
            <Suspense fallback={<Loading />}>
              <ProductCard
                imgAlt={card.title}
                imgTitle={card.title}
                imgSrc={card.src}
                description
                showBtn={true}
                btnVariant="primary"
                btnText="إشترِ الآن"
                {...card}
              />
            </Suspense>
          </AnimatedWrapper>
        ))}
      </GridWrapper>
    </SectionComponent>
  );
};

export default NewlyArrived;
