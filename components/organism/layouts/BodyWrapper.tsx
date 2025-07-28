'use client';

import { useToggleLocale } from '@/hook/useToggleLocale';
import { ToastContainer } from 'react-toastify';

const BodyWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isArabic } = useToggleLocale();

  return (
    <>
      {children}
      <ToastContainer
        rtl={isArabic}
        position={isArabic ? 'top-right' : 'top-left'}
      />
    </>
  );
};

export default BodyWrapper;
