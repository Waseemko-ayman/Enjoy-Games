/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { createContext, useContext, useEffect } from 'react';
import useAPI from '@/hook/useAPI';
import { FaqsContextType, FAQSDataType } from '@/interfaces';

const FaqsContext = createContext<FaqsContextType>({
  faqs: null,
  isLoading: true,
  error: null,
  refresh: () => {},
});

export const FaqsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { get, data, isLoading, error } = useAPI<FAQSDataType>('faqs');

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
