import { SectionTitleProps } from '@/interfaces';
import React from 'react';
import AnimatedWrapper from '../molecules/FramerMotion/AnimatedWrapper';

const SectionTitle: React.FC<SectionTitleProps> = ({
  Icon,
  title,
  subtitle,
  className,
  titleClassName,
}) => {
  return (
    <AnimatedWrapper>
      <div className={`text-center mb-10 ${className}`}>
        <h1
          className={`text-xl md:text-[32px] font-bold ${
            subtitle ? 'mb-2' : ''
          } ${
            Icon ? 'flex items-center justify-center gap-2' : ''
          } ${titleClassName}`}
        >
          {title}
          {Icon && <Icon className="text-[var(--enjoy-secondary)]" />}
        </h1>
        {subtitle && <p className="text-base font-normal">{subtitle}</p>}
      </div>
    </AnimatedWrapper>
  );
};

export default SectionTitle;
