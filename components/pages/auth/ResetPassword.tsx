'use client';
import AuthLayout from '@/components/organism/layouts/AuthLayout';
import { useAuthContext } from '@/context/AuthContext';
import { ResetPasswordFormData } from '@/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Input from '@/components/atomic/Input';
import { InputTypes } from '@/utils/type';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import FormError from '@/components/atomic/FormError';
import { resetPassInputs } from '@/data';
import { passwordRegex } from '@/utils/regex';

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  // Translations
  const inputsTxts = useTranslations('Inputs');
  const errorsMsgs = useTranslations('Inputs.errorsMsgs');
  const authTxts = useTranslations('Auth');
  const btnTxts = useTranslations('BtnTexts');

  const schema = Yup.object().shape({
    password: Yup.string()
      .matches(passwordRegex, errorsMsgs('passwordRequirements'))
      .required(errorsMsgs('passwordRequired')),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password')], errorsMsgs('repasswordNotMatch'))
      .required(errorsMsgs('repasswordRequired')),
  });

  // Context
  const { resetPassword, isLoading } = useAuthContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(schema),
  });

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

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!email || !token) return;
    resetPassword({ ...data, email, token });
    reset();
  };

  return (
    <AuthLayout
      title={authTxts('resetPassTitle')}
      description={authTxts('resetPassDesc')}
      btnText={btnTxts('Changing')}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitDisabled={false}
      isSubmitting={isLoading}
    >
      {resetPassInputs.map((input) => {
        const { name, type } = input;
        const label = inputsTxts(`labels.${name}`);
        const placeholder = inputsTxts(`placeHolders.${input.placeholder}`);
        return (
          <div key={input.id}>
            <Input
              variant="secondary"
              type={getInputType(name, type) as InputTypes}
              inputName={input.name}
              label={label}
              placeholder={placeholder}
              Icon={getIcon(name)}
              onIconClick={isPasswordField(name) ? toggleShow(name) : undefined}
              iconClassName="text-gray-400"
              otherClassNameContainer={
                errors[input.name as keyof ResetPasswordFormData]
                  ? 'border-red-500'
                  : ''
              }
              {...register(input.name as keyof ResetPasswordFormData)}
            />
            {errors[input.name as keyof ResetPasswordFormData] && (
              <FormError
                message={
                  errors[input.name as keyof ResetPasswordFormData]
                    ?.message as string
                }
              />
            )}
          </div>
        );
      })}
    </AuthLayout>
  );
};

export default ResetPasswordPage;
