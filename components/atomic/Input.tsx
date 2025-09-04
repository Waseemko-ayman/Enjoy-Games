/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { FaCheck } from 'react-icons/fa6';
import { InputTypes } from '@/utils/type';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

export type InputProps = {
  type: InputTypes;
  placeholder?: string;
  variant?: 'primary' | 'secondary';
  otherClassName?: string;
  otherClassNameContainer?: string;
  labelClassName?: string;
  inputName: string;
  control?: any; // React Hook Form control
  options?: { id: number; value?: string; label: string }[];
  Icon?: React.ElementType;
  iconClassName?: string;
  label?: React.ReactNode;
  value?: string | number;
  isRequired?: boolean;
  onChange?: (e: React.ChangeEvent<any>) => void;
  onIconClick?: () => void;
  readOnly?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const Input = React.forwardRef<HTMLElement, InputProps>(
  (
    {
      type = 'text',
      variant = 'primary',
      placeholder,
      otherClassName,
      otherClassNameContainer,
      labelClassName,
      inputName,
      control,
      options = [],
      Icon,
      iconClassName,
      label,
      value,
      isRequired = false,
      onChange,
      onIconClick,
      readOnly,
      ...rest
    },
    ref
  ) => {
    const inputClasses = `w-full ${
      type !== 'textarea' ? 'h-[46px]' : 'min-h-[120px]'
    } px-2 rounded-9xl border-none outline-none resize-none ${otherClassName}`;

    const inputsTxt = useTranslations('Inputs.placeHolders');

    const InputElement =
      type === 'select' ? (
        <Select
          value={value != null ? String(value) : ''}
          onValueChange={(val) =>
            onChange?.({ target: { name: inputName, value: val } } as any)
          }
        >
          <SelectTrigger
            className={`text-gray-500 text-right ${inputClasses} !h-[46px] bg-white focus:ring-0 focus:outline-none`}
          >
            <SelectValue placeholder={placeholder || inputsTxt('Choose')} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem
                key={opt.id}
                value={opt.value || ''}
                className="hover:bg-[#f4f4ff] hover:text-enjoy-primary"
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : type === 'textarea' ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          name={inputName}
          placeholder={placeholder}
          className={inputClasses}
          onChange={onChange}
          value={value}
          {...rest}
        />
      ) : type === 'checkbox' && control ? (
        <Controller
          name={inputName}
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <label className="flex items-center cursor-pointer select-none gap-3">
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                className="peer sr-only"
                {...rest}
              />
              <div className="w-6 h-6 rounded-lg border border-gray-300 peer-checked:bg-green-600 flex items-center justify-center transition-colors">
                {field.value && <FaCheck className="w-3 h-3 text-white" />}
              </div>
              <span className="text-sm">{placeholder}</span>
            </label>
          )}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          type={type}
          name={inputName}
          placeholder={placeholder}
          className={inputClasses}
          onChange={onChange}
          value={value}
          readOnly={readOnly}
          {...rest}
        />
      );

    return (
      <>
        {label && (
          <label
            className={`block text-sm font-semibold text-gray-500 mb-2 ${labelClassName}`}
          >
            {label}
            {isRequired && <span className="text-red-500"> *</span>}
          </label>
        )}

        {type === 'checkbox' && control ? (
          InputElement
        ) : (
          <div
            className={`flex items-center ${
              type === 'textarea' ? 'pt-3 pb-1' : 'px-3'
            } ${
              variant === 'primary'
                ? 'flex-row rounded-4xl bg-[var(--enjoy-glass-lavender)]'
                : 'flex-row-reverse rounded-lg border border-gray-300 focus:outline-none focus:ring-5 focus:ring-[var(--enjoy-primary)] bg-white'
            } ${otherClassNameContainer}`}
          >
            {Icon && (
              <Icon
                className={`${iconClassName} text-xl cursor-pointer`}
                onClick={onIconClick}
              />
            )}
            {InputElement}
          </div>
        )}
      </>
    );
  }
);

Input.displayName = 'Input';

export default Input;
