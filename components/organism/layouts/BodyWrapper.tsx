'use client';

import { ToastContainer } from 'react-toastify';

const BodyWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default BodyWrapper;
