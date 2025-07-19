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
interface FormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

const Form: React.FC<FormProps> = ({ register, errors, control }) => {
  return (
    <div>
      <h2 className="text-2xl font-medium text-gray-500 mb-4">
        معلومات الحساب
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {inputData.map((input) => (
          <div key={input.id} className="relative">
            {input.type === 'number' ? (
              <div>
                <label className="block text-right text-gray-700 font-normal text-sm mb-2">
                  {input.label}
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
                      placeholder={input.placeholder || ''}
                      className={`px-4 py-3 bg-white rounded-lg border ${
                        errors[input.name]
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } focus:outline-none focus:ring-5 focus:ring-[var(--enjoy-primary)]`}
                    />
                  )}
                />
                {errors[input.name] && (
                  <p className="text-red-600 mt-1">
                    {errors[input.name]?.message as string}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <Input
                  variant="secondary"
                  type={input.type}
                  label={input.label}
                  placeholder={input.placeholder}
                  Icon={input.icon}
                  iconClassName="h-4 w-4 text-gray-400"
                  inputName={input.name}
                  options={input.options}
                  otherClassNameContainer={
                    errors[input.name] ? 'border-red-500' : ''
                  }
                  {...register(input.name)}
                />
                {errors[input.name] && (
                  <p className="text-red-600 mt-1 text-sm">
                    {errors[input.name]?.message as string}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
