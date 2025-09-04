/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslations } from 'next-intl';
import { useToast } from '@/lib/toast';
import useAPI from '@/hook/useAPI';
import FormField from '../ui/FormField';
import ResponsiveDialogDrawer from '../organism/ResponsiveDialogDrawer';
import Button from '../atomic/Button';
import ButtonLoading from '../atomic/ButtonLoading';
import useIsMobile from '@/hook/useIsMobile';
import { permissionsOptions } from '@/utils/constant';

interface UserPermissionsDrawerProps {
  userId: string | number;
  open: boolean;
  setOpen: (val: boolean) => void;
  // permissionsOptions: { id: string; name: string }[];
  trigger?: React.ReactNode;
}

interface FormValues {
  permissions: string[];
}

const UserPermissionsDrawer: React.FC<UserPermissionsDrawerProps> = ({
  userId,
  open,
  setOpen,
  trigger,
}) => {
  const t = useTranslations();
  const { showToast } = useToast();
  const isMobile = useIsMobile();

  const schema = yup.object().shape({
    permissions: yup
      .array()
      .of(yup.string().required())
      .min(1, t('Inputs.errorsMsgs.permissionsRequired'))
      .defined(), // ← يضمن إنها مش undefined
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { permissions: [] },
  });

  const { add, isLoading } = useAPI(`users/update/${userId}/permissions`);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await add(data);
      showToast(response.message);
      setOpen(false);
    } catch (err: any) {
      showToast(err?.response?.message || 'حدث خطأ', 'error');
    }
  };

  return (
    <ResponsiveDialogDrawer
      open={open}
      setOpen={setOpen}
      isMobile={isMobile}
      trigger={trigger}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          inputName="permissions"
          type="multi-select"
          label={t('Inputs.labels.permissions')}
          placeholder={t('Inputs.placeHolders.permissions')}
          control={control}
          isMulti
          options={permissionsOptions.map((opt) => ({
            id: opt.id,
            name: t(`Dashboard.Users.permissions.${opt.name}`) || '',
          }))}
          error={errors['permissions'] as FieldError | undefined}
        />
        <Button type="submit" otherClassName="p-3">
          {isLoading ? <ButtonLoading /> : t('BtnTexts.SaveChanges')}
        </Button>
      </form>
    </ResponsiveDialogDrawer>
  );
};

export default UserPermissionsDrawer;
