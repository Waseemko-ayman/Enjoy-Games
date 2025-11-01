import React from 'react';
import BackgroundCircles from './BackgroundCircles';

const BackgroundGradientWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-white relative overflow-hidden">
      {/* Background Circles */}
      <BackgroundCircles />
      {children}
    </div>
  );
};

export default BackgroundGradientWrapper;
