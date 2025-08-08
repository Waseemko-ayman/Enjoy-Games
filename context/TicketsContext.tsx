/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import useAPI from '@/hook/useAPI';
import { APIRequest, Ticket } from '@/interfaces';

interface TicketsContextType extends APIRequest {
  tickets: Ticket[] | null;
  hasUnreadTickets: boolean;
  markTicketsAsRead: () => void;
}

const TicketsContext = createContext<TicketsContextType>({
  tickets: null,
  isLoading: true,
  error: null,
  refresh: () => {},
  hasUnreadTickets: false,
  markTicketsAsRead: () => {},
});

export const TicketsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { get, data, isLoading, error } = useAPI<any>('tickets');
  const [hasUnreadTickets, setHasUnreadTickets] = useState(false);

  useEffect(() => {
    get();
  }, [get]);

  useEffect(() => {
    if (data && data.length > 0) {
      setHasUnreadTickets(true);
    }
  }, [data]);

  const refresh = () => get();

  const markTicketsAsRead = () => setHasUnreadTickets(false);

  return (
    <TicketsContext.Provider
      value={{
        tickets: data ?? null,
        isLoading,
        error,
        refresh,
        hasUnreadTickets,
        markTicketsAsRead,
      }}
    >
      {children}
    </TicketsContext.Provider>
  );
};

export const useTickets = () => useContext(TicketsContext);
