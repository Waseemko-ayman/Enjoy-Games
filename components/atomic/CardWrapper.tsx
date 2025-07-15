import React from 'react';

const CardWrapper = ({
  children,
  bgColor = 'bg-white',
  className,
}: {
  children: React.ReactNode;
  bgColor?: string;
  className?: string;
}) => {
  return (
    <div className={`${bgColor} rounded-xl shadow-custom ${className}`}>
      {children}
    </div>
  );
};

export default CardWrapper;
