'use client';
import React from 'react';

const Spinner = () => {
  return (
    // <div className="flex items-center justify-center">
    //   <svg
    //     className="animate-spin h-8 w-8 text-black"
    //     xmlns="http://www.w3.org/2000/svg"
    //     viewBox="0 0 24 24"
    //     fill="none"
    //     stroke="currentColor"
    //   >
    //     <circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25" />
    //     <path
    //       fill="none"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       strokeWidth="4"
    //       d="M4 12a8 8 0 1 0 16 0A8 8 0 0 0 4 12"
    //       className="opacity-75"
    //     />
    //   </svg>
    // </div>
    <div className="relative flex justify-center items-center h-60 bg-red-400 w-80">
      <div className="relative w-20 h-20 border-t-4 border-solid border-amber-400 rounded-full animate-spin">
        <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-solid border-black rounded-full animate-spin-reverse"></div>
      </div>
    </div>
  );
};

export default Spinner;
