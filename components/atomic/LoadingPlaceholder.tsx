import React from 'react';
import Loading from '../molecules/loading';

const LoadingPlaceholder = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <Loading />
      <p className="mt-4">{message}</p>
    </div>
  );
};

export default LoadingPlaceholder;
