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
import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { IoIosArrowBack, IoIosArrowForward, IoIosSend } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AttachmentsUploader from '@/components/molecules/AttachmentsPreview';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import MotionSection from '@/components/molecules/FramerMotion/MotionSection';
import { useTranslations } from 'next-intl';
import { useToggleLocale } from '@/hook/useToggleLocale';
import { usePathname } from 'next/navigation';

const RatingsSheet = () => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const [, setFormData] = useState(null);
  const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);
  const [open, setOpen] = useState(false);
  const t = useTranslations('productDetails');
  const errosTxt = useTranslations('Inputs.errorsMsgs');
  const inputTxts = useTranslations('Inputs');
  const btnTxts = useTranslations('BtnTexts');
  const { isArabic } = useToggleLocale();

  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const maxCharsLength = 255;

  const formSchema = Yup.object().shape({
    comment: Yup.string()
      .max(maxCharsLength, errosTxt('maxChars', { number: maxCharsLength }))
      .required(errosTxt('commentRequired')),
    checkbox: Yup.boolean(),
  });

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
    }, 1000);
  };

  return (
    <div
      className={`flex items-center justify-between ${
        !isArabic ? 'flex-col sm:flex-row' : ''
      } gap-2 border-b border-gray-200 pb-4 mt-2`}
      dir={isArabic ? 'ltr' : 'rtl'}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <AnimatedWrapper direction="x" distance={-40}>
          <SheetTrigger asChild>
            <Button
              variant="forth"
              otherClassName="py-2 px-4 text-xs"
              Icon={isArabic ? IoIosArrowBack : IoIosArrowForward}
            >
              {t('addRating')}
            </Button>
          </SheetTrigger>
        </AnimatedWrapper>
        <SheetContent className=" bg-white" closeTextColor="text-black">
          <SheetTitle className="sr-only">{t('productRating')}</SheetTitle>
          <SheetDescription className="sr-only">
            {t('productRatingDesc')}
          </SheetDescription>

          <MotionSection index={0}>
            <h4 className="text-xl font-semibold mb-5">{t('productRating')}</h4>
          </MotionSection>

          <div className="max-h-[800px] overflow-y-auto scrollbar-none">
            <form onSubmit={handleSubmit(onSubmit)}>
              <MotionSection index={1}>
                <h3 className="text-2xl mb-3 text-center">
                  {t('addYourRating')}
                </h3>
              </MotionSection>

              <MotionSection index={2}>
                <div className="flex items-center justify-center gap-2 text-secondary mb-3">
                  {[...Array(5)].map((_, i) => (
                    <AnimatedWrapper key={i} custom={i}>
                      <FaStar className="text-enjoy-secondary" size={20} />
                    </AnimatedWrapper>
                  ))}
                </div>
              </MotionSection>

              <MotionSection index={3}>
                <div>
                  <Input
                    type="textarea"
                    variant="secondary"
                    inputName="comment"
                    label={inputTxts('labels.comment')}
                    placeholder={inputTxts('placeHolders.comment')}
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
                      {inputTxts('errorsMsgs.commentLimitReached')}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <span>{inputTxts('errorsMsgs.remainingCharacters')} :</span>
                    <span className={isLimitReached ? 'text-red-500' : ''}>
                      {remainingChars}
                    </span>
                  </div>
                </div>
              </MotionSection>

              <MotionSection index={4}>
                <div className="my-4">
                  <Input
                    type="checkbox"
                    inputName="checkbox"
                    placeholder={inputTxts('labels.hideMyName')}
                    {...register('checkbox')}
                  />
                </div>
              </MotionSection>

              <MotionSection index={5}>
                <AttachmentsUploader
                  attachments={attachments}
                  setAttachments={setAttachments}
                  variant="rating"
                />
              </MotionSection>

              <MotionSection index={6}>
                <Button
                  type="submit"
                  otherClassName="w-full p-2 mt-7"
                  Icon={IoIosSend}
                >
                  {isSubmittingLocal ? (
                    <ButtonLoading />
                  ) : (
                    btnTxts('submitRating')
                  )}
                </Button>
              </MotionSection>
            </form>
          </div>
        </SheetContent>
      </Sheet>
      <AnimatedWrapper direction="x">
        <h4 className="text-sm sm:text-base font-semibold">
          {t('customerReviewsTitle')}
        </h4>
      </AnimatedWrapper>
    </div>
  );
};

export default RatingsSheet;
