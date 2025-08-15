'use client';
import FormField from '@/components/ui/FormField';
import { BankTransferSettingsFields } from '@/utils/constant';
import SettingsTab from '@/components/ui/display/SettingsTab';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { InputTypes } from '@/utils/type';

const bankNameRegex = /^[a-zA-Z\s]{3,50}$/;
const accountNameRegex = /^[a-zA-Z\s]{5,100}$/;
const accountNumberRegex = /^\d{8,20}$/;
const routingNumberRegex = /^\d{9}$/;

const formSchema = Yup.object().shape({
  bankName: Yup.string()
    .matches(bankNameRegex, 'Bank name must be 3-50 letters')
    .required('Bank name is required'),
  accountName: Yup.string()
    .matches(accountNameRegex, 'Account name must be 5-100 letters')
    .required('Account name is required'),
  accountNumber: Yup.string()
    .matches(accountNumberRegex, 'Account number must be 8-20 digits')
    .required('Account number is required'),
  routingNumber: Yup.string()
    .matches(routingNumberRegex, 'Routing number must be 9 digits')
    .required('Routing number is required'),
  paymentInstructions: Yup.string()
    .max(500, 'Instructions must be less than 500 characters')
    .required('Payment instructions are required'),
});

type FormValues = {
  bankName: string;
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  paymentInstructions: string;
};

const BankTransferSettings = ({ value }: { value: string }) => {
  const {
    register,
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
      title="Bank Transfer Configuration"
      description="Set up bank transfer payment details"
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {BankTransferSettingsFields.map(
          ({ id, label, name, placeholder, type }) => (
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
          )
        )}
        <Button type="submit">Save Changes</Button>
      </form>
    </SettingsTab>
  );
};

export default BankTransferSettings;
