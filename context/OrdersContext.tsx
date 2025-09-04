/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { createContext, useContext, useEffect } from 'react';
import useAPI from '@/hook/useAPI';
import { APIRequest, Order } from '@/interfaces';
import { useUpdateContent } from './updateContentContext';
import { useCurrency } from './CurrencyContext';

interface OrdersContextType extends APIRequest {
  orders: Order[] | null;
}

const OrdersContext = createContext<OrdersContextType>({
  orders: null,
  isLoading: true,
  error: null,
  refresh: () => {},
});

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { get, data, isLoading, error } = useAPI<any>('orders');
  const { refreshFlags } = useUpdateContent();
  const { selectedCountry } = useCurrency();

  const ordersRefreshFlag = refreshFlags['orders'];

  useEffect(() => {
    get();
  }, [get, ordersRefreshFlag, selectedCountry]);

  const refresh = () => get();

  return (
    <OrdersContext.Provider
      value={{
        orders: data ?? null,
        isLoading,
        error,
        refresh,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
