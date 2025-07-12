import { ButtonProps } from '@/interfaces';
import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  borderRadius = 'rounded-4xl',
  otherClassName = '',
  type = 'submit',
  handleClick,
  Icon,
  iconPosition = 'left',
}: ButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 text-white cursor-pointer text-base outline-none font-semibold transition-all duration-600 ${borderRadius} ${
        variant === 'primary'
          ? 'bg-enjoy-primary hover:bg-enjoy-primary-light'
          : variant === 'secondary'
          ? 'bg-enjoy-secondary hover:bg-enjoy-secondary-light'
          : variant === 'third'
          ? 'bg-enjoy-primary-deep hover:bg-enjoy-primary-deep-light'
          : variant === 'forth'
          ? 'bg-enjoy-glass hover:bg-enjoy-gray-light text-enjoy-primary-deep'
          : ''
      } ${otherClassName}`}
      onClick={handleClick}
      type={type}
    >
      {iconPosition === 'left' && Icon && <Icon />}
      {children}
      {iconPosition === 'right' && Icon && <Icon />}
    </button>
  );
};

export default Button;
