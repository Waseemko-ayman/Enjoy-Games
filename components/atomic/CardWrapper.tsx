import React from 'react';

const CardWrapper = ({
  children,
  bgColor = 'bg-white',
  className,
  onClick,
}: {
  children: React.ReactNode;
  bgColor?: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={`${bgColor} rounded-xl shadow-custom ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CardWrapper;
