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
import { CreateCustomersFields } from '@/utils/constant';
import FormField from '@/components/ui/FormField';
import { InputTypes } from '@/utils/type';
import SettingsTab from '@/components/ui/display/SettingsTab';
import { useUpdateContent } from '@/context/updateContentContext';
import { useTranslations } from 'next-intl';
import { CreateCustomersPorps } from '@/interfaces';
import {
  alphanumericWithArabicRegex,
  emailRegex,
  phoneReqExp,
} from '@/utils/regex';

// ----------------------------------------------------------------

const CreateCustomers = ({
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
    phone: yup
      .string()
      .matches(phoneReqExp, errorsMsgs('phoneInvalid'))
      .required(errorsMsgs('phoneRequired')),
  });

  // ----------------------------------------------------------------

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateCustomersPorps>({
    resolver: yupResolver(schema),
  });

  // ----------------------------------------------------------------

  // API Hook
  const { add, isLoading } = useAPI<FormData, any>('users/create');

  // ----------------------------------------------------------------

  const onSubmit: SubmitHandler<CreateCustomersPorps> = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('password_confirmation', data.password_confirmation);
      formData.append('phone', data.phone);

      const response = await add(formData);

      if (response) {
        showToast(response.message);
        reset();
        triggerRefresh(refreshKey);
        onTabChange('allCustomer');
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
          {CreateCustomersFields.map(
            ({ id, label, name, placeholder, type }) => (
              <FormField
                key={id}
                inputName={name}
                type={type as InputTypes}
                label={t(`Inputs.labels.${label}`)}
                placeholder={t(`Inputs.placeHolders.${placeholder}`)}
                register={register}
                control={control}
                error={
                  errors[name as keyof CreateCustomersPorps] as
                    | FieldError
                    | undefined
                }
              />
            )
          )}
        </div>
        <Button type="submit">
          {isLoading ? <ButtonLoading /> : t('BtnTexts.SaveChanges')}
        </Button>
      </form>
    </SettingsTab>
  );
};

export default CreateCustomers;
