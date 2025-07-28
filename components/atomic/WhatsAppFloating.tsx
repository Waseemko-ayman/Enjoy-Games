'use client';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import Button from './Button';

interface WhatsAppFloatingProps {
  phone: string;
}

const WhatsAppFloating: React.FC<WhatsAppFloatingProps> = ({ phone }) => {
  const handleClick = () => {
    const link = `https://wa.me/${phone}`;
    window.open(link, '_blank');
  };

  return (
    <Button
      variant="circle"
      handleClick={handleClick}
      bgColor="bg-green-500"
      hoverBgColor="bg-green-500"
      otherClassName="fixed z-50 bottom-1/2 left-4 transform translate-y-1/2 text-white p-4 shadow-lg hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={24} />
    </Button>
  );
};

export default WhatsAppFloating;
