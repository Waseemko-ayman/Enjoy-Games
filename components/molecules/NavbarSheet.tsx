'use client';
import React from 'react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { PiSquaresFourLight } from 'react-icons/pi';
import SheetContentComp from './SheetContentComp';
import AnimatedWrapper from './FramerMotion/AnimatedWrapper';

const NavbarSheet = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <PiSquaresFourLight className="text-3xl cursor-pointer text-enjoy-primary" />
      </SheetTrigger>
      <SheetContent className="pt-20">
        <SheetTitle className="sr-only">أقسام البطاقات</SheetTitle>
        <SheetDescription className="sr-only">
          هنا قائمة بأقسام البطاقات المتوفرة للتصفح والاختيار.
        </SheetDescription>
        <AnimatedWrapper direction="x" distance={70}>
          <h4 className="text-white text-2xl font-semibold mb-5">
            أقسام البطاقات
          </h4>
        </AnimatedWrapper>
        {/* Sheet Content */}
        <SheetContentComp />
      </SheetContent>
    </Sheet>
  );
};

export default NavbarSheet;
