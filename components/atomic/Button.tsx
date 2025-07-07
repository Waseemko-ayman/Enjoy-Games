import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  // variant: 'primary' | 'secondary' | 'outline' | 'cover' | 'circle';
  variant: 'primary' | 'secondary';
  borderRadius?: string;
  otherClassName?: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'submit' | 'button' | 'reset';
  Icon?: React.ElementType;
}

const Button = ({
  children,
  variant,
  borderRadius = 'rounded-4xl',
  otherClassName = '',
  type = 'submit',
  handleClick,
  Icon,
}: ButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center gap-1 w-full text-white cursor-pointer text-lg outline-none font-semibold transition-all duration-600 ${borderRadius} ${
        variant === 'primary'
          ? 'bg-daleel-primary hover:bg-daleel-primary-light'
          : variant === 'secondary'
          ? 'bg-daleel-secondary hover:bg-daleel-secondary-light'
          : ''
      } ${otherClassName}`}
      onClick={handleClick}
      type={type}
    >
      {Icon && <Icon />}
      {children}
    </button>
  );
};

export default Button;
