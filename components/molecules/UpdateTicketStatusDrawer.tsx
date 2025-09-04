/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslations } from 'next-intl';
import { useToast } from '@/lib/toast';
import useAPI from '@/hook/useAPI';
import ResponsiveDialogDrawer from '../organism/ResponsiveDialogDrawer';
import Button from '../atomic/Button';
import ButtonLoading from '../atomic/ButtonLoading';
import useIsMobile from '@/hook/useIsMobile';
import { ticketsStatus } from '@/utils/constant';
import Select from 'react-select';
// import { useUpdateContent } from '@/context/updateContentContext';

interface UpdateTicketDrawerProps {
  ticketId: string | number;
  open: boolean;
  setOpen: (val: boolean) => void;
  trigger?: React.ReactNode;
  onSuccess?: (newStatusName: string) => void;
}

interface FormValues {
  status: string;
}

const UpdateTicketStatusDrawer: React.FC<UpdateTicketDrawerProps> = ({
  ticketId,
  open,
  setOpen,
  trigger,
  onSuccess,
}) => {
  const t = useTranslations();
  const { showToast } = useToast();
  const isMobile = useIsMobile();
  // const { triggerRefresh } = useUpdateContent();

  const schema = yup.object().shape({
    status: yup.string().required(t('Inputs.errorsMsgs.statusRequired')),
  });

  const {
    control,
    // register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { status: '' },
  });

  const { add, isLoading } = useAPI(`tickets/${ticketId}/status`);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await add(data);
      const statusName =
        ticketsStatus.find((s) => s.id === data.status)?.name ||
        String(data.status);
      onSuccess?.(statusName);
      showToast(response.message);
      setOpen(false);
      // triggerRefresh('tickets');
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
        <label htmlFor="status" className="text-sm font-medium text-gray-700">
          {t('Inputs.labels.status')}
        </label>

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={ticketsStatus.map((status) => ({
                value: status.id,
                label: status.name,
              }))}
              placeholder={t('Inputs.placeHolders.status')}
              classNamePrefix="react-select"
              className={errors.status ? 'border-red-500 rounded-md' : ''}
              onChange={(option) => field.onChange(option?.value || '')}
              value={
                ticketsStatus
                  .map((status) => ({ value: status.id, label: status.name }))
                  .find((opt) => opt.value === field.value) || null
              }
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderColor: errors.status ? '#ef4444' : base.borderColor,
                  boxShadow: state.isFocused
                    ? errors.status
                      ? '0 0 0 2px rgba(239, 68, 68, 0.3)'
                      : '0 0 0 2px rgba(59, 130, 246, 0.3)'
                    : base.boxShadow,
                  '&:hover': {
                    borderColor: errors.status ? '#ef4444' : '#3b82f6',
                  },
                }),
              }}
            />
          )}
        />

        {errors.status && (
          <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
        )}

        <Button type="submit" otherClassName="p-3 mt-2">
          {isLoading ? <ButtonLoading /> : t('BtnTexts.SaveChanges')}
        </Button>
      </form>
    </ResponsiveDialogDrawer>
  );
};

export default UpdateTicketStatusDrawer;
