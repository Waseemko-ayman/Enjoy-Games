import GridWrapper from '@/components/molecules/GridWrapper';
import SectionTypeCard from '@/components/molecules/SectionTypeCard';
import { subMenuItems } from '@/data';
import React from 'react';

const SectionsTypes = () => {
  return (
    <GridWrapper
      isScrollable
      gridCols="lg:grid-cols-6"
      otherClassName="mt-20"
      itemClassName="!min-w-0"
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
  );
};

export default SectionsTypes;
