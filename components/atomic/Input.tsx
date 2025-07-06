import React from 'react';

type InputProps = {
  type: 'text' | 'email' | 'search' | 'textarea' | 'select';
  placeholder?: string;
  variant?: 'primary' | 'secondary';
  otherClassName?: string;
  inputName: string;
  options?: { value: string; label: string }[];
} & React.HTMLAttributes<HTMLElement>;

const Input = ({
  type,
  placeholder,
  otherClassName,
  inputName,
  options = [],
  ...props
}: React.PropsWithChildren<InputProps>) => {
  const StyledInput = `w-full h-[46px] px-2 rounded-9xl border-none outline-none ${otherClassName}`;

  return (
    <>
      {type === 'select' ? (
        <select name={inputName} className={StyledInput} {...props}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={inputName}
          placeholder={placeholder}
          className={StyledInput}
          {...props}
          dir='rtl'
        />
      )}
    </>
  );
};

export default Input;
