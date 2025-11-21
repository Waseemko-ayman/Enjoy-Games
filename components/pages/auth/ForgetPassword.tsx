'use client';

import React from 'react';
import AuthLayout from '@/components/organism/layouts/AuthLayout';
import { useTranslations } from 'next-intl';
import Input from '@/components/atomic/Input';
import { ForgetPasswordFormData } from '@/interfaces';
import FormError from '@/components/atomic/FormError';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '@/context/AuthContext';

const ForgetPasswordPage = () => {
  // Translations
  const inputsTxts = useTranslations('Inputs');
  const errorsMsgs = useTranslations('Inputs.errorsMsgs');
  const authTxts = useTranslations('Auth');
  const btnTxts = useTranslations('BtnTexts');

  const schema = Yup.object().shape({
    email: Yup.string()
      .email(errorsMsgs('emailPatternInvalid'))
      .required(errorsMsgs('emailRequired')),
  });

  // Context
  const { forgotPassword, isLoading } = useAuthContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgetPasswordFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ForgetPasswordFormData) => {
    forgotPassword(data);
    reset();
  };

  return (
    <AuthLayout
      title={authTxts('forgetPassTitle')}
      description={authTxts('forgetPassDesc')}
      btnText={btnTxts('PasswordRecovery')}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitDisabled={false}
      isSubmitting={isLoading}
    >
      <div>
        <Input
          variant="secondary"
          type="email"
          inputName="email"
          label={inputsTxts(`labels.email`)}
          placeholder={inputsTxts(`placeHolders.writeYorEmail`)}
          iconClassName="text-gray-400"
          otherClassNameContainer={errors['email'] ? 'border-red-500' : ''}
          {...register('email')}
        />
        {errors['email'] && (
          <FormError message={errors['email']?.message as string} />
        )}
      </div>
    </AuthLayout>
  );
};

export default ForgetPasswordPage;
