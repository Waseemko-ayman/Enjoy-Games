'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload } from 'lucide-react';
import CardHeaderContent from '@/components/ui/display/CardHeader';
import { AccountSettingsFields } from '@/utils/constant';
import { useRef, useState } from 'react';
import SaveButton from '@/components/ui/common/SaveButton';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldError, Resolver, useForm } from 'react-hook-form';
import FormField from '@/components/ui/FormField';
import { InputTypes } from '@/utils/type';

type FormValues = {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  avatar?: FileList;
  // notification: {
  //   email: boolean;
  //   browser: boolean;
  //   marketing: boolean;
  // };
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const alphanumericWithArabicRegex = /^[A-Za-z\u0621-\u064A0-9_ ]{5,}$/;

const AcoountSchema = Yup.object().shape({
  name: Yup.string()
    .matches(alphanumericWithArabicRegex, 'Invalid Name')
    .required('Name is required'),
  email: Yup.string()
    .email()
    .matches(emailRegex, 'Please enter a valid email address.')
    .required('Email is required'),
  phone: Yup.string().required('رقم الجوال مطلوب'),
  birthDate: Yup.string().required('تاريخ الميلاد مطلوب'),
  gender: Yup.string().required('الجنس مطلوب'),
  avatar: Yup.mixed()
    // Custom test to validate the file type
    .test('fileType', 'Only image files are allowed', (value) => {
      if (!value) return true;
      // If the value is a FileList (multiple files or a single file in a list)
      if (value instanceof FileList) {
        // Ensure at least one file exists and it's an image
        return value.length > 0 && value[0].type.startsWith('image/');
      }
      // If the value is a single File object
      else if (value instanceof File) {
        // Check if the file is an image
        return value.type.startsWith('image/');
      }
      // For any other type, return false (invalid)
      return false;
    }),
  // notification: Yup.object().shape({
  //   email: Yup.boolean(),
  //   browser: Yup.boolean(),
  //   marketing: Yup.boolean(),
  // }),
});

const AccountSettings = ({
  saving,
  success,
  handleSave,
}: {
  saving: boolean;
  success: boolean;
  handleSave: () => void;
}) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && e.target.files) {
      setAvatarPreview(URL.createObjectURL(file));
      setValue('avatar', e.target.files); // Update the value in the model
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    // watch,
  } = useForm<FormValues>({
    resolver: yupResolver(AcoountSchema) as Resolver<FormValues>,
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form data on submit:', data);
    handleSave();
    reset({
      avatar: undefined, // Reset the image only if you need to
    }); // Make sure this step is done only after saving the data.
  };

  return (
    <TabsContent value="account">
      <Card>
        <CardHeaderContent
          title="Account Settings"
          description="Update your account information and preferences"
        />
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={avatarPreview || '/placeholder.svg?height=96&width=96'}
                    alt="Profile"
                  />
                  <AvatarFallback>A.I.</AvatarFallback>
                </Avatar>
                <input
                  type="file"
                  accept="image/*"
                  {...register('avatar')}
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
                  Change Avatar
                </Button>
                {errors.avatar && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.avatar.message}
                  </p>
                )}
              </div>

              {/* <FormRow
                fields={AccountSettingsFields}
                register={register}
                errors={errors}
              /> */}
              <div className="grid gap-4 md:grid-cols-2 w-full">
                {AccountSettingsFields.map(
                  ({ id, label, name, placeholder, type }) => (
                    <FormField
                      key={id}
                      inputName={name}
                      label={label}
                      placeholder={placeholder}
                      type={type as InputTypes}
                      register={register}
                      error={
                        errors[name as keyof FormValues] as
                          | FieldError
                          | undefined
                      }
                    />
                  )
                )}
              </div>
            </div>

            <div className="h-[1px] w-full bg-gray-300"></div>

            {/* <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Preferences</h3>
              <div className="space-y-3">
                {notificationPreferences.map(
                  ({ id, label, description, settingKey }) => (
                    <NotificationSwitch
                      key={id}
                      id={id}
                      label={label}
                      description={description}
                      checked={watch(
                        `notification.${
                          settingKey as keyof FormValues['notification']
                        }`
                      )}
                      onCheckedChange={(checked) =>
                        setValue(
                          `notification.${
                            settingKey as keyof FormValues['notification']
                          }`,
                          checked
                        )
                      }
                    />
                  )
                )}
              </div>
            </div> */}
            <SaveButton type="submit" saving={saving} success={success} />
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default AccountSettings;
