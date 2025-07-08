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
          ? 'bg-daleel-primary hover:bg-daleel-primary-light'
          : variant === 'secondary'
          ? 'bg-daleel-secondary hover:bg-daleel-secondary-light'
          : variant === 'third'
          ? 'bg-daleel-primary-deep hover:bg-daleel-primary-deep-light'
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
