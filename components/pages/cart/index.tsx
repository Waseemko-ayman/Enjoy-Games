'use client';
import EmptyStateBox from '@/components/molecules/EmptyStateBox';
import React from 'react';

const CartPage = () => {
  return (
    <div>
      <EmptyStateBox
        imageSrc="/assets/empty-status.png"
        alt="empty-status"
        title="سلتك جاهزة وتناديك للتسوق"
        buttonText="ابدأ بالتسوق الأن"
        btnlink="#"
      />
    </div>
  );
};

export default CartPage;
