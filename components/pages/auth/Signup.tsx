'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Input from '@/components/atomic/Input';
import AuthLayout from '@/components/organism/AuthLayout';
import { signupInputs } from '@/data';
import { PATHS } from '@/data/paths';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { signupFormData } from '@/interfaces';
import FormError from '@/components/atomic/FormError';

const SignupPage = () => {
  const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);

  const inputsTxts = useTranslations('Inputs');
  const errorsMsgs = useTranslations('Inputs.errorsMsgs');
  const authTxts = useTranslations('Auth');
  const btnTxts = useTranslations('BtnTexts');
  const reqTxts = useTranslations('Layout.footer.LearnMore');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .matches(emailRegex, errorsMsgs('emailPatternInvalid'))
      .required(errorsMsgs('emailRequired')),
    password: Yup.string().required(errorsMsgs('passwordRequired')),
    repassword: Yup.string()
      .oneOf([Yup.ref('password')], errorsMsgs('repasswordNotMatch'))
      .required(errorsMsgs('repasswordRequired')),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<signupFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: signupFormData) => {
    setIsSubmittingLocal(true);
    setTimeout(() => {
      console.log('Signup Data:', data);
      reset();
      setIsSubmittingLocal(false);
    }, 1000);
  };

  return (
    <AuthLayout
      title={authTxts('signupTitle')}
      description={authTxts('signupDesc')}
      btnText={btnTxts('createAccount')}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitDisabled={isSubmittingLocal}
    >
      {signupInputs.map((input) => {
        const label = inputsTxts(`labels.${input.name}`);
        const placeholder = inputsTxts(`placeHolders.${input.placeholder}`);
        return (
          <div key={input.id}>
            <Input
              key={input.id}
              variant="secondary"
              type={input.type}
              label={label}
              placeholder={placeholder}
              otherClassNameContainer={
                errors[input.name as keyof signupFormData]
                  ? 'border-red-500'
                  : ''
              }
              {...register(input.name as keyof signupFormData)}
            />
            {errors[input.name as keyof signupFormData] && (
              <FormError
                message={
                  errors[input.name as keyof signupFormData]?.message as string
                }
              />
            )}
          </div>
        );
      })}

      <p className="text-xs text-[var(--enjoy-gray-650)] font-normal text-center mt-4">
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
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignupPage;
