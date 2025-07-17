import React from 'react';

type InputProps = {
  type: 'text' | 'email' | 'search' | 'select' | 'number' | 'date' | 'checkbox';
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
  const inputClasses = `w-full h-[46px] px-2 rounded-9xl border-none outline-none ${otherClassName}`;

  const iconBeforeInput = variant === 'primary' && Icon;
  const iconAfterInput = variant === 'secondary' && Icon;

  const InputElement =
    type === 'select' ? (
      <select name={inputName} className={inputClasses} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.id} value={opt.label}>
            {opt.label}
          </option>
        ))}
      </select>
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
        className={`flex items-center px-3 ${
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
