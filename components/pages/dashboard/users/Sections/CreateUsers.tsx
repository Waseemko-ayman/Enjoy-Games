/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import * as yup from 'yup';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from '@/lib/toast';
import useAPI from '@/hook/useAPI';
import { CreateUsersFields } from '@/utils/constant';
import FormField from '@/components/ui/FormField';
import { InputTypes } from '@/utils/type';
import SettingsTab from '@/components/ui/display/SettingsTab';
import { useUpdateContent } from '@/context/updateContentContext';
import { useTranslations } from 'next-intl';
import { CreateUsersPorps } from '@/interfaces';

// ----------------------------------------------------------------

const CreateUsers = ({
  value,
  onTabChange,
}: {
  value: string;
  editId: string | number | null;
  onEditIdChange: (id: string | number | null) => void;
  onTabChange: (val: string) => void;
}) => {
  const { showToast } = useToast();
  const t = useTranslations();
  const errorsMsgs = useTranslations('Inputs.errorsMsgs');
  const { triggerRefresh } = useUpdateContent();
  const refreshKey = 'users';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const alphanumericWithArabicRegex = /^[A-Za-z\u0621-\u064A0-9_ ]{5,}$/;

  // ----------------------------------------------------------------

  const schema = yup.object().shape({
    name: yup
      .string()
      .matches(alphanumericWithArabicRegex, errorsMsgs('usernameInvalid'))
      .required('usernameRequired'),
    email: yup
      .string()
      .email()
      .matches(emailRegex, errorsMsgs('emailPatternInvalid'))
      .required(errorsMsgs('emailRequired')),
    password: yup.string().required(errorsMsgs('passwordRequired')),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password')], errorsMsgs('repasswordNotMatch'))
      .required(errorsMsgs('repasswordRequired')),
    permissions: yup
      .array()
      .of(yup.string())
      .required(errorsMsgs('permissionsRequired')),
  });

  // ----------------------------------------------------------------

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateUsersPorps>({
    resolver: yupResolver(schema),
  });

  // ----------------------------------------------------------------

  // API Hook
  const { add, isLoading } = useAPI<FormData, any>('users/create');

  // ----------------------------------------------------------------

  const onSubmit: SubmitHandler<CreateUsersPorps> = async (data) => {
    console.log(data);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('password_confirmation', data.password_confirmation);
      formData.append('permissions', JSON.stringify(data.permissions));

      const response = await add(formData);

      if (response) {
        console.log(response);
        showToast(response.message);
        reset();
        triggerRefresh(refreshKey);
        onTabChange('allUsers');
      }
    } catch (err: any) {
      showToast(err?.response?.message || 'حدث خطأ', 'error');
    }
  };

  // ----------------------------------------------------------------

  return (
    <SettingsTab
      value={value}
      title={t('Dashboard.products.createProduct')}
      description={t('Dashboard.products.createNewProduct')}
    >
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="grid gap-5 md:grid-cols-2 mb-5">
          {CreateUsersFields.map(
            ({ id, label, name, placeholder, type, options }) => {
              const isMultiSelect = ['permissions'].includes(name);
              return (
                <FormField
                  key={id}
                  inputName={name}
                  type={type as InputTypes}
                  label={t(`Inputs.labels.${label}`)}
                  placeholder={t(`Inputs.placeHolders.${placeholder}`)}
                  register={register}
                  options={options?.map((opt) => ({
                    id: opt.id,
                    name: t(`Dashboard.Users.permissions.${opt.name}`),
                  }))}
                  control={control}
                  isMulti={isMultiSelect}
                  error={
                    errors[name as keyof CreateUsersPorps] as
                      | FieldError
                      | undefined
                  }
                />
              );
            }
          )}
        </div>
        <Button type="submit">
          {isLoading ? <ButtonLoading /> : t('BtnTexts.SaveChanges')}
        </Button>
      </form>
    </SettingsTab>
  );
};

export default CreateUsers;
