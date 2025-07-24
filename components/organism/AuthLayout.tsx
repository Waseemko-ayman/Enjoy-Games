'use client';

import React from 'react';
import Image from 'next/image';
import Button from '../atomic/Button';
import { AuthLayoutProps } from '@/interfaces';
import ButtonLoading from '../atomic/ButtonLoading';

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  btnText,
  title,
  description,
  isSubmitDisabled,
  isSubmitting,
  onSubmit,
}) => {
  return (
    <div className="flex flex-col items-center justify-center px-8 pt-5 pb-12 max-w-lg mx-auto">
      <Image
        src="/assets/logo.png"
        alt="Logo"
        width={150}
        height={150}
        className="pb-3"
        priority
      />

      {/* Title & Description */}
      <div className="mb-5 text-center">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-base font-normal mt-2.5">{description}</p>
      </div>

      <form onSubmit={onSubmit}>
        {/* Children Content */}
        <div className="w-full mb-6">
          <div className="space-y-3">{children}</div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitDisabled || isSubmitting}
          otherClassName="w-full py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? <ButtonLoading /> : btnText}
        </Button>
      </form>
    </div>
  );
};

export default AuthLayout;
