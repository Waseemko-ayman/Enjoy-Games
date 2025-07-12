import { SectionTitleProps } from '@/interfaces';
import React from 'react';

const SectionTitle: React.FC<SectionTitleProps> = ({
  Icon,
  title,
  subtitle,
  className,
  titleClassName,
}) => {
  return (
    <div className={`text-center mb-10 ${className}`}>
      <h1
        className={`text-[32px] font-bold ${subtitle ? 'mb-2' : ''} ${
          Icon ? 'flex items-center justify-center gap-2' : ''
        } ${titleClassName}`}
      >
        {title}
        {Icon && <Icon className="text-[var(--enjoy-secondary)]" />}
      </h1>
      {subtitle && <p className="text-base font-normal">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
