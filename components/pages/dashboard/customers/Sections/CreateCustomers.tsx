/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import ButtonLoading from '@/components/atomic/ButtonLoading';
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
import { getUserSchema, toFormData } from '@/utils/accountSchema';

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
  const { triggerRefresh } = useUpdateContent();
  const refreshKey = 'users';

  // Date Now
  const date = new Date();
  const currentYear = date.getFullYear();

  // ----------------------------------------------------------------

  const schema = getUserSchema(t, currentYear);

  // ----------------------------------------------------------------

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateCustomersPorps>({
    resolver: yupResolver(schema) as any,
  });

  // ----------------------------------------------------------------

  // API Hook
  const { add, isLoading } = useAPI<FormData, any>('users/create');

  // ----------------------------------------------------------------

  const onSubmit: SubmitHandler<CreateCustomersPorps> = async (data) => {
    console.log(data);
    try {
      const formData = toFormData(data);
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
      title={t('Dashboard.Users.createCustomers')}
      description={t('Dashboard.Users.createNewCustomers')}
    >
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="grid gap-5 md:grid-cols-2 mb-5">
          {CreateCustomersFields.map(
            ({ id, label, name, placeholder, type, options }) => {
              const isMultiSelect = ['permissions'].includes(name);
              const fieldOptions = options?.map((opt) => {
                if ('labelKey' in opt && 'value' in opt) {
                  return {
                    id: opt.id,
                    name:
                      t(`Inputs.options.gender.${opt.labelKey}`) ||
                      opt.labelKey,
                    value: opt.value,
                  };
                } else if ('name' in opt) {
                  return {
                    id: opt.id,
                    name:
                      t(`Dashboard.Users.permissions.${opt.name}`) || opt.name,
                    value: opt.id,
                  };
                }
                return opt;
              });

              return (
                <FormField
                  key={id}
                  inputName={name}
                  type={type as InputTypes}
                  label={t(`Inputs.labels.${label}`)}
                  placeholder={t(`Inputs.placeHolders.${placeholder}`)}
                  register={register}
                  options={fieldOptions}
                  control={control}
                  isMulti={isMultiSelect}
                  error={
                    errors[name as keyof CreateCustomersPorps] as
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

export default CreateCustomers;
