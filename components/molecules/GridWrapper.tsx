import { GridWrapperProps } from '@/interfaces';
import React from 'react';

const GridWrapper = ({
  children,
  otherClassName,
  isScrollable = false,
  gridCols = 'lg:grid-cols-4',
  itemClassName,
}: GridWrapperProps) => {
  const baseClass = isScrollable
    ? `flex max-sm:overflow-x-auto max-sm:scroll-smooth max-sm:px-2 py-4 scrollbar-none sm:grid sm:grid-cols-2 md:grid-cols-3 ${gridCols}`
    : `grid sm:grid-cols-2 md:grid-cols-3 ${gridCols}`;

  return (
    <div className={`gap-5 ${baseClass} ${otherClassName ?? ''}`}>
      {isScrollable
        ? React.Children.map(children, (child) => (
            <div className={`max-sm:min-w-[250px] shrink-0 ${itemClassName}`}>
              {child}
            </div>
          ))
        : children}
    </div>
  );
};

export default GridWrapper;
