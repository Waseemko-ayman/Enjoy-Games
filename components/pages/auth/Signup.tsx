import Input from '@/components/atomic/Input';
import AuthLayout from '@/components/organism/AuthLayout';
import { signupInputs } from '@/data';
import { PATHS } from '@/data/paths';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

const SignupPage = () => {
  const inputsTxts = useTranslations('Inputs');
  const authTxts = useTranslations('Auth');
  const btnTxts = useTranslations('BtnTexts');
  const reqTxts = useTranslations('Layout.footer.LearnMore');
  return (
    <AuthLayout
      title={authTxts('signupTitle')}
      description={authTxts('signupDesc')}
      btnText={btnTxts('createAccount')}
    >
      {signupInputs.map((input) => {
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
        {authTxts('registerationReq')}{' '}
        <Link
          href={PATHS.PRIVACY_POLICY.link}
          className="text-enjoy-primary font-semibold hover:text-enjoy-primary-soft transition-colors duration-300"
        >
          {reqTxts('privacyPolicy')}
        </Link>{' '}
        ,{' '}
        <Link
          href="#"
          className="text-enjoy-primary font-semibold hover:text-enjoy-primary-soft transition-colors duration-300"
        >
          {authTxts('termsAndConditions')}
        </Link>{' '}
      </p>
    </AuthLayout>
  );
};

export default SignupPage;
