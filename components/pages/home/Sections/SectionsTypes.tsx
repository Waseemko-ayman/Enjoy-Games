import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import SectionTypeCard from '@/components/molecules/SectionTypeCard';
import Container from '@/components/organism/Container';
import { subMenuItems } from '@/data';
import React from 'react';

const SectionsTypes = () => {
  return (
    <Container>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-5">
        {subMenuItems.map((item, index) => (
          <AnimatedWrapper key={item.id} custom={index}>
            <SectionTypeCard
              path={item.path}
              title={item.label}
              imgSrc={item.src}
              imgAlt={item.label}
              imgTitle={item.label}
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

export default SectionsTypes;

// TEST:
/* 
    <ResponsiveWrapper usesLayer={false}>
      <GridWrapper
        isScrollable
        gridCols="lg:grid-cols-6"
        itemClassName="!min-w-0"
        otherClassName="mt-20"
      >
        {subMenuItems.map((item) => (
          <SectionTypeCard
            key={item.id}
            path={item.path}
            title={item.label}
            imgSrc={item.src}
            imgAlt={item.label}
            imgTitle={item.label}
            width={120}
            height={120}
          />
        ))}
      </GridWrapper>
    </ResponsiveWrapper>
*/
