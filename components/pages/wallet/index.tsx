'use client';
import React from 'react';
import PageHeader from '@/components/molecules/PageHeader';
import { TotalPaidProvider } from '@/context/TotalPaidContext';
import WalletContent from './Sections/WalletContent';

const WalletPage = () => {
  return (
    <TotalPaidProvider>
      <PageHeader />
      <WalletContent />
    </TotalPaidProvider>
  );
};

export default WalletPage;
