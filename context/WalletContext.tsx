'use client';
import useAPI from '@/hook/useAPI';
import React, { createContext, useContext, useEffect } from 'react';
import { useCurrency } from './CurrencyContext';

interface WalletData {
  wallet_balance: {
    amount: number;
    currency: string;
  };
  points_balance: number;
  points_to_cash: {
    amount: number;
    currency: string;
  };
  wallet_transactions: {
    type: 'deposit' | 'withdraw' | string;
    amount: {
      amount: number;
      currency: string;
    };
  }[];
}

interface WalletContextType {
  myWallet: WalletData | null;
  isLoading: boolean;
  error: string;
  refreshWallet?: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    get: getWallet,
    data: walletData,
    isLoading,
    error,
  } = useAPI('user/my-wallet');

  const { selectedCountry } = useCurrency();

  useEffect(() => {
    getWallet();
  }, [getWallet, selectedCountry]);

  const refreshWallet = () => getWallet();

  return (
    <WalletContext.Provider
      value={{
        myWallet: walletData || null,
        isLoading,
        error,
        refreshWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
