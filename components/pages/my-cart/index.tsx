'use client';
import EmptyStateBox from '@/components/molecules/EmptyStateBox';
import CartContent from '@/components/organism/CartContent';
import { PATHS } from '@/data/paths';
import { CartItemData } from '@/interfaces';
import React, { useState } from 'react';

const MyCartPage = () => {
  const [data] = useState<CartItemData[]>([
    {
      id: 1,
      title: 'إيتالي 100',
      price: 100,
      quantity: 1,
      image: 'games-banners/fc24-banner.webp',
      currencyImage: 'saudi_riyal.png',
      storeLabel: 'المتجر السعودي',
    },
  ]);

  return (
    <div>
      {data.length > 0 ? (
        <CartContent items={data} />
      ) : (
        <EmptyStateBox
          imageSrc="/assets/empty-status.png"
          alt="empty-status"
          title="سلتك جاهزة وتناديك للتسوق"
          buttonText="ابدأ بالتسوق الأن"
          btnlink={PATHS.STORE.link}
        />
      )}
    </div>
  );
};

export default MyCartPage;
