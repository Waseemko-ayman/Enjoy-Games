'use client';

import React from 'react';
import Container from '../Container';
import { MdOutlineShoppingCart } from 'react-icons/md';
import NavbarSheet from '@/components/molecules/NavbarSheet';
import { usePathname } from 'next/navigation';
import { PATHS } from '@/data/paths';
import Link from 'next/link';

const MobileHeader = () => {
  const pathname = usePathname();

  // Split the pathname and remove empty parts
  const pathParts = pathname.split('/').filter(Boolean);

  // Extract only the page name (last part of the path)
  const pageKey = pathParts[pathParts.length - 1] || '';

  // Create a map of path names using values from PATHS
  const pathNameMap = Object.entries(PATHS).reduce<Record<string, string>>(
    (acc, [, value]) => {
      if (typeof value === 'object' && value.link && value.name) {
        // Extract the page key (last part of the link)
        const key = value.link.split('/').pop() || '';
        acc[key] = value.name;
      }
      return acc;
    },
    {}
  );

  const title = pathNameMap[pageKey] || 'الرئيسية';

  return (
    <header className="h-[60px] bg-enjoy-gray-light flex items-center">
      <Container otherClassName="w-full flex items-center justify-between gap-4">
        <NavbarSheet />
        <h5 className="text-center text-lg font-bold w-full overflow-hidden whitespace-nowrap">
          {title}
        </h5>
        <Link href={PATHS.MY_CART.link}>
          <MdOutlineShoppingCart className="text-2xl cursor-pointer text-enjoy-primary" />
        </Link>
      </Container>
    </header>
  );
};

export default MobileHeader;
