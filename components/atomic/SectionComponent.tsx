import React from 'react';
import { SectionComponentProps } from '@/interfaces';
import ResponsiveWrapper from '../molecules/ResponsiveWrapper';
import AnimatedWrapper from '../molecules/FramerMotion/AnimatedWrapper';
import useIsMobile from '@/hook/useIsMobile';

const SectionComponent: React.FC<SectionComponentProps> = ({
  title,
  children,
  otherClassName,
}) => {
  const isMobile = useIsMobile();
  return (
    <ResponsiveWrapper otherClassName={otherClassName}>
      <AnimatedWrapper>
        <h2
          className={`${
            isMobile ? 'text-2xl' : 'text-3xl'
          } font-semibold mb-6 px-4 lg:px-0`}
        >
          {title}
        </h2>
      </AnimatedWrapper>
      {children}
    </ResponsiveWrapper>
  );
};

export default SectionComponent;
