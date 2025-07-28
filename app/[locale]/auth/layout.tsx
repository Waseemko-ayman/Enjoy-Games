import MainAuthLayout from '@/components/organism/layouts/MainAuthLayout';
import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <MainAuthLayout>{children}</MainAuthLayout>;
};

export default AuthLayout;
