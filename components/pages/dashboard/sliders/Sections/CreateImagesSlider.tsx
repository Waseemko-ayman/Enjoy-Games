/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import { Slider } from '@/interfaces';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from '@/lib/toast';
import useAPI from '@/hook/useAPI';
import SettingsTab from '@/components/ui/display/SettingsTab';
import Image from 'next/image';
import { FaX } from 'react-icons/fa6';
import { useUpdateContent } from '@/context/updateContentContext';
import { useTranslations } from 'next-intl';

// ----------------------------------------------------------------

type SliderFormData = {
  imageAr?: File | null;
  imageEn?: File | null;
};

// ----------------------------------------------------------------

const CreateImagesSlider = ({
  value,
  onTabChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
}) => {
  const inputStyled =
    'flex items-center h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm outline-none cursor-pointer';

  const { showToast } = useToast();
  const { triggerRefresh } = useUpdateContent();
  const t = useTranslations();
  const inputT = useTranslations('Inputs.errorsMsgs');

  const createSchema = yup.object({
    imageAr: yup.mixed<File>().required(inputT('arabicImageRequired')),
    imageEn: yup.mixed<File>().required(inputT('englishImageRequired')),
  });

  const { add, isLoading } = useAPI<FormData, Slider>('slider/create');

  const [previewAr, setPreviewAr] = useState<File | null>(null);
  const [previewEn, setPreviewEn] = useState<File | null>(null);

  const {
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<SliderFormData>({
    resolver: yupResolver(createSchema) as any,
    defaultValues: {
      imageAr: undefined,
      imageEn: undefined,
    },
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    lang: 'ar' | 'en'
  ) => {
    const file = e.target.files?.[0];
    if (lang === 'ar') {
      setPreviewAr(file ?? null);
      setValue('imageAr', file);
      trigger('imageAr');
    } else {
      setPreviewEn(file ?? null);
      setValue('imageEn', file);
      trigger('imageEn');
    }
  };

  const handleRemoveImage = (lang: 'ar' | 'en') => {
    if (lang === 'ar') {
      setPreviewAr(null);
      setValue('imageAr', null, { shouldValidate: true });
      trigger('imageAr');
    } else {
      setPreviewEn(null);
      setValue('imageEn', null, { shouldValidate: true });
      trigger('imageEn');
    }
  };

  const onSubmit: SubmitHandler<SliderFormData> = async (data) => {
    try {
      const formData = new FormData();
      if (data.imageAr) formData.append('image_ar', data.imageAr);
      if (data.imageEn) formData.append('image_en', data.imageEn);

      const response = await add(formData);

      if (response) {
        showToast(response?.message);
        reset();
        triggerRefresh();
        setPreviewAr(null);
        setPreviewEn(null);
        onTabChange('AllImageSlider');
      }
    } catch (error) {
      const apiError = (error as any)?.response?.message;
      showToast(apiError, 'error');
    }
  };

  return (
    <SettingsTab
      value={value}
      title={t('Dashboard.sliders.createSlider')}
      description={t('Dashboard.sliders.createNewSliders')}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="space-y-6"
      >
        {/* الصور بالعربية */}
        <div>
          <label className="block mb-1 font-medium">
            {t('Inputs.labels.arabicImage')}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'ar')}
            className={inputStyled}
          />
          {errors.imageAr && (
            <p className="text-red-500 text-sm">{errors.imageAr.message}</p>
          )}
          {previewAr && (
            <div className="relative w-20 h-20 mt-4">
              <Image
                src={URL.createObjectURL(previewAr)}
                alt="preview-ar"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-contain"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage('ar')}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 cursor-pointer"
                style={{ transform: 'translate(30%, -30%)', fontSize: '10px' }}
              >
                <FaX size={12} />
              </button>
            </div>
          )}
        </div>

        {/* الصور بالإنجليزية */}
        <div>
          <label className="block mb-1 font-medium">
            {t('Inputs.labels.englishImage')}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'en')}
            className={inputStyled}
          />
          {errors.imageEn && (
            <p className="text-red-500 text-sm">{errors.imageEn.message}</p>
          )}
          {previewEn && (
            <div className="relative w-20 h-20 mt-2">
              <Image
                src={URL.createObjectURL(previewEn)}
                alt="preview-en"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-contain"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage('en')}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 cursor-pointer"
                style={{ transform: 'translate(30%, -30%)', fontSize: '10px' }}
              >
                <FaX size={12} />
              </button>
            </div>
          )}
        </div>

        <Button type="submit">
          {isLoading ? <ButtonLoading /> : t('BtnTexts.SaveChanges')}
        </Button>
      </form>
    </SettingsTab>
  );
};

export default CreateImagesSlider;
