'use client';

import FormField from '@/components/ui/FormField';
import { PayPalSettingsFields } from '@/utils/constant';
import SettingsTab from '@/components/ui/display/SettingsTab';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { InputTypes } from '@/utils/type';

// Constants
const clientIdRegex =
  /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
// Ex: 550e8400-e29b-41d4-a716-446655440000

const clientSecretRegex = /^[A-Za-z0-9-_]{32,}$/;
// Ex: A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8

const environmentOptions = ['sandbox', 'live'] as const;

type EnvironmentOption = (typeof environmentOptions)[number]; // Created an EnvironmentOption type derived from environmentOptions

const formSchema = Yup.object().shape({
  clientID: Yup.string()
    .matches(clientIdRegex, 'Invalid Client ID format (expected UUID format)')
    .required('Client ID is required'),
  clientSecret: Yup.string()
    .matches(
      clientSecretRegex,
      'Client Secret must be at least 32 alphanumeric characters'
    )
    .required('Client Secret is required'),
  environment: Yup.mixed<EnvironmentOption>()
    .oneOf([...environmentOptions], 'Invalid environment selected')
    .required('Please select an environment'),
});

// Types
type FormValues = {
  clientID: string;
  clientSecret: string;
  environment: EnvironmentOption;
};

const PayPalSettings = ({ value }: { value: string }) => {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <SettingsTab
      value={value}
      title="PayPal Configuration"
      description="Connect your PayPal account to accept payments"
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {PayPalSettingsFields.map(
          ({
            id,
            label,
            name,
            placeholder,
            type,
            // options,
            SelectValuePlaceholder,
          }) => (
            <FormField
              key={id}
              id={id}
              inputName={name}
              type={type as InputTypes}
              label={label}
              placeholder={placeholder}
              // options={type === 'select' ? options : undefined}
              SelectValuePlaceholder={SelectValuePlaceholder}
              control={control}
              register={register}
              error={errors[name as keyof FormValues]}
            />
          )
        )}
        <Button type="submit">Save Changes</Button>
      </form>
    </SettingsTab>
  );
};

export default PayPalSettings;
