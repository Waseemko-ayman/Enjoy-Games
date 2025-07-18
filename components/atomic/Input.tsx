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

type InputProps = {
  type: InputTypes;
  placeholder?: string;
  variant?: 'primary' | 'secondary';
  otherClassName?: string;
  otherClassNameContainer?: string;
  inputName: string;
  options?: { id: number; label: string }[];
  Icon?: React.ElementType;
  iconClassName?: string;
  label?: string;
  checked?: boolean;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<any>) => void;
} & React.HTMLAttributes<HTMLElement>;

const Input = ({
  type = 'text',
  variant = 'primary',
  placeholder,
  otherClassName,
  otherClassNameContainer,
  inputName,
  options = [],
  Icon,
  iconClassName,
  label,
  value,
  onChange,
  ...props
}: React.PropsWithChildren<InputProps>) => {
  const inputClasses = `w-full ${
    type !== 'textarea' ? 'h-[46px]' : 'min-h-[120px]'
  } px-2 rounded-9xl border-none outline-none resize-none ${otherClassName}`;

  const iconBeforeInput = variant === 'primary' && Icon;
  const iconAfterInput = variant === 'secondary' && Icon;

  const InputElement =
    type === 'select' ? (
      <Select
        onValueChange={(val) =>
          onChange?.({ target: { name: inputName, value: val } } as any)
        }
      >
        <SelectTrigger
          className={`text-gray-500 text-right ${inputClasses} !h-[46px] bg-white focus:ring-0 focus:outline-none`}
        >
          <SelectValue placeholder={placeholder || 'اختر...'} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem
              key={opt.id}
              value={opt.label}
              className="hover:bg-[#f4f4ff] hover:text-enjoy-primary"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ) : type === 'textarea' ? (
      <textarea
        name={inputName}
        placeholder={placeholder}
        className={inputClasses}
        onChange={onChange}
        value={value}
        dir="rtl"
      />
    ) : type === 'checkbox' ? (
      <label className="flex items-center cursor-pointer select-none gap-3">
        <input
          type="checkbox"
          name={inputName}
          checked={props.checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <div className="w-6 h-6 rounded-lg border border-gray-300 peer-checked:bg-green-600 flex items-center justify-center transition-colors">
          {props.checked && <FaCheck className="w-3 h-3 text-white" />}
        </div>
        <span
          className={`text-sm transition-colors ${
            props.checked ? 'text-gray-700' : 'text-gray-400'
          }`}
        >
          {placeholder}
        </span>
      </label>
    ) : (
      <input
        type={type}
        name={inputName}
        placeholder={placeholder}
        className={inputClasses}
        onChange={onChange}
        value={value}
        dir="rtl"
      />
    );

  return type === 'checkbox' ? (
    InputElement
  ) : (
    <>
      {label && (
        <label className="block text-sm font-semibold text-gray-400 mb-2">
          {label}
        </label>
      )}
      <div
        className={`flex items-center ${
          type === 'textarea' ? 'pt-3 pb-1' : 'px-3'
        } ${
          variant === 'primary'
            ? 'flex-row rounded-4xl bg-[var(--enjoy-glass-lavender)]'
            : 'flex-row-reverse rounded-lg border border-gray-300 focus:outline-none focus:ring-5 focus:ring-[var(--enjoy-primary)] bg-white'
        } ${otherClassNameContainer}`}
      >
        {iconBeforeInput && (
          <Icon className={`${iconClassName} text-2xl cursor-pointer`} />
        )}
        {InputElement}
        {iconAfterInput && (
          <Icon className={`${iconClassName} text-2xl cursor-pointer`} />
        )}
      </div>
    </>
  );
};

export default Input;
