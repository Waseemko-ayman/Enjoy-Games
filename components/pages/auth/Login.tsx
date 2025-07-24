'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Input from '@/components/atomic/Input';
import AuthLayout from '@/components/organism/AuthLayout';
import { loginInputs } from '@/data';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { PATHS } from '@/data/paths';
import { LoginFormData } from '@/interfaces';
import FormError from '@/components/atomic/FormError';

const LoginPage = () => {
  const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);

  const inputsTxts = useTranslations('Inputs');
  const errorsMsgs = useTranslations('Inputs.errorsMsgs');
  const authTxts = useTranslations('Auth');
  const btnTxts = useTranslations('BtnTexts');

  const schema = Yup.object().shape({
    email: Yup.string()
      .email(errorsMsgs('emailPatternInvalid'))
      .required(errorsMsgs('emailRequired')),
    password: Yup.string().required(errorsMsgs('passwordRequired')),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginFormData) => {
    setIsSubmittingLocal(true);
    setTimeout(() => {
      console.log('Login Data:', data);
      reset();
      setIsSubmittingLocal(false);
    }, 1000);
  };

  return (
    <AuthLayout
      title={btnTxts('login')}
      description={authTxts('loginDesc')}
      btnText={btnTxts('login')}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitDisabled={false}
      isSubmitting={isSubmittingLocal}
    >
      {loginInputs.map((input) => {
        const label = inputsTxts(`labels.${input.name}`);
        const placeholder = inputsTxts(`placeHolders.${input.placeholder}`);
        return (
          <div key={input.id}>
            <Input
              variant="secondary"
              type={input.type}
              label={label}
              placeholder={placeholder}
              otherClassNameContainer={
                errors[input.name as keyof LoginFormData]
                  ? 'border-red-500'
                  : ''
              }
              {...register(input.name as keyof LoginFormData)}
            />
            {errors[input.name as keyof LoginFormData] && (
              <FormError
                message={
                  errors[input.name as keyof LoginFormData]?.message as string
                }
              />
            )}
          </div>
        );
      })}

      <p className="text-xs text-[var(--enjoy-gray-650)] font-normal text-center mt-4">
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
