import React from 'react';

const ButtonLoading = ({
  borderColor = 'border-white',
  otherClassName,
}: {
  borderColor?: string;
  otherClassName?: string;
}) => {
  return (
    <span
      className={`animate-spin border-2 ${borderColor} border-t-transparent rounded-full w-4 h-4 inline-block ${otherClassName}`}
    />
  );
};

export default ButtonLoading;
