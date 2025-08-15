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

// ----------------------------------------------------------------

const createSchema = yup.object({
  imageAr: yup
    .array()
    .of(yup.mixed<File>().required('الصورة مطلوبة'))
    .min(1, 'الصور بالعربية مطلوبة')
    .required('الصور بالعربية مطلوبة'),
  imageEn: yup
    .array()
    .of(yup.mixed<File>().required('الصورة مطلوبة'))
    .min(1, 'الصور بالإنجليزية مطلوبة')
    .required('الصور بالإنجليزية مطلوبة'),
});

// ----------------------------------------------------------------

type SliderFormData = {
  imageAr: File[];
  imageEn: File[];
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

  // ----------------------------------------------------------------

  const { showToast } = useToast();
  const { triggerRefresh } = useUpdateContent();
  const { add, isLoading } = useAPI<FormData, Slider>('slider/create');

  // ----------------------------------------------------------------

  const [previewAr, setPreviewAr] = useState<File[]>([]);
  const [previewEn, setPreviewEn] = useState<File[]>([]);

  const {
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<SliderFormData>({
    resolver: yupResolver(createSchema),
    defaultValues: {
      imageAr: [],
      imageEn: [],
    },
  });

  // ----------------------------------------------------------------

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    lang: 'ar' | 'en'
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      if (lang === 'ar') {
        setPreviewAr(fileArray);
        setValue('imageAr', fileArray, { shouldValidate: true });
      } else {
        setPreviewEn(fileArray);
        setValue('imageEn', fileArray, { shouldValidate: true });
      }
      trigger(lang === 'ar' ? 'imageAr' : 'imageEn');
    }
  };

  const handleRemoveImage = (index: number, lang: 'ar' | 'en') => {
    if (lang === 'ar') {
      const updated = [...previewAr];
      updated.splice(index, 1);
      setPreviewAr(updated);
      setValue('imageAr', updated, { shouldValidate: true });
      trigger('imageAr');
    } else {
      const updated = [...previewEn];
      updated.splice(index, 1);
      setPreviewEn(updated);
      setValue('imageEn', updated, { shouldValidate: true });
      trigger('imageEn');
    }
  };

  // ----------------------------------------------------------------

  const onSubmit: SubmitHandler<SliderFormData> = async (data) => {
    try {
      const formData = new FormData();

      data.imageAr.forEach((file) => formData.append('image_ar', file));
      data.imageEn.forEach((file) => formData.append('image_en', file));

      const response = await add(formData);

      if (response) {
        showToast(response?.message);
        reset();
        triggerRefresh();
        setPreviewAr([]);
        setPreviewEn([]);
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
      title="إنشاء سلايدر"
      description="إنشاء سلايدر جديد"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="space-y-6"
      >
        {/* الصور بالعربية */}
        <div>
          <label className="block mb-1 font-medium">الصور بالعربية</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileChange(e, 'ar')}
            className={inputStyled}
          />
          {errors.imageAr && (
            <p className="text-red-500 text-sm">{errors.imageAr.message}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-4">
            {previewAr.map((src, i) => (
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
                  onClick={() => handleRemoveImage(i, 'ar')}
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
        </div>

        {/* الصور بالإنجليزية */}
        <div>
          <label className="block mb-1 font-medium">الصور بالإنجليزية</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileChange(e, 'en')}
            className={inputStyled}
          />
          {errors.imageEn && (
            <p className="text-red-500 text-sm">{errors.imageEn.message}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            {previewEn.map((src, i) => (
              <div key={i} className="relative w-20 h-20">
                <Image
                  src={URL.createObjectURL(src)}
                  alt={`preview-en-${i}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto object-contain"
                  style={{ width: '100%', height: 'auto' }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i, 'en')}
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
        </div>

        <Button type="submit">
          {isLoading ? <ButtonLoading /> : 'حفظ التغييرات'}
        </Button>
      </form>
    </SettingsTab>
  );
};

export default CreateImagesSlider;
