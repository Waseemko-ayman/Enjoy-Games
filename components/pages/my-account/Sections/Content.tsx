'use client';
import React, { useState } from 'react';
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
import useIsMobile from '@/hook/useIsMobile';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FormValues } from '@/interfaces';
import ButtonLoading from '@/components/atomic/ButtonLoading';

const alphanumericWithArabicRegex = /^[A-Za-z\u0621-\u064A0-9_ ]{2,}$/;
// const phoneRegex = /^[0-9]{9,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formSchema = Yup.object({
  username: Yup.string()
    .matches(
      alphanumericWithArabicRegex,
      'الاسم يجب أن يحتوي على حروف أو أرقام فقط ويكون طوله على الأقل حرفين'
    )
    .required('الاسم مطلوب'),
  email: Yup.string()
    .email('البريد الإلكتروني غير صالح')
    .matches(emailRegex, 'الإيميل غير صالح')
    .required('البريد الإلكتروني مطلوب'),
  phone: Yup.string()
    // .matches(phoneRegex, 'رقم الجوال غير صالح')
    .required('رقم الجوال مطلوب'),
  birthDate: Yup.string().required('تاريخ الميلاد مطلوب'),
  gender: Yup.string()
    .oneOf(['ذكر', 'أنثى'], 'الرجاء اختيار الجنس')
    .required('الجنس مطلوب'),
  options: Yup.array().of(Yup.boolean()),
  avatar: Yup.mixed().required('الصورة مطلوبة'),
});

const Content = () => {
  const isMobile = useIsMobile();
  const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);

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
    console.log(data);

    setTimeout(() => {
      setIsSubmittingLocal(false);
      reset({
        username: data.username,
        email: data.email,
        phone: data.phone,
        birthDate: data.birthDate,
        gender: data.gender,
        options: data.options || [false, false, false, false],
        avatar: data.avatar?.[0]?.name || '',
      });
    }, 2000);
  };

  return (
    <FormProvider {...methods}>
      <Layer>
        <Container>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side - Form */}
            <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
              {isMobile && <ProfilePicture />}
              <div className="space-y-6 max-[991px]:mt-3">
                {/* Account Information */}
                <Form register={register} errors={errors} control={control} />

                {/* Warning Message */}
                <WarningMessage />

                {/* Account Options */}
                <AccountOptions />

                <Button
                  type="submit"
                  otherClassName="py-3 px-8 mt-10 flex items-center"
                  Icon={MdSave}
                  iconPosition="right"
                  disabled={isSubmittingLocal}
                >
                  {isSubmittingLocal ? (
                    <>
                      جاري الحفظ
                      <ButtonLoading />
                    </>
                  ) : (
                    'حفظ'
                  )}
                </Button>
              </div>
            </form>

            {/* Right Side - Profile Section */}
            {!isMobile && (
              <div className="space-y-6">
                {/* Profile Picture Section */}
                <ProfilePicture />

                {/* Step Indicator */}
                <StepIndicator />

                {/* Stats */}
                <Stats />

                {/* Invitation Link */}
                <InvitationLink />

                {/* Delete Account */}
                <DeleteAccount />
              </div>
            )}
          </div>
        </Container>
      </Layer>
    </FormProvider>
  );
};

export default Content;
