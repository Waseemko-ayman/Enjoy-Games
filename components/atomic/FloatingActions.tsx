'use client';

import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaArrowUp } from 'react-icons/fa';
import Button from './Button';
import { useToggleLocale } from '@/hook/useToggleLocale';
import { usePathname } from 'next/navigation';

interface FloatingActionsProps {
  phone: string;
}

const FloatingActions: React.FC<FloatingActionsProps> = ({ phone }) => {
  const [isScrollVisible, setIsScrollVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { isArabic } = useToggleLocale();
  const pathname = usePathname();
  const isMyCartPage = pathname.endsWith('/my-cart');

  return (
    <div
      className={`fixed z-50 ${isMyCartPage ? 'bottom-6' : 'bottom-24'} ${
        isArabic ? 'left-6' : 'right-6'
      } md:bottom-6 flex flex-col items-center space-y-3`}
    >
      <Button
        variant="circle"
        href={`https://wa.me/${phone}`}
        target="_blank"
        bgColor="bg-green-500"
        hoverBgColor="bg-green-600"
        otherClassName="text-white p-3 shadow-lg hover:scale-105"
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={22} />
      </Button>

      {isScrollVisible && (
        <Button
          variant="circle"
          handleClick={scrollToTop}
          bgColor="bg-gray-800"
          hoverBgColor="bg-gray-700"
          otherClassName="text-white p-3 shadow-lg hover:scale-105"
          aria-label="Scroll to Top"
        >
          <FaArrowUp size={20} />
        </Button>
      )}
    </div>
  );
};

export default FloatingActions;
