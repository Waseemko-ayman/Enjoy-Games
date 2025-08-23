'use client';

import React, { useState } from 'react';
import Container from '../Container';
import { MdOutlineShoppingCart } from 'react-icons/md';
import NavbarSheet from '@/components/molecules/NavbarSheet';
import { usePathname } from 'next/navigation';
import { PATHS } from '@/data/paths';
import Link from 'next/link';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { useTranslations } from 'next-intl';
import { useCartContext } from '@/context/CartContext';
import NotificationsMenu from '../NotificationsMenu';

const decodeTitle = (str: string) => decodeURIComponent(str).replace(/-/g, ' ');

const MobileHeader = () => {
  const pathname = usePathname();
  const t = useTranslations('PagesHeaderTitles');
  const ariaTxts = useTranslations('ariaLabels.links');
  const [isOpen, setIsOpen] = useState(false);

  /*
    const translatedParts = useTranslatedPathParts(pathname);
    const title =
      translatedParts.length > 0
        ? translatedParts[translatedParts.length - 1]
        : 'Home';
  */

  const pathParts = pathname.split('/').filter(Boolean);
  const filteredParts = pathParts.filter(
    (part, index) => !(index === 0 && ['en', 'ar'].includes(part))
  );

  // Last part of the path - we display it as is (decoded with dashes replaced)
  const lastPart = filteredParts[filteredParts.length - 1] || 'home';

  const needsRawDisplay = /\d/.test(lastPart);

  const title = needsRawDisplay ? decodeTitle(lastPart) : t(lastPart);

  const { cartItems } = useCartContext();

  return (
    <header className="relative h-[60px] bg-enjoy-gray-light flex items-center">
      <Container otherClassName="w-full flex items-center justify-between gap-4">
        <AnimatedWrapper>
          <NavbarSheet />
        </AnimatedWrapper>
        <AnimatedWrapper direction="y" distance={-40}>
          <h5 className="text-center text-lg font-bold w-full overflow-hidden whitespace-nowrap">
            {title}
          </h5>
        </AnimatedWrapper>
        <div className="flex gap-2">
          {/* Notifications Menu */}
          <NotificationsMenu
            otherClassName="text-2xl text-enjoy-primary"
            isOpen={isOpen}
            setIsNotificationsOpen={(open) => setIsOpen(open)}
          />
          {/* Cart Icon */}
          <AnimatedWrapper direction="y" distance={-40}>
            <Link
              href={PATHS.MY_CART.link}
              aria-label={ariaTxts('myCartPage')}
              className="relative"
            >
              <MdOutlineShoppingCart className="text-2xl cursor-pointer text-enjoy-primary" />
              {cartItems.length > 0 && (
                <div className="absolute -right-1 -top-2 flex items-center justify-center text-white bg-red-500 text-xs w-4 h-4 rounded-[50%]">
                  <span className="font-sans">{cartItems.length}</span>
                </div>
              )}
            </Link>
          </AnimatedWrapper>
        </div>
      </Container>
    </header>
  );
};

export default MobileHeader;
