import React from 'react';
import { SectionComponentProps } from '@/interfaces';
import ResponsiveWrapper from '../molecules/ResponsiveWrapper';

const SectionComponent: React.FC<SectionComponentProps> = ({
  title,
  children,
}) => {
  return (
    <ResponsiveWrapper>
      <h2 className="text-3xl font-semibold mb-6 px-4 lg:px-0">{title}</h2>
      {children}
    </ResponsiveWrapper>
  );
};

export default SectionComponent;
