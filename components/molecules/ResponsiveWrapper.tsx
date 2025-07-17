'use client';
import React from 'react';
import Container from '../organism/Container';
import Layer from '../atomic/Layer';
import useIsMobile from '@/hook/useIsMobile';

const ResponsiveWrapper = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();

  return (
    <Layer>{isMobile ? children : <Container>{children}</Container>}</Layer>
  );
};

export default ResponsiveWrapper;
