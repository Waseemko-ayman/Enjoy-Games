'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Input from '@/components/atomic/Input';
import AuthLayout from '@/components/organism/layouts/AuthLayout';
import { loginInputs } from '@/data';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { PATHS } from '@/data/paths';
import { LoginFormData } from '@/interfaces';
import FormError from '@/components/atomic/FormError';
import { useAuthContext } from '@/context/AuthContext';
import { InputTypes } from '@/utils/type';
import { useRouter } from 'next/navigation';
import SocialLogin from '@/components/molecules/SocialLogin';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const inputsTxts = useTranslations('Inputs');
  const errorsMsgs = useTranslations('Inputs.errorsMsgs');
  const authTxts = useTranslations('Auth');
  const btnTxts = useTranslations('BtnTexts');
  const { login, isLoading, token } = useAuthContext();
  const router = useRouter();

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

  const hadnleShowPass = () => {
    setShowPass(!showPass);
  };

  const onSubmit = (data: LoginFormData) => {
    login(data);
    reset();
  };

  useEffect(() => {
    const otpEmail = sessionStorage.getItem('otp_email');

    if (token) {
      router.replace(PATHS.HOME.link);
    } else if (otpEmail) {
      router.replace(PATHS.OTP);
    }
  }, [token, router]);

  return (
    <AuthLayout
      title={btnTxts('login')}
      description={authTxts('loginDesc')}
      btnText={btnTxts('login')}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitDisabled={false}
      isSubmitting={isLoading}
    >
      {loginInputs.map((input) => {
        const label = inputsTxts(`labels.${input.name}`);
        const placeholder = inputsTxts(`placeHolders.${input.placeholder}`);
        const isPasswordField = input.name === 'password';
        const showPasswordIcon = isPasswordField
          ? showPass
            ? FaEyeSlash
            : FaEye
          : undefined;
        return (
          <div key={input.id}>
            <Input
              variant="secondary"
              type={
                isPasswordField
                  ? showPass
                    ? 'text'
                    : 'password'
                  : (input.type as InputTypes)
              }
              inputName={input.name}
              label={label}
              placeholder={placeholder}
              Icon={showPasswordIcon}
              onIconClick={hadnleShowPass}
              iconClassName="text-gray-400"
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

      <SocialLogin btnTxts={btnTxts} authTxts={authTxts} />

      <p className="text-xs text-[var(--enjoy-gray-650)] font-normal text-center mt-4">
        {authTxts('dontHaveAccount')}{' '}
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
