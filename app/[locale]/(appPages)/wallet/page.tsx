import WalletPage from '@/components/pages/wallet';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'إنجوي قيمز | محفظتي',
};

const Wallet = () => <WalletPage />;

export default Wallet;
