'use client';
import React from 'react';

interface LoadingProps {
  width?: string;
  height?: string;
}

const Loading: React.FC<LoadingProps> = ({
  width = 'w-16',
  height = 'h-16',
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
      <div
        className={`border-t-4 border-enjoy-primary border-solid ${width} ${height} rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Loading;
