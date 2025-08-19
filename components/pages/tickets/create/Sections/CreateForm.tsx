/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import Button from '@/components/atomic/Button';
import Input from '@/components/atomic/Input';
import CardWrapper from '@/components/atomic/CardWrapper';
import { ticketsInputsTypes } from '@/data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import AttachmentsUploader from '@/components/molecules/AttachmentsPreview';
import { FormData, TicketResponse } from '@/interfaces';
import { useTranslations } from 'next-intl';
import FormError from '@/components/atomic/FormError';
import { InputTypes } from '@/utils/type';
import useAPI from '@/hook/useAPI';
import { useToast } from '@/lib/toast';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/data/paths';
import { useUpdateContent } from '@/context/updateContentContext';

const CreateForm = () => {
  const [attachments, setAttachments] = useState<File[]>([]);

  // Router
  const router = useRouter();

  // Translation
  const placeholders = useTranslations('Inputs.placeHolders');
  const btnTexts = useTranslations('BtnTexts');
  const t = useTranslations('Inputs.errorsMsgs');

  // Context
  const { showToast } = useToast();
  const { triggerRefresh } = useUpdateContent();

  // API Hook
  const { add: addTickets, isLoading } = useAPI<
    globalThis.FormData,
    TicketResponse
  >('tickets/create');

  // Form Schema
  const schema = Yup.object().shape({
    subject: Yup.string().required(t('subjectRequired') || 'العنوان مطلوب'),
    message: Yup.string().required(t('detailsRequired') || 'الوصف مطلوب'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // نستخدم FormData من Web API
      const formData = new globalThis.FormData();
      formData.append('subject', data.subject);
      formData.append('message', data.message);

      // إضافة الملفات إذا وجدت
      attachments.forEach((file) => formData.append('attachments[]', file));

      const res = await addTickets(formData);

      if (res?.success) {
        showToast(res.message);
        reset();
        setAttachments([]);
        triggerRefresh('tickets');
        router.push(PATHS.TICKETS.ROOT.link);
      }
    } catch (error) {
      const apiError = (error as any)?.res?.data?.message;
      showToast(apiError);
    }
  };

  return (
    <CardWrapper className="p-6 mt-7">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-7">
          {ticketsInputsTypes.map((input) => {
            const fieldName = input.name as keyof FormData;
            const fieldNameStr = fieldName as string;
            return (
              <div key={input.id}>
                <Input
                  variant="secondary"
                  type={input.type as InputTypes}
                  inputName={input.name}
                  placeholder={placeholders(input.name)}
                  otherClassNameContainer={
                    errors[fieldName]?.message ? 'border-red-500' : ''
                  }
                  {...register(fieldNameStr)}
                />
                {errors[fieldName] && (
                  <FormError message={errors[fieldName]?.message} />
                )}
              </div>
            );
          })}
        </div>

        <AttachmentsUploader
          attachments={attachments}
          setAttachments={setAttachments}
          variant="ticket"
        />

        <Button otherClassName="w-full py-3 px-3 mt-7" type="submit">
          {isLoading ? <ButtonLoading /> : btnTexts('sendTicket')}
        </Button>
      </form>
    </CardWrapper>
  );
};

export default CreateForm;
