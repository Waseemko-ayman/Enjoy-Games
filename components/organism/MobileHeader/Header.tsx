import React from 'react';
import Container from '../Container';
import { MdOutlineShoppingCart } from 'react-icons/md';
import NavbarSheet from '@/components/molecules/NavbarSheet';

const MobileHeader = () => {
  return (
    <header className="h-[60px] bg-enjoy-gray-light flex items-center">
      <Container otherClassName="w-full flex items-center justify-between gap-4">
        <NavbarSheet />
        <h5 className="text-center text-2xl font-bold w-full overflow-hidden whitespace-nowrap">
          الرئيسية
        </h5>
        <MdOutlineShoppingCart className="text-3xl cursor-pointer text-enjoy-primary" />
      </Container>
    </header>
  );
};

export default MobileHeader;
