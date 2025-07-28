'use client';
import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
      <div className="border-t-4 border-enjoy-primary border-solid w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
