import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'third';
  borderRadius?: string;
  otherClassName?: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'submit' | 'button' | 'reset';
  Icon?: React.ElementType;
  iconPosition?: 'left' | 'right';
}

const Button = ({
  children,
  variant,
  borderRadius = 'rounded-4xl',
  otherClassName = '',
  type = 'submit',
  handleClick,
  Icon,
  iconPosition = 'left',
}: ButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center gap-1 text-white cursor-pointer text-lg outline-none font-semibold transition-all duration-600 ${borderRadius} ${
        variant === 'primary'
          ? 'bg-enjoy-primary hover:bg-enjoy-primary-light'
          : variant === 'secondary'
          ? 'bg-enjoy-secondary hover:bg-enjoy-secondary-light'
          : variant === 'third'
          ? 'bg-enjoy-primary-deep hover:bg-enjoy-primary-deep-light'
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
