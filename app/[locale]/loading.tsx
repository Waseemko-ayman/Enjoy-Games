import BackgroundGradientWrapper from '@/components/molecules/BackgroundGradientWrapper';
import React from 'react';

const loading = () => {
  return (
    <BackgroundGradientWrapper>
      <div className="flex items-center justify-center min-h-screen">
        <div className="border-t-4 border-enjoy-primary border-solid w-16 h-16 rounded-full animate-spin"></div>
      </div>
    </BackgroundGradientWrapper>
  );
};

export default loading;
