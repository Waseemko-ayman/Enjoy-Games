import React from 'react';

const ButtonLoading = ({
  borderColor = 'border-white',
}: {
  borderColor?: string;
}) => {
  return (
    <span
      className={`animate-spin border-2 ${borderColor} border-t-transparent rounded-full w-4 h-4 inline-block`}
    />
  );
};

export default ButtonLoading;
