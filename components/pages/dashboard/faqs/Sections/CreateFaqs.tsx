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
import FormField from '@/components/ui/FormField';
import { InputTypes } from '@/utils/type';
import SettingsTab from '@/components/ui/display/SettingsTab';
import { useUpdateContent } from '@/context/updateContentContext';
import { FaqFormData, FAQSDataType } from '@/interfaces';
import { CreateFaqsFields } from '@/utils/constant';
import { useTranslations } from 'next-intl';

// ----------------------------------------------------------------

const CreateFaqs = ({
  value,
  onTabChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
}) => {
  const { showToast } = useToast();
  const t = useTranslations();
  const inputT = useTranslations('Inputs.errorsMsgs');
  const { triggerRefresh } = useUpdateContent();
  const refreshKey = 'faqs';


  // ----------------------------------------------------------------

  const createSchema = yup.object({
    questionAr: yup.string().required(inputT('arabicQuestionRequired')),
    questionEn: yup.string().required(inputT('englishQuestionRequired')),
    answerAr: yup.string().required(inputT('arabicAnswerRequired')),
    answerEn: yup.string().required(inputT('englishAnswerRequired')),
  });

  // ----------------------------------------------------------------

  // API Hook
  const { add, isLoading } = useAPI<FormData, FAQSDataType>('faq/create');

  // ----------------------------------------------------------------

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FaqFormData>({
    resolver: yupResolver(createSchema),
  });

  // ----------------------------------------------------------------

  const onSubmit: SubmitHandler<FaqFormData> = async (data) => {
    try {
      const formData = new FormData();
      formData.append('question[ar]', data.questionAr);
      formData.append('question[en]', data.questionEn);
      formData.append('answer[ar]', data.answerAr);
      formData.append('answer[en]', data.answerEn);

      const response = await add(formData);

      if (response) {
        showToast(response.message);
        reset();
        triggerRefresh(refreshKey);
        onTabChange('allFaqs');
      }
    } catch (err: any) {
      showToast(err?.response?.message || 'حدث خطأ', 'error');
    }
  };

  return (
    <SettingsTab
      value={value}
      title={t('Dashboard.faqs.createFaq')}
      description={t('Dashboard.faqs.createNewFaqs')}
    >
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="grid gap-5 md:grid-cols-2 mb-5">
          {CreateFaqsFields.map(({ id, label, name, placeholder, type }) => (
            <FormField
              key={id}
              id={id}
              inputName={name}
              type={type as InputTypes}
              label={t(`Inputs.labels.${label}`)}
              placeholder={t(`Inputs.placeHolders.${placeholder}`)}
              register={register}
              error={
                errors[name as keyof FaqFormData] as FieldError | undefined
              }
            />
          ))}
        </div>

        <Button type="submit">
          {isLoading ? <ButtonLoading /> : t('BtnTexts.SaveChanges')}
        </Button>
      </form>
    </SettingsTab>
  );
};

export default CreateFaqs;
