import { SectionTitleProps } from '@/interfaces';
import React from 'react';

const SectionTitle: React.FC<SectionTitleProps> = ({
  Icon,
  title,
  subtitle,
  className,
}) => {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
        <span className="text-3xl"></span>
        {title}
        {Icon && <Icon className="text-[var(--enjoy-secondary)]" />}
      </h1>
      <p className="text-lg">{subtitle}</p>
    </div>
  );
};

export default SectionTitle;
