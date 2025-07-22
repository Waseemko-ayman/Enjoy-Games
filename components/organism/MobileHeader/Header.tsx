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
  const pathname = usePathname();
  const t = useTranslations('PagesHeaderTitles');

  // Split the pathname and remove empty parts
  const pathParts = pathname.split('/').filter(Boolean);

  // Extract the last part of the path
  const pageKey = pathParts[pathParts.length - 1] || 'home';

  // Optional: fallback to parent segment if no translation found
  const fallbackKey =
    pathParts.length > 1 ? pathParts[pathParts.length - 2] : 'home';

  // Get translation or fallback to home
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
