'use client';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Button from './Button';

interface FloatingButtonProps {
  icon: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  icon,
  className,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <Button
      variant="circle"
      handleClick={scrollToTop}
      otherClassName={cn(
        `fixed z-50 bottom-6 right-6 md:bottom-8 md:right-8 text-white p-4 shadow-lg hover:scale-105 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`,
        className
      )}
      {...props}
    >
      {icon}
    </Button>
  );
};

export default FloatingButton;
