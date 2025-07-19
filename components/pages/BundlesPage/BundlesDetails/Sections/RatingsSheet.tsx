/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Button from '@/components/atomic/Button';
import Input from '@/components/atomic/Input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { IoIosArrowBack, IoIosSend } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AttachmentsUploader from '@/components/molecules/AttachmentsPreview';
import ButtonLoading from '@/components/atomic/ButtonLoading';

const formSchema = Yup.object().shape({
  comment: Yup.string()
    .max(255, 'الحد الأقصى 255 حرفًا')
    .required('التعليق مطلوب'),
  checkbox: Yup.boolean(),
});

const RatingsSheet = () => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const [, setFormData] = useState(null);
  const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: { comment: '', checkbox: false },
    mode: 'onChange',
  });

  const commentValue = watch('comment') || '';
  const remainingChars = 255 - commentValue.length;
  const isLimitReached = remainingChars <= 0;

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= 255) {
      setValue('comment', newValue, { shouldValidate: true });
    }
  };

  const onSubmit = (data: any) => {
    setIsSubmittingLocal(true);
    const finalData = { ...data, attachments };

    setTimeout(() => {
      setIsSubmittingLocal(false);
      setFormData(finalData);
      console.log('Form Data:', finalData);
      reset();
      setAttachments([]);
      // Here you bind finalData to the API later
    }, 1000);
  };

  return (
    <div className="flex items-center justify-between gap-2 border-b border-gray-200 pb-4 mt-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="forth"
            otherClassName="py-2 px-4 text-xs"
            Icon={IoIosArrowBack}
          >
            أضف التقييم
          </Button>
        </SheetTrigger>
        <SheetContent
          className=" bg-white"
          closePosition="left"
          closeTextColor="text-black"
        >
          <SheetTitle className="sr-only">أقسام البطاقات</SheetTitle>
          <SheetDescription className="sr-only">
            هنا قائمة بأقسام البطاقات المتوفرة للتصفح والاختيار.
          </SheetDescription>
          <h4 className="text-xl font-semibold mb-5">تقييم المنتج</h4>
          <div className="max-h-[800px] overflow-y-auto scrollbar-none">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3 className="text-2xl mb-3 text-center">أضف التقييم</h3>
              <div className="flex items-center justify-center gap-2 text-secondary mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-enjoy-secondary" size={20} />
                ))}
              </div>
              <div>
                <Input
                  type="textarea"
                  variant="secondary"
                  inputName="comment"
                  label="اترك تعليق"
                  placeholder="أكتب تعليقك هنا"
                  otherClassNameContainer={
                    errors.comment || isLimitReached ? '!border-red-500' : ''
                  }
                  onChange={handleCommentChange}
                  value={commentValue}
                />
                {errors.comment && (
                  <p className="text-red-500 text-base font-medium mt-2 mb-3">
                    {errors.comment.message}
                  </p>
                )}
                {isLimitReached && !errors.comment && (
                  <p className="text-red-500 text-sm mt-2 mb-3">
                    لقد وصلت إلى الحد الأقصى من الأحرف.
                  </p>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                  <span>عدد الاحرف المتبقية :</span>
                  <span className={isLimitReached ? 'text-red-500' : ''}>
                    {remainingChars}
                  </span>
                </div>
              </div>

              <div className="my-4">
                <Input
                  type="checkbox"
                  inputName="checkbox"
                  placeholder="لا تظهر اسمى فى قائمة العملاء"
                  {...register('checkbox')}
                />
              </div>

              <AttachmentsUploader
                attachments={attachments}
                setAttachments={setAttachments}
                variant="rating"
              />

              <Button
                type="submit"
                otherClassName="w-full p-2 mt-7"
                Icon={IoIosSend}
              >
                {isSubmittingLocal ? <ButtonLoading /> : 'ارسال تقييم'}
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
      <h4 className="text-sm sm:text-base font-semibold">
        التقييمات و اراء الزبائن
      </h4>
    </div>
  );
};

export default RatingsSheet;
