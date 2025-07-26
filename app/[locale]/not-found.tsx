'use client';
import Image from 'next/image';

const notFound = () => {
  return (
    <div className="flex items-center justify-between flex-col sm:flex-row absolute top-1/2 left-1/2 -translate-1/2 gap-12">
      <Image src="/assets/logo.png" alt="logo" width={100} height={100} />
      <div className="text-enjoy-primary text-center sm:border sm:border-l-red-500">
        <h1 className="text-8xl">404</h1>
        <p className="capitalize mt-5">Sorry! The Page Not Found</p>
      </div>
    </div>
  );
};

export default notFound;
