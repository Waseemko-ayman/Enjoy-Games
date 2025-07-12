import Link from 'next/link';
import React from 'react';

const ProgressCircle = () => {
  const progress = 60;

  return (
    <div className="flex justify-center">
      <div className="relative w-52 h-52">
        {/* Outer layer with soft gradient */}
        <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-200 via-blue-200 to-[var(--enjoy-primary-soft)]">
          {/* Main container */}
          <div className="relative w-full h-full rounded-full overflow-hidden">
            {/* Blur layer for smoothness */}
            <div className="absolute inset-0 backdrop-blur-[1px] rounded-full"></div>

            {/* Orange circular progress layer */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div
                className="h-full w-full"
                style={{
                  background: `conic-gradient(
                    #ef993a ${progress}%, 
                    transparent ${progress}% ${100 - progress}%
                  )`,
                  mask: 'radial-gradient(transparent 68%, black 69%)',
                  WebkitMask: 'radial-gradient(transparent 68%, black 69%)',
                  transition: 'background 0.5s ease',
                  filter: 'blur(0.3px)',
                }}
              />
            </div>

            {/* Inner glow for edge enhancement */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: 'inset 0 0 10px rgba(239, 153, 58, 0.2)',
                pointerEvents: 'none',
              }}
            />

            {/* Inner content */}
            <div className="absolute inset-1.5 bg-white rounded-full flex flex-col items-center justify-center z-10 font-bold">
              <div className="text-[46px] text-enjoy-secondary mb-2">
                {progress}%
              </div>
              <p className="text-sm text-gray-800 mb-[7px]">
                عائد لكل عملية
              </p>
              <Link
                href="#"
                className="text-sm text-enjoy-primary hover:text-enjoy-primary-soft transition-all duration-300"
              >
                سجل دخول الآن
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCircle;
