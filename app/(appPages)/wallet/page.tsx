import dynamic from 'next/dynamic';
import React from 'react';

const WalletPage = dynamic(() => import('@/components/pages/wallet'), {
  ssr: false,
});

const Wallet = () => <WalletPage />;

export default Wallet;
