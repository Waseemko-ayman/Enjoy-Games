/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import useAPI from '@/hook/useAPI';
import { APIRequest, Ticket } from '@/interfaces';
import { useUpdateContent } from './updateContentContext';

interface TicketsContextType extends APIRequest {
  tickets: Ticket[] | null;
  hasUnreadTickets: boolean;
  getSingle: (id: string | number, getConfig?: any) => Promise<any> | void;
  // markTicketsAsRead: () => void;
}

const TicketsContext = createContext<TicketsContextType>({
  tickets: null,
  isLoading: true,
  error: null,
  refresh: () => {},
  hasUnreadTickets: false,
  getSingle: async () => {},
  // markTicketsAsRead: () => {},
});

export const TicketsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { get, getSingle, data, isLoading, error } = useAPI<any>('tickets');
  const [hasUnreadTickets, setHasUnreadTickets] = useState(false);
  const { refreshFlags } = useUpdateContent();

  const ticketsRefreshFlag = refreshFlags['tickets'];

  useEffect(() => {
    get();
  }, [get, ticketsRefreshFlag]);

  useEffect(() => {
    if (data && data.length > 0) {
      setHasUnreadTickets(true);
    }
  }, [data]);

  const refresh = () => get();

  // const markTicketsAsRead = () => setHasUnreadTickets(false);

  return (
    <TicketsContext.Provider
      value={{
        tickets: data ?? null,
        isLoading,
        error,
        refresh,
        hasUnreadTickets,
        getSingle,
        // markTicketsAsRead,
      }}
    >
      {children}
    </TicketsContext.Provider>
  );
};

export const useTickets = () => useContext(TicketsContext);
