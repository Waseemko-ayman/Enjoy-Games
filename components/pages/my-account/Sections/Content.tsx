/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect } from 'react';
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
import { FormValues } from '@/interfaces';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { useTranslations } from 'next-intl';
import useAPI from '@/hook/useAPI';
import { useToast } from '@/lib/toast';
import useIsMobile from '@/hook/useIsMobile';
import {
  getAccountDefaultValues,
  getAccountSchema,
  toFormData,
} from '@/utils/accountSchema';

const Content = () => {
  const isMobile = useIsMobile();

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
  const formSchema = getAccountSchema(errorsTxts, currentYear);

  const methods = useForm<FormValues>({
    resolver: yupResolver(formSchema) as any,
    defaultValues: getAccountDefaultValues(user),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // console.log(data);
    try {
      const formData = toFormData(data);
      const response = await add(formData);
      reset(data);
      showToast(response?.message || 'تم التحديث بنجاح');
    } catch (error: any) {
      showToast(error?.response?.message || 'حدث خطأ أثناء التحديث', 'error');
    }
  };

  useEffect(() => {
    if (user) reset(getAccountDefaultValues(user));
  }, [user, reset]);

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
