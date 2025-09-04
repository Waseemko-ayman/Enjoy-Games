/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import MainButton from '@/components/atomic/Button';
import ResponsiveDialogDrawer from '@/components/organism/ResponsiveDialogDrawer';
import { Button } from '@/components/ui/button';
import useAPI from '@/hook/useAPI';
import useIsMobile from '@/hook/useIsMobile';
import { Upload } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from '@/lib/toast';
import { useTranslations } from 'next-intl';
import ButtonLoading from '@/components/atomic/ButtonLoading';

interface IdProps {
  rowId: string | number;
}

interface FormValues {
  proof_file: FileList;
}

const DialogUpload = ({ rowId }: IdProps) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const { add, isLoading } = useAPI('order/upload/proof-file');
  const { showToast } = useToast();
  const t = useTranslations();

  const schema = yup
    .object({
      proof_file: yup
        .mixed<FileList>()
        .required(t('Inputs.errorsMsgs.fileRequired'))
        .test(
          'fileExists',
          t('Inputs.errorsMsgs.fileRequired'),
          (value) => value && value.length > 0
        ),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    if (!data.proof_file || data.proof_file.length === 0) return;

    const formData = new FormData();
    formData.append('order_item_id', String(rowId));
    formData.append('proof_file', data.proof_file[0]);

    try {
      const res = await add(formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      reset();
      setOpen(false);
      showToast(res?.message);
      console.log(res);
    } catch (err: any) {
      const apiError = err?.response?.message;
      showToast(apiError, 'error');
    }
  };

  return (
    <ResponsiveDialogDrawer
      trigger={
        <Button
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-gray-400 bg-transparent hover:text-blue-600 hover:bg-blue-50 transition-colors"
        >
          <Upload className="h-4 w-4" />
        </Button>
      }
      open={open}
      setOpen={setOpen}
      isMobile={isMobile}
    >
      <h3>{t('Dashboard.orders.uploadDoc')}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="file"
          {...register('proof_file')}
          className={`border rounded-md p-2 w-full mt-2 cursor-pointer ${
            errors.proof_file ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.proof_file && (
          <p className="text-red-500 text-sm mt-1">
            {errors.proof_file.message}
          </p>
        )}
        <MainButton
          otherClassName="mt-4 px-7 py-2"
          handleClick={handleSubmit(onSubmit)}
        >
          {isLoading ? <ButtonLoading /> : t('BtnTexts.upload')}
        </MainButton>
      </form>
    </ResponsiveDialogDrawer>
  );
};

export default DialogUpload;
