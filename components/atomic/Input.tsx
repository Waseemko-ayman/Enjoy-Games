import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type InputProps = {
  type:
    | 'text'
    | 'email'
    | 'search'
    | 'select'
    | 'number'
    | 'date'
    | 'checkbox'
    | 'textarea';
  placeholder?: string;
  variant?: 'primary' | 'secondary';
  otherClassName?: string;
  otherClassNameContainer?: string;
  inputName: string;
  options?: { id: number; label: string }[];
  Icon?: React.ElementType;
  iconClassName?: string;
  label?: string;
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
  ...props
}: React.PropsWithChildren<InputProps>) => {
  const inputClasses = `w-full ${
    type !== 'textarea' ? 'h-[46px]' : 'min-h-[120px] py-2'
  } px-2 rounded-9xl border-none outline-none resize-none ${otherClassName}`;

  const iconBeforeInput = variant === 'primary' && Icon;
  const iconAfterInput = variant === 'secondary' && Icon;

  const InputElement =
    type === 'select' ? (
      <Select
        onValueChange={(val) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          props?.onChange?.({ target: { name: inputName, value: val } } as any)
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
        {...props}
        dir="rtl"
      />
    ) : (
      <input
        type={type}
        name={inputName}
        placeholder={placeholder}
        className={inputClasses}
        {...props}
        dir="rtl"
      />
    );

  return (
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
