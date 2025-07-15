import React, { forwardRef, Ref } from 'react';
import Link from 'next/link';
import { ButtonProps } from '@/interfaces';

const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps & { href?: string }
>(
  (
    {
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
      bgColor,
      hoverBgColor,
      ...props
    },
    ref
  ) => {
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
        : variant === 'ghost'
        ? 'bg-transparent text-enjoy-primary hover:text-enjoy-primary-light'
        : variant === 'circle'
        ? `rounded-full p-2 ${bgColor || 'bg-enjoy-primary'} ${
            hoverBgColor
              ? `hover:${hoverBgColor}`
              : 'hover:bg-enjoy-primary-light'
          }`
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
        <Link
          href={href}
          ref={ref as Ref<HTMLAnchorElement>}
          className={classes}
          {...props}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        className={classes}
        onClick={handleClick}
        type={type}
        disabled={disabled}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
