'use client';

import { Card, CardContent } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import CardHeaderContent from '@/components/ui/display/CardHeader';
import { useState } from 'react';
import { OrganizationInfoFields, SystemSettingsFields } from '@/utils/constant';
import SaveButton from '@/components/ui/common/SaveButton';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import NotificationSwitch from '@/components/ui/display/NotificationSwitch';
import FormField from '@/components/ui/FormField';
import { InputTypes } from '@/utils/type';

type FormValues = {
  // Organization Information
  orgName: string;
  contactEmail: string;
  phone: string;
  website: string;
  address: string;

  // System Settings
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  timezone:
    | 'America/New_York'
    | 'America/Chicago'
    | 'America/Denver'
    | 'America/Los_Angeles'
    | 'Europe/London';
  language: 'en' | 'es' | 'fr' | 'de' | 'ar';
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneReqExp = /^\+?[0-9\s\-\(\)]{8,}$/;
const alphanumericWithArabicRegex = /^[A-Za-z\u0621-\u064A0-9_ ]{5,}$/;
const messageRegex = /^[\s\S]{20,}$/;

const settingsSchema = Yup.object().shape({
  orgName: Yup.string()
    .matches(alphanumericWithArabicRegex, 'Invalid Organization name')
    .required('Organization name is required'),
  contactEmail: Yup.string()
    .email()
    .matches(emailRegex, 'Please enter a valid email address.')
    .required('Contact email is required'),
  phone: Yup.string()
    .matches(phoneReqExp, 'Invalid phone number')
    .required('Phone number is required'),
  website: Yup.string().url().required('Website is required'),
  address: Yup.string()
    .matches(
      messageRegex,
      'Please enter at least 20 characters for your message.'
    )
    .required('Address is required'),
  dateFormat: Yup.string()
    .oneOf(['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'])
    .required('Date format is required'),
  currency: Yup.string()
    .oneOf(['USD', 'EUR', 'GBP', 'CAD', 'AUD'])
    .required('Currency is required'),
  timezone: Yup.string()
    .oneOf([
      'America/New_York',
      'America/Chicago',
      'America/Denver',
      'America/Los_Angeles',
      'Europe/London',
    ])
    .required('Timezone is required'),
  language: Yup.string()
    .oneOf(['en', 'es', 'fr', 'de', 'ar'])
    .required('Language is required'),
});

const GeneralSettings = ({
  saving,
  success,
  handleSave,
}: {
  saving: boolean;
  success: boolean;
  handleSave: () => void;
}) => {
  const [checked, setChecked] = useState(true);

  const defaultValues: FormValues = {
    orgName: '',
    contactEmail: '',
    phone: '',
    website: '',
    address: '',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    timezone: 'America/New_York',
    language: 'en',
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(settingsSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log('General Settings saved:', data);
    handleSave();
    reset(defaultValues);
  };

  return (
    <TabsContent value="general">
      <Card>
        <CardHeaderContent
          title="General Settings"
          description="Manage your organization and system settings"
        />
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Organization Information</h3>
              {/* <FormRow
                fields={OrganizationInfoFields}
                register={register}
                errors={errors}
              /> */}
              <div className="grid gap-4 md:grid-cols-2">
                {OrganizationInfoFields.map(
                  ({ id, name, fullWidth, type, ...rest }) => {
                    const formField = (
                      <div key={id} className={fullWidth ? 'col-span-2' : ''}>
                        <FormField
                          key={id}
                          id={id}
                          type={type as InputTypes}
                          inputName={name}
                          register={register}
                          error={errors[name as keyof FormValues]}
                          {...rest}
                        />
                      </div>
                    );
                    return formField;
                  }
                )}
              </div>
            </div>
            <div className="h-[1px] w-full bg-gray-300"></div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">System Settings</h3>
              {/* <FormRow
                fields={SystemSettingsFields}
                register={register}
                errors={errors}
              /> */}
              <div className="grid gap-4 md:grid-cols-2">
                {SystemSettingsFields.map(
                  ({ id, name, type, label, ...rest }) => (
                    <FormField
                      key={id}
                      label={label}
                      inputName={name}
                      type={type as InputTypes}
                      control={control}
                      register={register}
                      error={errors[name as keyof FormValues]}
                      {...rest}
                    />
                  )
                )}
              </div>
            </div>
            <NotificationSwitch
              id="tax-receipts"
              label="Automatic Tax Receipts"
              description="Automatically send tax receipts for donations"
              checked={checked}
              onCheckedChange={(checked) => setChecked(checked)}
            />
            <SaveButton type="submit" saving={saving} success={success} />
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default GeneralSettings;
