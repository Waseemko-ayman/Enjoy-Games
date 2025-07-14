import Button from '@/components/atomic/Button';
import { PATHS } from '@/data/paths';
import Link from 'next/link';
import React from 'react';
import { FiLogIn } from 'react-icons/fi';

const AuthButtons = () => {
  const btnStyle = 'w-full py-2.5 text-sm';

  return (
    <div className="flex items-center justify-between gap-2">
      <Link href={PATHS.LOGIN} className="w-full">
        <Button otherClassName={btnStyle} iconPosition="left" Icon={FiLogIn}>
          تسجيل دخول
        </Button>
      </Link>
      <Link href={PATHS.SIGN_UP} className="w-full">
        <Button variant="forth" otherClassName={btnStyle}>
          أنشىء حساب
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
