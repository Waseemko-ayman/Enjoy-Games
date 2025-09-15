/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload } from 'lucide-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { InputTypes } from '@/utils/type';
import { FormValues } from '@/interfaces';
import { useTranslations } from 'next-intl';
import { API_IMAGE_URL } from '@/config/api';
import { inputData } from '@/data';
import SettingsTab from '@/components/ui/display/SettingsTab';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import PhoneInput from 'react-phone-number-input';
import FormError from '@/components/atomic/FormError';
import Input from '@/components/atomic/Input';
import { getInitials } from '@/utils/stringUtils';
import { useUserInfo } from '@/context/UserInfoContext';
import ButtonLoading from '@/components/atomic/ButtonLoading';
import { useToast } from '@/lib/toast';
import useAPI from '@/hook/useAPI';
import {
  getAccountDefaultValues,
  getAccountSchema,
  toFormData,
} from '@/utils/accountSchema';

import 'react-phone-number-input/style.css';
import Loading from '@/components/molecules/loading';
import ErrorFetching from '@/components/molecules/ErrorFetching';

const AccountSettings = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Translation
  const t = useTranslations();

  // Notifications
  const { showToast } = useToast();

  // Date Now
  const date = new Date();
  const currentYear = date.getFullYear();

  // Get User Information
  const {
    user,
    isLoading: userInfoLoading,
    error: userInfoError,
  } = useUserInfo();

  // Update User Information
  const { add, isLoading } = useAPI('update-user');

  const initials = getInitials(user?.name);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && e.target.files) {
      setAvatarPreview(URL.createObjectURL(file));
      setValue('photo', e.target.files); // Update the value in the model
    }
  };

  const getPhotoSrc = () => {
    if (avatarPreview) return avatarPreview; // New selected image
    if (user?.photo && typeof user?.photo === 'string')
      return `${API_IMAGE_URL}${user?.photo}`; //Existing link
  };

  const schema = getAccountSchema(t, currentYear);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
    defaultValues: getAccountDefaultValues(user),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
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

  return (
    <SettingsTab
      value="account"
      title={t('Dashboard.settings.title')}
      description={t('Dashboard.settings.desc')}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {userInfoLoading ? (
          <Loading />
        ) : userInfoError ? (
          <ErrorFetching />
        ) : (
          <>
            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24 shadow-lg">
                  <AvatarImage src={getPhotoSrc()} alt="character" />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <input
                  type="file"
                  accept="image/*"
                  {...register('photo')}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {t('BtnTexts.changeAvatar')}
                </Button>
                {errors.photo && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.photo.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-5">
                {inputData.map((input, index) => {
                  const label = t(`Inputs.labels.${input.name}`);
                  const placeholder =
                    t(`Inputs.placeHolders.${input.name}`) ||
                    input.placeholder ||
                    '';

                  const options = input.options
                    ? input.options.map((opt) => ({
                        ...opt,
                        label:
                          t(`Inputs.options.${input.name}.${opt.value}`) ||
                          opt.labelKey,
                      }))
                    : undefined;

                  return (
                    <AnimatedWrapper key={input.id} custom={index}>
                      <div className="relative">
                        {input.type === 'number' ? (
                          <div className="w-full">
                            <label className="block text-gray-700 font-normal text-sm mb-2">
                              {label}
                            </label>
                            <Controller
                              name={input.name as keyof FormValues}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <PhoneInput
                                  international
                                  defaultCountry="OM"
                                  value={
                                    typeof value === 'string' ? value : '' // Convert any non-string type to an empty string
                                  }
                                  onChange={onChange}
                                  placeholder={placeholder}
                                  className={`px-4 py-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-5 focus:ring-[var(--enjoy-primary)]`}
                                  readOnly
                                />
                              )}
                            />
                          </div>
                        ) : (
                          <div>
                            <Input
                              variant="secondary"
                              type={input.type as InputTypes}
                              label={label}
                              placeholder={placeholder}
                              Icon={input.icon}
                              iconClassName="h-4 w-4 text-gray-400"
                              inputName={input.name}
                              options={options}
                              otherClassNameContainer={
                                errors[input.name as keyof FormValues]
                                  ? 'border-red-500'
                                  : ''
                              }
                              {...register(input.name as keyof FormValues)}
                              readOnly={
                                input.name === 'email' || input.name === 'phone'
                              }
                            />
                            {errors[input.name as keyof FormValues] && (
                              <FormError
                                message={
                                  errors[input.name as keyof FormValues]
                                    ?.message as string
                                }
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </AnimatedWrapper>
                  );
                })}
              </div>
            </div>
            <Button type="submit">
              {isLoading ? (
                <>
                  {t('BtnTexts.Saving')}
                  <ButtonLoading />
                </>
              ) : (
                t('BtnTexts.SaveChanges')
              )}
            </Button>
          </>
        )}
      </form>
    </SettingsTab>
  );
};

export default AccountSettings;
