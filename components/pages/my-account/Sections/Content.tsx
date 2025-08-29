/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import Form from './Form';
import Container from '@/components/organism/Container';
import Layer from '@/components/atomic/Layer';
import Button from '@/components/atomic/Button';
import { MdSave } from 'react-icons/md';
import StepIndicator from './StepIndicator';
import Stats from './Stats';
import InvitationLink from './InvitationLink';
import ProfilePicture from './ProfilePicture';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FormValues } from '@/interfaces';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { useTranslations } from 'next-intl';
import useAPI from '@/hook/useAPI';
import { useToast } from '@/lib/toast';

const alphanumericWithArabicRegex = /^[A-Za-z\u0621-\u064A0-9_ ]{2,}$/;

const Content = () => {
  const [isMobile, setIsMobile] = useState(false);

  const { showToast } = useToast();

  const t = useTranslations('MyAccount');
  const btnTexts = useTranslations('BtnTexts');
  const errorsTxts = useTranslations('Inputs.errorsMsgs');

  // Get User Information
  const {
    get,
    data: user,
    isLoading: getLoading,
    error: getError,
  } = useAPI('user/my-info');

  // Update User Information
  const { add, isLoading } = useAPI('update-user');

  const date = new Date();
  const currentYear = date.getFullYear();

  const formSchema = Yup.object({
    name: Yup.string()
      .matches(
        alphanumericWithArabicRegex,
        errorsTxts('usernameInvalid') ||
          'الاسم يجب أن يحتوي على حروف أو أرقام فقط ويكون طوله على الأقل حرفين'
      )
      .required(errorsTxts('usernameRequired') || 'الاسم مطلوب'),
    date: Yup.string()
      .nullable()
      .optional()
      .test(
        'valid-date',
        `التاريخ يجب أن يكون بين 1935 ${currentYear}`,
        (value) => {
          if (!value) return true;
          const year = new Date(value).getFullYear();
          return year >= 1935 && year <= currentYear;
        }
      ),
    gender: Yup.string()
      .nullable()
      .optional()
      .test(
        'valid-gender',
        'القيمة غير صحيحة',
        (value) => !value || ['male', 'female'].includes(value)
      ),
    password: Yup.string().nullable().optional(),
    password_confirmation: Yup.string()
      .nullable()
      .optional()
      .oneOf([Yup.ref('password'), null], 'كلمة المرور غير متطابقة'),
    photo: Yup.mixed()
      .nullable()
      .optional()
      .test('is-file-or-null', 'الصورة غير صالحة', (value) => {
        if (!value) return true; // إذا لم يغيّر المستخدم الصورة ترسل null
        return value instanceof FileList || typeof value === 'string';
      }),
  });

  const methods = useForm<FormValues>({
    resolver: yupResolver(formSchema) as any,
    defaultValues: {
      name: (user as any)?.name || '',
      email: (user as any)?.email || '',
      phone: (user as any)?.phone || '',
      date: (user as any)?.date || null,
      gender: (user as any)?.gender || null,
      password: (user as any)?.password || null,
      password_confirmation: (user as any)?.password_confirmation || null,
      photo: (user as any)?.photo || null,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'photo') {
          if (value instanceof FileList && value.length > 0) {
            formData.append('photo', value[0]); // أول ملف فقط
          }
        } else if (value !== null && value !== undefined) {
          formData.append(key, value as any);
        }
      });

      const response = await add(formData);
      reset(data);
      showToast(response?.message || 'تم التحديث بنجاح');
    } catch (error: any) {
      showToast(error?.response?.message || 'حدث خطأ أثناء التحديث', 'error');
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        name: user?.name || '',
        email: (user as any)?.email || '',
        phone: (user as any)?.phone || '',
        date: (user as any)?.date || '',
        gender: (user as any)?.gender || '',
        password: (user as any)?.password || '',
        password_confirmation: (user as any)?.password_confirmation || '',
        photo: (user as any)?.photo || '',
      });
    }
  }, [user, reset]);

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

  useEffect(() => {
    get();
  }, [get]);

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
                {/* <WarningMessage t={t} /> */}

                {/* Account Options */}
                {/* <AccountOptions t={t} /> */}

                <AnimatedWrapper>
                  <Button
                    type="submit"
                    otherClassName="py-3 px-8 mt-10 flex items-center"
                    Icon={!isLoading ? MdSave : undefined}
                    iconPosition="right"
                    disabled={isLoading}
                  >
                    {isLoading ? (
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
              <ProfilePicture t={t} photo={user?.photo} />
              {!isMobile && (
                <>
                  {/* Step Indicator */}
                  <StepIndicator t={t} />

                  {/* Stats */}
                  <Stats
                    t={t}
                    walletBalance={user?.wallet_balance}
                    points={user?.points}
                    getLoading={getLoading}
                    getError={getError}
                  />

                  {/* Invitation Link */}
                  <InvitationLink
                    t={t}
                    userReferralCode={user?.referral_code}
                  />

                  {/* Delete Account */}
                  {/* <DeleteAccount t={t} /> */}
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
