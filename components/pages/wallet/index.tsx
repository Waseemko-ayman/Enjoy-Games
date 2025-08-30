'use client';
import React from 'react';
import PageHeader from '@/components/molecules/PageHeader';
import WalletContent from './Sections/WalletContent';
import { WalletProvider } from '@/context/WalletContext';

const WalletPage = () => {
  return (
    <>
      <PageHeader />
      <WalletProvider>
        <WalletContent />
      </WalletProvider>
    </>
  );
};

export default WalletPage;
