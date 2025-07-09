import React from 'react';
import Layer from './Layer';
import { SectionComponentProps } from '@/interfaces';

const SectionComponent: React.FC<SectionComponentProps> = ({
  title,
  children,
}) => {
  return (
    <Layer>
      <h2 className="text-3xl font-semibold mb-6">{title}</h2>
      {children}
    </Layer>
  );
};

export default SectionComponent;
