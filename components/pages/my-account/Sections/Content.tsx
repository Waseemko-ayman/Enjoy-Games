'use client';
import React, { useEffect, useState } from 'react';
import Form from './Form';
import Container from '@/components/organism/Container';
import Layer from '@/components/atomic/Layer';
import WarningMessage from './WarningMessage';
import AccountOptions from './AccountOptions';
import Button from '@/components/atomic/Button';
import { MdSave } from 'react-icons/md';
import StepIndicator from './StepIndicator';
import Stats from './Stats';
import InvitationLink from './InvitationLink';
import DeleteAccount from './DeleteAccount';
import ProfilePicture from './ProfilePicture';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FormValues } from '@/interfaces';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { useTranslations } from 'next-intl';

const alphanumericWithArabicRegex = /^[A-Za-z\u0621-\u064A0-9_ ]{2,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Content = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);
  const t = useTranslations('MyAccount');
  const btnTexts = useTranslations('BtnTexts');

  const errorsTxts = useTranslations('Inputs.errorsMsgs');

  const formSchema = Yup.object({
    username: Yup.string()
      .matches(
        alphanumericWithArabicRegex,
        errorsTxts('usernameInvalid') ||
          'الاسم يجب أن يحتوي على حروف أو أرقام فقط ويكون طوله على الأقل حرفين'
      )
      .required(errorsTxts('usernameRequired') || 'الاسم مطلوب'),
    email: Yup.string()
      .email(errorsTxts('emailInvalid') || 'البريد الإلكتروني غير صالح')
      .matches(emailRegex, errorsTxts('emailInvalid') || 'الإيميل غير صالح')
      .required(errorsTxts('emailRequired') || 'البريد الإلكتروني مطلوب'),
    phone: Yup.string()
      // .matches(phoneRegex, errorsTxts('phoneInvalid') || 'رقم الجوال غير صالح')
      .required(errorsTxts('phoneRequired') || 'رقم الجوال مطلوب'),
    birthDate: Yup.string().required(
      errorsTxts('birthDateRequired') || 'تاريخ الميلاد مطلوب'
    ),
    gender: Yup.string()
      .oneOf(
        ['ذكر', 'أنثى'],
        errorsTxts('genderInvalid') || 'الرجاء اختيار الجنس'
      )
      .required(errorsTxts('genderRequired') || 'الجنس مطلوب'),
    options: Yup.array().of(Yup.boolean()),
    avatar: Yup.mixed().required(
      errorsTxts('avatarRequired') || 'الصورة مطلوبة'
    ),
  });

  const methods = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: FormValues) => {
    setIsSubmittingLocal(true);
    setTimeout(() => {
      console.log(data);
      reset({
        username: data.username,
        email: data.email,
        phone: data.phone,
        birthDate: data.birthDate,
        gender: data.gender,
        options: data.options || [false, false, false, false],
        avatar: data.avatar?.[0]?.name || '',
      });
      setIsSubmittingLocal(false);
    }, 2000);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 991) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <FormProvider {...methods}>
      <Layer>
        <Container>
          <div
            className={`flex flex-col lg:flex-row ${
              isMobile ? 'gap-1' : 'gap-8'
            }`}
          >
            {/* Left Side - Form */}
            <form
              className={`flex-1 ${isMobile ? 'order-2' : ''}`}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={`space-y-6 ${isMobile ? 'mt-3' : ''}`}>
                {/* Account Information */}
                <Form
                  register={register}
                  errors={errors}
                  control={control}
                  t={t}
                />

                {/* Warning Message */}
                <WarningMessage t={t} />

                {/* Account Options */}
                <AccountOptions t={t} />

                <AnimatedWrapper>
                  <Button
                    type="submit"
                    otherClassName="py-3 px-8 mt-10 flex items-center"
                    Icon={!isSubmittingLocal ? MdSave : undefined}
                    iconPosition="right"
                    disabled={isSubmittingLocal}
                  >
                    {isSubmittingLocal ? (
                      <>
                        {btnTexts('Saving')}
                        <ButtonLoading />
                      </>
                    ) : (
                      btnTexts('save')
                    )}
                  </Button>
                </AnimatedWrapper>
              </div>
            </form>

            {/* Right Side - Profile Section */}
            <div className={isMobile ? 'order-1' : 'space-y-6'}>
              {/* Profile Picture Section */}
              <ProfilePicture t={t} />
              {!isMobile && (
                <>
                  {/* Step Indicator */}
                  <StepIndicator t={t} />

                  {/* Stats */}
                  <Stats t={t} />

                  {/* Invitation Link */}
                  <InvitationLink t={t} />

                  {/* Delete Account */}
                  <DeleteAccount t={t} />
                </>
              )}
            </div>
          </div>
        </Container>
      </Layer>
    </FormProvider>
  );
};

export default Content;
