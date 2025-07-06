import Layer from '@/components/atomic/Layer';
import SectionTypeCard from '@/components/molecules/SectionTypeCard';
import { subMenuItems } from '@/data';
import React from 'react';

const SectionsTypes = () => {
  return (
    <Layer otherClassName='mt-20'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
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
      </div>
    </Layer>
  );
};

export default SectionsTypes;
