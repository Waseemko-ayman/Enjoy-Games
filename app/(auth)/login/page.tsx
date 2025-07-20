import LoginPage from '@/components/pages/auth/Login';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'إنجوي قيمز | تسجيل الدخول',
};

const Login = () => <LoginPage />;

export default Login;
