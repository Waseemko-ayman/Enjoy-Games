'use client';

import React, { createContext, useContext } from 'react';
import useAuth from '@/hook/useAuth';

type AuthContextType = ReturnType<typeof useAuth>;

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuthContext must be used within AuthProvider');
  return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
