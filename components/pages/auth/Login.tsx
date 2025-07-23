'use client';
import React from 'react';
import AuthLayout from '@/components/organism/AuthLayout';
import Input from '@/components/atomic/Input';
import { loginInputs } from '@/data';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { PATHS } from '@/data/paths';

const LoginPage = () => {
  const inputsTxts = useTranslations('Inputs');
  const authTxts = useTranslations('Auth');

  const btnTxts = useTranslations('BtnTexts');
  return (
    <AuthLayout
      title={btnTxts('login')}
      description={authTxts('loginDesc')}
      btnText={btnTxts('login')}
    >
      {loginInputs.map((input) => {
        const label = inputsTxts(`labels.${input.name}`);
        const placeholder = inputsTxts(`placeHolders.${input.placeholder}`);
        return (
          <Input
            key={input.id}
            variant="secondary"
            type={input.type}
            label={label}
            placeholder={placeholder}
          />
        );
      })}
      <p className="text-xs text-[var(--enjoy-gray-650)] font-normal text-center  leading-relaxed mt-4">
        {authTxts('dontHabeAccount')}{' '}
        <Link
          href={PATHS.SIGNUP}
          className="text-enjoy-primary font-semibold hover:text-enjoy-primary-soft transition-colors duration-500"
        >
          {btnTxts('createAccount')}
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
