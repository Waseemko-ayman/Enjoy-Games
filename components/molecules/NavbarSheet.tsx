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
import { useTranslations } from 'next-intl';
import { useToggleLocale } from '@/hook/useToggleLocale';

const NavbarSheet = () => {
  const t = useTranslations('Layout.header.navBar');
  const { isArabic } = useToggleLocale();
  return (
    <Sheet>
      <SheetTrigger>
        <PiSquaresFourLight className="text-3xl cursor-pointer text-enjoy-primary" />
      </SheetTrigger>
      <SheetContent className="pt-20">
        <SheetTitle className="sr-only">{t('CardSections')}</SheetTitle>
        <SheetDescription className="sr-only">
          {t('cardSectionsDescription')}
        </SheetDescription>
        <AnimatedWrapper direction="x" distance={isArabic ? 70 : -70}>
          <h4 className="text-white text-2xl font-semibold mb-5">
            {t('CardSections')}
          </h4>
        </AnimatedWrapper>
        {/* Sheet Content */}
        <SheetContentComp />
      </SheetContent>
    </Sheet>
  );
};

export default NavbarSheet;
