'use client';
import React, { useEffect, useState } from 'react';
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
import { usePathname } from 'next/navigation';

const NavbarSheet = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations('Layout.header.navBar');
  const ariaTxts = useTranslations('ariaLabels.btns');
  const { isArabic } = useToggleLocale();
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger aria-label={ariaTxts('menuTrigger')}>
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
