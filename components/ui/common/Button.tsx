'use client';
import React from 'react';

const Button = ({
  children,
  variant = 'solid',
  backgroundColor = 'bg-amber-400',
  textColor = 'text-black',
  otherClassName,
  handleClick,
  IconBefore,
  IconAfter,
  iconClassNameBefore,
  iconClassNameAfter,
  type = 'button',
  disabled,
}: {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'custom';
  backgroundColor?: string;
  textColor?: string;
  otherClassName?: string;
  handleClick?: () => void;
  IconBefore?: React.ElementType;
  IconAfter?: React.ElementType;
  iconClassNameBefore?: string;
  iconClassNameAfter?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}) => {
  return (
    <button
      className={`px-3 py-2 w-full h-10 max-w-44 text-base block cursor-pointer rounded-sm hover:scale-105 transition duration-200 
        ${
          variant === 'solid'
            ? `${backgroundColor} ${textColor}`
            : variant === 'outline'
            ? 'bg-transparent border border-white text-white hover:bg-amber-400 hover:text-black hover:border-amber-400'
            : variant === 'custom'
            ? `${backgroundColor} ${textColor} border border-black`
            : ''
        }
        ${
          IconBefore || IconAfter
            ? 'flex items-center justify-center gap-2'
            : ''
        }
        ${otherClassName}`}
      onClick={handleClick}
      type={type}
      disabled={disabled}
    >
      {IconBefore && <IconBefore className={iconClassNameBefore} />}
      {children}
      {IconAfter && <IconAfter className={iconClassNameAfter} />}{' '}
    </button>
  );
};

export default Button;
