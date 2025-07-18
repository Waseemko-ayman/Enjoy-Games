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
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { FaStar, FaX } from 'react-icons/fa6';
import { FiUploadCloud } from 'react-icons/fi';
import { IoIosArrowBack, IoIosSend } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const formSchema = Yup.object().shape({
  comment: Yup.string()
    .max(255, 'الحد الأقصى 255 حرفًا')
    .required('التعليق مطلوب'),
  checkbox: Yup.boolean(),
});

const RatingsSheet = () => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setFormData] = useState(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setAttachments((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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
    const finalData = { ...data, attachments };
    setFormData(finalData);
    console.log(finalData);
  };
  return (
    <div className="flex items-center justify-between gap-2 border-b border-gray-200 pb-4 mt-2">
      <Sheet>
        <SheetTrigger>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-2xl mb-3 text-center">أضف التقييم</h3>
            <div className="flex items-center justify-center gap-2 text-secondary mb-3">
              <FaStar className="text-enjoy-secondary" size={20} />
              <FaStar className="text-enjoy-secondary" size={20} />
              <FaStar className="text-enjoy-secondary" size={20} />
              <FaStar className="text-enjoy-secondary" size={20} />
              <FaStar className="text-enjoy-secondary" size={20} />
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
            {/* Upload file Or Image Or etc... */}
            <div
              className="w-full max-w-md mx-auto bg-[#f7f9fa] rounded-xl border border-gray-200 p-6 text-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <FiUploadCloud className="mx-auto text-4xl text-black mb-4" />
              <p className="text-base font-bold text-black">
                ارفاق صور مع التعليق، أو بتحميل الملفات
              </p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />

            {/* Preview Attachments */}
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-4">
                {attachments.map((file, index) => (
                  <div key={index} className="relative overflow-hidden group">
                    {file.type.startsWith('image') ? (
                      <Image
                        src={URL.createObjectURL(file)}
                        alt="attachment"
                        width={80}
                        height={80}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-center p-2 bg-gray-100">
                        {file.name}
                      </div>
                    )}
                    <Button
                      type="button"
                      variant="circle"
                      handleClick={() => removeAttachment(index)}
                      bgColor="bg-red-500"
                      otherClassName="absolute top-0 right-0 text-white w-6 h-6 flex items-center justify-center hover:!bg-red-500"
                    >
                      <FaX />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <Button
              type="submit"
              otherClassName="w-full p-2 mt-10"
              Icon={IoIosSend}
            >
              ارسال تقييم
            </Button>
          </form>
        </SheetContent>
      </Sheet>
      <h4 className="text-sm sm:text-base font-semibold">
        التقييمات و اراء الزبائن
      </h4>
    </div>
  );
};

export default RatingsSheet;
