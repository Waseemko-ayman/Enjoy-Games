/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import * as yup from 'yup';
import {
  useForm,
  SubmitHandler,
  FieldError,
  Controller,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from '@/lib/toast';
import useAPI from '@/hook/useAPI';
import { CreateTicketsFields } from '@/utils/constant';
import FormField from '@/components/ui/FormField';
import { InputTypes } from '@/utils/type';
import SettingsTab from '@/components/ui/display/SettingsTab';
import { useUpdateContent } from '@/context/updateContentContext';
import { TicketResponse } from '@/interfaces';
import Image from 'next/image';
import { FaX } from 'react-icons/fa6';
import { useTranslations } from 'next-intl';

// ----------------------------------------------------------------

const CreateTickets = ({
  value,
  onTabChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
}) => {
  const { showToast } = useToast();
  const { triggerRefresh } = useUpdateContent();
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations();
  const inputT = useTranslations('Inputs.errorsMsgs');

  // ----------------------------------------------------------------

  const createSchema = yup.object({
    subject: yup.string().required(inputT('subjectRequired')),
    message: yup.string().required(inputT('detailsRequired')),
    attachments: yup.array().of(yup.mixed<File>()).optional(),
  });

  type TicketFormData = yup.InferType<typeof createSchema>;

  // ----------------------------------------------------------------

  // API Hook
  const { add, isLoading } = useAPI<FormData, TicketResponse>('tickets/create');

  // ----------------------------------------------------------------

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<any, TicketFormData>({
    resolver: yupResolver(createSchema),
    defaultValues: {
      subject: '',
      message: '',
      attachments: [],
    },
  });

  // ----------------------------------------------------------------

  const onSubmit: SubmitHandler<TicketFormData> = async (data) => {
    try {
      const formData = new FormData();

      formData.append('subject', data.subject);
      formData.append('message', data.message);

      if (data.attachments && data.attachments.length > 0) {
        data.attachments.forEach((file) => {
          if (file) formData.append('attachments[]', file);
        });
      }

      const response = await add(formData);

      if (response) {
        showToast(response.message);
        reset();
        setAttachments([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
        triggerRefresh();
        onTabChange('allTickets');
      }
    } catch (err: any) {
      showToast(err?.response?.message || 'حدث خطأ', 'error');
    }
  };

  // ----------------------------------------------------------------

  const removeAttachment = (index: number) => {
    const updated = attachments.filter((_, i) => i !== index);
    setAttachments(updated);
    setValue('attachments', updated, { shouldValidate: true });
  };

  return (
    <SettingsTab
      value={value}
      title={t('Tickets.Dashboard.createTicket')}
      description={t('Tickets.Dashboard.createNewTicket')}
    >
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="grid gap-5 md:grid-cols-2 mb-5">
          {CreateTicketsFields.map(({ id, label, name, placeholder, type }) =>
            type === 'file' ? (
              <Controller
                key={id}
                name={name as keyof TicketFormData}
                control={control}
                defaultValue={[]}
                render={({ field: { onChange } }) => (
                  <div className="space-y-2">
                    {label && (
                      <label htmlFor={id}>{t(`Inputs.labels.${label}`)}</label>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      ref={fileInputRef}
                      className="mt-2 w-full cursor-pointer border border-gray-300 rounded-md p-2"
                      onChange={(e) => {
                        const files = e.target.files
                          ? Array.from(e.target.files)
                          : [];
                        const updated = [...attachments, ...files];
                        setAttachments(updated);
                        onChange(updated); // يخزن الملفات كـ array
                      }}
                    />
                  </div>
                )}
              />
            ) : (
              <FormField
                key={id}
                id={id}
                inputName={name}
                type={type as InputTypes}
                label={t(`Inputs.labels.${label}`)}
                placeholder={t(`Inputs.placeHolders.${placeholder}`)}
                register={register}
                control={control}
                error={
                  errors[name as keyof TicketFormData] as FieldError | undefined
                }
              />
            )
          )}
        </div>
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-4 mb-6">
            {attachments.map((src, i) => (
              <div key={i} className="relative w-20 h-20">
                <Image
                  src={URL.createObjectURL(src)}
                  alt={`preview-ar-${i}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-full object-contain"
                  style={{ width: '100%', height: 'auto' }}
                />
                <button
                  type="button"
                  onClick={() => removeAttachment(i)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 cursor-pointer"
                  style={{
                    transform: 'translate(30%, -30%)',
                    fontSize: '10px',
                  }}
                >
                  <FaX size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        <Button type="submit">
          {isLoading ? <ButtonLoading /> : t('BtnTexts.SaveChanges')}
        </Button>
      </form>
    </SettingsTab>
  );
};

export default CreateTickets;
