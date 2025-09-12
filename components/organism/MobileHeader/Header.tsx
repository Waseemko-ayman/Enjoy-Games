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
import { useCategoryTitle } from '@/hook/useCategoryTitle';

const decodeTitle = (str: string) => decodeURIComponent(str).replace(/-/g, ' ');

const MobileHeader = () => {
  const pathname = usePathname();
  const t = useTranslations('PagesHeaderTitles');
  const loadingT = useTranslations('Loading');
  const ariaTxts = useTranslations('ariaLabels.links');
  const [isOpen, setIsOpen] = useState(false);

  const pathParts = pathname.split('/').filter(Boolean);
  const filteredParts = pathParts.filter(
    (part, index) => !(index === 0 && ['en', 'ar'].includes(part))
  );

  const categoryIndex = filteredParts.indexOf('categories');
  const categorySlug =
    categoryIndex !== -1 && filteredParts[categoryIndex + 1]
      ? filteredParts[categoryIndex + 1]
      : '';

  const { title: categoryLabel, loading: loadingCategory } =
    useCategoryTitle(categorySlug);

  console.log(categoryLabel);

  // نستخدم العنوان المحمّل بدل slug لو متوفر
  const title = loadingCategory
    ? loadingT('loadingMessage')
    : categoryLabel ||
      decodeTitle(filteredParts[filteredParts.length - 1] || t('home'));

  const { cartItems } = useCartContext();

  return (
    <header className="relative h-[60px] bg-enjoy-gray-light flex items-center">
      <Container otherClassName="w-full flex items-center justify-between gap-4">
        <AnimatedWrapper>
          <NavbarSheet />
        </AnimatedWrapper>
        <AnimatedWrapper direction="y" distance={-40}>
          <div className="w-full overflow-hidden" title={title}>
            <h5 className="truncate text-center text-base font-bold px-4 max-w-full w-[220px]">
              {title}
            </h5>
          </div>
        </AnimatedWrapper>

        <div className="flex gap-2">
          <NotificationsMenu
            otherClassName="text-2xl text-enjoy-primary"
            isOpen={isOpen}
            setIsNotificationsOpen={(open) => setIsOpen(open)}
          />
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
