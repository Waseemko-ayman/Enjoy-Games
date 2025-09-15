'use client';
import React from 'react';
import Container from '../organism/Container';
import Layer from '../atomic/Layer';
import useIsMobile from '@/hook/useIsMobile';

const ResponsiveWrapper = ({
  children,
  otherClassName,
}: {
  children: React.ReactNode;
  otherClassName?: string;
}) => {
  const isMobile = useIsMobile();

  return (
    <Layer otherClassName={otherClassName}>
      {isMobile ? children : <Container>{children}</Container>}
    </Layer>
  );
};

export default ResponsiveWrapper;
