'use client';
import React, { useEffect, useState } from 'react';
import Container from '../organism/Container';
import Layer from '../atomic/Layer';

const ResponsiveWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 991);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layer>{isMobile ? children : <Container>{children}</Container>}</Layer>
  );
};

export default ResponsiveWrapper;

// TEST:
/*
'use client';
import React, { useEffect, useState } from 'react';
import Container from '../organism/Container';
import Layer from './Layer';

interface SmartWrapperProps {
  children: React.ReactNode;
  className?: string;
  usesLayer?: boolean; // default = true
}

const SmartWrapper: React.FC<SmartWrapperProps> = ({
  children,
  className,
  usesLayer = true,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 991);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const content = isMobile ? children : <Container>{children}</Container>;

  if (!usesLayer && isMobile) return children;
  if (!usesLayer && !isMobile) return <Container>{children}</Container>;
  return <Layer otherClassName={className}>{content}</Layer>;
};

export default SmartWrapper;


*/
