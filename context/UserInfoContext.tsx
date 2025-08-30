'use client';

import React, { createContext, useContext, useEffect } from 'react';
import useAPI from '@/hook/useAPI';
import { UserInfoContextType, UserInfo } from '@/interfaces';

const UserInfoContext = createContext<UserInfoContextType>({
  user: null,
  isLoading: true,
  error: null,
  refresh: () => {},
});

export const UserInfoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { get, data, isLoading, error } = useAPI<UserInfo>('user/my-info');

  useEffect(() => {
    get();
  }, [get]);

  const refresh = () => get();

  return (
    <UserInfoContext.Provider
      value={{
        user: data ?? null,
        isLoading,
        error,
        refresh,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => useContext(UserInfoContext);
