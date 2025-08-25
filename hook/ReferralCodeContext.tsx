'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface referralCodeContextType {
  referralCode: string | null;
  setReferralCode: (id: string) => void;
}

const referralCodeContext = createContext<referralCodeContextType | undefined>(
  undefined
);

export const ReferralCodeProvider = ({ children }: { children: ReactNode }) => {
  const [referralCode, setReferralCode] = useState<string | null>(null);

  return (
    <referralCodeContext.Provider value={{ referralCode, setReferralCode }}>
      {children}
    </referralCodeContext.Provider>
  );
};

export const useReferralCode = () => {
  const ctx = useContext(referralCodeContext);
  if (!ctx)
    throw new Error('useUniqueId must be used inside ReferralCodeProvider');
  return ctx;
};
