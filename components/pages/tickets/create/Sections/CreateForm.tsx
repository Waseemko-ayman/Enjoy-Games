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
import { FormData } from '@/interfaces';
import { useTranslations } from 'next-intl';
import FormError from '@/components/atomic/FormError';
import { InputTypes } from '@/utils/type';

const CreateForm = () => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);
  const placeholders = useTranslations('Inputs.placeHolders');
  const btnTexts = useTranslations('BtnTexts');

  const t = useTranslations('Inputs.errorsMsgs');

  const schema = Yup.object().shape({
    subject: Yup.string().required(t('subjectRequired') || 'العنوان مطلوب'),
    // ticketType: Yup.string().required(
    //   t('ticketTypeRequired') || 'نوع التذكرة مطلوب'
    // ),
    details: Yup.string().required(t('detailsRequired') || 'الوصف مطلوب'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setIsSubmittingLocal(true);
    const finalData = { ...data, attachments };

    setTimeout(() => {
      setIsSubmittingLocal(false);
      console.log('Form Data:', finalData);
      reset();
      setAttachments([]);
      // Here you bind finalData to the API later
    }, 1000);
  };

  return (
    <CardWrapper className="p-6 mt-7">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-7">
          {ticketsInputsTypes.map((input) => {
            const fieldName = input.name as keyof FormData;
            return (
              <div key={input.id}>
                <Input
                  variant="secondary"
                  type={input.type as InputTypes}
                  inputName={input.name}
                  placeholder={placeholders(input.name)}
                  // options={input.options}
                  otherClassNameContainer={
                    errors[fieldName]?.message ? 'border-red-500' : ''
                  }
                  {...register(fieldName)}
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
          {isSubmittingLocal ? <ButtonLoading /> : btnTexts('sendTicket')}
        </Button>
      </form>
    </CardWrapper>
  );
};

export default CreateForm;
