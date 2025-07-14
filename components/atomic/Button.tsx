import React from 'react';
import Link from 'next/link';
import { ButtonProps } from '@/interfaces';

const Button = ({
  children,
  variant = 'primary',
  borderRadius = 'rounded-4xl',
  otherClassName = '',
  type = 'submit',
  handleClick,
  Icon,
  iconPosition = 'left',
  disabled = false,
  href,
}: ButtonProps & { href?: string }) => {
  const classes = `flex items-center justify-center gap-2 text-white cursor-pointer text-base outline-none font-semibold transition-all duration-600 ${borderRadius} ${
    variant === 'primary'
      ? 'bg-enjoy-primary hover:bg-enjoy-primary-light'
      : variant === 'secondary'
      ? 'bg-enjoy-secondary hover:bg-enjoy-secondary-light'
      : variant === 'third'
      ? 'bg-enjoy-primary-deep hover:bg-enjoy-primary-deep-light'
      : variant === 'forth'
      ? 'bg-enjoy-glass hover:bg-enjoy-gray-light text-enjoy-primary-deep'
      : variant === 'fifth'
      ? 'bg-amber-100 border border-amber-300 text-enjoy-primary-deep'
      : ''
  } ${otherClassName}`;

  const content = (
    <>
      {iconPosition === 'left' && Icon && <Icon />}
      {children}
      {iconPosition === 'right' && Icon && <Icon />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      onClick={handleClick}
      type={type}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;
