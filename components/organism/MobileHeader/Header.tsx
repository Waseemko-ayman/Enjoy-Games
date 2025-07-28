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

const decodeTitle = (str: string) => decodeURIComponent(str).replace(/-/g, ' ');

const MobileHeader = () => {
  const pathname = usePathname();
  const t = useTranslations('PagesHeaderTitles');
  const ariaTxts = useTranslations('ariaLabels.links');

  const pathParts = pathname.split('/').filter(Boolean);
  const filteredParts = pathParts.filter(
    (part, index) => !(index === 0 && ['en', 'ar'].includes(part))
  );

  // Last part of the path - we display it as is (decoded with dashes replaced)
  const lastPart = filteredParts[filteredParts.length - 1] || 'home';

  // The rest of the path parts (if you want to use them)
  // const secondLastPart =
  //   filteredParts.length > 1 ? filteredParts[filteredParts.length - 2] : null;

  // We determine whether the last part resembles untranslated text (for example, if it contains numbers or unusual letters).
  // If it contains numbers or is not an alphabet, we display it as is.
  // Otherwise, we use the translation.
  const needsRawDisplay = /[\d\-]/.test(lastPart);

  const title = needsRawDisplay ? decodeTitle(lastPart) : t(lastPart);

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
          <Link href={PATHS.MY_CART.link} aria-label={ariaTxts('myCartPage')}>
            <MdOutlineShoppingCart className="text-2xl cursor-pointer text-enjoy-primary" />
          </Link>
        </AnimatedWrapper>
      </Container>
    </header>
  );
};

export default MobileHeader;
