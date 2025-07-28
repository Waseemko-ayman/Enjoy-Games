import { SectionTitleProps } from '@/interfaces';
import React from 'react';
import AnimatedWrapper from '../molecules/FramerMotion/AnimatedWrapper';

const SectionTitle: React.FC<SectionTitleProps> = ({
  icon,
  title,
  subtitle,
  className,
  titleClassName,
}) => {
  const showIcon = (icon: React.ElementType) => {
    const Icon = icon;
    return <Icon className="text-[var(--enjoy-secondary)]" />;
  };
  return (
    <AnimatedWrapper>
      <div className={`text-center mb-10 ${className}`}>
        <h1
          className={`text-2xl md:text-[32px] font-bold ${
            subtitle ? 'mb-2' : ''
          } ${
            icon ? 'flex items-center justify-center gap-2' : ''
          } ${titleClassName}`}
        >
          {title}
          {icon && showIcon(icon)}
        </h1>
        {subtitle && <p className="text-base font-normal">{subtitle}</p>}
      </div>
    </AnimatedWrapper>
  );
};

export default SectionTitle;
