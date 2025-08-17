'use client';

import React, { createContext, useContext, useEffect } from 'react';
import useAPI from '@/hook/useAPI';
import { TotalPaidContextType, TotalPaidData } from '@/interfaces';

const TotalPaidContext = createContext<TotalPaidContextType>({
  totalPaid: null,
  isLoading: true,
  error: null,
  refresh: () => {},
});

export const TotalPaidProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { get, data, isLoading, error } =
    useAPI<TotalPaidData>('user/total-paid');

  useEffect(() => {
    get();
  }, [get]);

  const refresh = () => get();

  return (
    <TotalPaidContext.Provider
      value={{
        totalPaid: data ?? null,
        isLoading,
        error,
        refresh,
      }}
    >
      {children}
    </TotalPaidContext.Provider>
  );
};

export const useTotalPaid = () => useContext(TotalPaidContext);
