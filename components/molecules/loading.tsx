'use client';
import React from 'react';

interface LoadingProps {
  width?: string;
  height?: string;
  borderColor?: string;
}

const Loading: React.FC<LoadingProps> = ({
  width = 'w-16',
  height = 'h-16',
  borderColor = 'border-enjoy-primary',
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
      <div
        className={`border-t-4 ${borderColor} border-solid ${width} ${height} rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Loading;
