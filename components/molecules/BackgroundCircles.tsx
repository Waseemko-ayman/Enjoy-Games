import React from 'react';

const BackgroundCircles = () => {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/30 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/20 rounded-full translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-white/25 rounded-full"></div>
      <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-white/20 rounded-full"></div>
    </div>
  );
};

export default BackgroundCircles;
