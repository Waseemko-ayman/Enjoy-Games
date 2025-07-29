import React from 'react';
import Input from '@/components/atomic/Input';
import { inputData } from '@/data';
import dynamic from 'next/dynamic';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';

const PhoneInput = dynamic(() => import('react-phone-number-input'), {
  ssr: false,
});
import 'react-phone-number-input/style.css';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { TranslationFunction } from '@/interfaces';
import { useTranslations } from 'next-intl';
import FormError from '@/components/atomic/FormError';
import { InputTypes } from '@/utils/type';
interface FormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  t: TranslationFunction;
}

const Form: React.FC<FormProps> = ({ register, errors, control, t }) => {
  const inputsTexts = useTranslations('Inputs');
  return (
    <div>
      <h2 className="text-2xl font-medium text-gray-500 mb-4">
        {t('AccountInfo')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {inputData.map((input, index) => {
          const label = inputsTexts(`labels.${input.name}`);
          const placeholder =
            inputsTexts(`placeHolders.${input.name}`) ||
            input.placeholder ||
            '';

          const options = input.options
            ? input.options.map((opt) => ({
                ...opt,
                label:
                  inputsTexts(`options.${input.name}.${opt.value}`) ||
                  opt.label,
              }))
            : undefined;

          return (
            <AnimatedWrapper key={input.id} custom={index}>
              <div className="relative">
                {input.type === 'number' ? (
                  <div>
                    <label className="block text-gray-700 font-normal text-sm mb-2">
                      {label}
                    </label>
                    <Controller
                      name={input.name}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <PhoneInput
                          international
                          defaultCountry="PS"
                          value={value}
                          onChange={onChange}
                          placeholder={placeholder}
                          className={`px-4 py-3 bg-white rounded-lg border ${
                            errors[input.name]
                              ? 'border-red-500'
                              : 'border-gray-300'
                          } focus:outline-none focus:ring-5 focus:ring-[var(--enjoy-primary)]`}
                        />
                      )}
                    />
                    {errors[input.name] && (
                      <FormError
                        message={errors[input.name]?.message as string}
                      />
                    )}
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
                        errors[input.name] ? 'border-red-500' : ''
                      }
                      {...register(input.name)}
                    />
                    {errors[input.name] && (
                      <FormError
                        message={errors[input.name]?.message as string}
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
  );
};

export default Form;
