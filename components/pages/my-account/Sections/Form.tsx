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
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
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
                      className="px-4 py-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-5 focus:ring-[var(--enjoy-primary)]"
                    />
                  )}
                />
                {errors[input.name] && (
                  <p className="text-red-600 border-red-600">
                    {errors[input.name]?.message as string}
                  </p>
                )}
              </div>
            ) : input.type === 'select' ? (
              <div>
                <label className="block text-right text-gray-700 font-normal text-sm mb-2">
                  {input.label}
                </label>
                <select
                  {...register(input.name)}
                  className="w-full h-[46px] px-2 rounded-9xl border border-gray-300 outline-none focus:ring-5 focus:ring-[var(--enjoy-primary)] bg-white"
                >
                  <option value="">{input.placeholder}</option>
                  {input.options?.map((opt) => (
                    <option key={opt.id} value={opt.label}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors[input.name] && (
                  <p className="text-red-600 border-red-600">
                    {errors[input.name]?.message as string}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <Input
                  variant="secondary"
                  type={input.type || 'text'}
                  label={input.label}
                  placeholder={input.placeholder}
                  Icon={input.icon}
                  iconClassName="h-4 w-4 text-gray-400"
                  {...register(input.name)}
                />
                {errors[input.name] && (
                  <p className="text-red-600 border-red-600">
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
