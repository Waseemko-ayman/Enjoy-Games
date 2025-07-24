'use client';

import React from 'react';
import Container from '../Container';
import { MdOutlineShoppingCart } from 'react-icons/md';
import NavbarSheet from '@/components/molecules/NavbarSheet';
import { usePathname } from 'next/navigation';
import { PATHS } from '@/data/paths';
import Link from 'next/link';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { useTranslations } from 'next-intl';

const MobileHeader = () => {
  const pathname = usePathname(); // e.g., "/en/about"
  const t = useTranslations('PagesHeaderTitles'); // Translations for page titles

  // Split the pathname into parts: "/en/about" → ['en', 'about']
  const pathParts = pathname.split('/').filter(Boolean);

  // Remove the first part if it's a locale (e.g., 'en' or 'ar')
  const filteredParts = pathParts.filter(
    (part, index) => !(index === 0 && ['en', 'ar'].includes(part))
  );

  // Get the last segment after removing locale — this is our primary translation key
  const pageKey = filteredParts[filteredParts.length - 1] || 'home';

  // Fallback to the previous segment if needed
  const fallbackKey =
    filteredParts.length > 1 ? filteredParts[filteredParts.length - 2] : 'home';

  // Try translating pageKey first; if it fails, try fallbackKey; otherwise use 'home'
  const title =
    t(pageKey) !== pageKey
      ? t(pageKey)
      : t(fallbackKey) !== fallbackKey
      ? t(fallbackKey)
      : t('home');

  return (
    <header className="h-[60px] bg-enjoy-gray-light flex items-center">
      <Container otherClassName="w-full flex items-center justify-between gap-4">
        <AnimatedWrapper>
          <NavbarSheet />
        </AnimatedWrapper>
        <AnimatedWrapper direction="y" distance={-40}>
          <h5 className="text-center text-lg font-bold w-full overflow-hidden whitespace-nowrap">
            {title}
          </h5>
        </AnimatedWrapper>
        <AnimatedWrapper direction="y" distance={-40}>
          <Link href={PATHS.MY_CART.link}>
            <MdOutlineShoppingCart className="text-2xl cursor-pointer text-enjoy-primary" />
          </Link>
        </AnimatedWrapper>
      </Container>
    </header>
  );
};

export default MobileHeader;
