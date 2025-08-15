'use client';
import { FaPizzaSlice } from 'react-icons/fa';

const DecorativeBackground = () => {
  return (
    <>
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20">
        <div className="absolute top-0 right-0 w-full h-96 bg-amber-500 rounded-full filter blur-[150px] transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-full h-96 bg-amber-600 rounded-full filter blur-[150px] transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Decorative Pizza Patterns */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-10">
        {/* Top Right Cluster */}
        <div className="absolute top-0 right-0 w-160 h-160">
          {[...Array(3)].map((_, i) => (
            <FaPizzaSlice
              key={`top-right-${i}`}
              className="text-amber-500 text-5xl absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
        {/* Bottom Left Cluster */}
        <div className="absolute bottom-0 left-0 w-60 h-60">
          {[...Array(3)].map((_, i) => (
            <FaPizzaSlice
              key={`bottom-left-${i}`}
              className="text-amber-500 text-5xl absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DecorativeBackground;
