import Button from '@/components/atomic/Button';
import { PATHS } from '@/data/paths';
import { TranslationFunction } from '@/interfaces';
import Link from 'next/link';
import React from 'react';
import { FiLogIn } from 'react-icons/fi';

const AuthButtons = ({ t }: { t: TranslationFunction }) => {
  const btnStyle = 'w-full py-2.5 text-sm';

  return (
    <div className="flex items-center justify-between gap-2">
      <Link href={PATHS.LOGIN} className="w-full">
        <Button otherClassName={btnStyle} iconPosition="left" Icon={FiLogIn}>
          {t('login')}
        </Button>
      </Link>
      <Link href={'#'} className="w-full">
        <Button variant="forth" otherClassName={btnStyle}>
          {t('createAccount')}
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
