import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;
