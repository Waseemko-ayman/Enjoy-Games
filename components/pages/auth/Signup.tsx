/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Input from '@/components/atomic/Input';
import AuthLayout from '@/components/organism/layouts/AuthLayout';
import { signupInputs } from '@/data';
import { PATHS } from '@/data/paths';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { signupFormData } from '@/interfaces';
import FormError from '@/components/atomic/FormError';
import { InputTypes } from '@/utils/type';
import { useAuthContext } from '@/context/AuthContext';
import SocialLogin from '@/components/molecules/SocialLogin';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const inputsTxts = useTranslations('Inputs');
  const errorsMsgs = useTranslations('Inputs.errorsMsgs');
  const authTxts = useTranslations('Auth');
  const btnTxts = useTranslations('BtnTexts');
  const reqTxts = useTranslations('Layout.footer.LearnMore');
  const { signup, isLoading } = useAuthContext();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const alphanumericWithArabicRegex = /^[A-Za-z\u0621-\u064A0-9_ ]{5,}$/;
  const referralRegex = /^[A-Za-z0-9]*$/;

  const schema = Yup.object().shape({
    name: Yup.string()
      .matches(alphanumericWithArabicRegex, errorsMsgs('usernameInvalid'))
      .required('usernameRequired'),
    email: Yup.string()
      .email()
      .matches(emailRegex, errorsMsgs('emailPatternInvalid'))
      .required(errorsMsgs('emailRequired')),
    password: Yup.string().required(errorsMsgs('passwordRequired')),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password')], errorsMsgs('repasswordNotMatch'))
      .required(errorsMsgs('repasswordRequired')),
    referral_code: Yup.string()
      .nullable()
      .optional()
      .matches(referralRegex, errorsMsgs('referralCodeInvalid')),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<signupFormData>({
    resolver: yupResolver(schema) as any,
  });
  const onSubmit = (data: signupFormData) => {
    signup(data);
    reset();
  };

  const isPasswordField = (name: string) =>
    name === 'password' || name === 'password_confirmation';

  const getShowState = (name: string) =>
    name === 'password' ? showPassword : showConfirmPassword;

  const toggleShow = (name: string) =>
    name === 'password'
      ? () => setShowPassword((prev) => !prev)
      : () => setShowConfirmPassword((prev) => !prev);

  const getIcon = (name: string) => {
    if (!isPasswordField(name)) return undefined;
    return getShowState(name) ? FaEyeSlash : FaEye;
  };

  const getInputType = (name: string, defaultType: string) =>
    isPasswordField(name) && getShowState(name) ? 'text' : defaultType;

  return (
    <AuthLayout
      title={authTxts('signupTitle')}
      description={authTxts('signupDesc')}
      btnText={btnTxts('createAccount')}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitDisabled={false}
      isSubmitting={isLoading}
    >
      {signupInputs.map((input) => {
        const { name, type } = input;
        const label = inputsTxts(`labels.${input.name}`);
        const placeholder = inputsTxts(`placeHolders.${input.placeholder}`);

        return (
          <div key={input.id}>
            <Input
              variant="secondary"
              type={getInputType(name, type) as InputTypes}
              inputName={name}
              label={label}
              placeholder={placeholder}
              Icon={getIcon(name)}
              onIconClick={isPasswordField(name) ? toggleShow(name) : undefined}
              iconClassName="text-gray-400"
              otherClassNameContainer={
                errors[name as keyof signupFormData] ? 'border-red-500' : ''
              }
              {...register(name as keyof signupFormData)}
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

      <SocialLogin btnTxts={btnTxts} authTxts={authTxts} />

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
