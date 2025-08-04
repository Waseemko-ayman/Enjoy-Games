/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { createContext, useContext, useEffect } from 'react';
import useAPI from '@/hook/useAPI';
import { APIRequest, Ticket } from '@/interfaces';

interface FaqsContextType extends APIRequest {
  faqs: Ticket[] | null;
}

const FaqsContext = createContext<FaqsContextType>({
  faqs: null,
  isLoading: true,
  error: null,
  refresh: () => {},
});

export const FaqsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { get, data, isLoading, error } = useAPI<any>('faqs');

  useEffect(() => {
    get();
  }, []);

  const refresh = () => get();

  return (
    <FaqsContext.Provider
      value={{
        faqs: data ?? null,
        isLoading,
        error,
        refresh,
      }}
    >
      {children}
    </FaqsContext.Provider>
  );
};

export const useFAQS = () => useContext(FaqsContext);
