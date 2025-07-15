'use client';
import EmptyStateBox from '@/components/molecules/EmptyStateBox';
import { PATHS } from '@/data/paths';
import React from 'react';

const MyCartPage = () => {
  return (
    <div>
      <EmptyStateBox
        imageSrc="/assets/empty-status.png"
        alt="empty-status"
        title="سلتك جاهزة وتناديك للتسوق"
        buttonText="ابدأ بالتسوق الأن"
        btnlink={PATHS.STORE.link}
      />
    </div>
  );
};

export default MyCartPage;
