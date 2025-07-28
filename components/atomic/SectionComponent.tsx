import React from 'react';
import { SectionComponentProps } from '@/interfaces';
import ResponsiveWrapper from '../molecules/ResponsiveWrapper';
import AnimatedWrapper from '../molecules/FramerMotion/AnimatedWrapper';

const SectionComponent: React.FC<SectionComponentProps> = ({
  title,
  children,
}) => {
  return (
    <ResponsiveWrapper>
      <AnimatedWrapper>
        <h2 className="text-3xl font-semibold mb-6 px-4 lg:px-0">{title}</h2>
      </AnimatedWrapper>
      {children}
    </ResponsiveWrapper>
  );
};

export default SectionComponent;
