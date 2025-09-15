'use client';

import FormField from '@/components/ui/FormField';
import SettingsTab from '@/components/ui/display/SettingsTab';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { InputTypes } from '@/utils/type';
import { PayPalSettingsFields } from '@/utils/constant';

const keyRegex = /^[A-Za-z0-9+/=]+$/;
const webhookSecretRegex = /^[A-Za-z0-9!@#$%^&*()_+={}\[\]:;,.<>?~|-]{16,64}$/;

const formSchema = Yup.object().shape({
  publicKey: Yup.string()
    .matches(keyRegex, 'Invalid public key format')
    .required('Public key is required'),
  secretKey: Yup.string()
    .matches(keyRegex, 'Invalid secret key format')
    .required('Secret key is required'),
  webhookSecret: Yup.string()
    .matches(webhookSecretRegex, 'Invalid webhook secret format')
    .required('Webhook secret is required'),
});

type FormValues = {
  publicKey: string;
  secretKey: string;
  webhookSecret: string;
};

const StripeSettings = ({ value }: { value: string }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = () => {
    reset();
  };

  return (
    <SettingsTab
      value={value}
      title="Stripe Configuration"
      description="Connect your Stripe account to accept credit card payments"
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* {StripeSettingsFields.map(({ id, label, name, placeholder, type }) => ( */}
        {PayPalSettingsFields.map(({ id, label, name, placeholder, type }) => (
          <FormField
            key={id}
            id={id}
            inputName={name}
            type={type as InputTypes}
            label={label}
            placeholder={placeholder}
            register={register}
            error={errors[name as keyof FormValues]}
          />
        ))}
        <Button type="submit">Save Changes</Button>
      </form>
    </SettingsTab>
  );
};

export default StripeSettings;
